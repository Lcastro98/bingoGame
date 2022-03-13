var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var User = require("../models/user");

router.post('/signup', function(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Debe digitar el usuario y la contraseña por favor.'});
    } else {
      var newUser = new User({
        username: req.body.username,
        password: req.body.password
      });
      // save the user
      newUser.save(function(err) {
        if (err) {
          return res.json({success: false, msg: 'Usuario duplicado.'});
        }
        res.json({success: true, msg: 'El nuevo usuario se ha creado satisfactoriamente.'});
      });
    }
});

router.post('/signin', function(req, res) {
    User.findOne({
      username: req.body.username
    }, function(err, user) {
      if (err) throw err;
  
      if (!user) {
        res.status(401).send({success: false, msg: 'Falló de autenticación. El usuario NO existe.'});
      } else {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.sign(user.toJSON(), config.secret, {
              expiresIn: 604800 
            });
            res.json({success: true, token: 'JWT ' + token});
          } else {
            res.status(401).send({success: false, msg: 'Falló de autenticación. Clave incorrecta.'});
          }
        });
      }
    });
  });

  router.get('/signout', passport.authenticate('jwt', { session: false}), function(req, res) {
    req.logout();
    res.json({success: true, msg: 'Cierre de sesión exitoso.'});
  });
  
  getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(' ');
      if (parted.length === 2) {
        return parted[1];
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  module.exports = router;