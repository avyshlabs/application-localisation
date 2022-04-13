const sequelize = require("./database");
const initModels = require("../models/init-models");
const models = initModels(sequelize);

exports.createPage = async (details, transaction) => {
  try {
    let date = new Date();
    let page = await models.page.create(
      {
        Page_name: details.name,
        Created_date: date,
        Updated_date: date,
      },
      { transaction: transaction }
    );
    return { Success: true, Page: page };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getPage = async (pageName) => {
  try {
    let page = await models.page.findAll({
      where: {
        Page_name: pageName,
      },
    });
    return { Success: true, Page: page };
  } catch (err) {
    return { Success: false, Error: err.message  };
  }
};

exports.getPages = async () => {
  try {
    let pages = await models.page.findAll({
      attributes: ["Page_name", "Page_id"],
    });
    return { pages };
  } catch (err) {
    return { Success: false, Error: err.message  };
  }
};

exports.getAll = async () => {
  try {
    let page = await models.page.findAll();
    page = JSON.stringify(page);
    page = JSON.parse(page);
    return { Success: true, Page: page };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getPageById = async (id) => {
  try {
    let pages = await models.page.findAll({
      where: {
        Page_id: id,
      },
    });
    if (pages.length > 0) return { Success: true, Page: pages[0] };
    else return { Success: false };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};
exports.update = async (pageId, details, transaction) => {
  try {
    let page = await models.page.update(
      details,
      {
        where: {
          Page_id: pageId,
        },
      },
      { transaction: transaction }
    );
    return { Success: true, Page: page };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};
