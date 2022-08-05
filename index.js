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

const config = {
  headers: {
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiJ9.MQ.F0BNFoIruX9-qETBu_qG_JJpxUVco4uSIBLM29_Myj4",
  },
};

const bcrypt = require("bcrypt");
const junctions = require("./helpers/junctions");
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
  await junctions.addRoleToUser(1, 2);
  await junctions.addRoleToUser(2, 1);
  await junctions.addRoleToUser(3, 1);

  // await sequelize_fixtures.loadFile("./seeders/todos.json", global.db);
  const todo_seeds = require("./seeders/todos");
  todo_seeds(config);
});

// Routers

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
