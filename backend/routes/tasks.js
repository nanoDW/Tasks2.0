const express = require("express");
const { Task } = require("../models/schemas");
const { validateTask } = require("../models/validate");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { body, user } = req;
  const { error } = validateTask(body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    const task = new Task({
      nick: user._id,
      description: body.description,
      priority: body.priority,
      deadline: body.deadline,
      created: Date.now()
    });

    await task.save();

    return res.status(200).json({ task });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot add task");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    const givenTasks = await Task.find({ author: req.user.nick });

    return res.status(200).json({ tasks, givenTasks });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot add task");
  }
});

module.exports = router;
