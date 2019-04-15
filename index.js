var express = require('express');
var mustacheExpress = require('mustache-express');

var app = express()

app.engine('html', mustacheExpress());
app.set('view engine', 'html');
app.set('views', __dirname);

appoops

oops

ender('foo', { 
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