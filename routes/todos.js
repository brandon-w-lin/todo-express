const express = require("express");
const router = express.Router();
const TodosController = require("../controllers/todos");
const authJWT = require("../middleware/authJWT");

// INDEX
router.get("/", authJWT, TodosController.index);

// CREATE
router.post("/", authJWT, TodosController.create);

// BATCH UPDATE ORDER
router.patch("/batch/order", authJWT, TodosController.batchUpdateOrder);

// BATCH UPDATE DESC
router.patch(
  "/batch/description",
  authJWT,
  TodosController.batchUpdateDescription
);

// UPDATE;
router.patch("/:id", authJWT, TodosController.update);

// DELETE
router.delete("/:id", authJWT, TodosController.destroy);

module.exports = router;
