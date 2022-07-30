"use strict";

if (!global.hasOwnProperty("db")) {
  let { Sequelize, sequelize } = require("../service/db");

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    // Creator: require(__dirname + "/creator")(sequelize, Sequelize.DataTypes),
    // Install: require(__dirname + "/install")(sequelize, Sequelize.DataTypes),
    User: require(__dirname + "/user")(sequelize, Sequelize.DataTypes),
    Role: require(__dirname + "/role")(sequelize, Sequelize.DataTypes),
    Todo: require(__dirname + "/todo")(sequelize, Sequelize.DataTypes),

    /*
     *
     * MODEL DECLARATIONS
     *
     */
  };

  /*
   *
   * MODEL RELATIONSHIPS
   *
   */

  global.db.Role.belongsToMany(global.db.User, {
    through: "user_roles",
    foreignKey: "role_id",
    otherKey: "user_id",
  });
  global.db.User.belongsToMany(global.db.Role, {
    through: "user_roles",
    foreignKey: "user_id",
    otherKey: "role_id",
  });

  global.db.User.hasMany(global.db.Todo);
  global.db.Todo.belongsTo(global.db.User);
}
