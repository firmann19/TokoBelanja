const { User, TransactionHistory } = require("../models");

function transactionAuthorization(req, res, next) {
  const authenticatedUser = res.locals.user;
  let transactionId = req.params.transactionId || 0;

  User.findOne({
    where: {
      id: authenticatedUser.id,
    },
  })
    .then((userResult) => {
      if (!userResult) {
        return res.status(403).json({
          message: `access denied`,
        });
      } else {
        TransactionHistory.findOne({
          where: {
            id: transactionId,
          },
        })
          .then((result) => {
            if (!result) {
              return res.status(404).json({
                message: `transaction not found`,
              });
            } else {
              if (userResult.role == 0) {
                return next();
              } else {
                if (result.UserId == authenticatedUser.id) {
                  return next();
                } else {
                  return res.status(403).json({
                    message: `access denied`,
                  });
                }
              }
            }
          })
          .catch((err) => {
            return res.status(500).json(err);
          });
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
}

module.exports = transactionAuthorization;
