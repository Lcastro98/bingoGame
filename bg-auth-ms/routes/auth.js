let express = require('express'),
    router = express.Router();

let authenticationController = require('../controllers/authController.js');

/**
 * Ruta para registrarse
 */
router.post('/signup', authenticationController.signup);

/**
 * Ruta para iniciar sesión
 */
router.post('/signin', authenticationController.signin);

/**
 * Verifica el token
 */
router.post('/verifyToken', authenticationController.verifyToken);

module.exports = router;