const Sequelize = require('sequelize');
const sequelize = require('../DAO/database');

const UserLanguage = sequelize.define("UserLangauge", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userLanguageCode: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    }
});

module.exports = UserLanguage;