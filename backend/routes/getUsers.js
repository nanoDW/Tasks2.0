const { User } = require("../models/schemas");
const asyncMiddleware = require("../middleware/asyncMiddleware");

module.exports = asyncMiddleware(async (req, res) => {
  const users = await User.find().select("nick _id last hidden");
  if (!users) return res.status(404).send("There are no users");
  const data = [];
  users.map(user => {
    if (!user.hidden) {
      data.push({ _id: user._id, nick: user.nick, last: user.last });
    }
  });
  res.json({ data });
});
