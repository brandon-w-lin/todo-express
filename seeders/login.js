const { default: axios } = require("axios");

module.exports = (username, password) => {
  return new Promise((res, rej) => {
    console.log(`Attempting sign in ${username}`);
    axios
      .post("http://localhost:3000/login", { username, password })
      .then((response) => {
        res(response.data.accessToken);
      })
      .catch((error) => {
        rej(error);
      });
  });
};
