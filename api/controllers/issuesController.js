'use strict';
var mongoose = require('mongoose');
var cmsIssuesData = require('../models/cmsIssuesModel').cmsIssuesData;

exports.readData = function(req, res) {
  const issuesQuery = {issueType: 'issues-risk'};
  const nextStepQuery = {issueType: 'next-step'};
  cmsIssuesData.find(issuesQuery, function(err, data) {
    if (err) {
      res.json({status: 'error while getting issues data'});
    }
    var tab = {
      "issuesData": data
    };
    cmsIssuesData.find(nextStepQuery, function(err, nextStepdata) {
      if (err) {
        res.json({status: 'error while getting next step data'});
      }
      tab.nextStepsData = nextStepdata;
      res.json(tab);
    });
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