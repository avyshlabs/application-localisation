const sequelize = require("./database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

exports.createPageLabel = async (details, transaction) => {
  try {
    let date = new Date();
    let pageLabel = await models.page_map.create(
      {
        Page_id: details.page,
        Label_id: details.label,
        Created_date: date,
        Updated_date: date,
      },
      { transaction: transaction }
    );
    return { Success: true, PageLabel: pageLabel };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getPageLabel = async (id) => {
  try {
    let pageLabel = await models.page_map.findAll({
      where: {
        Page_map_id: id,
      },
      include: [
        { model: models.label, as: "Label" },
        { model: models.page, as: "Page" },
      ],
    });
    return { Success: true, Pagelabel: pageLabel };
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err.message };
  }
};
   
exports.getLabelInPage = async (Page_id, Label_id) => {
  try {
    let pageLabels = await models.page_map.findAll({
      where: {
        Page_id: Page_id,
        Label_id: Label_id,
      },
    });
    return { Success: true, Pagelabels: pageLabels[0] };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getPageLabel = async (id) => {
  try {
    let pageLabel = await models.page_map.findAll({
      where: {
        Page_map_id: id,
      },
      include: [
        { model: models.label, as: "Label" },
        { model: models.page, as: "Page" },
      ],
    });
    return { Success: true, Pagelabel: pageLabel };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getPageLabels = async (pageId, langId) => {
  try {
    let pageLabels = await models.page_map.findAll({
      where: {
        Page_id: pageId,
      },
      include: [
        {
          model: models.label,
          as: "Label",
          where: {
            Language_id: langId,
          },
          attributes: ["Label_name", "Label_value"],
        },
      ],
    });
    return { Success: true, Pagelabels: pageLabels };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getAll = async () => {
  try {
    let pagemap = await models.page_map.findAll();
    pagemap = JSON.stringify(pagemap);
    pagemap = JSON.parse(pagemap);
    return { Success: true, Pagemap: pagemap };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getPageLabelById = async (id) => {
  try {
    let pageLabel = await models.page_map.findAll({
      where: {
        Page_map_id: id,
      },
    });
    if (pageLabel.length > 0) return { Success: true, Pagelabel: pageLabel };
    else return { Success: false };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.update = async (pagemapId, details, transaction) => {
  try {
    let pagemap = await models.page_map.update(
      details,
      {
        where: {
          Page_map_id: pagemapId,
        },
      },
      { transaction: transaction }
    );
    return { Success: true, Pagemap: pagemap };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getAllDistinct = async (pageId) => {
  try {
    let result = await models.page_map.findAll({
      where: {
        Page_id: pageId,
      },
      include: [
        {
          model: models.label,
          as: "Label",
          attributes: ["Label_name"],
        },
      ],
      group: ["Label_name"],
    });
    result = JSON.stringify(result);
    result = JSON.parse(result);
    return { Success: true, Label: result };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};
