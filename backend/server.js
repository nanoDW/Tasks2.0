const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const users = require("./routes/users");
const error = require("./middleware/error");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

const db = config.get("db");
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log(`Connected to the MongoDB: ${db}.`))
  .catch(err =>
    console.log("Connection error. Cannot connect to the MongoDB", err.message)
  );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Expose-Headers", "x-auth-token");
  next();
});

app.get("/", (req, res, next) => {
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", users);
app.use(error);
app.get("*", function(req, res) {
  res.status(404).send("Error 404. Not found");
});

const port = process.env.PORT || 4500;
const server = app.listen(port, () => {
  console.log(`Working on port ${port}`);
});

module.exports = server;
