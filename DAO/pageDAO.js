const Pages = require('../models/Pages');

exports.createPage = async(pageName)=> {
    try{
        let page = await Pages.create({name: pageName});
        return {Success: true, Page: page};
    }catch(err){
        return {Success: false, Error: err};
    }
}

exports.getPage = async(pageName)=> {
    try{
        let page = await Pages.findAll({
            where: {
                name: pageName
            }
        });
        return {Success: true, Page: page}
    }catch(err){
        return {Success: false, Error: err};
    }
}
