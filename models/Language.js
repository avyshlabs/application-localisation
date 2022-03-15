const Sequelize = require('sequelize');
const sequelize = require('../DAO/database');

var Language = sequelize.define("Language", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    languageName: {
        type: Sequelize.STRING,
    }
});

// Language.associate = models => {
//     Language.hasMany(models.UserLanguage, {
//         onDelete: "cascade",
//         onUpdate: "cascade"
//     });
// }

module.exports = Language;