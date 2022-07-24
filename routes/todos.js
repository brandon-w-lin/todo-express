const express = require("express");
const router = express.Router();
const db = require("../service/db");
const Todo = require("../models/todo");

// INDEX
router.get("/", (req, res) => {
  // res.send("hello");
  Todo.findAll()
    .then((todos) => {
      console.log("received todos");

      res.status(200).send(todos);
    })
    .catch((err) => {
      console.log("error");
      res.send(err);
    });
});

// CREATE
router.post("/", (req, res) => {
  const description = req.body.description;
  Todo.create({ completed: 0, description: description })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.log("Error when creating new todo");
      res.send(err);
    });
});

// const pool = require("../service/db");

// // INDEX
// router.get("/", async (req, res) => {
//   try {
//     const todos = await pool.query("SELECT * FROM todo");
//     res.json(todos.rows);
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// // SHOW
// router.get("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
//       id,
//     ]);
//     if (todo.rows.length === 0) {
//       res.status(404).send("No todo with that ID found");
//     } else {
//       res.json(todo.rows);
//     }
//   } catch (err) {
//     console.log(err.message);
//   }
// });

// // CREATE
// router.post("/", async (req, res) => {
//   try {
//     const { description } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO todo (description) VALUES ($1) RETURNING *",
//       [description]
//     );
//     res.json(newTodo.rows[0]);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // UPDATE
// router.put("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { description } = req.body;

//     const updTodo = await pool.query(
//       "UPDATE todo SET description = $1 WHERE todo_id = $2",
//       [description, id]
//     );
//     res.json(updTodo);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

// // DELETE
// router.delete("/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const updTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
//       id,
//     ]);
//     res.json("todo was destroyed");
//   } catch (err) {
//     console.error(err.message);
//   }
// });

module.exports = router;
