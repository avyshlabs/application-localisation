require("dotenv").config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_ADDON_DB, process.env.MYSQL_ADDON_USER, process.env.MYSQL_ADDON_PASSWORD, {
    dialect: "mysql",
    host: process.env.MYSQL_ADDON_HOST
});

// new sequelize("database name", "username", "password", {
//     dialect: "mysql",  //type of db
//     host: "hostname"
// });

//TEST CONNECTION
sequelize
.authenticate()
.then(() => {
console.log('Connected to SQL successfully!');
})
.catch(err => {
console.error('Unable to connect to the database:', err);
});

module.exports = sequelize;