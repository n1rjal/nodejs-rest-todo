const mongoose = require("mongoose");

module.exports = () => {
    mongoose
        .connect("mongodb://localhost/api", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(console.log("Connected to localhost Database"))
        .catch((err) => {
            console.log("Connection Error");
            console.log(err);
        });
};
