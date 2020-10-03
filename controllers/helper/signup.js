const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/usermodel");
const { validationResult, body } = require("express-validator");

const signUp = (req, res, next) => {
    var errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400).send(errors);
    } else {
        bcrypt
            .hash(req.body.password, 10)
            .then((hashedPassword) => {
                console.log(hashedPassword);
                const user = new userModel({
                    username: req.body.username,
                    password: hashedPassword,
                });
                user.save()
                    .then((userInstance) => {
                        res.json({ success: "Please login in now" });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).send({ errors: err });
                    });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ errors: err });
            });
    }
};

module.exports = signUp;
