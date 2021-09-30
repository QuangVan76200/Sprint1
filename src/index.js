const express= require('express');
var app = express();
var router= require('./app/routes/routes');
const dotenv=require('dotenv').config();
const db=require('../src/config/db'); 
var path = require('path');
const Accounts = require('./app/models/Accounts');
const Argon2=require('argon2');
const route= require('./app/routes/index')
 


db.connect();

app.use(express.json());
app.use(express.urlencoded());

// app.get('/test2', function(req, res){
//     res.json('Dit me')
// })

// app.use(cookieParser()),

route(app),





app.listen(3535, () =>{
    console.log('server start on port');
}); 


