const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = async (req, res, next) => {
  try {
    const { username, email, password, phone } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, error: 'Please add a password' });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      phone
    });

    sendTokenResponse(user, 201, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({ success: false, error: 'Please provide an email and password' });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// @desc    Login with Google (using access_token from @react-oauth/google useGoogleLogin)
// @route   POST /api/v1/auth/google
// @access  Public
exports.googleLogin = async (req, res, next) => {
  try {
    const { token } = req.body;
    console.log('Google login attempt with token length:', token ? token.length : 0);
    
    if (!token) {
      return res.status(400).json({ success: false, error: 'Google token is required' });
    }

    // Fetch user profile using the access_token from Google's userinfo endpoint
    console.log('Fetching user info from Google...');
    const googleRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!googleRes.ok) {
      const errorText = await googleRes.text();
      console.log('Google API error:', googleRes.status, errorText);
      return res.status(401).json({ success: false, error: 'Invalid Google access token' });
    }

    const googleUser = await googleRes.json();
    console.log('Google User Info received for:', googleUser.email);
    const { name, email, sub } = googleUser;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Could not retrieve email from Google' });
    }

    let user = await User.findOne({ email });

    if (!user) {
      console.log('Creating new user from Google profile:', email);
      user = await User.create({
        username: name || email.split('@')[0],
        email,
        googleId: sub,
        role: 'student'
      });
    } else if (!user.googleId) {
      console.log('Updating existing user with Google ID:', email);
      user.googleId = sub;
      await user.save();
    }

    console.log('Google login successful for:', email);
    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('CRITICAL ERROR in googleLogin:', err.stack || err);
    res.status(400).json({
      success: false,
      error: 'Google login failed'
    });
  }
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    }
  });
};

// @desc    Get current logged in user
// @route   GET /api/v1/auth/me
// @access  Private
exports.getMe = async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user
  });
};

// @desc    Get all users
// @route   GET /api/v1/auth/users
// @access  Private/Admin
exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
