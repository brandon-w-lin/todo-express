require("dotenv").config();
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (authHeader === undefined) {
    return res
      .status(401)
      .send("Unauthorized - missing JSON web token in request.");
  }
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user_id) => {
    if (err) return res.status(403);
    req.user_id = user_id;
    next();
  });
}

module.exports = authenticateToken;
