var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var VerifyToken = require('./VerifyToken');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');

/**
 * Configure JWT
 */
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');
var config = require('../config'); // get config file

router.post('/login', function (req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    // if user is found and password is valid
    // create a token
    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400 // expires in 24 hours
    });

    // return the information including token as JSON
    res.set({
      'x-access-token': token
    })
    res.status(200).send({ auth: true, 'x-access-token': token, name: user.name });
  });

});

router.post('/logout', function (req, res) {
  res.status(200).send({ auth: false, 'x-access-token': null });
});

router.post('/register', function (req, res) {

  User.find({email: req.body.email}, function (err, user) {
    if (err) {
      res.status(500).send({ error: 'user could not be registered' });
    } else if (!user || !user.length) {
      var hashedPassword = bcrypt.hashSync(req.body.password, 8);
      User.create({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      },
        function (err, user) {
          if (err) return res.status(500).send("There was a problem registering the user`.");

          // if user is registered without errors
          // create a token
          var token = jwt.sign({ id: user._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });

          res.status(200).send({ auth: true, 'x-access-token': token, name: req.body.name});
        });
    } else {
      res.status(500).send({ error: 'user could not be registered' });
    }
  });

});

router.post('/check-login', VerifyToken, function (req, res, next) {

  User.findById(req.userId, { password: 0 }, function (err, user) {
    if (err) return res.status(500).send({ auth: false });
    if (!user) return res.status(404).send({ auth: false });
    res.status(200).send({ auth: true, name: user.name });
  });

});

module.exports = router;