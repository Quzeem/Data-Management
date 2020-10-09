const express = require('express');
const { loginAdmin } = require('../controllers/auth-controller');

const router = express.Router();

router.get('/login', loginAdmin);

module.exports = router;
