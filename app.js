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

app.set('view engine', 'hbs');

db.connect((error) => {
    if(error){
        console.log(error)
    }
    else{
        console.log("MySQL Connected...")
    }
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.listen(5000, () =>{
    console.log("Server started on port 5000");
});