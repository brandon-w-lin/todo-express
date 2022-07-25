// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "brandon",
//   password: "",
//   database: "todo_database",
//   host: "localhost",
//   port: 5432,
// });

// module.exports = pool;

const config = require("../config/db.config");

const { Sequelize, DataTypes } = require("sequelize");

//  sequelize = new Sequelize("<database>", "<username>", "<password>", {
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  logging: null,
  port: config.PORT,
  pool: config.POOL,
  retry: config.RETRY,
});

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("Database is connected"))
  .catch((error) => console.log("Error: " + error));

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// For authentication
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
});

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
