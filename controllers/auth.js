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

module.exports = { login };
