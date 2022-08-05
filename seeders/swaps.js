const { default: axios } = require("axios");

const swaps = [
  [
    { id: 1, order: 1 },
    { id: 2, order: 2 },
  ],
];

module.exports = (swaps) => {
  // console.log(swaps);
  axios
    .patch("http://localhost:3000/todo_order/batch", swaps)
    .then((resp) => {
      // console.log(resp);
    })
    .catch((error) => {
      // console.log(error.response.data);
    });
};
