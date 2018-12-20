'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var webXTRepoAlertSchema = new Schema({
    name: String,
    email: String,
    message: String,
    date: String
});
var webxtData = mongoose.model('webxtrepoalerts', webXTRepoAlertSchema);

module.exports = { webxtData };