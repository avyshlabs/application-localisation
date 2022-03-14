require('dotenv').config();

const express = require('express');

const Sequelize = require('sequelize');
const sequelize = require('./DAO/database');
const Users = require('./models/Users');
const UserLanguage = require('./models/UserLanguage');
const Language = require('./models/Language');
const Pages = require('./models/Pages');
const PageLabels = require('./models/PageLabels');
const AllLabels = require('./models/AllLabels');


//Routers
const userRouter = require('./controllers/userController');

//ASSOCIATIONS
Users.hasOne(UserLanguage);
UserLanguage.belongsTo(Language);
Language.hasOne(UserLanguage);
Pages.hasMany(PageLabels);
PageLabels.belongsTo(AllLabels)
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

app.use(express.json())
app.use(express.urlencoded({extended:true}))

//DEFAULT ROUTE
app.get('/', (req, res)=> {
    res.statusCode = 200;
    res.json("Server running up");
});

app.use('/user',userRouter)

app.listen(process.env.PORT, ()=> {
    console.log(`Server running at http://${process.env.HOSTNAME}:${process.env.PORT}`)
});
