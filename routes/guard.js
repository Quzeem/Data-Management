const express = require('express');

const {
  getAllGuards,
  getSingleGuard,
  showRegistrationForm,
  registerGuard,
  showEditForm,
  updateGuardData,
  deleteGuardData,
} = require('../controllers/guard');

const { auth } = require('../middleware/auth');

const router = express.Router();

router.route('/new').get(auth, showRegistrationForm);
router.route('/').get(auth, getAllGuards).post(auth, registerGuard);
router
  .route('/:id')
  .get(auth, getSingleGuard)
  .delete(auth, deleteGuardData)
  .put(auth, updateGuardData);

router.get('/:id/edit', auth, showEditForm);

module.exports = router;
