const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const auth = require('./middleware/auth');
const error = require('./middleware/error');
const addUser = require("./routes/addUser");
const getUsers = require('./routes/getUsers');

const app = express();

if (!config.get("jwtPrivateKey")) {
    console.log("FATAL ERROR: jwtPrivateKey is not defined");
    process.exit(1);
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept",
    );
    res.header("Access-Control-Expose-Headers", "xAuthToken")
    next();
});

app.get('/', (req, res, next) => {
    next();
});

app.use(express.json);
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src"));
app.use("/api/users", addUser);
app.use("/api/users", getUsers);

app.use(error);
app.get('*', function (req, res) {
    res.send('Error 404. Not found');
});

const port = process.env.PORT || 4500;
app.listen(port, () => {
    console.log(`Working on port ${port}`);
});