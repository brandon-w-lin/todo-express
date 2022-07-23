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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
