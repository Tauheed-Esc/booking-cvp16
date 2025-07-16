const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const User = require('../models/User');
const convertToUTC = require('../utils/convertToUTC');
const generateOtp = require('../utils/generateOtp');
const sendOtpEmail = require('../utils/sendEmail');


// POST /api/users/send-otp
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, dateOfBirth, genderPreference } = req.body;

    // Validate input fields
    if (!firstName || !lastName || !email || !password || !dateOfBirth || !genderPreference) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(400).json({ error: 'Email already registered and verified' });
      } else {
        return res.status(400).json({ error: 'Email already registered but not verified. Please verify or use a new email.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const dobUTC = convertToUTC(dateOfBirth);
    const otp = generateOtp();
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      dateOfBirth: dobUTC,
      genderPreference,
      otp,
      otpExpiresAt
    });

    await user.save();
    await sendOtpEmail(email, otp);

    res.status(201).json({ message: 'User created. OTP sent to email.' });

  } catch (err) {
    console.error('Error in createUser:', err.message);
    res.status(500).json({ error: 'Server error. Please try again.' });
  }
};


// POST /api/users/verify-otp
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ error: 'User not found' });
    if (user.isVerified) return res.status(400).json({ error: 'User already verified' });

    if (user.otp !== Number(otp) || user.otpExpiresAt < new Date()) {
      return res.status(400).json({ error: 'Invalid or expired OTP' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;

    await user.save();

    res.json({ message: 'Account verified successfully' });

  } catch (err) {
    console.error('Error in verifyOtp:', err.message);
    res.status(500).json({ error: 'Server error during verification' });
  }
};


// POST /api/users/login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('🔍 Login attempt:', email);

    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isVerified) {
      console.log('User not verified');
      return res.status(403).json({ error: 'Please verify your email first' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🧪 Password match:', isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token });

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
};
