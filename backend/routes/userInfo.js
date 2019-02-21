const { User, Task, Message } = require("../models/schemas");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id).select("-password");

  if (!user) return res.status(404).send("User of given id does not exist.");

  return res.json({ user });
});

router.get("/account", auth, async (req, res) => {
  const { nick, _id } = req.user;

  try {
    const [user, tasks, messages] = await Promise.all([
      User.findById(_id).select("nick last accountCreated friends"),

      Task.find({
        $or: [{ user: _id }, { author: nick, accepted: true }]
      }),

      Message.find({
        $or: [
          { userID: _id, deletedByUser: false },
          { authorID: _id, deletedByAuthor: false }
        ]
      })
    ]);

    if (!user) return res.status(404).send("User of given id does not exist.");

    const friendsAccepted = user.friends.filter(friend => {
      return friend.accepted === true;
    });

    const tasksValues = {
      active: 0,
      done: 0,
      given: 0
    };

    if (tasks.length > 0) {
      tasks.map(task => {
        if (task.user !== _id) tasksValues.given += 1;
        else if (task.done === false) tasksValues.active += 1;
        else tasksValues.done += 1;
        console.log(".");
      });
    }

    const sentMessages = messages.filter(message => message.userID === _id);
    const receivedMessagesLength = messages.length - sentMessages.length;

    const response = {
      nick: user.nick,
      createdTasks: user.last,
      accountCreated: user.accountCreated,
      friendsAmount: friendsAccepted.length,
      activeTasks: tasksValues.active,
      doneTasks: tasksValues.done,
      givenTasks: tasksValues.given,
      receivedMessages: receivedMessagesLength,
      sentMessages: sentMessages.length
    };

    return res.status(200).json({ response });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Cannot get data.");
  }
});

module.exports = router;
