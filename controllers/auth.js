const mysql = require("mysql");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password1#',
    database: 'login'
});

exports.register =(req, res) => {
    console.log(req.body);

    const {name, email, password, passwordConfirm} = req.body;

    db.query('SELECT email FROM user WHERE email =?', [email], async(error, results) =>{
        if(error){
            console.log(error);
        }

        if(results.length > 0){
            return res.render('register',{
                message: 'That email is already in use'
            });
        }
        else if(password !== passwordConfirm){
            return res.render('register',{
                message: 'Passwords do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO user SET ?', {name: name, email: email, password: password}, (error, results) => {
            if(error){
                console.log(error);
            }
            else{
                console.log(results);
                return res.render('register',{
                    message: 'User Registered'
                });
            }
        })
    });
    
}