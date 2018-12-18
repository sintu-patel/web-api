'use strict';
module.exports = function(app) {
  var cmsController = require('../controllers/cmsController');
  var issueController = require('../controllers/issuesController');
  app.route('/cms').get(cmsController.readData);
  app.route('/savecms').post(cmsController.saveData);
  app.route('/savefiledata').post(cmsController.saveFileData);
  app.route('/uploadcms').post(cmsController.uploadCMS);
  app.route('/cmsfinelist').get(cmsController.readFineListFromDb);
  app.route('/cmscorrectfinelist').get(cmsController.readFineListFromDb);
  app.route('/savellp').post(cmsController.saveLLPData);
  app.route('/getllpdata').get(cmsController.readLLPFromDb);
  app.route('/getissuesdata').get(issueController.readData);
  app.route('/saveissuesdata').post(issueController.saveData);
  app.route('/updateissuesdata').post(issueController.updateData);
  app.route('/payload').post(issueController.webhookPayload);
}