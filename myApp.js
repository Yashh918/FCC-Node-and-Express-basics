let express = require("express");
require('dotenv').config()

let app = express();
app.use((req, res, next) => {
    console.log(req.method + " " + req.path + " - " + req.path)
    next()
})

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
    return res.json({"message": response})
})




module.exports = app;
