const express = require('express');

const {
  getAllGuards,
  getSingleGuard,
  showRegistrationForm,
  registerGuard,
  registerGuardsWithCSV,
  showEditForm,
  updateGuardData,
  deleteGuardData,
} = require('../controllers/guard');

const { auth } = require('../middleware/auth');
const csvUpload = require('../middleware/csvUpload');

const router = express.Router();

router.route('/').get(auth, getAllGuards).post(auth, registerGuard);
router
  .route('/csv/upload')
  .post(auth, csvUpload.single('csv'), registerGuardsWithCSV);
router.route('/new').get(auth, showRegistrationForm);

router
  .route('/:id')
  .get(auth, getSingleGuard)
  .delete(auth, deleteGuardData)
  .put(auth, updateGuardData);

router.get('/:id/edit', auth, showEditForm);

module.exports = router;
