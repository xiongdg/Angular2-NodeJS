/**
 * Created by NBogdan on 11/27/16.
 */

var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.get('/', function (req, res) {
    res.send('Hello World!')
});

app.get('/test', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ a: 1 }));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});