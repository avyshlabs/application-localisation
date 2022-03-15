const userLanguageDAO = require("../DAO/userLanguageDAO");

exports.saveUserLanguage = async (userLangDetails) => {
  try {
    const userLang = await userLanguageDAO.saveUserLanguage({
      UserId: userLangDetails.userId,
      LanguageId: userLangDetails.languageId,
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
