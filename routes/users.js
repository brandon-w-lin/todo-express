const express = require("express");
const router = express.Router();
const authJWT = require("../middleware/authJWT");
const UsersController = require("../controllers/users");

// INDEX
router.get("/", authJWT, UsersController.index);

// SELF
router.get("/me", authJWT, UsersController.self);

// SHOW
router.get("/:id", authJWT, UsersController.show);

// CREATE
router.post("/", UsersController.create);

// UPDATE
router.patch("/me", authJWT, UsersController.update);

module.exports = router;
