module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("roles", {
    name: {
      type: DataTypes.STRING,
    },
  });
  return Role;
};
