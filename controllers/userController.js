const { ValidationError } = require("sequelize");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  //Register
  static register(req, res) {
    let { full_name, email, password, gender } = req.body;
    User.create({
      full_name,
      email,
      password,
      gender,
    })
      .then((result) => {
        let response = {
          user: {
            id: result.id,
            full_name,
            email,
            gender,
            balance: result.balance,
            createdAt: result.createdAt,
          },
        };
        res.status(201).json(response);
      })
      .catch((err) => {
        console.log(err)
        if (err instanceof ValidationError == false) {
          res.status(500).json({
            error: true,
            message: err,
          });
        } else {
          const messages = [];
          err.errors.forEach((error) => {
            messages.push({
              key: error.path,
              msg: error.message,
            });
          });
          return res.status(400).json({
            message: messages,
          });
        }
      });
  }

  //Login
  static login(req, res) {
    const { email, password } = req.body;
    User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (!user) {
          throw {
            name: "User login Error",
            devMessage: `User with email "${email}" not found`,
          };
        }
        const isCorrect = comparePassword(password, user.password);
        if (!isCorrect) {
          throw {
            name: "User Login Error",
            devMessage: `User's password with email "${email}" does not match`,
          };
        }
        let payload = {
          id: user.id,
          email: user.email,
          role: user.role,
        };

        const token = generateToken(payload);

        return res.status(200).json({ token });
      })
      .catch((err) => {
        if (err.code == 401) {
          return res.status(err.code).json({ message: err.message });
        } else {
          return res.status(500).json(err);
        }
      });
  }

  //Update
  static update(req, res) {
    const { email, full_name } = req.body;

    User.update(
      {
        full_name,
        email,
      },
      {
        where: {
          id: req.params.id,
        },
        returning: true,
      }
    )
      .then((result) => {
        let response = {
          user: {
            id: result[1][0]["id"],
            full_name: result[1][0]["full_name"],
            email: result[1][0]["email"],
            createdAt: result[1][0]["createdAt"],
            updatedAt: result[1][0]["updatedAt"],
          },
        };
        return res.status(200).json(response);
      })
      .catch((err) => {
        if (err instanceof ValidationError == false) {
          res.status(500).json({
            error: true,
            message: err,
          });
        } else {
          const message = [];
          err.errors.forEach((error) => {
            return message.push({
              key: error.path,
              msg: error.message,
            });
          });
          return res.status(400).json({ message: message });
        }
      });
  }

  //Delete
  static delete(req, res) {
    User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((result) => {
        return res
          .status(200)
          .json({ message: "Your account has been successfully deleted" });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }

  //TopUp
  static topup(req, res) {
    const userData = res.locals.user;
    let { balance } = req.body;

    User.findOne({
      where: { id: userData.id },
    })

      .then((result) => {
        let newBalance = parseInt(result.balance)+parseInt(balance);

        User.update(
          {
            balance: newBalance,
          },
          {
            where: {
              id: userData.id,
            },
            returning: true,
          }
        )
          .then((result) => {
            return res.status(200).json({
              message: `Your balance has been successfully updated to Rp ${result[1][0].balance}`,
            });
          })
          .catch((err) => {
            console.log(err)
            if (err instanceof ValidationError == false) {
              res.status(500).json({
                error: true,
                message: err,
              });
            } else {
              const message = [];
              err.errors.forEach((error) => {
                return message.push({
                  key: error.path,
                  msg: error.message,
                });
              });
              return res.status(400).json({ message: message });
            }
          });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
}

module.exports = UserController;
