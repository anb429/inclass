var express = require('express');
var mustacheExpress = require('mustache-express');

var app = express()

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname);

app.get('/', function(req, res) {
    res.send("Here's our branch version");
        // res.send('<html> <head></head> <body> <form method="get" action="."> Enter your name: <input type="text" name="name"> <input type="submit"> </form> </body> </html>');
    }
)

app.get('/dwd', function(req, res) {
        res.send("Our second route...");
    }
)

app.listen(8000, function() {
    console.log('Our first web server! Started on port 8000')
})