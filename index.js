const express = require("express");
const app = express();
// const pool = require("./service/db");

app.use(express.json());

const indexRouter = require("./routes/index");
app.use("/", indexRouter);
const todoRouter = require("./routes/todos");
app.use("/todos", todoRouter);

// app.get("/todos", async (req, res) => {
//   // console.log("arrived at todos index" + res);
//   try {
//     const todos = await pool.query("SELECT * FROM todo");
//     res.json(todos.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
