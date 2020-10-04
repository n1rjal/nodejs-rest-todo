const jwt = require("jsonwebtoken");

const identify = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const [authType, Token] = req.headers.authorization.split(" ");
            const user = jwt.verify(Token, "secretkey");
            req.user = user._id;
        } catch (e) {
            next();
        }
    }
    next();
};

const authorize = (req, res, next) => {
    if (req.headers.authorization) {
        try {
            const [authType, Token] = req.headers.authorization.split(" ");
            console.log(authType);
            const user = jwt.verify(Token, "secretkey");
            req.user = user;
        } catch (e) {
            console.log(e);
            res.status(403).send({ err: "Please login" });
            return;
        }
    } else {
        res.status(403).send({ err: "Please login" });
        return;
    }
    next();
};

module.exports = { identify, authorize };
