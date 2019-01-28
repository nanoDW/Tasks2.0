module.exports = function addFriend(activeUser, user) {
  activeUser.friends.push({
    user: user.nick,
    userID: user._id,
    accepted: false
  });

  return user.save();
};
