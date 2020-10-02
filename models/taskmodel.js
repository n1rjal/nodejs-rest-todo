const mongoose = require("mongoose");

taskSchema = mongoose.Schema(
    {
        body: { required: true, type: String },
    },
    { timestamps: true }
);

taskModel = mongoose.model("Task", taskSchema);

module.exports = taskModel;
