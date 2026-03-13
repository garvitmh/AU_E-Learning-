const express = require('express');
const { getQuizByCourse, submitQuizAttempt, getQuizAttempts } = require('../controllers/quiz');

// Note: Re-routed from courses using mergeParams
const router = express.Router({ mergeParams: true });

const { protect } = require('../middleware/auth');

router.use(protect);

router.route('/')
  .get(getQuizByCourse);

router.route('/attempts')
  .get(getQuizAttempts)
  .post(submitQuizAttempt);

module.exports = router;
