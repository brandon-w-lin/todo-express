const express = require("express");
const router = express.Router();
const authJWT = require("../middleware/authJWT");
const UsersController = require("../controllers/users");
// INDEX
// Admin only action
router.get("/", UsersController.index);

// SHOW
router.get("/:id", UsersController.show);

// SHOW
router.get("/me", authJWT, UsersController.show);

// CREATE
router.post("/", UsersController.create);

module.exports = router;
