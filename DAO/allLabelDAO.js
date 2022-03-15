const AllLabels = require('../models/AllLabels');

exports.createLabel = async(pageId, content)=> {
    try{
        let Labels = await AllLabels.create({
           en: content.en,
           hi: content.hi,
           kn: content.kn
        });
        console.log("labels: ", Labels);

        return {Success: true, Content: Labels};
    }catch(err){
        return {Success: false, Error: err};
    }
}

exports.getLabel = async(labelId)=> {
    try{
        let label = AllLabels.findAll({
            where: {
                id: labelId,
            }
        });
        console.log(label[languageCode]);
        return {Success: true, Label: label}
    }catch(err){
        return {Success: false, Error: err};
    }
}
