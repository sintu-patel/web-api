var express = require('express'),
  app = express(),
  port = process.env.PORT || 3100,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser');


app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var fs = require('fs');
var ca = [ fs.readFileSync("servercert.crt") ];
var sslOptions = {
  ssl: true,
  sslValidate: true,
  sslCA: ca,
  ca: ca,
  poolSize: 1,
  reconnectTries: 1
};
var options = {
    db: sslOptions,
    mongos: sslOptions
};

var MONGODB_URL = 'mongodb://admin:JHLHGBETTDJGQHNS@sl-us-south-1-portal.8.dblayer.com:22286,sl-us-south-1-portal.6.dblayer.com:22286/admin?ssl=true';

var ca = [ fs.readFileSync(__dirname + "/servercert.crt") ];

var options = {
    mongos: {
      ssl: true,
      sslValidate: true,
      sslCA: ca
    }
}

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
mongoose.connect(MONGODB_URL, options);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
var routes = require('./api/routes/cmsRoute');
routes(app);


app.listen(port);


console.log('RESTful API server started on: ' + port);