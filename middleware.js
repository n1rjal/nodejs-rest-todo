const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const [authType, Token] = req.headers.authorization.split(" ");
            const user = jwt.verify(Token, "secretkey");
            req.user = user;
        } catch (e) {
            res.status(403).send({ err: "Please login" });
            return;
        }
    } else {
        res.status(403).send({ err: "Please login" });
    }
    next();
};

module.exports = { authorize };
