const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const userModel = new model("user", userSchema);

module.exports = userModel;
