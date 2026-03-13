const express = require('express');
const {
  getCourses,
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courses');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

// Include other resource routers
const quizRouter = require('./quiz');

// Re-route into other resource routers
router.use('/:courseId/quiz', quizRouter);

router
  .route('/')
  .get(getCourses)
  .post(protect, authorize('mentor', 'admin'), createCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('mentor', 'admin'), updateCourse)
  .delete(protect, authorize('mentor', 'admin'), deleteCourse);

module.exports = router;
