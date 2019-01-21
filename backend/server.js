const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const auth = require("./middleware/auth");
const error = require("./middleware/error");
const addUser = require("./routes/addUser");
const getUsers = require("./routes/getUsers");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect(
    "mongodb://nanoDW:unique11password@ds159634.mlab.com:59634/tasks",
    { useNewUrlParser: true }
  )
  .then(() => console.log("Connected to the MongoDB."))
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
app.post("/api/users", addUser);
app.get("/api/users", getUsers);
app.use(error);
app.get("*", function(req, res) {
  res.status(404).send("Error 404. Not found");
});

const port = process.env.PORT || 4500;
app.listen(port, () => {
  console.log(`Working on port ${port}`);
});
