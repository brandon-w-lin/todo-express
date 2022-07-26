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
global.db.sequelize.sync();
// global.db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync Db");
//   initial();
// });

function initial() {
  Role.create({
    id: 1,
    name: "user",
  });

  Role.create({
    id: 2,
    name: "moderator",
  });

  Role.create({
    id: 3,
    name: "admin",
  });
}

// Routers
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const todoRouter = require("./routes/todos.routes");
app.use("/todos", todoRouter);
const userRouter = require("./routes/users.routes");
app.use("/users", userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
