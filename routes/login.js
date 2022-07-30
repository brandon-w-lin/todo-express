const express = require("express");
const router = express.Router();
const authJWT = require("../middleware/authJWT");
const loginController = require("../controllers/login");

router.post("/", loginController.login);

module.exports = router;
