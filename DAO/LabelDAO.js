const Label = require('../models/AllLabels');

exports.createLabel = async(content)=> {
    try{
        let label = await Label.create({
           en: content.en,
           hi: content.hi,
           kn: content.kn
        });
        return {Success: true, Content: label};
    }catch(err){
        return {Success: false, Error: err};
    }
}

exports.getLabel = async(id)=> {
    try{
        let label = await Label.findAll({
            where: {
                id: id,
            }
        });
        // console.log(label[languageCode]);
        return {Success: true, Label: label}
    }catch(err){
        console.log(err);
        return {Success: false, Error: err};
    }
}
