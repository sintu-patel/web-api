'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cmsIssueSchema = new Schema({
    createDate: String,
    issueType: String,
    name: String,
    dueDate: String,
    owner: String,
    isResolved: String
});
var cmsIssuesData = mongoose.model('cmsissuesrisknextstep', cmsIssueSchema);

module.exports = { cmsIssuesData };