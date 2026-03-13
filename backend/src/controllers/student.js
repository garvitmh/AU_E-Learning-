const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

// @desc    Get enrolled courses for a student
// @route   GET /api/v1/student/courses
// @access  Private (Student)
exports.getEnrolledCourses = async (req, res, next) => {
  try {
    const enrollments = await Enrollment.find({ user: req.user.id })
      .populate('course')
      .sort('-enrolledAt');

    res.status(200).json({
      success: true,
      count: enrollments.length,
      data: enrollments.map(e => ({
        id: e.course._id,
        title: e.course.title,
        image: e.course.image,
        description: e.course.description,
        progress: e.progress,
        instructor: e.course.mentorName || 'Unknown',
        nextLesson: 'Intro to Module 1', // Placeholder for now
        totalLessons: 10, // Placeholder
        completedLessons: Math.floor((e.progress / 100) * 10), // Calculated placeholder
        enrolledAt: e.enrolledAt
      }))
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};
