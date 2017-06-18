'use strict';
var mongoose = require('mongoose');
var cmsIssuesData = require('../models/cmsIssuesModel').cmsIssuesData;

exports.readData = function(req, res) {
  const query = {};
  cmsIssuesData.find(query, function(err, data) {
    if (err) {
      res.json({status: 'error while getting issues data'});
    }
    var tab = {
      "pageData": data
    };
    res.json(tab);
  });
};

exports.saveData = function(req, res) {
  var data = req.body;
  const date = new Date();
  var issuesData = new cmsIssuesData({
    createDate: date,
    issueType: data.issueType,
    name: data.name,
    dueDate: data.dueDate,
    owner: data.owner,
    isResolved: data.isResolved || 'not-resolved'
  });
  issuesData.save(function(err) {
    if ( err ) { 
      res.json({status: 'data-not-saved'});
    }
    res.json({status: 'data-saved'});
  });
};

exports.updateData = function(req, res) {
  var data = req.body;
  const date = new Date();
  var issuesData = {
    _id: data._id,
    issueType: data.issueType,
    name: data.name,
    dueDate: data.dueDate,
    owner: data.owner,
    isResolved: data.isResolved || 'not-resolved'
  };
  const query = {_id: data._id};
  cmsIssuesData.update(query, issuesData).exec();
  res.json({status: 'data-updated'});
};