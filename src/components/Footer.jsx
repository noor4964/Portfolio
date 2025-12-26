import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiTwitter, FiHeart, FiArrowUp } from 'react-icons/fi';
import './Footer.css';

const Footer = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: <FiGithub />, link: 'https://github.com/noor4964', label: 'GitHub' },
    { icon: <FiLinkedin />, link: '#', label: 'LinkedIn' },
    { icon: <FiTwitter />, link: '#', label: 'Twitter' },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Back to Top Button */}
        <motion.button
          className="back-to-top"
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiArrowUp />
        </motion.button>

        <div className="footer-content">
          {/* Logo & Description */}
          <div className="footer-brand">
            <a href="#home" className="footer-logo">
              <span className="logo-text">SK. NUR ALAM</span>
            </a>
            <p>
              Building digital experiences that make a difference. 
              Let's create something amazing together.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <nav>
              {navLinks.map((link) => (
                <a key={link.name} href={link.href}>
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-buttons">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © {currentYear} {profile?.name || 'SK. Nur Alam'}. All rights reserved.
          </p>
          <p className="made-with">
            Made with <FiHeart className="heart" /> using React
          </p>
        </div>
      </div>

      {/* Gradient Line */}
      <div className="footer-gradient"></div>
    </footer>
  );
};

export default Footer;
