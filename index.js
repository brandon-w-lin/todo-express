const express = require("express");
const app = express();

// view engine setup
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json());

// Routers
const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const todoRouter = require("./routes/todos");
app.use("/todos", todoRouter);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
