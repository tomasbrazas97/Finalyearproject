var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var app = express()
const http = require('http');
const server = http.createServer(app);
var mongoose = require('mongoose')
const dotenv = require('dotenv');
const path = require('path');
const socketio = require('socket.io')
const io = socketio(server);


// load env vars
dotenv.config({ path: './config/config.env' });

// set static folder
app.use("/home", express.static(path.join(__dirname, 'client/src/app/home')));
app.use("/app", express.static(path.join(__dirname, 'client/src/app')));

// Run when client connects
io.on('connection', socket => {
    console.log('New WS connection...');
});

var port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false})) 
app.use(express.json())

const mongoURI = 'mongodb+srv://tom123:tom123@disco.v4x55.mongodb.net/Users?retryWrites=true&w=majority'

app.use('/api/v1/locations', require('./routes/locations'));

mongoose
 .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
 .then(() => console.log("MongoDB connected"))
 .catch(err => console.log(err))

 var Users = require('./routes/Users')

 app.use('/users', Users)

 app.listen(port, function () {
     console.log("Server is running on port: " + port)
 })