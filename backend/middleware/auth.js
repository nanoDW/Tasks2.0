const { verify } = require("jsonwebtoken");
const config = require("config");

module.exports = function auth(req, res, next) {
  const token = req.header("xAuthToken");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = verify(token, config.get("jwtPrivateKey"));
    req.user = decoded;
    next();
  } catch (ex) {
    return res.status(400).send("Invalid token");
  }
};
