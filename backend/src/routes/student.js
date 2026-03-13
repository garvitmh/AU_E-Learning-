const express = require('express');
const { getEnrolledCourses } = require('../controllers/student');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/courses').get(protect, getEnrolledCourses);

module.exports = router;
