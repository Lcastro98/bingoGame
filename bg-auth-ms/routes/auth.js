let express = require('express'),
    router = express.Router();

let authenticationController = require('../controllers/authController.js');

router.post('/signup', authenticationController.signup);

router.post('/signin', authenticationController.signin);

module.exports = router;