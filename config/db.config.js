const os = require("os");

let db_options = {};
if (process.env.NODE_ENV === "development") {
  db_options = {
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
} else if (process.env.NODE_ENV === "production") {
  // db_options = {
  //   HOST: "easy-does-it-db.internal",
  //   USER: "postgres",
  //   PASSWORD: process.env.DB_PASSWORD,
  //   DB: "easy-does-it-db",
  //   DIALECT: "postgres",
  //   POOL: {
  //     max: parseInt(120 / os.cpus().length),
  //     min: 2,
  //     idle: 10000,
  //     acquire: 20000,
  //   },
  //   PORT: 5432,
  //   RETRY: {
  //     match:
  //       "SequelizeDatabaseError: could not serialize access due to concurrent update",
  //     max: 3,
  //   },
  // };
  db_options = {
    HOST: process.env.PGHOST,
    USER: process.env.PGUSER,
    PASSWORD: process.env.PGPASSWORD,
    DB: process.env.PGDATABASE,
    DIALECT: "postgres",
    PORT: process.env.PGPORT,
  };
}

module.exports = {
  HOST: db_options.LOCALHOST,
  USER: db_options.USER,
  PASSWORD: db_options.PASSWORD,
  DB: db_options.DB,
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
