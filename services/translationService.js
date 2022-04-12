const translationDAO = require("../DAO/translationDAO");
const sequelize = require("../DAO/database");

exports.saveTranslation = async (
  labelId,
  languageId,
  translationValue,
  transaction
) => {
  try {
    const saveResult = await translationDAO.saveTranslation(
      { labelId, languageId, translationValue },
      transaction
    );
    return saveResult;
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err.message };
  }
};
