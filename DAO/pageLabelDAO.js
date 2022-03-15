const PageLabels = require('../models/PageLabels');

exports.createPageLabel = async(page, label, pageName)=> {
    try{
        console.log("enter page label dao");
        let pageLabel = await PageLabels.create({
            pageName: pageName,
            PageId: page,
            AllLabelId: label
        }); 
        console.log("PageLabel: ", pageLabel);
        return {Success: true, PageLabel: pageLabel};
    }catch(err){
        return {Success: false, Error: err};
    }
}

exports.getPage = async(pageLabelId)=> {
    try{
        let page = PageLabels.findAll({
            where: {
                id: pageLabelId
            }
        });
        return {Success: true, Page: page}
    }catch(err){
        return {Success: false, Error: err};
    }
}
