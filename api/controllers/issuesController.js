'use strict';
var mongoose = require('mongoose');
var cmsIssuesData = require('../models/cmsIssuesModel').cmsIssuesData;

exports.readData = function(req, res) {
  const query = {isResolved: 'not-resolved'};
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

exports.webhookPayload = function(req, res) {
  var data = req.body;
  var payload = data.payload;
  payload = JSON.parse(payload);
  var commits = payload.commits;
  var pusher = payload.pusher;
  var commitMessages = commits.map(function(commit) {
    return commit.message;
  });
  var response = {
    pusher: pusher,
    commitMessages: commitMessages
  };
  console.log(response);
  res.json({status: 'data-updated', data: response});
}