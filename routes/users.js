const express = require("express");
const router = express.Router();
const authJWT = require("../middleware/authJWT");
const UsersController = require("../controllers/users");
// INDEX
// Admin only action
router.get("/", authJWT, UsersController.index);

// SELF
router.get("/me", authJWT, UsersController.self);

// SHOW
router.get("/:id", UsersController.show);

// CREATE
router.post("/", UsersController.create);

module.exports = router;
