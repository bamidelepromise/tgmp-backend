const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, "Please add the fullname"],
  },
  email: {
    type: String,
    required: [true, "Please add the user email address"],
    unique: [true, "Email address already taken"],
  },
  sex: {
    type: String,
    required: [true, "Please add sex"],
  },
  phoneNumber: {
    type: String,
  },
  address: {
    type: String,
  },
  password: {
    type: String,
    // required: [true, "Please add the user password"],
    select: false,
  },
  role: {
    type: String,
    enum: ['MEMBER', 'IT', 'ADMIN'],
    default: 'MEMBER',
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
}, {
  timestamps: true,
});

module.exports = mongoose.model("User", userSchema);
