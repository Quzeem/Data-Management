const path = require('path');
const Guard = require('../models/Guard');
const DatauriParser = require('datauri/parser');
const { cloudinaryConfig, uploader } = require('../config/cloudinaryConfig');
const { findByIdAndUpdate } = require('../models/Guard');

require('dotenv').config({
  path: '../config/.env',
});
// Instantiate parser
const parser = new DatauriParser();

// Conncet Cloudinary
cloudinaryConfig();

/**
@desc    Upload Guard Avatar
@route   POST 
@access  Admin
*/

exports.guardAvatar = async (req, res) => {
  const _id = req.params.id;

  try {
    // Validate Id
    const guard = await Guard.findById(_id);

    if (!guard) {
      req.flash('error', 'Guard not found.');
      return res.redirect(`/guards/${guard._id}`);
    }

    if (!req.file) {
      req.flash('error', 'Please upload a file.');
      return res.redirect(`/guards/${guard._id}`);
    }

    //The file size needs to be reviewed
    if (
      req.file.size > process.env.FILE_SIZE ||
      req.file.size == process.env.FILE_SIZE
    ) {
      req.flash('error', 'File too large, upload a file of less than 1mb.');
      return res.redirect(`/guards/${guard._id}`);
    }

    //  Remove existing image in cloudinary
    if (guard.guard_photoId) {
      await uploader.destroy(guard.guard_photoId);
    }

    // Parse buffer file
    const image = parser.format(
      `${path.extname(req.file.originalname).toString()}`,
      req.file.buffer
    ).content;

    const result = await uploader.upload(image, {
      folder: 'cougar/guard',
    });

    // Save to db
    await Guard.findByIdAndUpdate(_id, {
      guard_photoId: result.public_id,
      guard_photo: result.secure_url,
    });

    req.flash('success', 'Image uploaded successfully.');
    return res.redirect(`/guards/${guard._id}`);
  } catch (error) {
    req.flash('error', 'Unable to upload photo.');
    return res.redirect(`/guards/${guard._id}`);
  }
};

/**
@desc    Upload GuarantorOne Avatar
@route   POST 
@access  Admin
*/

exports.guarantorOneAvatar = async (req, res) => {
  const _id = req.params.id;

  try {
    // Validate Id
    const guard = await Guard.findById(_id);

    if (!guard) {
      req.flash('error', 'Guard not found.');
      return res.redirect(`/guards/${guard._id}`);
    }

    if (!req.file) {
      req.flash('error', 'Please upload a file.');
      return res.redirect(`/guards/${guard._id}`);
    }

    //  Remove existing image in cloudinary
    if (guard.guarantors[0].photoId) {
      await uploader.destroy(guard.guarantors[0].photoId);
    }

    // Parse buffer file
    const image = parser.format(
      `${path.extname(req.file.originalname).toString()}`,
      req.file.buffer
    ).content;

    const result = await uploader.upload(image, {
      folder: 'cougar/guarantorOne',
    });

    // Update photoId and field
    guard.guarantors[0].photoId = result.public_id;
    guard.guarantors[0].photo = result.secure_url;

    // Save to db
    await guard.save();

    req.flash('success', 'Image uploaded successfully.');
    return res.redirect(`/guards/${guard._id}`);
  } catch (error) {
    req.flash('error', 'Unable to upload photo.');
    return res.redirect(`/guards/${guard._id}`);
  }
};

/**
@desc    Upload GuarantorTwo Avatar
@route   POST 
@access  Admin
*/
exports.guarantorTwoAvatar = async (req, res) => {
  const _id = req.params.id;

  try {
    // Validate Id
    const guard = await Guard.findById(_id);

    if (!guard) {
      req.flash('error', 'Guard not found.');
      return res.redirect(`/guards/${guard._id}`);
    }

    if (!req.file) {
      req.flash('error', 'Please upload a file.');
    }

    //  Remove existing image in cloudinary
    if (guard.guarantors[0].photoId) {
      await uploader.destroy(guard.guarantors[0].photoId);
    }

    // Parse buffer file
    const image = parser.format(
      `${path.extname(req.file.originalname).toString()}`,
      req.file.buffer
    ).content;

    const result = await uploader.upload(image, {
      folder: 'cougar/guarantorTwo',
    });

    // Update photoId and field
    guard.guarantors[1].photoId = result.public_id;
    guard.guarantors[1].photo = result.secure_url;

    // Save to db
    await guard.save();

    req.flash('success', 'Image uploaded successfully.');
    return res.redirect(`/guards/${guard._id}`);
  } catch (error) {
    req.flash('error', 'Unable to upload photo.');
    return res.redirect(`/guards/${guard._id}`);
  }
};
