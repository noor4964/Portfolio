import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import { 
  FiMail, FiMapPin, FiPhone, FiSend, 
  FiGithub, FiLinkedin, FiTwitter, FiInstagram,
  FiCheckCircle, FiAlertCircle
} from 'react-icons/fi';
import ContactScene from './ContactScene';
import './Contact.css';

const Contact = () => {
  const formRef = useRef();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: false, message: '' });

    // For demo purposes - replace with your EmailJS credentials
    try {
      // Simulating form submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // If you want to use EmailJS, uncomment and configure:
      // await emailjs.sendForm(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   formRef.current,
      //   'YOUR_PUBLIC_KEY'
      // );

      setStatus({
        loading: false,
        success: true,
        error: false,
        message: 'Message sent successfully! I\'ll get back to you soon.',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setStatus({ loading: false, success: false, error: false, message: '' });
      }, 5000);

    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Something went wrong. Please try again.',
      });
    }
  };

  const contactInfo = [
    {
      icon: <FiMail />,
      label: 'Email',
      value: 'noor4964@example.com',
      link: 'mailto:noor4964@example.com',
    },
    {
      icon: <FiMapPin />,
      label: 'Location',
      value: 'Bangladesh',
      link: null,
    },
    {
      icon: <FiGithub />,
      label: 'GitHub',
      value: 'github.com/noor4964',
      link: 'https://github.com/noor4964',
    },
  ];

  const socialLinks = [
    { icon: <FiGithub />, link: 'https://github.com/noor4964', label: 'GitHub' },
    { icon: <FiLinkedin />, link: '#', label: 'LinkedIn' },
    { icon: <FiTwitter />, link: '#', label: 'Twitter' },
    { icon: <FiInstagram />, link: '#', label: 'Instagram' },
  ];

  return (
    <section id="contact" className="contact" ref={ref}>
      <ContactScene />
      <div className="contact-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Contact</span>
          <h2 className="section-title">
            Let's Work <span className="gradient-text">Together</span>
          </h2>
          <p className="section-description">
            Have a project in mind? Let's create something amazing together.
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h3>Get In Touch</h3>
            <p>
              I'm always open to discussing new projects, creative ideas, 
              or opportunities to be part of your vision. Feel free to 
              reach out through any of the channels below.
            </p>

            <div className="info-cards">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  className="info-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="info-icon">{info.icon}</div>
                  <div className="info-content">
                    <span className="info-label">{info.label}</span>
                    {info.link ? (
                      <a href={info.link} target="_blank" rel="noopener noreferrer">
                        {info.value}
                      </a>
                    ) : (
                      <span>{info.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="social-links">
              <h4>Follow Me</h4>
              <div className="social-icons">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows="5"
                  required
                />
              </div>

              <motion.button
                type="submit"
                className={`submit-btn ${status.loading ? 'loading' : ''}`}
                disabled={status.loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {status.loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    Send Message
                    <FiSend />
                  </>
                )}
              </motion.button>

              {/* Status Messages */}
              {status.success && (
                <motion.div
                  className="status-message success"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiCheckCircle />
                  {status.message}
                </motion.div>
              )}

              {status.error && (
                <motion.div
                  className="status-message error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <FiAlertCircle />
                  {status.message}
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="contact-decoration">
        <div className="decoration-circle circle-1"></div>
        <div className="decoration-circle circle-2"></div>
      </div>
    </section>
  );
};

export default Contact;
