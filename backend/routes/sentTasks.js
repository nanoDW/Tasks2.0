const express = require("express");
const { User, Task } = require("../models/schemas");
const { validateTask } = require("../models/validate");
const auth = require("../middleware/auth");

const router = express.Router();
const TASK_ID_LENGTH = 24;

router.post("/", auth, async (req, res) => {
  const { body } = req;
  const { error } = validateTask(body);

  if (!body.user) {
    return res.status(400).send("Can't get username.");
  }

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const existingUser = await User.findById(body.user);
    console.log(existingUser);
    if (!existingUser) {
      return res.status(400).send("User of given id does not exist");
    }

    const task = new Task({
      author: req.user.nick,
      user: req.body.user,
      description: body.description,
      priority: body.priority,
      deadline: body.deadline,
      created: Date.now(),
      accepted: false
    });

    await task.save();

    return res.status(200).json({ task });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot add task");
  }
});

router.put("/acceptance/:id", auth, async (req, res) => {
  if (req.params.id.length !== TASK_ID_LENGTH) {
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

router.put("/rejection/:id", auth, async (req, res) => {
  if (req.params.id.length !== TASK_ID_LENGTH) {
    return res.status(400).send("Invalid task ID.");
  }

  if (!req.body.note) {
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
