import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiArrowDown, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';
import HeroScene from './HeroScene';
import './Hero.css';

const Hero = ({ profile }) => {
  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <motion.div
          className="hero-text"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.span
            className="hero-greeting"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            👋 Hello, I'm
          </motion.span>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {profile?.name || 'SK. Nur Alam'}
          </motion.h1>

          <motion.div
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <span className="title-prefix">I'm a </span>
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'Flutter Developer',
                2000,
                'React Developer',
                2000,
                'Python Developer',
                2000,
                'Machine Learning Enthusiast',
                2000,
              ]}
              wrapper="span"
              speed={50}
              className="title-typed"
              repeat={Infinity}
            />
          </motion.div>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Passionate software developer with expertise in building modern web and mobile applications.
            I love turning ideas into reality through clean code and beautiful user experiences.
          </motion.p>

          <motion.div
            className="hero-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <motion.button
              className="btn btn-primary"
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(102, 126, 234, 0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
              <FiArrowDown className="btn-icon" />
            </motion.button>

            <motion.button
              className="btn btn-secondary"
              onClick={scrollToContact}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </motion.div>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <motion.a
              href="https://github.com/noor4964"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#667eea' }}
            >
              <FiGithub />
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#0077b5' }}
            >
              <FiLinkedin />
            </motion.a>
            <motion.a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: '#1da1f2' }}
            >
              <FiTwitter />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
        >
          <div className="hero-3d">
            <HeroScene />
          </div>

          <div className="image-wrapper">
            <div className="image-glow"></div>
            <div className="image-border"></div>
            <img
              src={profile?.avatar_url || 'https://avatars.githubusercontent.com/u/100152180?v=4'}
              alt={profile?.name || 'SK. Nur Alam'}
            />
            <div className="image-decoration decoration-1"></div>
            <div className="image-decoration decoration-2"></div>
            <div className="image-decoration decoration-3"></div>
          </div>

          <motion.div
            className="floating-card card-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <span className="card-icon">🚀</span>
            <span className="card-text">{profile?.public_repos || 18}+ Projects</span>
          </motion.div>

          <motion.div
            className="floating-card card-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
          >
            <span className="card-icon">💻</span>
            <span className="card-text">Full Stack Dev</span>
          </motion.div>

          <motion.div
            className="floating-card card-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <span className="card-icon">🎯</span>
            <span className="card-text">Problem Solver</span>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="scroll-mouse"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <div className="scroll-wheel"></div>
        </motion.div>
        <span>Scroll Down</span>
      </motion.div>
    </section>
  );
};

export default Hero;
