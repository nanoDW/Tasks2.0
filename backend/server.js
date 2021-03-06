const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const users = require("./routes/users");
const friends = require("./routes/friends");
const userSettings = require("./routes/userSettings");
const userInfo = require("./routes/userInfo");
const admin = require("./routes/admin");
const tasks = require("./routes/tasks");
const sentTasks = require("./routes/sentTasks");
const messages = require("./routes/messages");
const error = require("./middleware/error");
const auth = require("./routes/auth");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

const db = config.get("db");
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log(`Connected to the MongoDB: ${db}.`))
  .catch(err =>
    console.log("Connection error. Cannot connect to the MongoDB", err.message)
  );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, xAuthToken"
  );
  res.header("Access-Control-Expose-Headers", "xAuthToken");
  next();
});

app.get("/", (req, res, next) => {
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/data", userInfo);
app.use("/api/friends", friends);
app.use("/api/me", userSettings);
app.use("/api/tasks", tasks);
app.use("/api/sent", sentTasks);
app.use("/api/messages", messages);
app.use("/api/admin", admin);
app.use(error);
app.get("*", function(req, res) {
  res.status(404).send("Error 404. Not found");
});

const port = process.env.PORT || 4500;
const server = app.listen(port, () => {
  console.log(`Working on port ${port}`);
});

module.exports = server;
