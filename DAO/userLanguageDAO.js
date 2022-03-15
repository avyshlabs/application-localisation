const userLanguageModel = require("../models/UserLanguage");

exports.saveUserLanguage = async () => {
  try {
    const user = await userModel.create(userDetails);
    console.log("user's auto-generated ID:", user.id);
    return { Success: true, user: user };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

