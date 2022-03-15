const sequelize = require('./database');
const Language = require('../models/Language');

exports.saveLangauage = async(languageDetails)=> {
    try{
        let language = await Language.create(languageDetails);
        return {Success: true, Language: language};
    }
    catch(err){
        return {Success: false, Error: err};
    }
}