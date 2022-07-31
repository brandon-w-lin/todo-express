const express = require("express");
const app = express();

const db = require("./models"); // I think this is needed to initialize the global.db
const Role = global.db.Role;
app.use(express.json());

// view engine setup
const path = require("path");
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

//// database setup
// For development, use force:true.
// For production, will want to use .sync() without any parameters so as to avoid dropping data

var sequelize_fixtures = require("sequelize-fixtures");

const newUser = require("./controllers/users");

const bcrypt = require("bcrypt");
const axios = require("axios");

global.db.sequelize.sync();
// global.db.sequelize.sync({ force: true }).then(async () => {
//   console.log("Drop database and resync");

//   await sequelize_fixtures.loadFile("./seeders/roles.json", global.db);
//   const pw1 = await bcrypt.hash("password", 10);
//   global.db.User.create({
//     username: "brandon",
//     email: "brandon@test.com",
//     password: pw1,
//     roles: [{ name: "admin" }],
//   });
//   const pw2 = await bcrypt.hash("password", 10);
//   global.db.User.create({
//     username: "lotte",
//     email: "lotte@test.com",
//     password: pw2,
//   });
//   const pw3 = await bcrypt.hash("password", 10);
//   global.db.User.create({
//     username: "archer",
//     email: "archer@test.com",
//     password: pw3,
//   });
//   await sequelize_fixtures.loadFile("./seeders/todos.json", global.db);

//   const my_jwt = await axios
//     .post("http://localhost:3000/login", {
//       username: "brandon",
//       password: "password",
//     })
//     .then((response) => {
//       global.my_jwt = response.data.accessToken;
//     });
// });

// Routers
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const todoRouter = require("./routes/todos");
app.use("/todos", todoRouter);
const userRouter = require("./routes/users");
app.use("/users", userRouter);
const loginRouter = require("./routes/login");
app.use("/login", loginRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
