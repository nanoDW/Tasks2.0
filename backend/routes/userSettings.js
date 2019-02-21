const bcrypt = require("bcryptjs");
const { User } = require("../models/schemas");
const { validatePasswordAndEmail } = require("../models/validate");
const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.put("/data", auth, async (req, res) => {
  const { body, user } = req;

  try {
    let message = [];
    const { error } = validatePasswordAndEmail(body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const activeUser = await User.findById(user._id);

    if (body.password) {
      const salt = await bcrypt.genSalt();
      activeUser.password = await bcrypt.hash(activeUser.password, salt);
      message.push("Password has been updated. ");
    }

    if (body.email) {
      activeUser.email = body.email;
      message.push("Email has been updated.");
    }

    return res.status(200).send(message);
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot update user settings.");
  }
});

router.put("/visibility", auth, async (req, res) => {
  const { _id } = req.user;

  try {
    const user = await User.findById(_id);

    user.hidden = !user.hidden;
    user.save();

    return res.status(200).json(user.hidden);
  } catch (e) {
    console.log(e.message);

    return res.status(500).send("Cannot change user status.");
  }
});

router.delete("/", auth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.user._id);

    return res.status(200).send("Account succesfully deleted.");
  } catch (e) {
    console.log(e.message);

    return res
      .status(500)
      .send("Internal server error. Cannot delete your account.");
  }
});

module.exports = router;
