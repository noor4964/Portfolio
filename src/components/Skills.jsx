import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  FiCode, FiSmartphone, FiDatabase, FiGlobe, 
  FiTool, FiCloud, FiGitBranch, FiTerminal 
} from 'react-icons/fi';
import {
  SiReact, SiTypescript, SiJavascript, SiPython,
  SiFlutter, SiDart, SiPhp, SiMysql,
  SiNodedotjs, SiMongodb, SiFirebase, SiGit,
  SiHtml5, SiCss3, SiTailwindcss, SiBootstrap,
  SiDotnet, SiTensorflow, SiDocker
} from 'react-icons/si';
import SkillsScene from './SkillsScene';
import './Skills.css';

const Skills = ({ repos }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Calculate language stats from repos
  const languageStats = useMemo(() => {
    // Check if repos is a valid array
    if (!repos || !Array.isArray(repos) || repos.length === 0) {
      return [];
    }
    
    const langCount = {};
    repos.forEach(repo => {
      if (repo.language) {
        langCount[repo.language] = (langCount[repo.language] || 0) + 1;
      }
    });
    
    const total = Object.values(langCount).reduce((a, b) => a + b, 0);
    if (total === 0) return [];
    
    return Object.entries(langCount)
      .map(([lang, count]) => ({
        name: lang,
        count,
        percentage: Math.round((count / total) * 100),
      }))
      .sort((a, b) => b.count - a.count);
  }, [repos]);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: <FiCode />,
      skills: [
        { name: 'React', icon: <SiReact />, level: 90, color: '#61dafb' },
        { name: 'TypeScript', icon: <SiTypescript />, level: 85, color: '#3178c6' },
        { name: 'JavaScript', icon: <SiJavascript />, level: 90, color: '#f7df1e' },
        { name: 'HTML5', icon: <SiHtml5 />, level: 95, color: '#e34c26' },
        { name: 'CSS3', icon: <SiCss3 />, level: 90, color: '#1572b6' },
        { name: 'Tailwind', icon: <SiTailwindcss />, level: 85, color: '#06b6d4' },
      ],
    },
    {
      title: 'Mobile',
      icon: <FiSmartphone />,
      skills: [
        { name: 'Flutter', icon: <SiFlutter />, level: 85, color: '#02569b' },
        { name: 'Dart', icon: <SiDart />, level: 85, color: '#0175c2' },
        { name: 'Firebase', icon: <SiFirebase />, level: 80, color: '#ffca28' },
      ],
    },
    {
      title: 'Backend',
      icon: <FiDatabase />,
      skills: [
        { name: 'Node.js', icon: <SiNodedotjs />, level: 80, color: '#339933' },
        { name: 'Python', icon: <SiPython />, level: 85, color: '#3776ab' },
        { name: 'PHP', icon: <SiPhp />, level: 75, color: '#777bb4' },
        { name: 'C#/.NET', icon: <SiDotnet />, level: 70, color: '#512bd4' },
      ],
    },
    {
      title: 'Database & Cloud',
      icon: <FiCloud />,
      skills: [
        { name: 'MongoDB', icon: <SiMongodb />, level: 80, color: '#47a248' },
        { name: 'MySQL', icon: <SiMysql />, level: 85, color: '#4479a1' },
        { name: 'Firebase', icon: <SiFirebase />, level: 80, color: '#ffca28' },
      ],
    },
    {
      title: 'Tools & Others',
      icon: <FiTool />,
      skills: [
        { name: 'Git', icon: <SiGit />, level: 90, color: '#f05032' },
        { name: 'Docker', icon: <SiDocker />, level: 60, color: '#2496ed' },
        { name: 'TensorFlow', icon: <SiTensorflow />, level: 65, color: '#ff6f00' },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className="skills-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Skills</span>
          <h2 className="section-title">
            My <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className="section-description">
            Technologies I've been working with recently
          </p>
        </motion.div>

        {/* Language Stats from GitHub */}
        <motion.div
          className="language-stats"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h3>GitHub Language Distribution</h3>
          <div className="stats-bar">
            {languageStats.slice(0, 6).map((lang, index) => (
              <motion.div
                key={lang.name}
                className="stat-segment"
                style={{
                  width: `${lang.percentage}%`,
                  backgroundColor: getLanguageColor(lang.name),
                }}
                initial={{ width: 0 }}
                animate={inView ? { width: `${lang.percentage}%` } : {}}
                transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
              />
            ))}
          </div>
          <div className="stats-legend">
            {languageStats.slice(0, 6).map((lang) => (
              <div key={lang.name} className="legend-item">
                <span 
                  className="legend-dot"
                  style={{ backgroundColor: getLanguageColor(lang.name) }}
                />
                <span className="legend-name">{lang.name}</span>
                <span className="legend-percent">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              className="skill-category"
              variants={itemVariants}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3>{category.title}</h3>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + catIndex * 0.1 + skillIndex * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="skill-info">
                      <span className="skill-icon" style={{ color: skill.color }}>
                        {skill.icon}
                      </span>
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        style={{ backgroundColor: skill.color }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ delay: 0.5 + catIndex * 0.1 + skillIndex * 0.05, duration: 0.8 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Orbit Animation */}
        <SkillsScene />
        <motion.div
          className="skills-orbit"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="orbit-center">
            <span>Full Stack</span>
          </div>
          <div className="orbit orbit-1">
            <div className="orbit-icon" style={{ '--delay': '0s' }}><SiReact /></div>
            <div className="orbit-icon" style={{ '--delay': '2s' }}><SiTypescript /></div>
            <div className="orbit-icon" style={{ '--delay': '4s' }}><SiNodedotjs /></div>
          </div>
          <div className="orbit orbit-2">
            <div className="orbit-icon" style={{ '--delay': '1s' }}><SiFlutter /></div>
            <div className="orbit-icon" style={{ '--delay': '3s' }}><SiPython /></div>
            <div className="orbit-icon" style={{ '--delay': '5s' }}><SiMongodb /></div>
            <div className="orbit-icon" style={{ '--delay': '7s' }}><SiFirebase /></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper function for language colors
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
    Batchfile: '#c1f12e',
  };
  return colors[language] || '#667eea';
};

export default Skills;
