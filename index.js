const express = require("express");
const app = express();

const db = require("./models"); // I think this is needed to initialize the global.db
const Role = global.db.Role;
app.use(express.json());

// view engine setup
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//// database setup
// For development, use force:true.
// For production, will want to use .sync() without any parameters so as to avoid dropping data

var sequelize_fixtures = require("sequelize-fixtures");

global.db.sequelize.sync({ force: true }).then(async () => {
  console.log("Drop database and resync");

  await sequelize_fixtures.loadFiles(
    ["./seeders/roles.json", "./seeders/users.json", "./seeders/todos.json"],
    global.db
  );
});

// Routers
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const todoRouter = require("./routes/todos");
app.use("/todos", todoRouter);
const userRouter = require("./routes/users");
app.use("/users", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
