const sequelize = require("./database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const { QueryTypes } = require('sequelize');



exports.saveTranslation = async (translationDetails, transaction) => {
  try {
    let currentDate = new Date();
    const result = await models.translation.create(
      {
        Label_id: translationDetails.labelId,
        Language_id: translationDetails.languageId,
        Translation_value: translationDetails.translationValue,
        Created_date: currentDate,
        Updated_date: currentDate,
      },
      { transaction: transaction }
    );
    return { Success: true, result: result };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.updateTranslation = async (translationId, translationDetails,transaction) => {
  try {
    console.log(translationDetails);
    const updateResult = await models.translation.update(translationDetails, {
      where: {
        Translation_id: parseInt(translationId),
      },
    },
    {transaction: transaction}
    );
    return { Success: true, result: updateResult };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getTranslations = async()=> {
  try{
    let result = await models.translation.findAll({
      include: [{
        model: models.label,
        as: "Label",
        attributes: ['Label_name']
      }, {
        model: models.language,
        as: "Language",
        attributes: ['Language_id', 'Language_name', 'Language_code']
      }]
    });

    result = JSON.stringify(result);
    result = JSON.parse(result);

    return {Success: true, Translation: result};

  }catch(err){
    return {Success: false, Error: err.message};
  }
}

exports.getTranslationsForPage = async (pageId,languageId) => {
  try {
    console.log('reached here')
    const translations = await sequelize.query(`SELECT  Translation_value, label.Label_name FROM translation INNER JOIN label ON translation.Label_id = label.Label_id WHERE translation.Language_id =${languageId} AND translation.Label_id IN (SELECT Label_id FROM page_map WHERE page_map.Page_id =${pageId})`, { type: QueryTypes.SELECT });

    return {Success: true, Translations: translations}
  }
  catch(err) {
    return {Success: false, Error: err.message}
  }
}
