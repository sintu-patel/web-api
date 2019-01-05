'use strict';
var mongoose = require('mongoose');
var cmsIssuesData = require('../models/cmsIssuesModel').cmsIssuesData;
var webxtData = require('../models/webhookModal').webxtData;

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
  var payload = req.body;
  console.log(payload);
  var commits = payload.commits;
  var pusher = payload.pusher;
  var commitMessages = commits.map(function(commit) {
    return commit.message;
  });
  var response = {
    pusher: pusher,
    commitMessages: commitMessages
  };

  var messages = response.commitMessages.toString();

  const date = new Date();
  var webxtDataObj = new webxtData({
    message: messages,
    date: date
  });

  console.log(response);;
  webxtDataObj.save(function(err) {
    if ( err ) { 
      console.log('web hook data not saved');
      res.json({status: 'web hook data not saved'});
    }
    console.log('web hook data saved');
    res.json({status: 'web hook data saved'});
  });
}

exports.readWebHookData = function(req, res) {
  const query = {};
  webxtData.find(query, function(err, data) {
    if (err) {
      res.json({status: 'error while getting webhook data'});
    }
    var tab = {
      "pageData": data
    };
    res.json(tab);
  });
};

exports.fromGoogleCloud = function(req, res) {
  const data = req.body;
  console.log(data);
  res.json('Got data');
}

exports.ffapi = function(req, res) {
  const data = req.body;
  console.log(data);
  res.json('Got data');
}