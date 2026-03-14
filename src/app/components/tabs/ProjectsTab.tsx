import { useState } from 'react';

interface Project {
  title: string;
  description: string;
  url: string;
}

const projects: Project[] = [
  {
    title: 'FastCR',
    description: 'A lightweight fast code runner.',
    url: 'https://github.com',
  },
  {
    title: 'Linux Setup',
    description: 'Custom Arch Linux KDE environment with minimal design.',
    url: 'https://github.com',
  },
  {
    title: 'Dotfiles',
    description: 'Minimal configs for my Linux setup.',
    url: 'https://github.com',
  },
  {
    title: 'Experimental Ideas',
    description: 'Small coding experiments and tools.',
    url: 'https://github.com',
  },
];

export function ProjectsTab() {
  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
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
        backgroundColor: isHovered ? '#1b2a24' : 'transparent',
        border: `1px solid ${isHovered ? '#6f9f84' : '#1b2a24'}`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h3 
        className="mb-2"
        style={{ 
          fontSize: 'clamp(1.125rem, 2.5vw, 1.25rem)',
          color: isHovered ? '#7fbf9a' : '#e6f0ea',
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