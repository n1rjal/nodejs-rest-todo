const connection = require("./connection");
const todocontroller = require("./controllers/todocontroller");
const usercontroller = require("./controllers/usercontroller");
const express = require("express");
const bodyparser = require("body-parser");

jsonparser = bodyparser.json({});

//connecting to the db
connection();

app = express();
app.use(jsonparser);
app.use("/", todocontroller);
app.use("/user", usercontroller);

app.listen(3000, () => {
    console.log("Listening to port ", 3000);
});
