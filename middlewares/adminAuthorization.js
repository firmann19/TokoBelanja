const { User } = require("../models");

function authorization(req, res, next) {
  let authenticatedUser = res.locals.user;

  User.findOne({
    where: {
      id: authenticatedUser.id,
    },
  })

    .then((result) => {
      if (result == null) {
        return res.status(404).json({
          name: "Data Not Found",
          message: "access denied",
        });
      }

      if (result.role == 0) {
        return next();
      } else {
        return res.status(403).json({
          name: "Authorization Error",
          message: "access denied",
        });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

module.exports = authorization;
