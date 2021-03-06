var express = require('express'),
  app = express(),
  port = process.env.PORT || 3100,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

var apiConfig = require('./api-config');

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
  
mongoose.Promise = global.Promise;
mongoose.connect(apiConfig.dbPath, function(error) {
    if (error) {
        console.log('db connect error');
    }
});

var db = mongoose.connection;
 
db.on('error', function (err) {
console.log('connection error', err);
});
db.once('open', function () {
console.log('connected.');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
var routes = require('./api/routes/cmsRoute');
routes(app);


app.listen(port);


console.log('RESTful API server started on: ' + port);