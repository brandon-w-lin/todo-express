"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo_Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Todo_Order.init(
    {
      // todo_id: DataTypes.INTEGER,
      order: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "todo_order",
    }
  );
  return Todo_Order;
};
