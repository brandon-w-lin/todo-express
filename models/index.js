"use strict";

if (!global.hasOwnProperty("db")) {
  let { Sequelize, sequelize } = require("../service/db");

  global.db = {
    Sequelize: Sequelize,
    sequelize: sequelize,
    // Creator: require(__dirname + "/creator")(sequelize, Sequelize.DataTypes),
    // Install: require(__dirname + "/install")(sequelize, Sequelize.DataTypes),
    User: require(__dirname + "/user.model")(sequelize, Sequelize.DataTypes),
    Role: require(__dirname + "/role.model")(sequelize, Sequelize.DataTypes),
    Todo: require(__dirname + "/todo.model")(sequelize, Sequelize.DataTypes),

    /*
     *
     * TODO add any additional models here.
     *
     */
  };

  // global.db.Creator.hasMany(global.db.Install, {
  //   onDelete: "cascade",
  //   foreignKey: "creator_id",
  // });

  // global.db.Install.belongsTo(global.db.Campaign, {
  //     onDelete: 'cascade',
  //     foreignKey: 'campaign_id',
  // });

  /*
   *
   * TODO add any additional relationships between models here.
   *
   */

  global.db.Role.belongsToMany(global.db.User, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId",
  });
  global.db.User.belongsToMany(global.db.Role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId",
  });

  global.db.ROLES = ["user", "admin", "moderator"];
}
