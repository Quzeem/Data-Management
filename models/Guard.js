const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const GaurdSchema = new Schema(
  {
    guard_name: {
      type: String,
      required: [true, `Guard's name is required.`],
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
      required: [true, `Guard's phone number cannot be empty.`],
      trim: true,
    },
    date_of_birth: {
      type: String,
    },
    state_of_origin: {
      type: String,
      required: [true, 'State of origin is required'],
      trim: true,
    },
    next_of_kin: {
      type: String,
      required: [true, 'Next of kin name is required'],
    },
    next_of_kin_phone_number: {
      type: String,
      required: [true, 'Next of kin phone number is required.'],
      trim: true,
    },
    date_of_deployment: {
      type: String,
    },
    post: {
      type: String,
      default: 'Guard',
    },
    beat: {
      type: String,
    },
    guard_photo: {
      type: String,
      default:
        'https://res.cloudinary.com/zeemag/image/upload/v1601946625/konnet/no-avatar_a5icj4.png',
    },
    guard_photoId: {
      type: String,
      default: '2w3e45r',
    },
    guarantors: [
      {
        name: {
          type: String,
          required: [true, `Guarantor's name cannot be blank.`],
          trim: true,
        },
        home_address: {
          type: String,
          required: [true, `Please input guarantor's home address.`],
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
        photoId: {
          type: String,
          default: '2w3e45qr',
        },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Guard', GaurdSchema);
