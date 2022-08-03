const express = require("express");
const router = express.Router();
const RolesController = require("../controllers/roles");
const authJWT = require("../middleware/authJWT");

// INDEX
router.get("/", authJWT, RolesController.index);

// // SHOW
router.get("/:id", authJWT, RolesController.show);

// // CREATE
// router.post("/", RolesController.create);

module.exports = router;
