'use strict';
var mongoose = require('mongoose');
var cmsContent = require('../models/cmsModel');
var formidable = require('formidable');
var fs = require('fs');

exports.readData = function(req, res) {
  cmsContent.find({}, function(err, data) {
    if (err) {
      res.json({status: 'error while getting data'});
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
      res.json({status: 'data-not-saved'});
    }
    res.json({status: 'data-saved'});
  });
};

exports.uploadCMS = function(req, res) {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var fileData = files.uploads;
    var fileName = fileData.name;
    var filePath = fileData.path;
    var uploadedFilePath = filePath;
    var fileUploadPath = 'uploads\\' + fileName;
    var source = fs.createReadStream(uploadedFilePath);
    var dest = fs.createWriteStream(fileUploadPath);
    source.pipe(dest);
    source.on('end', function() {
      res.json({'status': 'uploaded'});
    });
    source.on('error', function() {
      res.json({'status': 'not-uploaded'});
    });
  });
}

exports.readFineList = function(req, res) {
  var file = 'upload file';
  res.json({data: file});
}