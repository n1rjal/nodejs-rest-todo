const connection = require("./connection");
const todocontroller = require("./controllers/todocontroller");
const usercontroller = require("./controllers/usercontroller");
const express = require("express");
const bodyparser = require("body-parser");
const middleware = require("./middleware");
jsonparser = bodyparser.json({});

connection();

app = express();
app.use(jsonparser);

app.use("/user", usercontroller);
app.use("/", middleware.authorize, todocontroller);

app.listen(3000, () => {
    console.log("Listening to port ", 3000);
});
