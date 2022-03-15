const userLanguageModel = require("../models/UserLanguage");
const userService = require('../services/userService')

exports.saveUserLanguage = async (userLangDetails) => {
  try {
    const userLang = await userLanguageModel.create(userLangDetails);
    console.log("userLang's auto-generated ID:", userLang.id);
    return { Success: true, UserLang: userLang };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.updateUserLanguage = async (userId, languageId) => {
  try {
    const user = await userService.getUserById(userId)
    if(user.Success && user.user !== undefined) {
      const userLang = await userLanguageModel.update({LanguageId: languageId}, {
        where: {
          UserId: parseInt(userId),
        },
      });
      return { Success: true, UserLang: userLang };
    }
    else throw new Error('User not found for given Id')
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.getUserLanguage = async (userId) => {
  try {
    const userLang = await userLanguageModel.find
    console.log("userLang's auto-generated ID:", userLang.id);
    return { Success: true, UserLang: userLang };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};