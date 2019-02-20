const { User } = require("../models/schemas");
const authMod = require("../middleware/authMod");
const authAdmin = require("../middleware/authAdmin");

const express = require("express");

const router = express.Router();

router.get("/", authMod, async (req, res) => {
  try {
    const users = await User.find().select("-password");

    return res.status(200).json({ users });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get all users.");
  }
});

router.put("/role/:id", authAdmin, async (req, res) => {
  const { id } = req.params;

  if (id.length !== 24) {
    return res.status(400).send("Invalid user ID.");
  }

  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(404).send("User of given id does not exist.");
    }

    user.role = user.role === "user" ? "mod" : "user";
    await user.save();

    const updatedUser = {
      nick: user.nick,
      _id: user._id,
      last: user.last,
      role: user.role
    };

    res.status(200).json({ updatedUser });
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot update user status.");
  }
});

router.get("/stats", authAdmin, async (req, res) => {
  try {
    const [users, tasks, messages] = await Promise.all([
      User.find().select("nick last accountCreated friends"),

      Task.find(),

      Message.find()
    ]);

    const friendsAccepted = users.friends.filter(friend => {
      return friend.accepted === true;
    });

    const tasksValues = {
      active: 0,
      done: 0,
      given: 0
    };

    if (tasks.length > 0) {
      tasks.forEach(task => {
        if (task.author) tasksValues.given += 1;
        else if (task.done === false) tasksValues.active += 1;
        else tasksValues.done += 1;
      });
    }

    const response = {
      nick: user.nick,
      createdTasks: user.last,
      accountCreated: user.accountCreated,
      friendsAmount: friendsAccepted.length,
      activeTasks: tasksValues.active,
      doneTasks: tasksValues.done,
      givenTasks: tasksValues.given,
      sentMessages: messages.length
    };

    return res.status(200).json({ response });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Cannot get data.");
  }
});

module.exports = router;
