const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "http://localhost:8080" }));
const db = require("./models");

// view engine setup
// const path = require("path");
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

//// database setup
// For development, use force:true.
// For production, will want to use .sync() without any parameters so as to avoid dropping data

// global.db.sequelize.sync();
const bcrypt = require("bcrypt");
const helper = require("./helpers/addRoleToUser");
global.db.sequelize.sync({ force: true }).then(async () => {
  console.log("Drop database and resync");

  var sequelize_fixtures = require("sequelize-fixtures");
  await sequelize_fixtures.loadFile("./seeders/roles.json", global.db);
  const pw1 = await bcrypt.hash("password", 10);
  await global.db.User.create({
    username: "brandon",
    email: "brandon@test.com",
    password: pw1,
  });
  const pw2 = await bcrypt.hash("password", 10);
  await global.db.User.create({
    username: "lotte",
    email: "lotte@test.com",
    password: pw2,
  });
  const pw3 = await bcrypt.hash("password", 10);
  await global.db.User.create({
    username: "archer",
    email: "archer@test.com",
    password: pw3,
  });
  await helper.addRoleToUser(1, 1);
  await helper.addRoleToUser(2, 1);
  await helper.addRoleToUser(3, 1);

  // global.db.User.findByPk(1, {
  //   include: [{ model: global.db.Role, as: "roles" }],
  // }).then((user) => console.log(user));

  await sequelize_fixtures.loadFile("./seeders/todos.json", global.db);
});

// global.db.Role.findByPk(1, {
//   include: [{ model: global.db.User, as: "users" }],
// }).then((role) => console.log(role));

// Routers
// const indexRouter = require("./routes/index");
// app.use("/", indexRouter);
const todoRouter = require("./routes/todos");
app.use("/todos", todoRouter);
const userRouter = require("./routes/users");
app.use("/users", userRouter);
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);
const roleRouter = require("./routes/roles");
app.use("/roles", roleRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
