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


exports.getTranslations = async()=> {
  try{
    let result = await translationDAO.getTranslations();
    console.log("--------------------------------> Result",result);
    return result;
  }catch(err){
    console.log(err);
    return {Success: false, Error: err.message};
  }
}

this.getTranslations();