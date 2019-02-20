const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { User, Task, Message } = require("../models/schemas");
const {
  validateUser,
  validatePasswordAndEmail
} = require("../models/validate");
const auth = require("../middleware/auth");

const express = require("express");

const router = express.Router();

const USER_ID_LENGTH = 24;

router.post("/", async (req, res) => {
  const { body } = req;
  const { error } = validateUser(body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const existingUser = await User.findOne({
      $or: [{ nick: body.nick }, { email: body.email }]
    });

    if (existingUser) return res.status(404).send("User already exist.");

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
        nick: user.nick,
        role: user.role
      },
      config.get("jwtPrivateKey")
    );

    const { nick, hidden, _id, email } = user;
    return res
      .status(200)
      .header("xAuthToken", token)
      .json({ nick, hidden, _id, email });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Cannot add user to the database.", error: e });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const users = await User.find()
      .select("nick _id last hidden")
      .sort({ nick: 1 });

    const data = [];
    users.forEach(user => {
      if (!user.hidden) {
        data.push({ _id: user._id, nick: user.nick, last: user.last });
      }
    });

    res.status(200).json({ data });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get users");
  }
});

router.get("/user/:id", auth, async (req, res) => {
  const { id } = req.params;

  if (id.length !== USER_ID_LENGTH) {
    return res.status(400).send("Invalid user ID.");
  }

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).send("User of given id does not exist.");
    }

    const { nick, _id, last, accountCreated } = user;
    res.status(200).json({ nick, _id, last, accountCreated });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get user data.");
  }
});

router.get("/me", auth, async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id).select("-password");

  if (!user) return res.status(404).send("User of given id does not exist.");

  return res.json({ user });
});

router.get("/account", auth, async (req, res) => {
  const { nick, _id } = req.user;

  try {
    const [user, tasks, messages] = await Promise.all([
      User.findById(_id).select("nick last accountCreated friends"),

      Task.find({
        $or: [{ user: _id }, { author: nick, accepted: true }]
      }),

      Message.find({
        $or: [
          { userID: _id, deletedByUser: false },
          { authorID: _id, deletedByAuthor: false }
        ]
      })
    ]);

    if (!user) return res.status(404).send("User of given id does not exist.");

    const friendsAccepted = user.friends.filter(friend => {
      return friend.accepted === true;
    });

    const tasksValues = {
      active: 0,
      done: 0,
      given: 0
    };

    if (tasks.length > 0) {
      tasks.map(task => {
        if (task.user !== _id) tasksValues.given += 1;
        else if (task.done === false) tasksValues.active += 1;
        else tasksValues.done += 1;
        console.log(".");
      });
    }

    const sentMessages = messages.filter(message => message.userID === _id);
    const receivedMessagesLength = messages.length - sentMessages.length;

    const response = {
      nick: user.nick,
      createdTasks: user.last,
      accountCreated: user.accountCreated,
      friendsAmount: friendsAccepted.length,
      activeTasks: tasksValues.active,
      doneTasks: tasksValues.done,
      givenTasks: tasksValues.given,
      receivedMessages: receivedMessagesLength,
      sentMessages: sentMessages.length
    };

    return res.status(200).json({ response });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Cannot get data.");
  }
});

router.put("/settings", auth, async (req, res) => {
  const { body, user } = req;

  try {
    let message = [];
    const { error } = validatePasswordAndEmail(body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const activeUser = await User.findById(user._id);

    if (body.password) {
      const salt = await bcrypt.genSalt();
      activeUser.password = await bcrypt.hash(activeUser.password, salt);
      message.push("Password has been updated. ");
    }

    if (body.email) {
      activeUser.email = body.email;
      message.push("Email has been updated.");
    }

    return res.status(200).send(message);
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot update user settings.");
  }
});

router.put("/visibility", auth, async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    user.hidden = !user.hidden;
    user.save();

    return res.status(200).json(user.hidden);
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Cannot change user status.");
  }
});

router.delete("/me", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    return res.status(200).send("Account succesfully deleted.");
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot delete your account.");
  }
});

module.exports = router;
