var express = require('express');
var mustacheExpress = require('mustache-express');
var request = require('request');

var app = express()

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);

// hw 2c

app.get('/homework2c', function (req, res) {
    console.log('homework2c start');
    if (req.query.url) {
        console.log('homework2c has URL', req.query.url);
        request(req.query.url, function (error, response, html) {
            console.log('homework2c got html data', typeof html, html);
            res.send(html);
        });
    } else {
        console.log('homework2c does not have URL');
        res.render('2c');
    }
});

// input types

app.get('/inputs', function (req, res) {
    res.render('inputs');
});

// mustache example

app.get('/template_example', function (req, res) {
    res.render('template_example', {
        bandName: "TooL",
        someArray: [
            {
                name: "1"
            },
            {
                name: "2"
            },
            {
                name: "3"
            },
        ]
    });
});

app.listen(8000, function () {
    console.log('Our first web server! Started on port 8000')
  })