const express = require("express");
const path = require('path');
const mysql = require("mysql");
const dotenv = require('dotenv');

dotenv.config({path: './env'});

const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1#',
    database: 'login'
});

const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory));

app.use(express.urlencoded({extended : false}));

app.use(express.json());

app.set('view engine', 'hbs');

db.connect((error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL Connected...")
    }
});

//Define routes
app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(5001, () =>{
    console.log("Server started on port 5001");
});


/*app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.hbs");
})

exports.index =(req, res) => {
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();

app.post("/", encoder, function(req,res){
   var name = req.body.name;
   var password = req.body.password;
db.query("SELECT * FROM user WHERE name =? and password =? ",[name, password], function(error,results,fields){
    if(results.length >0){
        res.redirect("/welcome")
    }
    else{
        console.log("/");
    }
    });
    res.end();
});

app.get("/welcome", function(req,res){
    res.sendFile(__dirname+"/welcome.html")
})
}*/