const User = global.db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const Role = global.db.Role;
const helper = require("../helpers/junctions");
require("dotenv").config();

const index = (req, res) => {
  if (req.highest_role < 2) {
    res
      .status(403)
      .send("Unauthorized - you do not have permission to view this resource.");
  } else {
    User.findAll({
      attributes: ["username", "email"],
      include: [
        {
          model: global.db.Role,
          as: "roles",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    })
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        res.send(err);
      });
  }
};

// SELF
const self = async (req, res) => {
  const user = await User.findByPk(req.user_id, {
    attributes: ["username", "email"],
    include: [
      {
        model: global.db.Role,
        as: "roles",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    ],
  });

  res.send(user);
};

// SHOW
// Want to be able to show different stuff based on admin privelege.
const show = async (req, res) => {
  // console.log(req.user);
  if (req.highest_role < 2) {
    res
      .status(403)
      .send("Unauthorized - you do not have permission to view this resource.");
  } else {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: global.db.Role,
          as: "roles",
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send("User not found");
    }
  }
};

// CREATE
const create = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password_confirmation = req.body.password_confirmation;
  if (password !== password_confirmation) {
    // this should be validated on the front end before sending request, but validating here as well.
    res
      .status(400)
      .send("Error: password and password_confirmation do not match.");
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      User.create({
        username: username,
        email: email,
        password: hashedPassword,
      })
        .then((response) => {
          helper.addRoleToUser(response.id, 1); // sets default role to user
          res.status(201).send(response);
        })
        .catch((err) => {
          res.send(err);
        });
    } catch {
      res.status(500);
    }
  }
};

// UPDATE

// Would like to refactor this to be flexible to future changes in user attributes, e.g. more than just username / email
const update = async (req, res) => {
  const user = await User.findByPk(req.user_id);

  if (req.body.password) {
    if (req.body.password !== req.body.password_confirmation) {
      res
        .status(400)
        .send("Error: password and password_confirmation do not match.");
    } else if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(400).send("Password has been used before.");
    } else {
      // Update password
      console.log("got to where I wanted");
      try {
        oldPassword = user.password;
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.set({ password: hashedPassword });
        user
          .save()
          .then(res.status(200).send(`Password was updated.`))
          .catch((err) => {
            res.status(500).send(err);
          });
      } catch {
        res.status(500);
      }
    }
  }

  // if (req.body.username || req.body.email) {}
};

module.exports = { index, show, self, create, update };
