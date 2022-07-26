const express = require("express");
const router = express.Router();
const User = global.db.User;

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
router.post("/", (req, res) => {
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
    User.create({ username: username, email: email, password: password })
      .then((response) => {
        res.status(201).send(response);
      })
      .catch((err) => {
        res.send(err);
      });
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
