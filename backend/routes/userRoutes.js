const express = require('express');
const { loginUser, signUpUser, userInfo } = require('../controllers/userController');
const router = express.Router();


router.route('/login').post(loginUser);

router.route('/signup').post(signUpUser);

router.route('/info').get(userInfo);

module.exports = router;