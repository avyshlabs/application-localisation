const PageLabel = require('../DAO/pageLabelDAO');


exports.getPageLabel = async(id)=> {
    try{
        let pageLabel = await PageLabel.getPageLabel(id);
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