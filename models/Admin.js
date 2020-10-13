const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: String,
  password: {
    type: String,
    minlength: [6, 'Minimum password length is six characters'],
  },
});

// Encrypt password using bcrypt
AdminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  }
});

// Sign JWT and return
AdminSchema.methods.signToken = function () {
  return jwt.sign(
    {
      id: this._id, //modified to auth middleware
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Match password for loginAdmin
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  const match = await bcrypt.compare(enteredPassword, this.password);
  return match;
};

module.exports = mongoose.model('Admin', AdminSchema);
