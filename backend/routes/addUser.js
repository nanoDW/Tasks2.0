const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const { User } = require("../models/schemas");
const { validateUser } = require("../models/validate");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const express = require("express");

module.exports = asyncMiddleware(async (req, res) => {
  const { body } = req;
  const { error } = validateUser(body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({
    $or: [{ nick: body.nick }, { email: body.email }]
  });
  if (user) return res.status(404).send("User already exist.");
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
});
