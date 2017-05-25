'use strict';


var mongoose = require('mongoose');
var User = require('../models/cmsModel');

exports.readData = function(req, res) {
  User.find({}, function(err, data) {
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