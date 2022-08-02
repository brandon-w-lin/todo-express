const User = global.db.User;
const Role = global.db.Role;

function addRoleToUser(user_id, role_id) {
  User.findByPk(user_id)
    .then((user) => {
      if (!user) {
        console.log(
          `Could not find user when attempting to create user-role junction: ${user_id}`
        );
        return null;
      }
      return Role.findByPk(role_id).then((role) => {
        if (!role) {
          console.log(
            `Could not find role when attempting to create user-role junction: ${role_id}`
          );
          return null;
        }
        user.addRole(role);
        console.log(`Added role = (${role.name}) to user = (${user.username})`);
        return user;
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

module.exports = { addRoleToUser };
