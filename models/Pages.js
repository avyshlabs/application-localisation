const Sequelize = require('sequelize');
const sequelize = require('../DAO/database');

const Page = sequelize.define("Page", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    }
});

module.exports = Page;