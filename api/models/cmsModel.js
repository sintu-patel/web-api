'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cmsSchema = new Schema({
    issue: String,
    resolution: String
});
var cmsContent = mongoose.model('issues', cmsSchema);

var cmsFileSchema = new Schema({
    fileName: String,
    uploadDate: String
});

var cmsFiles = mongoose.model('cmsfiles', cmsFileSchema);

var cmsFileDataSchema = new Schema({
    name: String,
    fine: String,
    currency: String,
    collectedfine: String
});

var cmsFileData = mongoose.model('cmsfiledatav2', cmsFileDataSchema);

module.exports = { cmsContent, cmsFiles, cmsFileData };