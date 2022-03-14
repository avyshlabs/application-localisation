const Sequelize = require('sequelize');
const sequelize = require('../DAO/database');

const Language = sequelize.define("Language", {
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

module.exports = Language;