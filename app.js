require("dotenv").config();

const express = require('express');
const morgan = require('morgan');
const Sequelize = require('sequelize');
const sequelize = require('./DAO/database');

//MODELS
const Users = require('./models/User');
const UserLanguage = require('./models/UserLanguage');
const Language = require('./models/Language');
const Page = require('./models/Pages')
const PageLabel = require('./models/PageLabels')
const Label = require('./models/AllLabels')

//ROUTERS
const userRouter = require("./controllers/userController");
const PageController = require('./controllers/pageController');
const LabelController = require('./controllers/LabelController');
const PageLabelController = require('./controllers/PageLabel');



//ASSOCIATIONS
Users.hasOne(UserLanguage, { onDelete: "cascade", onUpdate: "cascade" });      //set, get, create
Language.hasMany(UserLanguage, { onDelete: "cascade", onUpdate: "cascade" });
UserLanguage.belongsTo(Users,{
    foreignKey: {
        allowNull : false
    }
});
UserLanguage.belongsTo(Language, {
    foreignKey: {
        allowNull: false
    }
});

Page.hasMany(PageLabel);
PageLabel.belongsTo(Page, {
    foreignKey: {
        allowNull: false
    }
});
Label.hasMany(PageLabel);
PageLabel.belongsTo(Label, {
    foreignKey: {
        allowNull: false
    }
})


const app = express();
app.use(morgan('dev'));
app.use(express.json());


// sequelize
//   .sync({ force: true })
//   .then((result) => {
//     console.log(result);
//     return Language.create({ languageName: "en-us" });
//   })
//   .then((lang) => {
//     console.log(lang);
//     return Language.create({ languageName: "hi-in" });
//   })
//   .then((lang) => {
//     console.log(lang);
//     return Language.create({ languageName: "kn-in" });
//   })
//   .then((lang) => {
//     console.log(lang);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// sequelize
// .sync()
// .then(result=> {
//     console.log(result)
// })
// .catch(err=> {
//     console.log(err);
// });

app.post('/createD', (req, res)=> {
    let details = req.body;
    Page.create({
        name: details.name
    })
    .then(page=> res.status(200).json(page))
    .catch(err=> res.status(500).json(err));
});

app.post('/createA', (req, res)=> {
    let details = req.body.content;
    Label.create({
        en: details.en,
        hi: details.hi,
        kn: details.kn
    })  
    .then(label=> res.status(200).json(label))
    .catch(err=> res.status(500).json(err));
});

app.post('/createPL', (req, res)=> {
    let details = req.body;
    PageLabel.create({
        name: details.name,
        PageId: details.page,
        AllLabelId: details.label   
    })
    .then(label=> res.status(200).json(label))
    .catch(err=> res.status(500).json(err));
});

app.get('/getA', (req, res)=> {
    PageLabel.findAll({
        include: [Page, Label]
    })
    .then(label=> res.status(200).json(label))
    .catch(err=> {res.status(500).json(err); console.log(err);});
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//DEFAULT ROUTE
app.get("/", (req, res) => {
  res.statusCode = 200;
  res.json("Server running up");
});

//ROUTES
app.use("/user", userRouter);
app.use('/page', PageController);
app.use('/label', LabelController);
app.use('/pagelabel', PageLabelController);

app.listen(process.env.PORT, () => {
  console.log(
    `Server running at http://${process.env.HOSTNAME}:${process.env.PORT}`
  );
});
