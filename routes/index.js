const express = require("express");
const router = express.Router();

// INDEX
router.get("/", (req, res) => {
  res.send("hello");
});

module.exports = router;
