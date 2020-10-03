const { Router } = require("express");
const { validationResult, body } = require("express-validator");
const signUp = require("./helper/signup");
const signIn = require("./helper/signin");
const userModel = require("../models/usermodel");

router = Router();

router.post(
    "/create",
    [
        body("username")
            .isLength({ min: 1 })
            .custom(async (value, { req }) => {
                var user = await userModel.find({
                    username: req.body.username,
                });
                if (user.length) {
                    throw new Error(
                        "User with name " + req.body.username + " exists "
                    );
                } else {
                    return true;
                }
            }),
        body("password").isLength({ min: 1 }),
    ],
    signUp
);

router.post(
    "/signin",
    [
        body("username").isLength({ min: 1 }),
        body("password").isLength({ min: 1 }),
    ],
    signIn
);

module.exports = router;
