const languageDAO = require('../DAO/languageDAO')

exports.saveLangauage = async(language)=> {
    try{
        let language = await languageDAO.saveLangauage({languageName: language});
        if (language.Success) return { Success: true, language: language.Language };
       else 
        return {Success: false, Error: "cannot add language --- languageService"};
    }
    catch(err){
        return {Success: false, Error: err};
    }
}