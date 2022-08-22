const Todo = global.db.Todo;
const Todo_Order = global.db.Todo_Order;
const { Op } = require("sequelize");

const index = async (req, res) => {
  Todo.findAll({
    where: { userId: req.user_id, completed: { [Op.ne]: -1 } },
    // include: {
    //   model: Todo_Order,
    //   attributes: ["order"],
    // },
  })
    .then((todos) => {
      res.status(200).send(todos);
    })
    .catch((err) => {
      res.send(err);
    });
};

const create = (req, res) => {
  const description = req.body.description;
  Todo.create({ completed: 0, description: description, userId: req.user_id })
    .then((todo) => {
      // global.db.Todo_Order.create({ todo_id: todo.id, order: todo.id });

      // Set default order equal to the id number
      todo.set({ order: todo.id || 0 });
      todo.save();
      res.status(200).send(todo);
    })
    .catch((err) => {
      res.send(err);
    });
};

const update = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id); // This looks up by the key, without filtering on completed status. This allows for deleted todos to be brought back.
    if (todo === null) return res.status(404).send("Resource not found.");
    if (Number(req.user_id) !== todo.userId) {
      return res
        .status(403)
        .send(
          "Forbidden - atempting to make changes to resource without proper authorization."
        );
    }

    const completed = req.body.completed;
    const description = req.body.description;
    await todo.set({
      completed: completed === 0 ? completed : completed || todo.completed,
      description: description || todo.description,
    });
    todo
      .save()
      .then(res.status(200).send(todo))
      .catch((err) => {
        console.log(err);
      });
  } catch (err) {
    console.log("update fail");
    res.send(err);
  }
};

const destroy = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      where: { id: req.params.id, completed: { [Op.ne]: -1 } },
    });
    if (todo === null) return res.status(404).send("Resource not found.");
    if (Number(req.user_id) !== todo.userId) {
      return res
        .status(403)
        .send(
          "Forbidden - atempting to make changes to resource without proper authorization."
        );
    }
    await todo.set({
      completed: -1,
    });
    todo
      .save()
      .then(res.status(200).send("Destroyed successfully"))
      .catch((err) => {
        res.status(500).send(err);
      });
  } catch (err) {
    res.send(err);
  }
};

const batchUpdateOrder = (req, res) => {
  // Accepts req.body = array of id/order pairs.
  // Ex:
  // [
  //   { id: 1, order: 1 },
  //   { id: 8, order: 2 },
  //   { id: 7, order: 7 },
  //   { id: 2, order: 8 }
  // ]

  // IDS MUST EXIST otherwise it will create new records.
  Todo.bulkCreate(req.body, { updateOnDuplicate: ["order"] })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const batchUpdateDescription = (req, res) => {
  // Accepts req.body = array of id/order pairs.
  // Ex:
  // [
  //   { id: 1, description: "a" },
  //   { id: 8, description: "b" },
  //   { id: 7, description: "c" },
  //   { id: 2, description: "d" }
  // ]

  // IDS MUST EXIST otherwise it will create new records.
  Todo.bulkCreate(req.body, { updateOnDuplicate: ["description"] })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
const batchUpdate = (req, res) => {
  // Accepts req.body = array of id/order pairs.
  // Ex:
  // [
  //   { id: 1, description: "a" },
  //   { id: 8, description: "b" },
  //   { id: 7, description: "c" },
  //   { id: 2, description: "d" }
  // ]

  // IDS MUST EXIST otherwise it will create new records.

  formatted_request = req.body.map((todo) => ({
    id: todo.id,
    completed: todo.completed || 0,
    order: todo.order || -1,
    description: todo.description,
    userId: req.user_id,
  }));

  Todo.bulkCreate(formatted_request, {
    updateOnDuplicate: ["completed", "order", "description"],
  })
    .then((todos) => {
      todos.forEach((todo) => {
        if (todo.dataValues.order === -1) {
          todo.set({ order: todo.id || -1 });
          todo.save();
        }
      });
      res.status(200).send(todos);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  index,
  create,
  update,
  destroy,
  batchUpdate,
  batchUpdateOrder,
  batchUpdateDescription,
};
