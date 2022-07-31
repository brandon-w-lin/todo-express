const Todo = global.db.Todo;
const User = global.db.User;

const index = async (req, res) => {
  Todo.findAll({ where: { userId: req.user_id } })
    .then((todos) => {
      res.status(200).send(todos);
    })
    .catch((err) => {
      res.send(err);
    });
};

const create = (req, res) => {
  const description = req.body.description;
  Todo.create({ completed: 0, description: description })
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.send(err);
    });
};

const update = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
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
    await todo.save();
    console.log("update success");
    res.send(todo);
  } catch (err) {
    console.log("update fail");
    res.send(err);
  }
};

const destroy = async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    await todo.destroy();
    res.status(200).send("Destroyed successfully");
    // redirect?
  } catch (err) {
    res.send(err);
  }
};

module.exports = { index, create, update, destroy };
