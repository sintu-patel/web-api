'use strict';


var mongoose = require('mongoose');
var cmsContent = require('../models/cmsModel');

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
  var query = req.query;
  var cmsData = new cmsContent({
    issue: query.issue,
    resolution: query.resolution
  });
  cmsData.save(function(err) {
    if ( err ) { 
      console.log(err);
    }
    res.json({status: 'completed'});
  });
};