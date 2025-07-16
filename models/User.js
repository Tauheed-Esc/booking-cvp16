const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  email:     { type: String, required: true, unique: true },
  password:  { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  genderPreference: {
    type: String,
    enum: ['Male', 'Female', 'No preference'],
    required: true
  },
  isVerified: { type: Boolean, default: false },
  otp: Number,
  otpExpiresAt: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
