var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var port = process.env.PORT || 3000
const nodemailer = require('nodemailer')
const nodemailMailgun = require('nodemailer-mailgun-transport')

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false})) 

const auth = {
    auth: {
        api_key: 'd9f4801425f60a4ecd1da24b61aa3a9b-0afbfc6c-e023f89a',
        domain: 'sandbox2fc275bcf81945c380226229bf0acc8b.mailgun.org'
    }
}

let transporter = nodemailer.createTransport(nodemailMailgun(auth));

const mailOptions = {
    "from": "test user <noreply@discoverus.org>",
    "to": 'tomasbrazas@gmail.com',
    "subject": 'testing',
    "text": "testing working"
}

transporter.sendMail(mailOptions, function(err, data) {
    if (err) {
        console.log('Error: ', err)
    } else {
        console.log('Message sent')
    }
})

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
