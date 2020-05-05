const express = require("express");
const app = express();
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

app.set('view engine', 'ejs');

app.use(session({
    secret: "top secret!",
    resave: true,
    saveUninitialized: true
}));

//routes
app.get("/", function(req, res){
    res.render("index");
});

//listener
app.listen(8080, "0.0.0.0", function(){
    console.log("Running Express Server...");
});
