//const Language = require('../models/Language');

const sequelize = require("./database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

// exports.saveLangauage = async(languageDetails)=> {
//     try{
//         let language = await models.language.create(languageDetails);
//         return {Success: true, Language: language};
//     }
//     catch(err){
//         return {Success: false, Error: err};
//     }
// }

exports.saveLangauage = async (languageDetails, transaction) => {
  try {
    let language = await models.language.create(languageDetails, {
      transaction: transaction,
    });
    return { Success: true, Language: language };
  } catch (err) {
    return { Success: false, Error: err };
  }
};

exports.getAll = async () => {
  try {
    let language = await models.language.findAll();
    language = JSON.stringify(language);
    language = JSON.parse(language);
    return { Success: true, Language: language };
  } catch (err) {
    return { Success: false, Error: err };
  }
};

exports.getLanguageById = async (id) => {
  try {
    let language = await models.language.findAll({
      where: {
        Language_id: id,
      },
    });
    if (language.length > 0) return { Success: true, Language: language[0] };
    else return { Success: false };
  } catch (err) {
    console.log(err);
  }
};
exports.update = async (languageId, details,transaction) => {
  try {
    console.log(`------------------------------------------------->${details.Language_name}`)
    let language = await models.language.update(details, {
      where: {
        Language_id: languageId,
      },
    },{transaction: transaction});
    return { Success: true, Language: language };
  } catch (err) {
    console.log("DAO langiage error: ", err);
    return { Success: false, Error: err };
  }
};
