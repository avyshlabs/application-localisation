const PageLabel = require('../DAO/pageLabelDAO');


exports.getPageLabel = async(name)=> {
    try{
        let pageLabel = await PageLabel.getPageLabel(name);
        return pageLabel;
    }catch(err){
        console.log(err);
        return {Success: false, Error: err};
    }
}

exports.createPageLabel = async(details)=> {
    try{
        let pageLabel = await PageLabel.createPageLabel(details);
        return pageLabel;
    }catch(err){
        console.log(err);
        return {Success: false, Error: err};
    }
}