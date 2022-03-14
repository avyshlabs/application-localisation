const Sequelize = require('sequelize');
const sequelize = require('../DAO/database');
const AllLabels = require('./AllLabels');

const PageLabels = sequelize.define("PageLabels", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
});

module.exports = PageLabels;