const express = require("express");
const { Task, User } = require("../models/schemas");
const { validateTask } = require("../models/validate");
const auth = require("../middleware/auth");

const router = express.Router();
const TASK_ID_LENGTH = 24;

router.post("/", auth, async (req, res) => {
  const { body, user } = req;
  const { error } = validateTask(body);

  if (error) return res.status(400).send(error.details[0].message);

  try {
    await User.findByIdAndUpdate(user._id, { $inc: { last: 1 } });

    const task = new Task({
      user: user._id,
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
    const sentTasks = await Task.find({ author: req.user.nick });

    return res.status(200).json({ tasks, sentTasks });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot add task");
  }
});

router.put("/edition/:id", auth, async (req, res) => {
  if (req.params.id.length !== TASK_ID_LENGTH) {
    return res.status(400).send("Invalid task ID.");
  }

  const { priority, deadline } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    task.priority = priority ? priority : task.priority;
    task.deadline = deadline ? deadline : task.deadline;

    await task.save();

    return res.status(200).json({ task });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot update task");
  }
});

router.put("/completed/:id", auth, async (req, res) => {
  if (req.params.id.length !== TASK_ID_LENGTH) {
    return res.status(400).send("Invalid task ID.");
  }

  try {
    const task = await Task.findById(req.params.id);

    if (task.user !== req.user._id) {
      return res.status(403).send("Cannot update task status. Access denied");
    }

    task.done = true;
    task.note = req.body.note;
    task.deadline = Date.now();
    await task.save();

    return res.status(200).json({ task });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot update task");
  }
});

router.delete("/deleted/:id", auth, async (req, res) => {
  if (req.params.id.length !== TASK_ID_LENGTH) {
    return res.status(400).send("Invalid task ID.");
  }

  try {
    const task = await Task.findById(req.params.id);

    if (task.user !== req.user._id) {
      return res.status(403).send("Cannot delete status. Access denied");
    }

    await Task.findByIdAndDelete(req.params._id);

    return res.status(200).send("Task succesfully deleted");
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot delete task");
  }
});

module.exports = router;
