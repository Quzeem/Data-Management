const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  username: String,
  password: {
    type: String,
    minlength: [6, 'Minimum password length is six characters'],
  },
});

module.exports = mongoose.model('Admin', AdminSchema);
