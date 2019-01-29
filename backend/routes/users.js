const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/schemas");
const {
  validateUser,
  validatePasswordAndEmail
} = require("../models/validate");
const auth = require("../middleware/auth");
const addFriend = require("../utils/addFriend");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { body } = req;
  const { error } = validateUser(body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const existingUser = await User.findOne({
      $or: [{ nick: body.nick }, { email: body.email }]
    });

    if (existingUser) {
      return res.status(404).send("User already exist.");
    }

    const user = new User({
      nick: body.nick,
      password: body.password,
      email: body.email,
      accountCreated: Date.now()
    });

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = jwt.sign(
      {
        _id: user._id,
        nick: user.nick
      },
      config.get("jwtPrivateKey")
    );

    const { nick, hidden, _id, email } = user;
    return res.header("xAuthToken", token).json({ nick, hidden, _id, email });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Cannot add user to the database.", error: e });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find().select("nick _id last hidden");

    const data = [];
    users.map(user => {
      if (!user.hidden) {
        data.push({ _id: user._id, nick: user.nick, last: user.last });
      }
    });

    res.json({ data });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get users");
  }
});

router.get("/hidden", auth, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.json({ users });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get all users.");
  }
});

router.get("/user/:id", auth, async (req, res) => {
  if (req.params.id.length !== 24) {
    return res.status(400).send("Invalid user ID.");
  }

  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).send("User of given id does not exist.");
    }

    const { nick, _id, last, accountCreated } = user;
    res.json({ nick, _id, last, accountCreated });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get user data.");
  }
});

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  if (!user) return res.status(404).send("User of given id does not exist.");
  return res.json({ user });
});

router.put("/addNote", auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $inc: { last: 1 }
      },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).send("User of given id does not exist.");
    }

    const { last } = user;
    return res.json({ last });
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot update user tasks.");
  }
});

router.put("/settings", auth, async (req, res) => {
  try {
    let message = null;
    const { error } = validatePasswordAndEmail(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    if (req.body.password) {
      await User.findByIdAndUpdate(req.user._id, {
        password: req.body.password
      });
      message = "Password has been updated.";
    }

    if (req.body.email) {
      await User.findByIdAndUpdate(req.user._id, {
        email: req.body.email
      });
      message = "Email has been updated.";
    }

    return res.status(200).send(message);
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot update user settings.");
  }
});

router.put("/hidding", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.hidden = !user.hidden;
    user.save();

    return res.status(200).json(user.hidden);
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Cannot change user status.");
  }
});

router.put("/addFriend", auth, async (req, res) => {
  try {
    const [user, friend] = await Promise.all([
      User.findById(req.user._id),
      User.findById(req.body._id)
    ]);

    if (user.friends.find(friend => friend.user === req.body.nick)) {
      return res
        .status(400)
        .send("Error! An invitation has been sent earlier.");
    }

    await Promise.all([
      addFriend(user, friend, true),
      addFriend(friend, user, false)
    ]);

    return res
      .status(200)
      .send(`Success! Added ${friend.nick} to your friends list.`);
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot add to a friends list.");
  }
});

router.put("/acceptFriend", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    for (let i = 0; i < user.friends.length; i++) {
      const friend = user.friends[i];
      if (friend.userID === req.body._id) {
        if (friend.accepted === true) {
          return res
            .status(400)
            .send("Cannot accept an invitation. It has been already accepted.");
        }
      } else {
        friend.accepted = true;
      }
    }

    await user.save();

    return res.status(200).send(`Success! Invitation has been accepted.`);
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot add to a friends list.");
  }
});

router.delete("/friends/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).send("Error! Cannot find user.");
    }

    let updatedList = [];
    user.friends.map(friend => {
      if (friend.userID !== req.params.id) {
        updatedList.push(friend);
      }
    });

    user.friends = updatedList;
    user.save();

    return res.status(200).send("Success! Your friends list has been updated.");
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot delete friend.");
  }
});

router.delete("/");

module.exports = router;
