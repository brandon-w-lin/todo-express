const express = require("express");
const router = express.Router();
const authJWT = require("../middleware/authJWT");
const UsersController = require("../controllers/users.controller");
// INDEX
// Admin only action
router.get("/", UsersController.index);

// SHOW
router.get("/me", authJWT, UsersController.show);

// CREATE
router.post("/", UsersController.create);

// LOGIN
router.post("/login", UsersController.login);

module.exports = router;
