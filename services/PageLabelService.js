const PageLabel = require("../DAO/pageLabelDAO");

exports.getPageLabel = async (id) => {
  try {
    let pageLabel = await PageLabel.getPageLabel(id);
    return pageLabel;
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

// exports.createPageLabel = async(details)=> {
//     try{
//         let pageLabel = await PageLabel.createPageLabel(details);
//         return pageLabel;
//     }catch(err){
//         console.log(err);
//         return {Success: false, Error: err};
//     }
// }

exports.createPageLabel = async (details, transaction) => {
  try {
    let pageLabel = await PageLabel.createPageLabel(details, transaction);
    return pageLabel;
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.getPageLabels = async (pageId, langId) => {
  try {
    let pageLabels = await PageLabel.getPageLabels(pageId, langId);
    labelObject = {};
    pageLabels.Pagelabels.map((pageLabel) => {
      labelObject[pageLabel.Label.Label_name] = pageLabel.Label.Label_value;
    });
    console.log(labelObject);
    if (pageLabels.Success) return { Success: true, PageLabels: labelObject };
    else
      return {
        Success: false,
        Error: "cannot get labels --- pageLabelService",
      };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};

exports.getAll = async () => {
  try {
    let pageLabel = await PageLabel.getAll();
    if (pageLabel.Success) return pageLabel;
    else return { Success: false, Error: "Error in services" };
  } catch (err) {
    return { Success: false, Error: err };
  }
};

exports.getPageLabelById = async (id) => {
  try {
    let pageLabel = await PageLabel.getPageLabelById(id);
    return pageLabel;
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};
exports.update = async (pagelabelId, details,transaction) => {
  try {
    let toUpdate = {
      Page_id: details.Page_id,
      Label_id: details.Label_id,
      Status: details.Status,
      Updated_date: new Date(),
    };
    let pagemap = await PageLabel.update(pagelabelId, toUpdate,transaction);
    return pagemap;
  } catch (err) {
    return { Success: false, Error: err };
  }
};
