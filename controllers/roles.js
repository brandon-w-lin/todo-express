const User = global.db.User;
const Role = global.db.Role;

// INDEX
const index = async (req, res) => {
  if (req.highest_role < 2) {
    res
      .status(403)
      .send("Unauthorized - you do not have permission to view this resource.");
  } else {
    const roles = await Role.findAll({
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "username"],
          through: { attributes: [] },
        },
      ],
    });
    res.send(roles);
  }
};

// SHOW
const show = async (req, res) => {
  if (req.highest_role < 2) {
    res
      .status(403)
      .send("Unauthorized - you do not have permission to view this resource.");
  } else {
    const role = await Role.findByPk(1, {
      include: [
        {
          model: User,
          as: "users",
          attributes: ["id", "username"],
          through: { attributes: [] },
        },
      ],
    });
    res.send(role);
  }
};

module.exports = { index, show };
