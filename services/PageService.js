const Page = require('../DAO/PageDAO');


exports.getPage = async(pageName)=> {
    try{
        let page = await Page.getPage(pageName);
        return page;
    }catch(err){
        return {Success: false, Error: err};
    }
}

exports.createPage = async(name)=> {
    try{
        let page = await Page.createPage(name);
        return page;
    }catch(err){
        return {Success: false, Error: err};
    }
}