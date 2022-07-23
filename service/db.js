// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "brandon",
//   password: "",
//   database: "todo_database",
//   host: "localhost",
//   port: 5432,
// });

// module.exports = pool;

const os = require("os");

const Sequelize = require("sequelize");

//  sequelize = new Sequelize("<database>", "<username>", "<password>", {
const sequelize = new Sequelize("todo_database", "brandon", "", {
  host: "localhost",
  dialect: "postgres",
  logging: null,
  port: 5432,
  pool: {
    max: parseInt(120 / os.cpus().length),
    min: 2,
    idle: 10000,
    acquire: 20000,
  },
  retry: {
    match:
      "SequelizeDatabaseError: could not serialize access due to concurrent update",
    max: 3,
  },
});

// Test connection
sequelize
  .authenticate()
  .then(() => console.log("Database is connected"))
  .catch((error) => console.log("Error: " + error));

module.exports = {
  Sequelize,
  sequelize,
};
