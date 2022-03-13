var exports = module.exports = {};

let config = require('../config/database'),
    jwt = require('jsonwebtoken');

let User = require("../models/user");

exports.signup = function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.json({success: false, msg: 'Debe digitar el usuario y contraeña por favor.'});
    } else {
        let newUser = new User({
            username: req.body.username,
            password: req.body.password
        });
       
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Usuario duplicado.'});
            }
            res.json({success: true, msg: 'El nuevo usuario se ha creado satisfactoriamente.'});
        });
    }
};

exports.signin = function(req, res) {

    User.findOne({
        username: req.body.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Falló de autenticación. El usuario NO existe.'});
        } else {
            
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    let token = jwt.sign(user.toJSON(), config.secret);
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    console.log(isMatch, err);
                    res.status(401).send({success: false, msg: 'Falló de autenticación. Contraseña incorrecta.'});
                }
            });
        }
    });
};