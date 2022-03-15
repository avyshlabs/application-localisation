const Pages = require('../models/Pages');

exports.createPage = async(pageName)=> {
    try{
        let page = await Pages.create({pageName: pageName});
        return {Success: true, Page: page};
    }catch(err){
        return {Success: false, Error: err};
    }
}

exports.getPage = async(pageName)=> {
    try{
        let page = Pages.findAll({
            where: {
                pageName: pageName
            }
        });
        return {Success: true, Page: page}
    }catch(err){
        return {Success: false, Error: err};
    }
}
