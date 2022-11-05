const { ValidationError } = require("sequelize");
const { Category, Product } = require("../models");

class CategoryController {
  //create
  static createCategory(req, res) {
    let { type } = req.body;

    Category.create({
      type,
    })
      .then((result) => {
        let response = {
          category: {
            id: result.id,
            type,
            updatedAt: result.updatedAt,
            createdAt: result.createdAt,
            sold_product_amount: result.sold_product_amount,
          },
        };
        return res.status(201).json(response);
      })
      .catch((err) => {
        console.log(err);
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

  //Get
  static getCategory(req, res) {
    Category.findAll({
      include: [
        {
          model: Product,
          attributes: [
            "id",
            "title",
            "price",
            "stock",
            "CategoryId",
            "createdAt",
            "updatedAt",
          ],
        },
      ],
    })
      .then((result) => {
        return res.status(200).json({
          categories: result,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          error: true,
          message: err,
        });
      });
  }

  //Update
  static updateCategory(req, res) {
    let { type } = req.body;

    Category.update(
      {
        type,
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
          category: result[1][0],
        };

        return res.status(200).json({ response });
      })
      .catch((err) => {
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

  //Delete
  static deleteCategory(req, res) {
    Category.destroy({
      where: {
        id: req.params.id,
      },
    }).then((result) => {
      if (result == 0) {
        return res
          .status(404)
          .json({ message: `categori with id(${req.params.id}) is not found` });
      }
      return res
        .status(200)
        .json({ message: "Your category has been successfully deleted" })
        .catch((err) => {
          res.status(500).json(err);
        });
    });
  }
}

module.exports = CategoryController;
