var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false})) 
app.use(express.json())

const mongoURI = 'mongodb+srv://tom123:tom123@disco.v4x55.mongodb.net/Users?retryWrites=true&w=majority'

mongoose
 .connect(mongoURI, {useNewUrlParser: true})
 .then(() => console.log("MongoDB connected"))
 .catch(err => console.log(err))

 var Users = require('./routes/Users')
 var Markers = require('./routes/Markers')

 app.use('/users', Users)

 app.listen(port, function () {
     console.log("Server is running on port: " + port)
 })
