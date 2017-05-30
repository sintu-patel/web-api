'use strict';
var mongoose = require('mongoose');
var cmsContent = require('../models/cmsModel');
var multer = require('multer');

exports.readData = function(req, res) {
  cmsContent.find({}, function(err, data) {
    if (err) {
      console.log('Error');
    }
    var tab = {
      "linksHeading": "All information from api",
      "heading": "Information tracking from api",
      "categoriesHeading": "Information Categories from api",
      "data": data
    };
    res.json(tab);
  });
};

exports.saveData = function(req, res) {
  var data = req.body;
  var cmsData = new cmsContent({
    issue: data.issue,
    resolution: data.resolution
  });
  cmsData.save(function(err) {
    if ( err ) { 
      console.log(err);
    }
    res.json({status: 'completed'});
  });
};

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('file');

exports.uploadCMS = function(req, res) {
  upload(req, res, function(err){
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
      res.json({error_code:0,err_desc:null});
  });
}