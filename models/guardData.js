const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
  guard_name: {
    type: String,
    required: [true, 'Name is required.']
    trim: true,
    minlength: 2
  },
  guard_home_address:{
    type: String,
    required: [true,'Please input a home address.'],
    trim: true,
    lowercase: true
  },
  phone_number:{
    type: Number,
    required: [true, 'Guarantor\'s phone number cannot be empty.']
    trim: true
  },
  date_of_birth:{
    type: String
  },
  state_of_origin:{
    type: String,
    required : true,
    trim: true
  },
  next_of_kin :{
    type: String,
    required: true
  },
  date_of_deployment{
    type:Date
  },
  post:{
    type: String,
    default: 'Guard'
  },
  beat:{
    type:String
  },
  guarantor_one:{
    type: Schema.Types.ObjectId,
    ref: 'GuarantorOne'
  },
  guarantor_two:{
    type: Schema.Types.ObjectId,
    ref: 'GuarantorTwo'
  },
},{
      timestamps: true,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
