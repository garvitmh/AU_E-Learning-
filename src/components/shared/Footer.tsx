import { Link } from 'react-router-dom';
import { Button } from './Button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#1A202C', color: '#E2E8F0', paddingTop: '4rem' }}>
      {/* Subscribe Section */}
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
            Subscribe For Get Update<br />Every New Courses
          </h2>
          <p style={{ color: '#A0AEC0', fontSize: '1.1rem' }}>
            20K+ students daily learn with Coursiva. Subscribe for new courses.
          </p>
        </div>
        <form 
          onSubmit={(e) => e.preventDefault()} 
          style={{ display: 'flex', gap: '0.5rem', flex: '1 1 300px', maxWidth: '500px' }}
        >
          <input 
            type="email" 
            placeholder="Enter your email" 
            required 
            style={{ 
              flex: 1, 
              padding: '1rem 1.5rem', 
              borderRadius: '0.5rem', 
              border: 'none', 
              outline: 'none',
              fontSize: '1rem' 
            }} 
          />
          <Button variant="primary" size="lg" type="submit" style={{ padding: '0 2rem' }}>Subscribe</Button>
        </form>
      </div>

      {/* Main Footer Links */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '4rem 2rem',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '3rem'
      }}>
        
        {/* Brand Column */}
        <div>
          <img src="/photo/e-learning.png" alt="Coursiva Logo" style={{ height: '40px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <p style={{ color: '#A0AEC0', marginBottom: '2rem', lineHeight: 1.6 }}>
            Coursiva is a global training provider that offers high-quality video, audio, and live classes for every learner.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
             {/* Simple Social Icons placeholders */}
            {['f', '𝕏', '📷', 'in'].map((icon, i) => (
              <a key={i} href="#" style={{ 
                width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#2D3748', 
                display: 'flex', alignItems: 'center', justifyContent: 'center', 
                color: 'white', textDecoration: 'none', fontWeight: 'bold' 
              }}>
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Links Columns */}
        <div>
          <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>About Coursiva</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/" style={{ color: '#A0AEC0', textDecoration: 'none' }}>About Us</Link></li>
            <li><Link to="/" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Careers</Link></li>
            <li><Link to="/" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>Courses</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/courses" style={{ color: '#A0AEC0', textDecoration: 'none' }}>All Courses</Link></li>
            <li><Link to="/courses" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Browse by Category</Link></li>
            <li><Link to="/courses" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Trending</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 600 }}>Support & Legal</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li><Link to="/" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Contact Us</Link></li>
            <li><Link to="/" style={{ color: '#A0AEC0', textDecoration: 'none' }}>FAQ</Link></li>
            <li><Link to="/" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Privacy Policy</Link></li>
            <li><Link to="/" style={{ color: '#A0AEC0', textDecoration: 'none' }}>Terms of Service</Link></li>
          </ul>
        </div>

      </div>

      {/* Bottom Footer */}
      <div style={{ backgroundColor: '#0F172A', padding: '1.5rem 2rem', textAlign: 'center' }}>
        <p style={{ color: '#718096', margin: 0 }}>&copy; {currentYear} Coursiva. All rights reserved.</p>
      </div>
    </footer>
  );
}
