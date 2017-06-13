'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cmsSchema = new Schema({
    issue: String,
    resolution: String
});
var cmsContent = mongoose.model('issuesv1', cmsSchema);

var cmsFileSchema = new Schema({
    fileName: String,
    uploadDate: String
});

var cmsFiles = mongoose.model('cmsfiles', cmsFileSchema);

var cmsFileDataSchema = new Schema({
    empid: String,
    name: String,
    fine: String,
    currency: String,
    collectedfine: String,
    isDeleted: String
});

var cmsFileArraySchema = new Schema({
    fileData: [cmsFileDataSchema],
    llpCloseDate: String
});

var cmsFileDataArray = mongoose.model('finelistv1', cmsFileArraySchema);

var cmsLLPSchema = new Schema({
    empid: String,
    name: String,
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String
});

var cmsLLPData = mongoose.model('cmsllpdata', cmsLLPSchema);

module.exports = { cmsContent, cmsFiles, cmsLLPData, cmsFileDataArray };