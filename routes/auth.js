const express = require('express');
const { showLoginForm, login, logout } = require('../controllers/auth');

const router = express.Router();

router.get('/login', showLoginForm);
router.post('/login', login);
router.get('/logout', logout);

module.exports = router;
