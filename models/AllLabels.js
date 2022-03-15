const Sequelize = require('sequelize');
const sequelize = require('../DAO/database');

const AllLabels = sequelize.define("AllLabels", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    en: {
        type: Sequelize.STRING,
        default: ''
    },
    hi: {
        type: Sequelize.STRING,
        default: ''
    },
    kn: {
        type: Sequelize.STRING,
        default: ''
    }
});

module.exports = AllLabels;