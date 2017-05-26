'use strict';
module.exports = function(app) {
  var cmsController = require('../controllers/cmsController');
  app.route('/cms').get(cmsController.readData);
  app.route('/savecms').get(cmsController.saveData);
}