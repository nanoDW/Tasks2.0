const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const express = require("express");
const { User } = require("../models/schemas");
const { validateLogAndPass } = require("../models/validate");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateLogAndPass(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const existingUser = await User.findOne({
    nick: req.body.nick
  });

  if (!existingUser) return res.status(400).send("Invalid nick or password");

  const validPassword = await bcrypt.compare(
    req.body.password,
    existingUser.password
  );
  if (!validPassword) return res.status(400).send("Invalid nick or password");

  const token = jwt.sign(
    {
      _id: existingUser._id,
      nick: existingUser.nick,
      role: existingUser.role
    },
    config.get("jwtPrivateKey")
  );

  return res
    .header("xAuthToken", token)
    .send(_.pick(existingUser, ["_id", "nick", "email", "role"]));
});

module.exports = router;
