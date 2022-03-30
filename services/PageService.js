const Page = require("../DAO/PageDAO");

exports.getPage = async (pageName) => {
  try {
    let page = await Page.getPage(pageName);
    return page;
  } catch (err) {
    return { Success: false, Error: err };
  }
};

// exports.createPage = async(details)=> {
//     try{
//         let page = await Page.createPage(details);
//         return page;
//     }catch(err){
//         console.log(err);
//         return {Success: false, Error: err};
//     }
// }

exports.createPage = async (details, transaction) => {
  try {
    let page = await Page.createPage(details, transaction);
    return page;
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};
exports.getAll = async () => {
  try {
    let page = await Page.getAll();
    if (page.Success) return page;
    else return { Success: false, Error: "Error in services" };
  } catch (err) {
    return { Success: false, Error: err };
  }
};

exports.getPageById = async (id) => {
  try {
    let page = await Page.getPageById(id);
    return page;
  } catch (err) {
    console.log(err);
    return { Success: false, Error: err };
  }
};
exports.update = async (pageId, details,transaction) => {
  try {
    let toUpdate = {
      Page_name: details.Page_name,
      Status: details.Status,
      Updated_date: new Date(),
    };
    let page = await Page.update(pageId, toUpdate,transaction);
    return page;
  } catch (err) {
    return { Success: false, Error: err };
  }
};
