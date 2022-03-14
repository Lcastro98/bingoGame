/**
 * Contiene los controladores para realizar la autenticación
 * 
 * @version 01.00.00
 * 
 * @author Lorena Castro <lcastro0398@gmail.com>
 */

var exports = module.exports = {};

var passport = require('passport');
require('../config/passport')(passport);

let config = require('../config/database'),
    jwt = require('jsonwebtoken');

let User = require("../models/user");

/**
 * Función para crear una cuenta
 * @param {*} req 
 * @param {*} res 
 */
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

/**
 * Función para iniciar sesión
 * @param {*} req 
 * @param {*} res 
 */
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
                    res.status(401).send({success: false, msg: 'Falló de autenticación. Contraseña incorrecta.'});
                }
            });
        }
    });
};

/**
 * Verifica el token de autenticación
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.verifyToken = function(req, res, next) {

        if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            jwt.verify(req.headers.authorization.split(' ')[1], config.secret, function(err, decode) {
                if (err) res.json({user: undefined});
                res.json({user: decode});
            });
        } else {
            res.json({user: undefined});
        }
};