const path = require('path');
const express = require('express')
const aylien = require("aylien_textapi");
const dotenv = require("dotenv");
dotenv.config();

const textAPI = new aylien({application_id: process.env.API_ID, application_key: process.env.API_KEY })

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
    console.log(res);
    // textAPI.sentiment({
    //     text: res,
    //     mode: 'tweet'
    // }, function (error, response) {
    //     if (error === null) {
    //         console.log(response)
    //     }
    // });
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 3000!')
})
