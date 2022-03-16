// const Pages = require('../models/Pages');

const sequelize = require('./database');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

exports.createPage = async(details)=> {
    try{
        let date = new Date();
        let page = await models.page.create({
            Page_name: details.name,
            Created_date: date,
            Updated_date: date
        });
        return {Success: true, Page: page};
    }catch(err){
        console.log(err);
        return {Success: false, Error: err};
    }
}

exports.getPage = async(pageName)=> {
    try{
        let page = await models.page.findAll({
            where: {
                Page_name: pageName
            }
        });
        return {Success: true, Page: page}
    }catch(err){
        return {Success: false, Error: err};
    }
}
