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

exports.updateTranslation = async (translationObj, transaction) => {
  try {
    const updateResult = await translationDAO.updateTranslation(
      translationObj.Translation_id,
      {
        Translation_value: translationObj.Translation_value,
        Status: translationObj.Status,
        Updated_date: new Date(),
      },
      transaction
    );
    return updateResult;
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

exports.getTranslationsForPage = async (pageId,languageId) => {
  try {
    let result = await translationDAO.getTranslationsForPage(pageId,languageId)
    if(!result.Success) throw new Error('cannot fetch translations')
    let labelTranslationObj ={}
    for(const translationObj of result.Translations) {
      labelTranslationObj[translationObj.Label_name] = translationObj.Translation_value
    }
    return {Success: true, PageLabels:labelTranslationObj}
  }
  catch(err) {
    console.log(err.message)
    return {Success: false, Error: err.message}
  }
}

//this.getTranslationsForPage(1,1)