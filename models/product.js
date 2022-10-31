"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "title is required",
          },
          notNull: {
            args: true,
            msg: "title is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "price is required",
          },
          notNull: {
            args: true,
            msg: "price is required",
          },
          isNumeric: {
            value: true,
            msg: "type of price must number",
          },
          min: {
            args: [0],
            msg: "min value peice is 0",
          },
          max: {
            args: [50000000],
            msg: "max value price is 50000000",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "stock is required",
          },
          notNull: {
            args: true,
            msg: "stock is required",
          },
          isNumeric: {
            value: true,
            msg: "type of stock must number",
          },
          min: {
            args: [0],
            msg: "min value stock is 0",
          },
        },
      },
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "CategoryId is required",
          },
          notNull: {
            args: true,
            msg: "CategoryId is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
