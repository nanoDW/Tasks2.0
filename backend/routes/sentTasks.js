const express = require("express");
const { Task } = require("../models/schemas");
const { validateTask } = require("../models/validate");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/user/:id", auth, async (req, res) => {
  if (req.params.id.length !== 24) {
    return res.status(400).send("Invalid task ID.");
  }

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
  if (req.params.id.length !== 24) {
    return res.status(400).send("Invalid task ID.");
  }

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
  if (req.params.id.length !== 24) {
    return res.status(400).send("Invalid task ID.");
  }

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

router.delete("/user/:id", auth, async (req, res) => {
  if (req.params.id.length !== 24) {
    return res.status(400).send("Invalid task ID.");
  }

  try {
    const task = await findById(req.params.id);

    if (task.author !== req.user.nick) {
      return res.status(403).send("Access denied. Cannot delete task");
    }

    await findByIdAndDelete(req.params.id);

    return res.status(200).send("Deleted task. Add new task to your list");
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot accept rejection");
  }
});

module.exports = router;
