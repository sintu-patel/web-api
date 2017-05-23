'use strict';


var mongoose = require('mongoose'),
  Task = mongoose.model('Tasks');

exports.list_all_tasks = function(req, res) {
  Task.find({}, function(err, task) {
    task = {
      "linksHeading": "All information",
      "heading": "Information tracking",
      "categoriesHeading": "Information Categories",
      "data" : [
        {
          "issue": "error TS1146: Declaration expected.",
          "resolution": "Remove semicolin Remove the semicolon at the end of your @Component();",
          "readMore": "http://www.google.com"
        },
        {
          "issue": "'pipes' does not exist in type 'Component'",
          "resolution": "Since RC6, all Directives and Pipes should be moved to module's declarations.",
          "readMore": "http://stackoverflow.com/questions/39539085/angular-2-0-release-pipes-and-directives-are-not-properties-of-component-anymo"
        },
        {
          "issue": "Can not bind to 'ngModel' since it is not a known property of 'input'",
          "resolution": "In order to be able to use two-way data binding for form inputs you need to import theFormsModule package in your Angular module.",
          "readMore": "http://stackoverflow.com/questions/38892771/cant-bind-to-ngmodel-since-it-isnt-a-known-property-of-input"
        },
        {
          "issue": "Cannot read property 'Symbol(Symbol.iterator)' of undefined",
          "resolution": "Since RC6, all Directives and Pipes should be moved to module's declarations.",
          "readMore": "http://stackoverflow.com/questions/39539085/angular-2-0-release-pipes-and-directives-are-not-properties-of-component-anymo"
        },
        {
          "issue": "'pipes' does not exist in type 'Component'",
          "resolution": "Since RC6, all Directives and Pipes should be moved to module's declarations.",
          "readMore": "http://stackoverflow.com/questions/39539085/angular-2-0-release-pipes-and-directives-are-not-properties-of-component-anymo"
        },
        {
          "issue": "Was Taiwan historically part of China?",
          "resolution": "Historically, Taiwan was not formally part of China until Ming Dynasty. There was troops sent to Taiwan like some expedition activity as early as Eastern Han Dynasty, but no goverment established so it was not part of China then. At that time Taiwan was refered to as Yizhou",
          "readMore": "http://www.google.com"
        },
        {
          "issue": "In what sense can Taiwan be recognized as a country?",
          "resolution": "Taiwan has its own local ethnic group, they had been settled there long before Zheng conquered Taiwan. So if we dates back to 300 years ago, Taiwan used to be independent, as an island. But that doesn’t make much sense to me. There is no exile goverment for local Taiwanese now. And if Taiwan go independent in this sense, how should we deal with Kinmen and Matsu, aka, the Fujian province in free area?Taiwan has its own local ethnic group, they had been settled there long before Zheng conquered Taiwan. So if we dates back to 300 years ago, Taiwan used to be independent, as an island. But that doesn’t make much sense to me. There is no exile goverment for local Taiwanese now. And if Taiwan go independent in this sense, how should we deal with Kinmen and Matsu, aka, the Fujian province in free area?Taiwan has its own local ethnic group, they had been settled there long before Zheng conquered Taiwan. So if we dates back to 300 years ago, Taiwan used to be independent, as an island. But that doesn’t make much sense to me. There is no exile goverment for local Taiwanese now. And if Taiwan go independent in this sense, how should we deal with Kinmen and Matsu, aka, the Fujian province in free area?Taiwan has its own local ethnic group, they had been settled there long before Zheng conquered Taiwan. So if we dates back to 300 years ago, Taiwan used to be independent, as an island. But that doesn’t make much sense to me. There is no exile goverment for local Taiwanese now. And if Taiwan go independent in this sense, how should we deal with Kinmen and Matsu, aka, the Fujian province in free area?Taiwan has its own local ethnic group, they had been settled there long before Zheng conquered Taiwan. So if we dates back to 300 years ago, Taiwan used to be independent, as an island. But that doesn’t make much sense to me. There is no exile goverment for local Taiwanese now. And if Taiwan go independent in this sense, how should we deal with Kinmen and Matsu, aka, the Fujian province in free area?",
          "readMore": "http://www.google.com"
        }
      ],
      "categories": [
        {
          "name": "Javascript",
          "hyperlink": "http://www.google.com"
        },
        {
          "name": "html5",
          "hyperlink": "http://www.google.com"
        },
        {
          "name": "css3",
          "hyperlink": "http://www.google.com"
        },
        {
          "name": "postcss",
          "hyperlink": "http://www.google.com"
        },
        {
          "name": "postcss",
          "hyperlink": "http://www.google.com"
        },
        {
          "name": "postcss",
          "hyperlink": "http://www.google.com"
        },
        {
          "name": "postcss",
          "hyperlink": "http://www.google.com"
        },
        {
          "name": "postcss",
          "hyperlink": "http://www.google.com"
        },
        {
          "name": "postcss",
          "hyperlink": "http://www.google.com"
        }
      ]
    };
    if (err)
      res.send(err);
    res.json(task);
  });
};




exports.create_a_task = function(req, res) {
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.read_a_task = function(req, res) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.update_a_task = function(req, res) {
  Task.findOneAndUpdate(req.params.taskId, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
};


exports.delete_a_task = function(req, res) {


  Task.remove({
    _id: req.params.taskId
  }, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
};