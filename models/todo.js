"use strict";

const db = require("../service/db"); // instance of Sequelize
const { DataTypes } = require("sequelize");

// module.exports = function (sequelize, DataTypes) {
//   var Todo = db.define(
//     "Todo",
//     {
//       todo_id: { type: Sequelize.INTEGER },
//       description: { type: Sequelize.TEXT },
//     }
//     {
//       createdAt: "created_at",
//       updatedAt: "updated_at",
//       deletedAt: "deleted_at",
//       paranoid: true,
//       underscored: true,
//       tableName: "creator",
//     }
//   );

//   return Todo;
// };

const Todo = db.define(
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

module.exports = Todo;
