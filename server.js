var express = require('express'),
  app = express(),
  port = process.env.PORT || 3100,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');

var assert = require('assert');
var fs = require('fs');
var ca = [ fs.readFileSync(__dirname + "/servercert.crt") ];
var options = {
    mongos: {
      ssl: true,
      sslValidate: true,
      sslCA: ca
    }
}  

var apiConfig = require('./api-config');

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

// If the connection throws an error
mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});
mongoose.connection.on('open', function (err) {
    assert.equal(null, err);
    mongoose.connection.db.listCollections().toArray(function(err, collections) {
        assert.equal(null, err);
        collections.forEach(function(collection) {
            console.log(collection);
        });
        mongoose.connection.db.close();
        process.exit(0);
    })
});
// Let's open that connection
mongoose.connect(process.env.MONGODB_URL, options);

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