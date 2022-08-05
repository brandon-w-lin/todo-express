const express = require("express");
const router = express.Router();
const Todo_OrderController = require("../controllers/todo_order");
// const authJWT = require("../middleware/authJWT");

// UPDATE
router.patch("/batch", Todo_OrderController.batchUpdate);

module.exports = router;
