const userDAO = require("../DAO/userDAO");

exports.saveUser = async (userDetails) => {
  try {
    const user = await userDAO.saveUser({
      username: userDetails.username,
      email: userDetails.email,
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      password: userDetails.password,
    });
    if (user.Success) return { Success: true, User: user.user };
    else return { Success: false, Error: "cannot add users --- userService" };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.getUsers = async () => {
  try {
    const users = await userDAO.getUsers();
    if (users.Success) return { Success: true, users: users.users };
    else return { Success: false, Error: "cannot get users --- userService" };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.getUserById = async (userId) => {
  try {
    const user = await userDAO.getUser(userId);
    if (user.Success && user.user !== undefined) {
      console.log(user);
      return { Success: true, user: user.user };
    } else
      return { Success: false, Error: "cannot get userById --- userService" };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.getUserByUsername = async (username) => {
  try {
    const user = await userDAO.getUserByUsername(username);
    if (user.Success && user.user !== undefined) {
      console.log(user);
      return { Success: true, user: user.user };
    } else
      return { Success: false, Error: "cannot get userByusername --- userService" };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.updateUser = async (userId, userDetails) => {
  try {
    const user = await userDAO.updateUser(userId, {
      username: userDetails.username,
      email: userDetails.email,
      firstname: userDetails.firstname,
      lastname: userDetails.lastname,
      password: userDetails.password,
    });

    if (user.Success && user.user !== undefined) {
      console.log(user);
      return { Success: true, user: user.user };
    } else
      return {
        Success: false,
        Error: "cannot update userById --- userService",
      };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.deleteUser = async (userId) => {
  try {
    const user = await userDAO.deleteUser(userId);
    if (user.Success && user.user !== undefined) {
      console.log(user);
      return { Success: true, user: user.user };
    } else {
      return {
        Success: false,
        Error: "cannot delete userById --- userService",
      };
    }
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};
