const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const router = express.Router();
const Register = require('./models/userModel')

const userRoutes = require('./routes/users')
const registerRoutes = require('./routes/register')

mongoose.connect('mongodb+srv://Medha:Medha@cluster0-adqz1.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })


app.use(morgan('dev'))
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use('/log', userRoutes);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/login.html')
});

app.get('/home', function(req, res) {
    res.sendFile(__dirname + '/public/garden-index.html')
});



app.use('/reg', registerRoutes);

module.exports = app