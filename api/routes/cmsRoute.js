'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/cmsController');


  // todoList Routes
  app.route('/cms')
    .get(todoList.list_all_tasks)
    .post(todoList.create_a_task);


  app.route('/cms/:pageId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);
};
