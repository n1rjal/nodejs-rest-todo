const mongoose = require("mongoose");
const express = require("express");
const taskModel = require("../models/taskmodel");
router = express();

router.get("/help", (req, res) => {
    res.send({
        "/create": "to create todo ",
        "/:id/delete": "to delete todo",
        "/:id/edit": "to edit todo",
        "/": "get list of all todos",
    });
});

router.get("/", async (req, res) => {
    var tasks = await taskModel.find();
    res.send(tasks);
});

router
    .get("/:id", async (req, res) => {
        await taskModel
            .findById(req.params.id)
            .then((task) => {
                task !== null
                    ? res.send(task)
                    : res.status(404).send("404 not found");
            })
            .catch((err) => res.send({ err: "404 not found", err }));
    })
    .delete("/:id", async (req, res) => {
        await taskModel
            .findByIdAndDelete(req.params.id)
            .then((ress) => {
                console.log(ress);
                res.send({ success: "Deleted" });
            })
            .catch((err) => {
                res.status(500).send({ err, error: "Error Occured" });
            });
    });

router.post("/create", async (req, res) => {
    var task = new taskModel(req.body);
    task.save((err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

router.post("/:id/update", async (req, res) => {
    await taskModel
        .findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((task) => res.send(task))
        .catch((err) => res.status(404).send({ err: "404 not found" }));
});

module.exports = router;
