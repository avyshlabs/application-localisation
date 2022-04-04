var DataTypes = require("sequelize").DataTypes;
var _label = require("./label");
var _language = require("./language");
var _page = require("./page");
var _page_map = require("./page_map");
var _user = require("./user");
var _user_language = require("./user_language");

function initModels(sequelize) {
  var label = _label(sequelize, DataTypes);
  var language = _language(sequelize, DataTypes);
  var page = _page(sequelize, DataTypes);
  var page_map = _page_map(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var user_language = _user_language(sequelize, DataTypes);

  page_map.belongsTo(label, { as: "Label", foreignKey: "Label_id"});
  label.hasMany(page_map, { as: "page_maps", foreignKey: "Label_id"});
  label.belongsTo(language, { as: "Language", foreignKey: "Language_id"});
  language.hasMany(label, { as: "labels", foreignKey: "Language_id"});
  user_language.belongsTo(language, { as: "Language", foreignKey: "Language_id"});
  language.hasMany(user_language, { as: "user_languages", foreignKey: "Language_id"});
  page_map.belongsTo(page, { as: "Page", foreignKey: "Page_id"});
  page.hasMany(page_map, { as: "page_maps", foreignKey: "Page_id"});
  user_language.belongsTo(user, { as: "User", foreignKey: "User_id"});
  user.hasMany(user_language, { as: "user_languages", foreignKey: "User_id"});

  return {
    label,
    language,
    page,
    page_map,
    user,
    user_language,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
