const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const { User } = require('../models/schemas');
const { validateUser } = require('../models/validate');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const express = require('express');

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({
    $or: [{ nick: req.body.nick }, { email: req.body.email }]
  });
  if (user) return res.status(404).send("User already exist.");
  user = new User({
      nick: req.body.nick,
      password: req.body.password,
      email: req.body.email,
      accountCreated: Date.now()
  })
  const salt = await bcrypt.genSalt();
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();
const token = jwt.sign({
        _id: user._id
    }, config.get('jwtPrivateKey'));
    res.header('x_auth_token', token).send(user);
});

module.exports = router;