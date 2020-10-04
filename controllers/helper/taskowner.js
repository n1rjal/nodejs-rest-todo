const TaskModel = require("../../models/taskmodel");

const taskOwnerAuth = async (req, res, next) => {
    const task = await TaskModel.findOne({ _id: req.id });
    if (task === null) {
        res.status(404).send({ error: "No task found" });
    }
    if (task.user === req.user) {
        next();
    } else {
        res.status(403).send({ error: "You are not the owner of the task" });
    }
};

module.exports = taskOwnerAuth;
