module.exports = function addFriend(activeUser, user, status) {
  activeUser.friends.push({
    user: user.nick,
    userID: user._id,
    accepted: status
  });

  return user.save();
};
