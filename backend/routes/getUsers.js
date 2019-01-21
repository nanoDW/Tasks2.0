const mongoose = require("mongoose");
const { User } = require("../models/schemas");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const express = require("express");

module.exports = asyncMiddleware(async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(404).send("There are no users");
  const data = [];
  users.map(user => {
    if (!user.hidden) {
      data.push({ _id: user._id, nick: user.nick, last: user.last });
    }
  });
  res.json({ data, users });
});
