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
    console.log(err);
    return { Success: false, Error: err.message };
  }
};