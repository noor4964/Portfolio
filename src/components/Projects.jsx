import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiFolder, FiStar, FiGitBranch } from 'react-icons/fi';
import ProjectsScene from './ProjectsScene';
import './Projects.css';

const Projects = ({ repos }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState('all');
  const [showAll, setShowAll] = useState(false);

  // Featured projects with enhanced data
  const featuredProjects = [
    {
      name: 'SafeRide-Connect-React-',
      displayName: 'SafeRide Connect',
      description: 'A comprehensive ride-sharing platform built with React and TypeScript. Features real-time tracking, secure payments, and driver-passenger matching.',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800',
      tags: ['React', 'TypeScript', 'Node.js', 'MongoDB'],
      featured: true,
    },
    {
      name: 'Flutter-Chat-App',
      displayName: 'Flutter Chat App',
      description: 'Real-time messaging application built with Flutter and Firebase. Supports text, images, voice messages, and video calls.',
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800',
      tags: ['Flutter', 'Dart', 'Firebase', 'WebRTC'],
      featured: true,
    },
    {
      name: 'ML-Model-Trainer-Flutter-App',
      displayName: 'ML Model Trainer',
      description: 'Mobile app for training and deploying machine learning models. Includes image classification, text analysis, and custom model support.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
      tags: ['Flutter', 'TensorFlow', 'Python', 'ML'],
      featured: true,
    },
    {
      name: 'Safe-Ride-Connect',
      displayName: 'Safe Ride Connect Mobile',
      description: 'Flutter-based mobile application for the SafeRide platform with native performance and beautiful UI.',
      image: 'https://images.unsplash.com/photo-1557862921-37829c790f19?w=800',
      tags: ['Flutter', 'Dart', 'Firebase', 'Maps'],
      featured: true,
    },
    {
      name: 'online-classroom-management',
      displayName: 'Online Classroom',
      description: 'Complete learning management system with course creation, student tracking, assignments, and video conferencing.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800',
      tags: ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
      featured: true,
    },
    {
      name: 'GymManagementSystem_C_Sharp',
      displayName: 'Gym Management System',
      description: 'Desktop application for gym management with member tracking, payment processing, and workout planning.',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800',
      tags: ['C#', '.NET', 'SQL Server', 'WinForms'],
      featured: true,
    },
  ];

  // Get unique languages/technologies
  const technologies = useMemo(() => {
    // Check if repos is a valid array
    if (!repos || !Array.isArray(repos) || repos.length === 0) {
      return ['all'];
    }
    
    const langs = repos
      .filter(repo => repo.language)
      .map(repo => repo.language);
    return ['all', ...new Set(langs)];
  }, [repos]);

  // Merge GitHub data with featured projects
  const projectsData = useMemo(() => {
    // Check if repos is a valid array
    if (!repos || !Array.isArray(repos) || repos.length === 0) {
      return featuredProjects;
    }
    
    return featuredProjects.map(project => {
      const repoData = repos.find(r => r.name === project.name);
      return {
        ...project,
        ...repoData,
        displayName: project.displayName,
        customDescription: project.description,
        image: project.image,
        tags: project.tags,
      };
    }).filter(p => p.html_url || p.name); // Show projects even if not on GitHub
  }, [repos]);

  // Other projects from GitHub
  const otherProjects = useMemo(() => {
    // Check if repos is a valid array
    if (!repos || !Array.isArray(repos) || repos.length === 0) {
      return [];
    }
    
    const featuredNames = featuredProjects.map(p => p.name);
    return repos
      .filter(repo => !featuredNames.includes(repo.name) && repo.name !== 'noor4964')
      .slice(0, showAll ? 12 : 6);
  }, [repos, showAll]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    if (filter === 'all') return projectsData;
    return projectsData.filter(p => 
      p.language?.toLowerCase() === filter.toLowerCase() ||
      p.tags?.some(t => t.toLowerCase() === filter.toLowerCase())
    );
  }, [projectsData, filter]);

  const getLanguageColor = (language) => {
    const colors = {
      TypeScript: '#3178c6',
      JavaScript: '#f7df1e',
      Python: '#3776ab',
      Dart: '#0175c2',
      PHP: '#777bb4',
      'C#': '#239120',
      'C++': '#00599C',
      HTML: '#e34c26',
      CSS: '#1572b6',
      'Jupyter Notebook': '#f37626',
    };
    return colors[language] || '#667eea';
  };

  return (
    <section id="projects" className="projects" ref={ref}>
      <ProjectsScene />
      <div className="projects-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-description">
            A selection of my recent work and personal projects
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="filter-buttons"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {technologies.slice(0, 8).map((tech) => (
            <motion.button
              key={tech}
              className={`filter-btn ${filter === tech ? 'active' : ''}`}
              onClick={() => setFilter(tech)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {tech === 'all' ? 'All Projects' : tech}
            </motion.button>
          ))}
        </motion.div>

        {/* Featured Projects Grid */}
        <motion.div
          className="projects-grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.name}
                className="project-card featured"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -10 }}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.displayName} />
                  <div className="project-overlay">
                    <motion.a
                      href={project.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FiGithub />
                    </motion.a>
                    {project.homepage && (
                      <motion.a
                        href={project.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FiExternalLink />
                      </motion.a>
                    )}
                  </div>
                </div>
                
                <div className="project-content">
                  <div className="project-header">
                    <h3>{project.displayName}</h3>
                    <div className="project-stats">
                      <span>
                        <FiStar /> {project.stargazers_count || 0}
                      </span>
                      <span>
                        <FiGitBranch /> {project.forks_count || 0}
                      </span>
                    </div>
                  </div>
                  
                  <p className="project-description">
                    {project.customDescription || project.description || 'No description available'}
                  </p>
                  
                  <div className="project-tags">
                    {project.tags?.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Other Projects */}
        <motion.div
          className="other-projects-section"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h3 className="other-projects-title">Other Noteworthy Projects</h3>
          
          <div className="other-projects-grid">
            {otherProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="other-project-card"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.4 }}
                whileHover={{ y: -5 }}
              >
                <div className="card-header">
                  <FiFolder className="folder-icon" />
                  <div className="card-links">
                    <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                      <FiGithub />
                    </a>
                    {project.homepage && (
                      <a href={project.homepage} target="_blank" rel="noopener noreferrer">
                        <FiExternalLink />
                      </a>
                    )}
                  </div>
                </div>
                
                <h4>{project.name.replace(/-/g, ' ').replace(/_/g, ' ')}</h4>
                <p>{project.description || 'A project from my GitHub repository.'}</p>
                
                <div className="card-footer">
                  {project.language && (
                    <span 
                      className="language"
                      style={{ '--lang-color': getLanguageColor(project.language) }}
                    >
                      <span className="lang-dot"></span>
                      {project.language}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {otherProjects.length >= 6 && (
            <motion.button
              className="show-more-btn"
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? 'Show Less' : 'Show More'}
            </motion.button>
          )}
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          className="github-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <p>Want to see more of my work?</p>
          <motion.a
            href="https://github.com/noor4964"
            target="_blank"
            rel="noopener noreferrer"
            className="github-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiGithub />
            View GitHub Profile
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
