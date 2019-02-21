const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/schemas");
const { validateUser } = require("../models/validate");
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

module.exports = router;
