import { Link } from 'react-router-dom';

const faqs = [
  { q: 'How do I enroll in a course?', a: 'Add the course to cart and complete checkout from your dashboard.' },
  { q: 'How do mentors upload videos?', a: 'Mentors can open Mentor Dashboard > My Courses > Manage Content.' },
  { q: 'Can I reset my password?', a: 'Yes, use the Forgot Password flow from the login page.' },
];

export default function FAQ() {
  return (
    <div className="min-h-[70vh] max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-6">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((item) => (
          <div key={item.q} className="card bg-base-100 border border-base-300 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-xl">{item.q}</h2>
              <p className="text-base-content/70">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <Link to="/contact" className="btn btn-primary">Still Need Help?</Link>
      </div>
    </div>
  );
}
