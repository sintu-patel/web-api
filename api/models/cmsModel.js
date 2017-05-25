'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    q: String,
    a: String
});
var User = mongoose.model('tabs', userSchema);

module.exports = User;