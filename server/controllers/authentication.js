const jwt = require("jwt-simple"),
    User = require("../models/user");

function tokenForUser(user) {
    const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id, iat: timestamp }, "123456");
}

exports.signin = function (req, res, next) {
    res.send({ token: tokenForUser(req.user) });
};

exports.signup = function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        return res.status(422).send({ error: "You must provide email and password" });
    }

    User.findOne({ email: email },
        function (err, existingUser) {
            if (err) {
                return next(err);
            }
            if (existingUser) {
                return res.status(422).send({ error: "email is in use" });
            }
            const user = new User({
                email: email,
                password: password
            });

            user.save(function (err) {
                if (err) {
                    return next(err);
                }
                res.json({ token: tokenForUser(user) });

                return null;
            });
            return null;
        });
};