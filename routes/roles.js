const express = require("express");
const router = express.Router();
const RolesController = require("../controllers/roles");
// INDEX
// Admin only action
// router.get("/", RolesController.index);

// // SHOW
router.get("/:id", RolesController.show);

// // CREATE
// router.post("/", RolesController.create);

module.exports = router;
