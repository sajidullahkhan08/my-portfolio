import { Link } from 'react-router-dom';
import { FiGithub, FiMail, FiHeart } from 'react-icons/fi';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-accent">S</span>ajidullah<span className="logo-dot">.</span>
            </Link>
            <p className="footer-tagline">Full-Stack Developer & Philosophical Thinker</p>
          </div>
          <div className="footer-links-group">
            <h4>Navigate</h4>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-links-group">
            <h4>Connect</h4>
            <a href="https://github.com/sajidullahkhan" target="_blank" rel="noopener noreferrer">
              <FiGithub size={14} /> GitHub
            </a>
            <a href="mailto:sajidullahkhan@example.com">
              <FiMail size={14} /> Email
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Sajidullah Khan. Crafted with <FiHeart size={12} className="heart-icon" /> and purpose.</p>
        </div>
      </div>
    </footer>
  );
}
