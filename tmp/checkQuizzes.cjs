const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/.env' });

const checkQuizzes = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    // Define minimal schemas to avoid errors
    const Quiz = mongoose.model('Quiz', new mongoose.Schema({ course: mongoose.Schema.Types.ObjectId }));
    const Course = mongoose.model('Course', new mongoose.Schema({ title: String }));
    
    const quizzes = await Quiz.find();
    const courseIds = quizzes.map(q => q.course);
    
    const coursesWithQuizzes = await Course.find({ _id: { $in: courseIds } });
    
    console.log('\n--- Courses with Quizzes ---');
    if (coursesWithQuizzes.length === 0) {
      console.log('No courses found with quizzes.');
    } else {
      coursesWithQuizzes.forEach(c => console.log(`- ${c.title}`));
    }
    console.log('---------------------------\n');
    
    await mongoose.connection.close();
  } catch (err) {
    console.error('Error fetching courses with quizzes:', err);
    process.exit(1);
  }
};

checkQuizzes();
