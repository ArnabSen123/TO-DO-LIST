const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const app = express()
const port = process.env.PORT || 5000
app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

//MySQL

//Listen on environment port or 5000
app.listen(port, () => console.log(`Listen on port ${port}`))