const Todo_Order = global.db.Todo_Order;

const batchUpdate = async (req, res) => {
  const swaps = req.body;
  // console.log(swaps[0]);
  swaps.forEach(async (swap) => {
    source = swap[0];
    target = swap[1];

    console.log(
      `Want to move source (${source.id}) from order ${source.order} to ${target.order} and move target (${target.id}) from order ${target.order} to ${source.order}`
    );

    let temp = source.order;

    source_obj = await Todo_Order.findOne({ where: { todo_id: source.id } });
    target_obj = await Todo_Order.findOne({ where: { todo_id: target.id } });

    if (source_obj && target_obj) {
      try {
        source_obj.set({ order: target.order });
        target_obj.set({ order: temp });
        source_obj.save().then(() => {
          console.log("successfully saved source");
        });
        target_obj.save().then(() => {
          console.log("successfully saved target");
        });
      } catch {
        console.log("error when setting/saving new order");
      }
    }
  });
};

module.exports = { batchUpdate };
