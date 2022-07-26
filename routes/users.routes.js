const express = require("express");
const router = express.Router();
const User = global.db.User;
const bcrypt = require("bcrypt");

// INDEX
// Admin only action
router.get("/", (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.send(err);
    });
});

// CREATE
router.post("/", async (req, res) => {
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
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (user === null) {
    res.status(404).send("User not found");
  } else if (req.body.password) {
    try {
      const match = await bcrypt.compare(req.body.password, user.password);
      if (match) {
        res.send("success");
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
});

// // UPDATE
// router.patch("/:id", async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     const { completed, description } = req.body;
//     user.set({
//       completed: completed === 0 ? completed : completed || user.completed,
//       description: description || user.description,
//     });
//     await user.save();
//     console.log("update success");
//     res.send(user);
//   } catch (err) {
//     console.log("update fail");
//     res.send(err);
//   }
// });

// // DELETE
// router.delete("/:id", async (req, res) => {
//   try {
//     const user = await User.findByPk(req.params.id);
//     await user.destroy();
//     res.status(200).send("Destroyed successfully");
//     // redirect?
//   } catch (err) {
//     res.send(err);
//   }
// });

module.exports = router;
