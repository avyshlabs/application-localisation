//const userLanguageModel = require("../models/UserLanguage");
const userService = require('../services/userService')

const sequelize = require('./database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

exports.saveUserLanguage = async (userLangDetails) => {
  try {
    const userLang = await models.user_language.create(userLangDetails);
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
      const userLang = await models.user_language.update({Language_id: languageId, Updated_date: new Date()}, {
        where: {
          User_id: parseInt(userId),
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
    const userLang = await models.user_language.findAll({
      where: {
        User_id: parseInt(userId),
      },
      include: [
        { model: models.language, as: 'Language'}
      ],
    });

    console.log(userLang)
    console.log("userLang's auto-generated ID:", userLang[0].User_Lang_id);
    return { Success: true, UserLang: userLang[0] };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};