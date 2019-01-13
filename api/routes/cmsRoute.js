'use strict';
module.exports = function(app) {
  var cmsController = require('../controllers/cmsController');
  var issueController = require('../controllers/issuesController');
  var AuthController = require('../jwt/auth/AuthController');
  var VerifyToken = require('../jwt/auth/VerifyToken');
  app.route('/cms').get(cmsController.readData);
  app.route('/savecms').post(VerifyToken, cmsController.saveData);
  app.route('/savefiledata').post(VerifyToken, cmsController.saveFileData);
  app.route('/uploadcms').post(VerifyToken, cmsController.uploadCMS);
  app.route('/cmsfinelist').get(cmsController.readFineListFromDb);
  app.route('/cmscorrectfinelist').get(cmsController.readFineListFromDb);
  app.route('/savellp').post(VerifyToken, cmsController.saveLLPData);
  app.route('/getllpdata').get(cmsController.readLLPFromDb);
  app.route('/getissuesdata').get(issueController.readData);
  app.route('/saveissuesdata').post(VerifyToken, issueController.saveData);
  app.route('/updateissuesdata').post(VerifyToken, issueController.updateData);
  app.route('/payload').post(issueController.webhookPayload);
  app.route('/getwebhookdata').get(issueController.readWebHookData);
  app.route('/fromgooglecloud').post(issueController.fromGoogleCloud);
  app.route('/ffapi').post(issueController.ffapi);
  app.use('/api/auth', AuthController);
}