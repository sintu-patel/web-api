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
  var cmsData = new cmsContent({
    issue: "What are the basic steps to unit test an AngularJS filter?",
    resolution: "Dependency injection is a powerful software design pattern that Angular employs to compose responsibilities through an intrinsic interface. However, for those new to the process, it can be puzzling where you need to configure and mock these dependencies when creating your isolated unit tests. The open-source project “Angular Test Patterns” is a free resource that is focused on dispelling such confusion through high-quality examples."
  });
  cmsData.save(function(err) {
    if ( err ) throw err;
    console.log("Saved Successfully");
  });
};