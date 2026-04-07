const NewsletterSubscription = require('../models/NewsletterSubscription');

// @desc    Subscribe to newsletter
// @route   POST /api/v1/newsletter/subscribe
// @access  Public
exports.subscribe = async (req, res, next) => {
  try {
    const { email, source } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existing = await NewsletterSubscription.findOne({ email: normalizedEmail });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: 'This email is already subscribed.'
      });
    }

    await NewsletterSubscription.create({
      email: normalizedEmail,
      source: source || 'footer'
    });

    return res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter.'
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err.message || 'Failed to subscribe'
    });
  }
};

