const sequelize = require('./database');
const Language = require('../models/Language');

exports.createLangauage = async(language)=> {
    try{
        let language = await Language.create({languageName: language});
        return {Success: true, Language: language};
    }
    catch(err){
        return {Success: false, Error: err};
    }
}