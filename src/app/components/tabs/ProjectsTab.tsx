import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const TIPS = [
  { text: 'Tabs can be added and closed - try the + button' },
  { text: 'The terminal supports cd, ls, help and more commands' },
];

interface Project {
  title: string;
  description: string;
  url: string;
}

const projects: Project[] = [
  {
    title: 'FastCR ⚡',
    description: 'A lightweight fast code runner.',
    url: 'https://github.com',
  },
  {
    title: 'Linux Setup 🐧',
    description: 'Custom Arch Linux KDE environment with minimal design.',
    url: 'https://github.com',
  },
  {
    title: 'Dotfiles ⚙️',
    description: 'Minimal configs for my Linux setup.',
    url: 'https://github.com',
  },
  {
    title: 'Experimental Ideas 🧪',
    description: 'Small coding experiments and tools.',
    url: 'https://github.com',
  },
];

export function ProjectsTab() {
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length);
    }, 5000);
    return () => clearInterval(tipInterval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-12">

      <h1
        className="mb-4"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.3rem)',
          fontWeight: '300',
          color: '#e6f0ea'
        }}
      >
        Projects 🚀
      </h1>

      <p
        className="mb-8"
        style={{
          color: '#a6b8ad',
          fontSize: 'clamp(1rem, 2vw, 1.1rem)'
        }}
      >
        A few things I've built or experimented with.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <p
        style={{
          color: '#7b8f86',
          marginTop: '1.8rem',
          fontSize: '0.9rem'
        }}
      >
        More projects coming soon.
      </p>

      <div className="mt-8 pt-4 border-t" style={{ borderColor: '#1b2a24' }}>
        <AnimatePresence mode="wait">
          <motion.p 
            key={currentTip}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            style={{ color: '#6f9f84', fontSize: '0.8rem' }}
          >
            <span style={{ color: '#8a5ca8' }}>💡</span> {TIPS[currentTip].text}
          </motion.p>
        </AnimatePresence>
      </div>

    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 sm:p-6 rounded-lg transition-all duration-200 cursor-pointer"
      style={{
        backgroundColor: isHovered ? '#1a1824' : 'transparent',
        border: `1px solid ${isHovered ? '#8a5ca8' : '#1b2a24'}`,
        boxShadow: isHovered ? '0 0 20px rgba(138, 92, 168, 0.1)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3
        className="mb-2"
        style={{
          fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
          color: isHovered ? '#a78bda' : '#e6f0ea',
          fontWeight: '500',
          transition: 'color 0.2s'
        }}
      >
        {project.title}
      </h3>

      <p style={{ color: '#a6b8ad', fontSize: 'clamp(0.875rem, 2vw, 1rem)' }}>
        {project.description}
      </p>
    </a>
  );
}