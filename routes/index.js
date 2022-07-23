const express = require("express");
const router = express.Router();

// INDEX
router.get("/", function (req, res, next) {
  res.render("todos", { title: "Express" });
});

module.exports = router;
