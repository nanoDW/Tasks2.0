const { verify } = require("jsonwebtoken");
const config = require("config");

module.exports = function authMod(req, res, next) {
  const token = req.header("xAuthToken");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;

    if (req.user.role !== admin && req.user.role !== mod) {
      return res
        .status(403)
        .send("Access denied. You have no permisssion to do this action.");
    }

    next();
  } catch (ex) {
    return res.status(400).send("Access denied. Invalid token");
  }
};
