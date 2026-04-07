import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from './Button';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribeMsg, setSubscribeMsg] = useState<string | null>(null);
  const [subscribeError, setSubscribeError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const socialLinks = [
    { label: 'F', href: 'https://facebook.com' },
    { label: 'X', href: 'https://x.com' },
    { label: 'IG', href: 'https://instagram.com' },
    { label: 'IN', href: 'https://linkedin.com' },
  ];

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeError(null);
    setSubscribeMsg(null);

    try {
      setSubmitting(true);
      const res = await fetch('/api/v1/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'footer' }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Subscription failed');
      }

      setSubscribeMsg(data.message || 'Subscribed successfully!');
      setEmail('');
    } catch (err: any) {
      setSubscribeError(err.message || 'Subscription failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer style={{ backgroundColor: '#1A202C', color: '#E2E8F0', paddingTop: '4rem' }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem 4rem 2rem',
        borderBottom: '1px solid #2D3748',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <div style={{ flex: '1 1 500px' }}>
          <h2 style={{ fontSize: '2rem', color: 'white', marginBottom: '1rem', lineHeight: 1.2 }}>
            Subscribe For Updates<br />On New Courses
          </h2>
          <p style={{ color: '#A0AEC0', fontSize: '1.1rem' }}>
            Join our learning community and get updates on new releases.
          </p>
          {subscribeMsg && <p style={{ color: '#68D391', marginTop: '0.75rem' }}>{subscribeMsg}</p>}
          {subscribeError && <p style={{ color: '#FC8181', marginTop: '0.75rem' }}>{subscribeError}</p>}
        </div>
        <form
          onSubmit={handleSubscribe}
          style={{ display: 'flex', gap: '0.5rem', flex: '1 1 300px', maxWidth: '500px' }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              outline: 'none',
              fontSize: '1rem'
            }}
          />
          <Button variant="primary" size="lg" type="submit" disabled={submitting} style={{ padding: '0 2rem' }}>
            {submitting ? 'Submitting...' : 'Subscribe'}
          </Button>
        </form>
      </div>

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem'
      }}>
        <div>
          <img src="/photo/e-learning.png" alt="Coursiva Logo" style={{ height: '40px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <p style={{ color: '#A0AEC0', marginBottom: '2rem', lineHeight: 1.6 }}>
            Coursiva is a global training provider with high-quality video, audio, and live classes.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#2D3748',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>About Coursiva</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/about" style={{ color: '#A0AEC0', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link to="/mentor" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Careers</Link></li>
            <li><Link to="/books" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>Courses</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/courses" style={{ color: '#A0AEC0', textDecoration: 'none' }}>All Courses</Link></li>
            <li><Link to="/courses?cat=computer" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Browse by Category</Link></li>
            <li><Link to="/courses?sort=rating" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Trending</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>Support & Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/contact" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Contact Us</Link></li>
            <li><Link to="/faq" style={{ color: '#A0AEC0', textDecoration: 'none' }}>FAQ</Link></li>
            <li><Link to="/privacy" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Privacy Policy</Link></li>
            <li><Link to="/terms" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div style={{ backgroundColor: '#0F172A', padding: '1.5rem 2rem', textAlign: 'center' }}>
        <p style={{ color: '#718096', margin: 0 }}>&copy; {currentYear} Coursiva. All rights reserved.</p>
      </div>
    </footer>
  );
}
