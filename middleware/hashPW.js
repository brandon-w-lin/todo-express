const bcrypt = require("bcrypt");

const hashedPassword = (password) => {
  return new Promise((resolve, reject) => {
    if (password !== password_confirmation) {
      reject("password does not match");
    } else {
      resolve(bcrypt.hash(password, 10));
    }
  });
};

module.exports = hashedPassword;
