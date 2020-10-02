const connection = require("./connection");
const todocontroller = require("./controllers/todocontroller");
const express = require("express");
const bodyparser = require("body-parser");

jsonparser = bodyparser.json({});

app = express();
app.use(jsonparser);
app.use("/", todocontroller);

connection();

app.listen(3000, () => {
    console.log("Listening to port ", 3000);
});
