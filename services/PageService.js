const Page = require('../DAO/PageDAO');


exports.getPage = async(pageName)=> {
    try{
        let page = await Page.getPage(pageName);
        return page;
    }catch(err){
        return {Success: false, Error: err};
    }
}

exports.createPage = async(details)=> {
    try{
        let page = await Page.createPage(details);
        return page;
    }catch(err){
        console.log(err);
        return {Success: false, Error: err};
    }
}