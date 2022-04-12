const translationDAO = require("../DAO/translationDAO");
const sequelize = require("../DAO/database");

exports.saveTranslation = async (
  labelId,
  languageId,
  transactionValue,
  transaction
) => {
  try {
    const saveResult = await translationDAO.saveTranslation(
      { labelId, languageId, transactionValue },
      transaction
    );
    return saveResult;
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err.message };
  }
};
