const PageLabels = require('../models/PageLabels');
const Page = require('../models/Pages');
const Label = require('../models/AllLabels');

exports.createPageLabel = async(details)=> {
    try{
        let pageLabel = await PageLabels.create({
            name: details.name,
            PageId: details.page,
            AllLabelId: details.label
        }); 
        return {Success: true, PageLabel: pageLabel};
    }catch(err){
        console.log(err);
        return {Success: false, Error: err};
    }
}

exports.getPageLabel = async(name)=> {
    try{
        let pageLabel = await PageLabels.findAll({
            where: {
                name: name
            },
            include: [Page, Label]
        });
        return {Success: true, Pagelabel: pageLabel}
    }catch(err){
        console.log(err);
        return {Success: false, Error: err};
    }
}
