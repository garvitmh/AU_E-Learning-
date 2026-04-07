import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="min-h-[70vh] max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-black mb-4">Contact Us</h1>
      <p className="text-base-content/70 mb-4">Need help with your account, courses, or mentor onboarding?</p>
      <div className="card bg-base-100 border border-base-300 shadow-sm">
        <div className="card-body">
          <p><strong>Email:</strong> support@coursiva.com</p>
          <p><strong>Hours:</strong> Mon-Fri, 9:00 AM - 6:00 PM</p>
        </div>
      </div>
      <div className="mt-6">
        <Link to="/faq" className="btn btn-outline">View FAQ</Link>
      </div>
    </div>
  );
}
