const languageDAO = require("../DAO/languageDAO");
const sequelize = require("../DAO/database");

exports.saveOneLangauage = async (languageName, languageCode) => {
  try {
    return sequelize
      .transaction(async (t) => {
        let language = await languageDAO.saveLangauage(
          {
            Language_name: languageName,
            Language_code: languageCode,
            Created_date: new Date(),
            Updated_date: new Date(),
          },
          t
        );
        if (language.Success)
          return { Success: true, language: language.Language };
        else throw new Error();
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return { Success: false, Error: err };
      });
  } catch (err) {
    return { Success: false, Error: err };
  }
};

exports.saveLangauage = async (languageName, transaction) => {
  try {
    let language = await languageDAO.saveLangauage(
      {
        Language_name: languageName,
        Created_date: new Date(),
        Updated_date: new Date(),
      },
      transaction
    );

    return language;
  } catch (err) {
    return { Success: false, Error: err };
  }
};

exports.getAll = async () => {
  try {
    let languages = await languageDAO.getAll();
    if (languages.Success) return languages;
    else return { Success: false, Error: "Error in services" };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getLanguageById = async (id) => {
  try {
    let language = await languageDAO.getLanguageById(id);
    return language;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.update = async (languageId, details, transaction) => {
  try {
    let toUpdate = {
      Language_name: details.Language_name,
      Status: details.Status,
      Updated_date: new Date(),
    };
    let language = await languageDAO.update(languageId, toUpdate, transaction);
    return language;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};
