const { User } = require("../models/schemas");
const asyncMiddleware = require("../middleware/asyncMiddleware");

module.exports = asyncMiddleware(async (req, res) => {
  const users = await User.find().select("-password");
  if (!users) return res.status(404).send("There are no users");
  res.json({ users });
});
