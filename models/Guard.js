const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GaurdSchema = new Schema(
  {
    guard_name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      minlength: 2,
    },
    permanent_home_address: {
      type: String,
      required: [true, 'Please enter permanemt home address.'],
      trim: true,
      lowercase: true,
    },
    present_home_address: {
      type: String,
      required: [true, 'Please enter present home address.'],
      trim: true,
      lowercase: true,
    },
    phone_number: {
      type: String,
      required: [true, `Guarantor's phone number cannot be empty.`],
      trim: true,
    },
    date_of_birth: {
      type: String,
    },
    state_of_origin: {
      type: String,
      required: true,
      trim: true,
    },
    next_of_kin: {
      type: String,
      required: true,
    },
    next_of_kin_phone_number: {
      type: String,
      required: [true, `Guarantor's phone number cannot be empty.`],
      trim: true,
    },
    date_of_deployment: {
      type: Date,
    },
    post: {
      type: String,
      default: 'Guard',
    },
    beat: {
      type: String,
    },
    guarantors: [
      {
        name: {
          type: String,
          required: [true, 'Name cannot be blank.'],
          trim: true,
        },
        home_address: {
          type: String,
          required: [true, 'Please input a home address.'],
          trim: true,
          lowercase: true,
        },
        office_address: {
          type: String,
          trim: true,
        },
        phone_contact: {
          type: String,
          required: [true, `Guarantor's phone number cannot be empty.`],
          trim: true,
        },
        occupation: {
          type: String,
          required: [true, `Guarantor's occupation is required.`],
        },
        photo: {
          type: String,
          default:
            'https://res.cloudinary.com/zeemag/image/upload/v1601946625/konnet/no-avatar_a5icj4.png',
        },
        _id : false
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Guard', GaurdSchema);
