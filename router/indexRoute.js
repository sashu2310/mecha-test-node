// defining express pre-requisities
const express = require('express');
const passport = require('passport');
const authenticate = require('../middlewares/passport');
const userController = require('../controllers/userController');


const router = express.Router();

// user controller
router.route('/user').post(userController.user);
router.route('/login/username/:username/password/:password').get(userController.login);
router.route('/verify').get(passport.authenticate('jwt', { session: false }), userController.verify);

module.exports = router;
