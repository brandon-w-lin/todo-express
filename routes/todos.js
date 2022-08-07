const express = require("express");
const router = express.Router();
const TodosController = require("../controllers/todos");
const authJWT = require("../middleware/authJWT");

// INDEX
router.get("/", authJWT, TodosController.index);

// CREATE
router.post("/", authJWT, TodosController.create);

// BATCH UPDATE
router.patch("/batch", authJWT, TodosController.batchUpdate);

// UPDATE
router.patch("/:id", authJWT, TodosController.update);

// DELETE
router.delete("/:id", authJWT, TodosController.destroy);

module.exports = router;
