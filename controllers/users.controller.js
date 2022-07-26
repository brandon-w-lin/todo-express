const User = global.db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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
  const me = await User.findOne({ where: { username: req.user } });
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

// LOGIN
const login = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user === null) {
    res.status(404).send("User not found");
  } else if (req.body.password) {
    try {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        console.log("login successful");
        const accessToken = jwt.sign(
          user.username,
          process.env.ACCESS_TOKEN_SECRET
        );
        res.json({ accessToken: accessToken });
        // res.send("success");
      } else {
        res.status(400).send("Password was incorrect");
      }
    } catch (err) {
      console.log("there was an error");
      res.status(500).send(err);
    }
  } else {
    res.status(400).send("User did not provide password");
  }
};

module.exports = { index, show, create, login };
