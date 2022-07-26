module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("users", {
    // id: {
    //   type: DataTypes.INTEGER,
    //   primaryKey: true,
    // },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: "That username is already in use.",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
      unique: {
        args: true,
        msg: "An account is already associated with that email address.",
      },
    },
    password: {
      type: DataTypes.STRING,
    },
  });
  return User;
};
