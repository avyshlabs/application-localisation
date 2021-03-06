const Page = require("../DAO/pageDAO");
const sequelize = require("../DAO/database");

exports.getPage = async (pageName) => {
  try {
    let page = await Page.getPage(pageName);
    return page;
  } catch (err) {
    return { Success: false, Error: err };
  }
};

exports.getPages = async () => {
  try {
    let pages = await Page.getPages();
    return pages;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.createPage = async (details, transaction) => {
  try {
    let page = await Page.createPage(details, transaction);
    return page;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};
exports.getAll = async () => {
  try {
    let page = await Page.getAll();
    if (page.Success) return page;
    else return { Success: false, Error: "Error in services" };
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.getPageById = async (id) => {
  try {
    let page = await Page.getPageById(id);
    return page;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};
exports.update = async (pageId, details, transaction) => {
  try {
    let toUpdate = {
      Page_name: details.Page_name,
      Status: details.Status,
      Updated_date: new Date(),
    };
    let page = await Page.update(pageId, toUpdate, transaction);
    return page;
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};

exports.saveOnePage = async (pageName) => {
  try {
    return sequelize
      .transaction(async (t) => {
        let result = await Page.createPage(
          {
            name: pageName,
          },
          t
        );
        if (result.Success) return { Success: true, result: result.Page };
        else throw new Error();
      })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return { Success: false, Error: err.message };
      });
  } catch (err) {
    return { Success: false, Error: err.message };
  }
};
