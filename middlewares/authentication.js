const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");
const user = require("../models/user");

function authentication(req, res, next) {
  try {
    const token = req.get("token");
    const userDecoded = verifyToken(token);

    User.findOne({
      where: {
        id: userDecoded.id,
      },
    })
      .then((result) => {
        if (!result) {
          return res.status(401).json({
            name: "Authentication Error",
            Message: "access denied",
          });
        }
        res.locals.user = result;
        return next();
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  } catch (err) {
    return res.status(500).json(err);
  }
}

module.exports = authentication;
