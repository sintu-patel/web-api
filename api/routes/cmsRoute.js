'use strict';
module.exports = function(app) {
  var cmsController = require('../controllers/cmsController');
  app.route('/cms').get(cmsController.readData);
  app.route('/savecms').post(cmsController.saveData);
  app.route('/uploadcms').post(cmsController.uploadCMS);
}