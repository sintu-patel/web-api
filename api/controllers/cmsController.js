'use strict';
var mongoose = require('mongoose');
var cmsContent = require('../models/cmsModel').cmsContent;
var cmsFiles = require('../models/cmsModel').cmsFiles;
var cmsFileData = require('../models/cmsModel').cmsFileData;
var formidable = require('formidable');
var fs = require('fs');
var node_xj = require("xls-to-json");

exports.readData = function(req, res) {
  cmsContent.find({}, function(err, data) {
    if (err) {
      res.json({status: 'error while getting data'});
    }
    var tab = {
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

exports.saveFileData = function(req, res) {
  var data = req.body;
  var cmsFileDataObj;
  var i;
  for (i = 0; i < data.length; i++) {
    cmsFileDataObj = new cmsFileData({
      name: data[i].name,
      fine: data[i].fine,
      currency: data[i].currency,
      collectedfine: data[i].collectedfine
    });
    const query = { _id: data[i]._id };
    cmsFileDataObj.save(query, function(err) {
      if ( err ) { 
        console.log('file-data-not-saved');
      }
      console.log('file-data-saved')
    });
  }
  res.json({
    status: 'file-data-saved'
  });
}

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
      var currentDate = new Date();
      var cmsFile = new cmsFiles({
        fileName: fileName,
        uploadDate: currentDate
      });
      cmsFile.save(function(err) {
        if ( err ) { 
          res.json({'status': 'uploaded-not-saved'});
        }
        res.json({'status': 'uploaded-saved'});
      });
    });
    source.on('error', function() {
      res.json({'status': 'not-uploaded'});
    });
  });
}

exports.readFineListFromFile = function(req, res) {
  var uploadDirectory = 'uploads\\';
  cmsFiles.find({}, function(err, data) {
    if (err) {
      res.json({status: 'error while getting data'});
    } else {
      var file = data && data[data.length - 1];
      var filePath = uploadDirectory + file.fileName;
      node_xj({
        input: filePath,
        output: null,
        sheet: "Sheet1"
      }, function(err, result) {
        if(err) {
          console.error(err);
        } else {
          res.json({"fileData": result});
        }
      });
    }
  });
}

exports.readFineListFromDb = function(req, res) {
  cmsFileData.find({}, function(err, data) {
    if (err) {
      res.json({status: 'error while getting data'});
    }
    var tab = {
      "fileData": data
    };
    res.json(tab);
  });
}