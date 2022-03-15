require("dotenv").config();

const express = require("express");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("./DAO/database");
const Users = require("./models/Users");
const UserLanguage = require("./models/UserLanguage");
const Language = require("./models/Language");
const Pages = require("./models/Pages");
const PageLabels = require("./models/PageLabels");
const AllLabels = require("./models/AllLabels");

//ASSOCIATIONS
Users.hasOne(UserLanguage);
UserLanguage.belongsTo(Language);
Language.hasOne(UserLanguage);
Pages.hasMany(PageLabels);
PageLabels.belongsTo(AllLabels);
AllLabels.hasMany(PageLabels);

// sequelize
// .sync({force: true})
// .then(result=> {
//     console.log(result);
//     return Language.create({languageName: "en-us"});
// })
// .then(lang=> {
//     console.log(lang);
//     return Language.create({languageName: "hi-in"});
// })
// .then(lang=> {
//     console.log(lang);
//     return Language.create({languageName: "kn-in"});
// })
// .then(lang=> {
//     console.log(lang);
// })
// .catch(err=> {
//     console.log(err);
// })

const app = express();

//Static Files
app.use(express.static(__dirname + "/public"));

//DEFAULT ROUTE
// app.get("/login", (req, res) => {
//   res.statusCode = 200;
//   // res.render("login");
//   res.sendFile("login.html", { root: `${__dirname}/public/html` });
// });
// app.get("/signup", (req, res) => {
//   res.statusCode = 200;
//   // res.render("signup");
//   res.sendFile("signup.html", { root: `${__dirname}/public/html` });
// });
// app.get("/dashboard", (req, res) => {
//   res.statusCode = 200;
//   res.sendFile("dashboard.html", { root: `${__dirname}/public/html` });
// });

app.listen(process.env.PORT, () => {
  console.log(
    `Server running at http://${process.env.HOSTNAME}:${process.env.PORT}`
  );
});
