import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiLayers, FiSmartphone, FiDatabase, FiAward, FiCoffee } from 'react-icons/fi';
import AboutScene from './AboutScene';
import './About.css';

const About = ({ profile }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats = [
    { icon: <FiCode />, value: profile?.public_repos || '18+', label: 'Projects' },
    { icon: <FiAward />, value: '2', label: 'Research Papers' },
    { icon: <FiLayers />, value: 'ICCIT', label: 'Conference' },
    { icon: <FiDatabase />, value: '10+', label: 'Technologies' },
  ];

  const highlights = [
    {
      icon: <FiAward />,
      title: 'Research Excellence',
      description: 'Published researcher with papers in ICCIT and COMPASS conferences on deep learning applications.',
    },
    {
      icon: <FiCode />,
      title: 'AI & ML Integration',
      description: 'Specialized in building AI-driven applications with practical impact using deep learning techniques.',
    },
    {
      icon: <FiLayers />,
      title: 'Full Stack Development',
      description: 'End-to-end system design from database architecture to modern web and mobile interfaces.',
    },
    {
      icon: <FiDatabase />,
      title: 'Scalable Systems',
      description: 'Building robust, efficient, and scalable software architecture for real-world problems.',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="about" className="about" ref={ref}>
      <AboutScene />
      <div className="about-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Turning Ideas Into <span className="gradient-text">Digital Reality</span>
          </h2>
          <p className="section-description">
            Get to know the developer behind the code
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.div className="about-intro" variants={itemVariants}>
              <h3>Hello! I'm SK. Nur Alam</h3>
              <p>
                I am a Computer Science and Engineering student with a strong passion for building real-world software systems and exploring the practical impact of Artificial Intelligence and Machine Learning. I enjoy transforming complex problems into clean, scalable, and user-focused solutions through thoughtful system design and efficient implementation.
              </p>
              <p>
                My academic and research journey includes two peer-reviewed research papers—one accepted at the 28th International Conference on Computer and Information Technology (ICCIT) and another published in COMPASS. My research work focuses on applying deep learning techniques to solve real-life challenges, reflecting my interest in bridging theoretical concepts with practical applications.
              </p>
              <p>
                Alongside research, I actively develop software projects that address real user needs. My work includes a deep learning–based plant disease detection system, a cross-platform messaging application using Firebase, an AI-powered desktop assistant, an inventory management system for pharmaceutical products, and a pre-registration planning system for university students built with modern frameworks. Through these projects, I have gained hands-on experience in full-stack development, database design, AI model integration, and system optimization.
              </p>
              <p>
                I am particularly interested in software engineering, AI-driven applications, and scalable system architecture. I continuously refine my problem-solving skills through project-based learning and algorithmic thinking, and I aim to build technology that is not only functional but also impactful and reliable. I am currently seeking opportunities where I can contribute, learn, and grow as a software engineer while working on meaningful and challenging problems.
              </p>
            </motion.div>

            <motion.div className="about-stats" variants={itemVariants}>
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="stat-item"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="about-highlights"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                className="highlight-card"
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: '0 20px 40px rgba(102, 126, 234, 0.2)',
                }}
              >
                <div className="highlight-icon">{highlight.icon}</div>
                <h4>{highlight.title}</h4>
                <p>{highlight.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="about-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="cta-content">
            <FiCoffee className="cta-icon" />
            <div className="cta-text">
              <h4>Let's work together!</h4>
              <p>I'm always open to discussing new projects and opportunities.</p>
            </div>
            <motion.a
              href="#contact"
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
