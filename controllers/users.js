const User = global.db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const Role = global.db.Role;
const helper = require("../helpers/addRoleToUser");
require("dotenv").config();

const index = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.send(err);
    });
};

// SELF
const show = async (req, res) => {
  const me = await User.findOne({
    where: { id: req.user_id },
  });
  const userInfo = {
    username: me.username,
    email: me.email,
  };
  res.send(userInfo);
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

module.exports = { index, show, create };
