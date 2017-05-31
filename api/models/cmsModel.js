'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cmsSchema = new Schema({
    issue: String,
    resolution: String
});
var cmsContent = mongoose.model('issuelist', cmsSchema);

var cmsFileSchema = new Schema({
    fileName: String,
    uploadDate: String
});
var cmsFiles = mongoose.model('cmsfiles', cmsFileSchema);
module.exports = { cmsContent, cmsFiles };