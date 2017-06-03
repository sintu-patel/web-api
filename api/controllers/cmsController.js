'use strict';
var mongoose = require('mongoose');
var cmsContent = require('../models/cmsModel').cmsContent;
var cmsFiles = require('../models/cmsModel').cmsFiles;
var cmsFileData = require('../models/cmsModel').cmsFileData;
var cmsLLPData = require('../models/cmsModel').cmsLLPData;
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

var saveFileDataToDb = function(data) {
  var i;
  for (i = 0; i < data.length; i++) {
    let isDeleted = data[i].isDeleted && data[i].isDeleted === 'deleted';
    let oldData = data[i]._id;
    // delete the collection
    if (oldData && isDeleted) {
      cmsFileData.remove({ _id: data[i]._id }).exec();
    }
    // update the collection
    if (oldData && !isDeleted) {
      let query = { _id: data[i]._id };
      let updatedData = {
        _id: data[i]._id,
        empid: data[i].empid,
        name: data[i].name,
        fine: data[i].fine,
        currency: data[i].currency,
        collectedfine: data[i].collectedfine
      };
      cmsFileData.update(query, updatedData).exec();
    }
    // add new collection
    if (!oldData && !isDeleted) {
      let dataObj = new cmsFileData({
        name: data[i].name,
        empid: data[i].empid,
        fine: data[i].fine,
        currency: data[i].currency,
        collectedfine: data[i].collectedfine
      });
      dataObj.save();
    }
  }
}

exports.saveFileData = function(req, res) {
  var data = req.body;
  saveFileDataToDb(data);
  res.json({
    status: 'update-data-saved'
  });
}

var saveFileData = function(req, res, result) {
  var data = result;
  saveFileDataToDb(data);
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
       readDataFromFile(filePath, req, res);
    });
    source.on('error', function() {
      res.json({'status': 'not-uploaded'});
    });
  });
}

var readDataFromFile = function(filePath, req, res) {
  node_xj({
    input: filePath,
    output: null,
    sheet: "Sheet1"
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      saveFileData(req, res, result);
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

var saveLLPDataToDb = function(data) {
  var i;
  for (i = 0; i < data.length; i++) {
    let isDeleted = data[i].isDeleted && data[i].isDeleted === 'deleted';
    let oldData = data[i]._id;
    // delete the collection
    if (oldData && isDeleted) {
      cmsLLPData.remove({ _id: data[i]._id }).exec();
    }
    // update the collection
    if (oldData && !isDeleted) {
      let query = { _id: data[i]._id };
      let updatedData = {
        _id: data[i]._id,
        empid: data[i].empid,
        name: data[i].name,
        monday: data[i].monday,
        tuesday: data[i].tuesday,
        wednesday: data[i].wednesday,
        thursday: data[i].thursday,
        friday: data[i].friday
      };
      cmsLLPData.update(query, updatedData).exec();
    }
    // add new collection
    if (!oldData && !isDeleted) {
      let dataObj = new cmsLLPData({
        empid: data[i].empid,
        name: data[i].name,
        monday: data[i].monday,
        tuesday: data[i].tuesday,
        wednesday: data[i].wednesday,
        thursday: data[i].thursday,
        friday: data[i].friday
      });
      dataObj.save();
    }
  }
}

exports.saveLLPData = function(req, res) {
  var data = req.body;
  saveLLPDataToDb(data);
  res.json({
    status: 'update-data-saved'
  });
}

exports.readLLPFromDb = function(req, res) {
  cmsLLPData.find({}, function(err, data) {
    if (err) {
      res.json({status: 'error while getting data'});
    }
    var tab = {
      "fileData": data
    };
    res.json(tab);
  });
}