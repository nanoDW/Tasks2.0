const express = require("express");
const { User, Message } = require("../models/schemas");
const { validateMessage } = require("../models/validate");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

const router = express.Router();

router.post("/user/:id", auth, async (req, res) => {
  const { user, body, params } = req;
  const { error } = validateMessage(body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    const sendTo = await User.findById(params.id);

    const message = new Message({
      author: user.nick,
      authorID: user._id,
      addressedTo: sendTo.nick,
      userID: sendTo._id,
      deletedByAuthor: false,
      deletedByUser: false,
      topic: body.topic,
      text: body.text,
      sent: Date.now(),
      seen: false
    });

    return res.status(200).json({ message });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot send message");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const receivedMessages = await Message.find({
      userID: req.user._id,
      deletedByUser: false
    });
    const sentMessages = await Message.find({
      authorID: req.user._id,
      deletedByAuthor: false
    });

    return res.status(200).json({ receivedMessages, sentMessages });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get messages");
  }
});

router.put("/received/:id", auth, async (req, res) => {
  const { params, user } = req;
  if (req.params.id.length !== 24) {
    return res.status(400).send("Invalid task ID.");
  }

  try {
    const message = await Message.findById(params.id);

    if (message.userID !== user._id) {
      return res.status(403).send("Cannot access private messages");
    }

    if (message.seen === false) {
      message.seen = true;
      await message.save();
    }

    return res.status(200).json({ message });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get message");
  }
});

router.get("/sent/:id", auth, async (req, res) => {
  const { params, user } = req;
  if (req.params.id.length !== 24) {
    return res.status(400).send("Invalid task ID.");
  }

  try {
    const message = await Message.findById(params.id);

    if (message.authorID !== user._id) {
      return res.status(403).send("Cannot access private messages");
    }

    return res.status(200).json({ message });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get message");
  }
});

router.delete("/received/:id", auth, async (req, res) => {
  const { params, user } = req;
  if (req.params.id.length !== 24) {
    return res.status(400).send("Invalid task ID.");
  }

  try {
    const message = await Message.findById(params.id);

    if (message.userID !== user._id) {
      return res.status(403).send("Cannot access private messages");
    }

    if (message.deletedByAuthor === true) {
      await Message.findByIdAndDelete(params.id);
    } else {
      message.deletedByUser = true;
      await message.save();
    }

    return res.status(200).send("Message was deleted.");
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get message");
  }
});

router.delete("/sent", auth, async (req, res) => {
  const { body, user } = req;
  try {
    body.delete.map(async item => {
      const message = await Message.findById(item);

      if (message.authorID === user._id) {
        if (message.deletedByUser === true) {
          await Message.findByIdAndDelete(item);
        } else {
          message.deletedByAuthor = true;
          await message.save();
        }
      }
    });

    return res.status(200).send("Messages succesfully deleted.");
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get message");
  }
});

router.delete("/received", auth, async (req, res) => {
  const { body, user } = req;
  try {
    body.delete.map(async item => {
      const message = await Message.findById(item);

      if (message.userID === user._id) {
        if (message.deletedByAuthor === true) {
          await Message.findByIdAndDelete(item);
        } else {
          message.deletedByUser = true;
          await message.save();
        }
      }
    });

    return res.status(200).send("Messages succesfully deleted.");
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get message");
  }
});

router.delete("/sent/:id", auth, async (req, res) => {
  const { params, user } = req;
  if (req.params.id.length !== 24) {
    return res.status(400).send("Invalid task ID.");
  }

  try {
    const message = await Message.findById(params.id);

    if (message.authorID !== user._id) {
      return res.status(403).send("Cannot access private messages");
    }

    if (message.deletedByUser === true) {
      await Message.findByIdAndDelete(params.id);
    } else {
      message.deletedByAuthor = true;
      await message.save();
    }

    return res.status(200).send("Message was deleted.");
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get message");
  }
});

router.get("/all", authAdmin, async (req, res) => {
  try {
    const messages = await Message.find();

    return res.status(200).json({ messages });
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot get message");
  }
});

module.exports = router;
