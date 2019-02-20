const addFriend = require("../utils/addFriend");
const auth = require("../middleware/auth");
const { User } = require("../models/schemas");

const express = require("express");

const router = express.Router();

router.put("/", auth, async (req, res) => {
  try {
    const [user, friend] = await Promise.all([
      User.findById(req.user._id),
      User.findById(req.body._id)
    ]);

    if (user.friends.find(friend => friend.user === req.body.nick)) {
      return res
        .status(400)
        .send("Error! An invitation has been sent earlier.");
    }

    await Promise.all([
      addFriend(user, friend, true),
      addFriend(friend, user, false)
    ]);

    return res
      .status(200)
      .send(`Success! Added ${friend.nick} to your friends list.`);
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot add to a friends list.");
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const friend = user.friends.find(friend => friend.userID === req.params.id);

    if (friend) {
      if (friend.accepted === true) {
        return res
          .status(400)
          .send("Cannot accept an invitation. It has been already accepted.");
      } else {
        friend.accepted = true;
      }
    }

    await user.save();

    return res.status(200).send(`Success! Invitation has been accepted.`);
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot add to a friends list.");
  }
});

router.delete("/:id", auth, async (req, res) => {
  if (req.params.id.length !== USER_ID_LENGTH) {
    return res.status(400).send("Invalid user ID.");
  }

  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(400).send("Error! Cannot find user.");
    }

    let updatedList = [];
    user.friends.forEach(friend => {
      if (friend.userID !== req.params.id) {
        updatedList.push(friend);
      }
    });

    user.friends = updatedList;
    user.save();

    return res.status(200).send("Success! Your friends list has been updated.");
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Internal server error. Cannot delete friend.");
  }
});

module.exports = router;
