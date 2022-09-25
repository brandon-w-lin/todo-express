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
const { Sequelize } = require("sequelize");

//  sequelize = new Sequelize("<database>", "<username>", "<password>", {
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
  logging: null,
  port: config.PORT,
  // pool: config.POOL,
  // retry: config.RETRY,
});

// Test connection
postgresql: sequelize
  .authenticate()
  .then(() => console.log("Database is connected"))
  .catch((error) => console.log("Error: " + error));

module.exports = {
  Sequelize,
  sequelize,
};
