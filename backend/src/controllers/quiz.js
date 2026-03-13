const Quiz = require('../models/Quiz');
const QuizAttempt = require('../models/QuizAttempt');
const Enrollment = require('../models/Enrollment');

// @desc    Get quiz for a specific course
// @route   GET /api/v1/courses/:courseId/quiz
// @access  Private
exports.getQuizByCourse = async (req, res, next) => {
  try {
    const quiz = await Quiz.findOne({ course: req.params.courseId });

    if (!quiz) {
      return res.status(404).json({ success: false, error: 'No quiz found for this course.' });
    }

    // Strip out correct answers before sending to client
    const sanitizedQuiz = quiz.toObject();
    sanitizedQuiz.questions.forEach(q => {
      delete q.correctAnswerIndex;
      delete q.explanation;
    });

    res.status(200).json({ success: true, data: sanitizedQuiz });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Submit a quiz attempt
// @route   POST /api/v1/courses/:courseId/quiz/attempts
// @access  Private
exports.submitQuizAttempt = async (req, res, next) => {
  try {
    const { answers } = req.body; // Array of { questionId, selectedOptionIndex }
    const courseId = req.params.courseId;
    const userId = req.user.id;

    // Verify enrollment
    const enrollment = await Enrollment.findOne({ course: courseId, user: userId });
    if (!enrollment) {
      return res.status(403).json({ success: false, error: 'You must be enrolled to take the test.' });
    }

    const quiz = await Quiz.findOne({ course: courseId });
    if (!quiz) {
      return res.status(404).json({ success: false, error: 'Quiz not found.' });
    }

    let correctCount = 0;
    const gradedAnswers = answers.map((ans) => {
      const question = quiz.questions.find(q => q._id.toString() === ans.questionId);
      const isCorrect = question && question.correctAnswerIndex === ans.selectedOptionIndex;
      if (isCorrect) correctCount++;
      return {
        questionId: ans.questionId,
        selectedOptionIndex: ans.selectedOptionIndex,
        isCorrect
      };
    });

    const score = Math.round((correctCount / quiz.questions.length) * 100);
    const passed = score >= quiz.passingScore;

    const attempt = await QuizAttempt.create({
      user: userId,
      course: courseId,
      quiz: quiz._id,
      score,
      passed,
      answers: gradedAnswers
    });

    // Update enrollment progress (optional, but good for analytics)
    if (passed && enrollment.progress < 100) {
      enrollment.progress = 100;
      await enrollment.save();
    }

    res.status(201).json({
      success: true,
      data: {
        score,
        passed,
        correctCount,
        totalQuestions: quiz.questions.length,
        attemptId: attempt._id
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Get user's attempts for a quiz
// @route   GET /api/v1/courses/:courseId/quiz/attempts
// @access  Private
exports.getQuizAttempts = async (req, res, next) => {
  try {
    const attempts = await QuizAttempt.find({ 
      user: req.user.id, 
      course: req.params.courseId 
    }).sort('-completedAt');

    res.status(200).json({ success: true, count: attempts.length, data: attempts });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};
