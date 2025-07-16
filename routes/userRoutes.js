const express = require('express');
const router = express.Router();
const {
  createUser,
  verifyOtp,
  loginUser
} = require('../controllers/userController');

router.post('/send-otp', createUser);
router.post('/verify-otp', verifyOtp);
router.post('/login', loginUser);

module.exports = router;
