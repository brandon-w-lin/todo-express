// const User = global.db.User;
const Role = global.db.Role;
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
require("dotenv").config();

// const addRoleToUser = (userId, RoleId) => {
//   User.findOne({ where: { userId: userId } })
//     .then((user) => {
//       console.log(user);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// const index = (req, res) => {
//   User.findAll()
//     .then((users) => {
//       res.status(200).send(users);
//     })
//     .catch((err) => {
//       res.send(err);
//     });
// };

// SHOW
const show = async (req, res) => {
  const role = await Role.findByPk(1, {
    include: [{ model: global.db.User, as: "users" }],
  });
  res.send(role);
};

// // CREATE
// const create = async (req, res) => {
//   const username = req.body.username;
//   const email = req.body.email;
//   const password = req.body.password;
//   const password_confirmation = req.body.password_confirmation;
//   if (password !== password_confirmation) {
//     // this should be validated on the front end before sending request, but validating here as well.
//     res
//       .status(400)
//       .send("Error: password and password_confirmation do not match.");
//   } else {
//     try {
//       const hashedPassword = await bcrypt.hash(req.body.password, 10);
//       User.create({
//         username: username,
//         email: email,
//         password: hashedPassword,
//       })
//         .then((response) => {
//           res.status(201).send(response);
//         })
//         .catch((err) => {
//           res.send(err);
//         });
//     } catch {
//       res.status(500);
//     }
//   }
// };

module.exports = { show };
