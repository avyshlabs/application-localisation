require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const Sequelize = require("sequelize");
const sequelize = require("./DAO/database");
const CookieParser = require("cookie-parser");

//SCAFFOLD SEQUELIZE-AUTO AFTER INSTALLING SEQUELIZE-AUTO
// sequelize-auto -o "./models" -d <DATABASE NAME> -h <HOSTNAME> -u <USERNAME> -p <PORT> -x <PASSWORD> -e <DIALECT>

//ROUTERS
const userRouter = require("./controllers/userController");
const LocaleController = require("./controllers/localeController");
const PageController = require("./controllers/pageController");
const LabelController = require("./controllers/LabelController");
const PageLabelController = require("./controllers/PageLabel");
const excelUploadController = require("./controllers/excelUploadController");
const languageConotroller = require('./controllers/languageController');

//ASSOCIATIONS DEFINED IN ./MODELS/INIT-MODELS

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());

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

app.get("/", (req, res) => {
  res.statusCode = 200;
  res.json("Server running up");
});

//ROUTES
app.use("/user", userRouter);
app.use("/locale", LocaleController);
app.use("/page", PageController);
// app.use("/user", DashboardController);
app.use("/label", LabelController);
app.use("/pagelabel", PageLabelController);
app.use("/excel", excelUploadController);
app.use('/language',languageConotroller)

// app.listen(process.env.PORT, () => {
//   console.log(
//     `Server running at http://${process.env.HOSTNAME}:${process.env.PORT}`
//   );
// });

sequelize.sync().then((req) => {
  app.listen(process.env.PORT, () => {
    console.log(
      `server listening in http://${process.env.HOSTNAME}:${process.env.PORT}`
    );
  });
});
