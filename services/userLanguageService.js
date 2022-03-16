const userLanguageDAO = require("../DAO/userLanguageDAO");

exports.saveUserLanguage = async (userLangDetails) => {
  try {
    const userLang = await userLanguageDAO.saveUserLanguage({
      User_id: userLangDetails.User_id,
      Language_id: userLangDetails.Language_id,
      Created_date: new Date(),
      Updated_date: new Date()
    });

    if (userLang.Success) return { Success: true, userLang: userLang.UserLang };
    else return { Success: false, Error: "cannot add userLangDetails --- userLangService" };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.updateUserLanguage = async (userId, languageId) => {
    try {
      const userLang = await userLanguageDAO.updateUserLanguage(userId,languageId);
      if (userLang.Success) return { Success: true, userLang: userLang.UserLang };
      else return { Success: false, Error: "cannot update userLangDetails --- userLangService" };
    } catch (err) {
      console.log(err);
      return { Success: false, Error: err };
    }
  };

  exports.getUserLanguage = async (userId) => {
    try {
      const userLang = await userLanguageDAO.getUserLanguage(userId)
      if (userLang.Success && userLang.UserLang!== undefined) {
        return { Success: true, 
          userLanguage: {
            languageId: userLang.UserLang.Language_id,
            languageName: userLang.UserLang.Language.Language_name
         } };
      }
      else return { Success: false, Error: "cannot get userLangDetails --- userLangService" };
    } catch (err) {
      console.log(err);
      return { Success: false, Error: err };
    }
  };