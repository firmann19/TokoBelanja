"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TransactionHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsTo(models.Product)
    }
  }
  TransactionHistory.init(
    {
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "ProductId is required",
          },
          notNull: {
            args: true,
            msg: "ProductId is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "UserId is required",
          },
          notNull: {
            args: true,
            msg: "UserId is required",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "quantity is required",
          },
          notNull: {
            args: true,
            msg: "quantity is required",
          },
          isNumeric: {
            value: true,
            msg: "type of quantity must number",
          },
        },
      },
      total_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            args: true,
            msg: "total_price is required",
          },
          notNull: {
            args: true,
            msg: "total_price is required",
          },
          isNumeric: {
            value: true,
            msg: "type of total_price must number",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "TransactionHistory",
    }
  );
  return TransactionHistory;
};
