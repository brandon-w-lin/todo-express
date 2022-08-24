const { default: axios } = require("axios");
const Todo = global.db.Todo;

module.exports = (params, jwt) => {
  const config = {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  };
  console.log(params);
  return new Promise((res, rej) => {
    axios
      .post(
        "http://localhost:3000/todos",
        { description: params.description, todoid: params.todo_id },
        config
      )
      .then(async (response) => {
        // if (params.parent_id != undefined) {
        //   // Find parent -> place in parent
        //   const parent = await Todo.findByPk(params.parent_id);
        //   let newTodos;
        //   if (parent.todos) {
        //     newTodos = parent.todos.concat(response.data.id);
        //   } else {
        //     newTodos = [response.data.id];
        //   }
        //   await parent.set({
        //     todos: newTodos,
        //   });
        //   parent.save().catch((err) => {
        //     console.log(err);
        //   });
        //   console.log(parent.dataValues);
        // }

        console.log("created todo: " + response.data.id);
        res(response.data);
      })
      .catch((error) => {
        console.log("error creating todo", error);
        rej(error);
      });
  });
};
