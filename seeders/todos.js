const { default: axios } = require("axios");

const todos = [
  {
    completed: "0",
    description: "Build a new app",
    userId: "1",
  },
  {
    completed: "0",
    description: "Build a portfolio page",
    userId: "1",
  },
  {
    completed: "0",
    description: "Graduate from school",
    userId: "2",
  },
  {
    completed: "0",
    description: "Apply for jobs",
    userId: "2",
  },
  {
    completed: "0",
    description: "Woof woof",
    userId: "3",
  },
  {
    completed: "0",
    description: "Bark bark",
    userId: "3",
  },
];

module.exports = (config) => {
  todos.forEach((todo) => {
    axios.post("http://localhost:3000/todos", todo, config);
  });
};
