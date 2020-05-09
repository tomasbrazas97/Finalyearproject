var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var port = process.env.PORT || 3000
const nodemailer = require('nodemailer')

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true})) // change to false if app breaks
app.use(express.static('./public'))
app.use(bodyParser.json())

const mongoURI = 'mongodb://localhost:27017/meanloginreg'

mongoose
 .connect(mongoURI, {useNewUrlParser: true})
 .then(() => console.log("MongoDB connected"))
 .catch(err => console.log(err))

 var Users = require('./routes/Users')

 app.use('/users', Users)

 app.listen(port, function () {
     console.log("Server is running on port: " + port)
 })
