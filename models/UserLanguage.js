const Sequelize = require('sequelize');
const sequelize = require('../DAO/database');

const User = require('./User')
const Language = require('./Language')

var UserLanguage = sequelize.define("UserLangauge", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    }
});

// UserLanguage.associate = models => {
//     UserLanguage.belongsTo(User, {
//         foreignKey: {
//             allowNull: false
//         }
//     });
//     UserLanguage.belongsTo(Language, {
//         foreignKey: {
//             allowNull: false
//         }
//     });
// }

module.exports = UserLanguage;