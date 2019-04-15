var express = require('express');
var mustacheExpress = require('mustache-express');

var app = express()

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);

app.get('/', function(req, res) {
  if (req.query.story) {
    res.send("Cool story bro");
    return;
  }
  // res.send('<html><head></head><body>');
  // res.send("<h1>Hello" + req.query.form_input_name + "</h1>");
  // res.send('</body></html>');
    res.render('foo', { 
      template_variable_name: req.query.form_input_name
    });
  }
)

app.get('/dwd', function (req, res) {
  res.send("Our second route...");
}
)

app.listen(8000, function () {
  console.log('Our first web server! Started on port 8000')
})