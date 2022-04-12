const sequelize = require("./database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

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
    console.log(err);
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