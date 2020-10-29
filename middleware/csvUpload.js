const { Error } = require('mongoose');
const multer = require('multer');

require('dotenv').config({ path: '../config/.env' });

// set storage engine
const storage = multer.memoryStorage();

// Set fileSize limit - 1MB
const limits = {
  fileSize: parseInt(process.env.FILE_SIZE, 10),
};

// Specify acceptable file type
const fileFilter = (req, file, cb) => {
  // Accept csv only
  if (!file.originalname.endsWith('.csv')) {
    return cb(new Error('Please upload a csv file.'));
  }
  // else accept the file
  return cb(null, true);
};

// Init upload middleware
const upload = multer({ storage, limits, fileFilter });

module.exports = upload;
