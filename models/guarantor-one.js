const mongoose = require('mongoose')

const Schema = mongoose.Schema
const GuarantorOneSchema = new Schema({

name:{
  type: String,
  required: [true, 'Name cannot be blank.'],
  trim: true,
},
home_address:{
  type: String,
  required: [true,'Please input a home address.'],
  trim: true,
  lowercase: true
},
Office_address:{
  type: String,
  trim: true,
},
Phone_number:{
  type: Number,
  required: [true, 'Guarantor\'s phone number cannot be empty.']
  trim: true
},
occupation:{
  type: String,
  required: [true, 'Guarantor\'s occupation is required.']
},
photo:{
  type: String
}

})


module.exports = mongoose.model('GuarantorOne', GuarantorOneSchema)
