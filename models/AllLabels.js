const Sequelize = require('sequelize');
const sequelize = require('../DAO/database');

const AllLabels = sequelize.define("AllLabels", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    "en-us": {
        type: Sequelize.STRING,
        allowNull: false
    },
    "hi-in": {
        type: Sequelize.STRING,
        allowNull: false
    },
    "kn-in": {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = AllLabels;