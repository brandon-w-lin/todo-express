const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

// ROUTES

// INDEX
app.get("/todos", async (req, res) => {
  try {
    const todos = await pool.query("SELECT * FROM todo");
    res.json(todos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// SHOW
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

// CREATE
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// UPDATE
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json(updTodo);
  } catch (err) {
    console.error(err.message);
  }
});

// DELETE
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json("todo was destroyed");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
