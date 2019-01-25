const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/schemas");
const { validateUser } = require("../models/validate");
const express = require("express");

const router = express.Router();

router.post("/", async (req, res) => {
  const { body } = req;
  const { error } = validateUser(body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    let user = await User.findOne({
      $or: [{ nick: body.nick }, { email: body.email }]
    });

    if (user) {
      return res.status(404).send("User already exist.");
    }

    user = new User({
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
        _id: user._id
      },
      config.get("jwtPrivateKey")
    );

    const { nick, hidden, _id, email } = user;
    res.header("x_auth_token", token).json({ nick, hidden, _id, email });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Cannot add user to the database.", error: e });
  }
});

router.get("/", async (req, res) => {
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

    return res.status(404).send("There are no users");
  }
});

router.get("/hidden", async (req, res) => {
  const users = await User.find().select("-password");
  if (!users) return res.status(404).send("There are no users");
  res.json({ users });
});

router.get("/:id", async (req, res) => {
  if (req.params.id.length !== 24)
    return res.status(400).send("Invalid user ID.");

  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("User of given id does not exist.");

    res.json({ user });
  } catch (e) {
    res.status(404).send("User of given id does not exist.");
  }
});

//Waiting for authorisation - this route cant be used now.
//router.get("/me", async (req, res) => {
//   const user = await User.findById(req.user._id).select("-password");
//   if (!user) return res.status(404).send("User of given id does not exist.");
//   res.json({ user });
// });

module.exports = router;
