const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static register(req, res) {
    const { full_name, email, password, gender, role, balance } = req.body;
    User.create({
      full_name,
      email,
      password,
      gender,
      role,
      balance,
    })
      .then((result) => {
        let response = {
          id: result.id,
          full_name: result.full_name,
          email: result.email,
          gender: result.gender,
          role: result.role,
          balance: result.balance,
        };
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

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
          email: user.email
        };

        const token = generateToken(payload);

        return res.status(200).json({ token });
      })
      .catch((err) => {
        console.log(err)
        return res.status(401).json(err);
      });
  }
}

module.exports = UserController;
