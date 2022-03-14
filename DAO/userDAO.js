const userModel = require("../models/Users");

exports.saveUser = async (userDetails) => {
  try {
    const user = await userModel.create(userDetails);
    console.log("user's auto-generated ID:", user.id);
    return { Success: true, user: user };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.getUsers = async () => {
  try {
    const users = await userModel.findAll();
    console.log(users.every((user) => user instanceof userModel)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
    return { Success: true, users: users };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.getUser = async (userId) => {
  try {
    const user = await userModel.findAll({
      where: {
        id: parseInt(userId),
      },
    });
    console.log(user);
    return { Success: true, user: user[0] };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.updateUser = async (userId, userDetails) => {
  try {
    console.log(userDetails);
    const user = await userModel.update(userDetails, {
      where: {
        id: parseInt(userId),
      },
    });
    return { Success: true, user: user };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.deleteUser = async (userId) => {
  try {
    const user = await userModel.destroy({
      where: {
        id: userId,
      },
    });
    return { Success: true, user: user };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};
