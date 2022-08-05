const junctions = require("../helpers/junctions");
const config = {
  headers: {
    Authorization:
      "Bearer " +
      "eyJhbGciOiJIUzI1NiJ9.MQ.F0BNFoIruX9-qETBu_qG_JJpxUVco4uSIBLM29_Myj4",
  },
};

const seed_user = require("./users");
const login_user = require("./login");
const sequelize_fixtures = require("sequelize-fixtures");
const swap_seeds = require("./swaps");
const create_todo = require("./todos");

function seed() {
  global.db.sequelize.sync({ force: true }).then(async () => {
    console.log("Drop database and resync");

    // First, seed roles
    await sequelize_fixtures.loadFile("./seeders/roles.json", global.db);

    // Second, create users
    await seed_user("brandon");
    await seed_user("lotte");
    await seed_user("archer");

    // Third, add roles to each user
    await junctions.addRoleToUser(1, 2);
    await junctions.addRoleToUser(2, 1);
    await junctions.addRoleToUser(3, 1);

    // Login and create todos
    let jwt;

    jwt = await login_user("brandon", "password");
    await create_todo("Go to the store", jwt);
    await create_todo("Meet up with ur friends", jwt);

    jwt = await login_user("lotte", "password");
    await create_todo("Study for boards", jwt);
    await create_todo("Vacuum", jwt);

    jwt = await login_user("archer", "password");
    await create_todo("Woof woof", jwt);
    await create_todo("Bark bark", jwt);

    const swaps = [
      [
        { id: 1, order: 1 },
        { id: 2, order: 2 },
      ],
    ];

    swap_seeds(swaps);
  });
}

module.exports = { seed };
