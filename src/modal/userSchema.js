const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      validate: {
        validator: (email) => {
          if (!validator.isEmail(email)) {
            throw new Error('Invalid email format' + ' ' + email);
          }
        },
      },
    },
    password: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Userdata', userSchema);
