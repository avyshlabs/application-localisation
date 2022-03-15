const Sequelize = require('sequelize');
const sequelize = require('../DAO/database');

const UserLanguage = require('./UserLanguage')

var User = sequelize.define("Users", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    firstname: {
        type: Sequelize.STRING,
    },
    lastname: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

// User.associate = models => {
//     User.hasOne(UserLanguage, {
//         onDelete: "cascade",
//         onUpdate: "cascade"
//     });
// }

module.exports = User;