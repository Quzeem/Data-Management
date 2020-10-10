const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: String,
  password: {
    type: String,
    minlength: [6, 'Minimum password length is six characters'],
  },
});


// Encrypt password using bcrypt
AdminSchema.pre("save", async function (next) {
  
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// Sign JWT and return

AdminSchema.methods.signToken = function () {
  return jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

// Match password for loginAdmin
AdminSchema.methods.matchPassword = async function (enteredPassword) {
  
  return await bcrypt.compare(enteredPassword, this.password);
};


module.exports = mongoose.model('Admin', AdminSchema);

