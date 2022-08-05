const bcrypt = require("bcrypt");

module.exports = (username) => {
  return new Promise(async (res, rej) => {
    const pw = await bcrypt.hash("password", 10);
    global.db.User.create({
      username: username,
      email: `${username}@test.com`,
      password: pw,
    })
      .then((user) => {
        console.log("success creating user", user.username);
        // console.log(user);
        res(user);
      })
      .catch((error) => {
        rej(error);
      });
  });
};
