var express = require('express');
var mustacheExpress = require('mustache-express');

var app = express()

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);

var PORT = process.env.PORT || 8000;

app.get('/', function (req, res) {
    res.render('index');
})

app.listen(PORT, function () {
    console.log('Our first web server! Listining on port: ' + PORT)
})