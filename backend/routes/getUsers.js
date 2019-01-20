const mongoose = require('mongoose');
const { User } = require('../models/schemas');
const asyncMiddleware = require('../middleware/asyncMiddleware');
const express = require('express');

const router = express.Router();

mongoose
  .connect("mongodb://nanoDW:unique11password@ds159634.mlab.com:59634/tasks",
  { useNewUrlParser: true })
  .then(() => console.log("Connected to the MongoDB."))
  .catch(err =>
    console.log("Connection error. Cannot connect to the MongoDB", err.message)
  );

router.get("/", asyncMiddleware(async (req, res) => {
    const users = await User.find();
    if (!users) return res.status(404).send("There are no users");
    res.json({ users });
  })
);

module.exports = router;