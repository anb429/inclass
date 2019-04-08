// var request = require('request');
        
// var url = process.argv[2];

// request(url, function(error, response, html) {
//     console.log(html);
// });

var fs = require('fs');

var html = "<html><head></head><body><h1>" + Math.random() + "</h1></body></html>";

fs.writeFile('part-2b.html', html, function(err) {
    if (err) {
        console.log(err);
    }
});


// ----------

var fs = require('fs');

var INPUT = 'input.txt';
var OUTPUT = 'part-2c.html';

var input = fs.readFileSync(INPUT, "utf-8");
var lines = input.split("\n");

fs.writeFileSync(OUTPUT, "<html><head></head><body>");

for (var i=0; i<lines.length; i++) {
    fs.appendFileSync(OUTPUT, "<h1>" + lines[i] + "</h1>");
}
fs.appendFileSync(OUTPUT, "</body></html>");