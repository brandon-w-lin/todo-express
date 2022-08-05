const { default: axios } = require("axios");

module.exports = (description, jwt) => {
  const config = {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  };

  return new Promise((res, rej) => {
    axios
      .post("http://localhost:3000/todos", { description: description }, config)
      .then((response) => {
        console.log("created todo: " + response.data.id);
        res();
      })
      .catch((error) => {
        console.log("error creating todo", error);
        rej();
      });
  });
};
