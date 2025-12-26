import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Loader from './components/Loader';
import ParticleBackground from './components/ParticleBackground';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/noor4964'),
          fetch('https://api.github.com/users/noor4964/repos?sort=updated&per_page=30')
        ]);
        
        if (profileRes.ok) {
          const profileData = await profileRes.json();
          setProfile(profileData);
        }
        
        if (reposRes.ok) {
          const reposData = await reposRes.json();
          setRepos(Array.isArray(reposData) ? reposData : []);
        } else {
          // If API fails, set empty array to prevent errors
          setRepos([]);
        }
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // Set empty repos array on error
        setRepos([]);
      } finally {
        // Show loader for at least 2 seconds for better UX
        setTimeout(() => setLoading(false), 2000);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="app">
      <ParticleBackground />
      <Navbar />
      <main>
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills repos={repos} />
        <Projects repos={repos} />
        <Contact />
      </main>
      <Footer profile={profile} />
    </div>
  );
}

export default App;
