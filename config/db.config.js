const os = require("os");

module.exports = {
  HOST: "localhost",
  USER: "brandon",
  PASSWORD: "",
  DB: "todo_database",
  DIALECT: "postgres",
  POOL: {
    max: parseInt(120 / os.cpus().length),
    min: 2,
    idle: 10000,
    acquire: 20000,
  },
  PORT: 5432,
  RETRY: {
    match:
      "SequelizeDatabaseError: could not serialize access due to concurrent update",
    max: 3,
  },
};
