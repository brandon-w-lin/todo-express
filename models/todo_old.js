"use strict";

// const db = require("../service/db"); // instance of Sequelize
// const { DataTypes } = require("sequelize");

// const Todo = db.sequelize.define(
//   "todo",
//   {
//     id: { type: DataTypes.INTEGER, primaryKey: true },
//     completed: { type: DataTypes.INTEGER },
//     description: { type: DataTypes.STRING },
//   },
//   {
//     createdAt: "createdat",
//     updatedAt: "updatedat",
//     underscored: true,
//     // tableName: "creator",
//   }
// );

// module.exports = Todo;

module.exports = function (sequelize, DataTypes) {
  var Todo = sequelize.define(
    "todo",
    {
      // id: { type: DataTypes.INTEGER, primaryKey: true },
      completed: { type: DataTypes.INTEGER },
      description: { type: DataTypes.STRING },
    },
    {
      createdAt: "createdat",
      updatedAt: "updatedat",
      underscored: true,
      // tableName: "creator",
    }
  );

  return Todo;
};
