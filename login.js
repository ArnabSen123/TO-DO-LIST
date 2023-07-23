const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const path = require('path');

const app = express();

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended : false}));

app.use(express.json());

app.set('view engine', 'hbs');


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password1#",
    database: "login"
});

// connect to the database
db.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});


app.get("/", (req, res) => {
    res.render("index");
});

app.post("/", function(req,res){
    var name = req.body.name;
    var password = req.body.password;

    db.query("SELECT * FROM user WHERE name = ? and password = ?", [name,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/toDo");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

// when login is success
app.get("/toDo",function(req,res){
    res.sendFile(__dirname + "/toDo.html")
})

app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(5001);