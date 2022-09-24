const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: ["*", "http://localhost:8080", "https://easy-does-it.netlify.app"],
  })
);
const db = require("./models"); // Initializes models, needed but not used

// view engine setup
// const path = require("path");
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "jade");

//// database setup
// For development, use force:true.
// For production, will want to use .sync() without any parameters so as to avoid dropping data

// global.db.sequelize.sync();
// const seed = require("./seeders/seeds");
// seed.seed();

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
  console.log("current environment:", process.env.NODE_ENV);
});
