const Sequelize = require('sequelize');
const sequelize = require('../DAO/database');

const Pages = sequelize.define("Pages", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pageName: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Pages;