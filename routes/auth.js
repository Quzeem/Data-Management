const express = require('express');
const { login, logout } = require('../controllers/auth');

const router = express.Router();

router.post('/login', login);
router.get('/logout', logout);

// Page not found error
// router.get("*", (req, res) => {
//     res.redirect('/login');
//   });
  

module.exports = router;
