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

exports.getPageLabels = async (pageId, langId) => {
    try {
      let pageLabels = await PageLabel.getPageLabels(pageId,langId)
      labelObject = {}
      pageLabels.Pagelabels.map(pageLabel => {
          labelObject[pageLabel.Label.Label_name] = pageLabel.Label.Label_value
      })
      console.log(labelObject)
      if (pageLabels.Success) return { Success: true, PageLabels: labelObject };
      else return { Success: false, Error: "cannot get labels --- pageLabelService" };
    } catch (err) {
      console.log(err);
      return { Success: false, Error: err };
    }
  };