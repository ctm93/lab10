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

app.use(express.urlencoded({extended:true}));

//routes
app.get("/", function(req, res){
    res.render("index");
});

app.post("/", async function(req, res){
    let username = req.body.username;
    let password = req.body.password;
    console.log("username:" + username);
    console.log("password:" + password);
    let hashedPwd = "$2a$10$9.Pb55gsPOmhSbqkMFn1WuqoQr6f7FJa7/RlxI02IGjzAbnyKxQhq";
    
    let passwordMatch = await checkPassword(password, hashedPwd);
    console.log("passwordMatch: " + passwordMatch);
    
    if (username == 'admin' && passwordMatch) {
        req.session.authenticated = true;
        res.render("welcome");
    } else {
        res.render("index", {"loginError":true});
    }
});

/**
 * Checks the bcrypt value of the password submitted
 * @param {string} password
 * @return {boolean}  true if password submitted is equal to
 *                    bcrypt-hashed value, false otherwise.
 * 
 */
 
 function isAuthenticated(req, res, next) {
     if (!req.session.authenticated) {
         res.redirect('/');
     } else {
       next()
     }
 }
 
  app.get("/myAccount", isAuthenticated, function(req, res){
         res.render("account");
 });
 
 app.get("/logout", function(req, res){
     req.session.destroy();
     res.redirect("/");
     });
 

 
 function checkPassword(password, hashedValue) {
     return new Promise( function(resolve, reject) {
         bcrypt.compare(password, hashedValue, function(err, result) {
             console.log("Result: " + result);
             resolve(result);
         });
     });
 }

//listener
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Running Express Server...");
});
