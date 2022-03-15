const Sequelize = require('sequelize');
const sequelize = require('../DAO/database');
const AllLabels = require('./AllLabels');

const PageLabel = sequelize.define("PageLabel", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = PageLabel;