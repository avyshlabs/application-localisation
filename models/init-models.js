var DataTypes = require("sequelize").DataTypes;
var _label = require("./label");
var _language = require("./language");
var _page = require("./page");
var _page_map = require("./page_map");
var _translation = require("./translation");

function initModels(sequelize) {
  var label = _label(sequelize, DataTypes);
  var language = _language(sequelize, DataTypes);
  var page = _page(sequelize, DataTypes);
  var page_map = _page_map(sequelize, DataTypes);
  var translation = _translation(sequelize, DataTypes);

  page_map.belongsTo(label, { as: "Label", foreignKey: "Label_id"});
  label.hasMany(page_map, { as: "page_maps", foreignKey: "Label_id"});
  translation.belongsTo(label, { as: "Label", foreignKey: "Label_id"});
  label.hasMany(translation, { as: "translations", foreignKey: "Label_id"});
  translation.belongsTo(language, { as: "Language", foreignKey: "Language_id"});
  language.hasMany(translation, { as: "translations", foreignKey: "Language_id"});
  page_map.belongsTo(page, { as: "Page", foreignKey: "Page_id"});
  page.hasMany(page_map, { as: "page_maps", foreignKey: "Page_id"});

  return {
    label,
    language,
    page,
    page_map,
    translation,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
