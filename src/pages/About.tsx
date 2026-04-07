import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-[70vh] max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-4">About Coursiva</h1>
      <p className="text-base-content/70 text-lg leading-relaxed mb-6">
        Coursiva is an e-learning platform focused on practical courses, mentor-led guidance, and measurable learning outcomes.
      </p>
      <p className="text-base-content/70 leading-relaxed mb-8">
        Our mission is to help students, mentors, and administrators collaborate through one unified learning system.
      </p>
      <Link to="/courses" className="btn btn-primary">Explore Courses</Link>
    </div>
  );
}
