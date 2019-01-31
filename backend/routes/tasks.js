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

router.put("/editTask/:id", auth, async (req, res) => {
  const { priority, deadline } = req.body;

  try {
    const task = await Task.findById(req.params.id);

    task.priority = priority ? priority : task.priority;
    task.deadline = deadline ? deadline : task.deadline;

    task.save();

    return res.status(200).json({ task });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot update task");
  }
});

router.put("/complete/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task.user !== req.user._id) {
      return res.status(403).send("Cannot update task status. Access denied");
    }

    task.done = true;
    task.note = req.body.note;
    task.deadline = Date.now();
    task.save();

    return res.status(200).json({ task });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot update task");
  }
});

router.delete("/delete/:id", auth, async (req, res) => {
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

router.post("/user/:id", auth, async (req, res) => {
  const { body } = req;
  const { error } = validateTask(body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const task = new Task({
      author: req.user.nick,
      user: req.params.id,
      description: body.description,
      priority: body.priority,
      deadline: body.deadline,
      created: Date.now(),
      accepted: false
    });

    return res.status(200).json({ task });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot add task");
  }
});

router.put("/accept/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (task.user !== req.user._id) {
      return res.status(403).send("Access denied. Cannot accept task");
    }

    task.accepted = true;
    task.save();

    return res.status(200).json({ task });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot accept task");
  }
});

router.put("/reject/:id", auth, async (req, res) => {
  if (req.body.note.lenght < 3) {
    return res
      .status(400)
      .send("Cannot make a rejection without substantiation");
  }

  try {
    const task = await Task.findById(req.params.id);

    if (task.user !== req.user._id) {
      return res.status(403).send("Access denied. Cannot accept task");
    }

    task.note = req.body.note;
    task.save();

    return res.status(200).json({ task });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot reject task");
  }
});

module.exports = router;
