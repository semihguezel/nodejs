var express = require('express');
var fs = require('fs');
var DATABASE = require('./database.js');
var app = express();
app.get('/', function (req, res, next) {
res.writeHead(200, { 'Content-Type': 'text/html' });
var myReadStream = fs.createReadStream(__dirname + '/index.html',
'utf8')
myReadStream.pipe(res);
});
app.use('/api/data', function (req, res) {
DATABASE.getAllLocations(function (err, data) {
if (err) {
res.sendStatus(500);
} else {
res.send(data);
}
})
});
app.listen(process.env.PORT || 4000, function(){
console.log("Express server listening on port %d in %s mode",
this.address().port, app.settings.env);
});
 
