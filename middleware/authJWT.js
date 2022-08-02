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

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user_id) => {
    if (err) return res.status(403);
    req.user_id = user_id;
    req.highest_role = await getHighestRole(user_id);
    next();
  });
}

// Thoughts for refactoring:
// - Perhaps roles may not be "ordered" and therefore there would be no "highest"
// --> then, would not want to return a single role, but rather an array of all roles
// - This method also embeds some business logic into the authorization code
// --> would be better to separate out the logic to some other handler
function getHighestRole(user_id) {
  return new Promise((res, rej) => {
    global.db.User.findByPk(user_id, {
      include: { model: global.db.Role, as: "roles" },
    })
      .then((user) => {
        const highestRole = Math.max(user.roles.map((role) => role.id));
        res(highestRole);
      })
      .catch((err) => {
        rej(error);
      });
  });
}

module.exports = authenticateToken;
