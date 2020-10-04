const { Schema, model } = require("mongoose");

taskSchema = new Schema(
    {
        body: { type: String, required: true },
        user: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    { timestamps: true }
);

taskModel = model("task", taskSchema);

module.exports = taskModel;
