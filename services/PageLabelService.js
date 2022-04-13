const PageLabel = require("../DAO/pageLabelDAO");

exports.getPageLabel = async (id) => {
  try {
    let pageLabel = await PageLabel.getPageLabel(id);
    return pageLabel;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.createPageLabel = async (details, transaction) => {
  try {
    let pageLabel = await PageLabel.createPageLabel(details, transaction);
    return pageLabel;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getPageLabels = async (pageId, langId) => {
  try {
    let pageLabels = await PageLabel.getPageLabels(pageId, langId);
    labelObject = {};
    pageLabels.Pagelabels.map((pageLabel) => {
      labelObject[pageLabel.Label.Label_name] = pageLabel.Label.Label_value;
    });
    if (pageLabels.Success) return { Success: true, PageLabels: labelObject };
    else
      return {
        Success: false,
        Error: "cannot get labels --- pageLabelService",
      };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getAll = async () => {
  try {
    let pageLabel = await PageLabel.getAll();
    if (pageLabel.Success) return pageLabel;
    else return { Success: false, Error: "Error in services" };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getPageLabelById = async (id) => {
  try {
    let pageLabel = await PageLabel.getPageLabelById(id);
    return pageLabel;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};
exports.update = async (pagelabelId, details, transaction) => {
  try {
    let toUpdate = {
      Page_id: details.Page_id,
      Label_id: details.Label_id,
      Status: details.Status,
      Updated_date: new Date(),
    };
    let pagemap = await PageLabel.update(pagelabelId, toUpdate, transaction);
    return pagemap;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.LabelInPage = async (Page_id, Label_id) => {
  try {
    let labels = await PageLabel.getLabelInPage(Page_id, Label_id);
    return labels;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getAllDistinct = async (pageId) => {
  try {
    let result = await PageLabel.getAllDistinct(pageId);
    return result;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};
