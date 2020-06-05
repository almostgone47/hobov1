const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users');

router.post('/login', controllers.loginUser);

router.post('/register', controllers.registerUser);

module.exports = router;