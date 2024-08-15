const bodyParser = require("body-parser");
let express = require("express");
require('dotenv').config()

let app = express();
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.ip)
    next()
})
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

app.use('/public', express.static(__dirname + '/public'))

let response
app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE === "allCaps") {
        response = "Hello json".toUpperCase();
    } else {
        response = "Hello World";
    }
    res.json({"message": response})
})

const time = (req, res, next) => {
    req.time = new Date().toString()
    next()
}
app.get('/now', time , (req, res) => {
   res.send(req.time)
})

app.get('/:word/echo', (req, res) => {
    const {word} = req.params
    res.json({echo: word})
})

app.get('/name', (req, res) => {
    const {first, last} = req.query
    res.json({name: first + " " + last})
})

app.post('/name', (req, res) => {
    const {first, last} = req.body
    res.json({name: first + " " + last})
})

module.exports = app;
