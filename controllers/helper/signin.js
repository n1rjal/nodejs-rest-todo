const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/usermodel");
const { validationResult, body } = require("express-validator");

const signIn = async (req, res, next) => {
    console.log(req.body);
    var errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors);
    } else {
        var user = await userModel.find({ username: req.body.username });
        console.log(user);
        bcrypt
            .compare(req.body.password, user.password)
            .then((result) => {
                if (result) {
                    const token = jwt.sign(
                        {
                            username: user.username,
                            password: user.password,
                        },
                        "secretkey"
                    );
                    res.send({
                        success: "loggedin",
                        token: token,
                        user: user,
                    });
                } else {
                    res.status(400).send({
                        error: "Password doesnot match",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                res.status(500).send({ error: err });
            });
    }
};

module.exports = signIn;
