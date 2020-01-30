// defining express pre-requisities
const express = require('express');
const passport = require('passport');
const authenticate = require('../middlewares/passport');
const userController = require('../controllers/userController');
const blockController = require('../controllers/blockController');

const router = express.Router();

// user controller
router.route('/signup').post(userController.user);
router.route('/peers').get(userController.getPeers);
router.route('/login/username/:username/password/:password').get(userController.login);

// chain controller
router.route('/blockchain').post(blockController.addBlock);
router.route('/blockchain/:userId').get(blockController.getChain);

module.exports = router;
