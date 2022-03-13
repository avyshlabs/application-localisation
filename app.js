const express = require('express');
const {sequelize} = require('./database');

const app = express();

app.listen(3000, ()=> {
    console.log(`Server running at https://${process.env.HOSTNAME}:${process.env.PORT}`)
});
