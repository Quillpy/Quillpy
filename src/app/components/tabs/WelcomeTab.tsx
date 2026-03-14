import { useEffect, useState } from 'react';

export function WelcomeTab() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-12">
      <h1 
        className="mb-4 sm:mb-6"
        style={{ 
          fontSize: 'clamp(2rem, 5vw, 3rem)',
          fontWeight: '300',
          color: '#e6f0ea',
          lineHeight: '1.2'
        }}
      >
        Hi, I'm Quillpy 👋
        <span 
          style={{ 
            color: '#7fbf9a',
            opacity: showCursor ? 1 : 0,
            transition: 'opacity 0.1s'
          }}
        >
          _
        </span>
      </h1>
      
      <p 
        className="mb-6 sm:mb-8"
        style={{ 
          fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
          color: '#a6b8ad',
          fontWeight: '300'
        }}
      >
        A curious mind exploring code 💻, systems 🐧, and ideas.
      </p>
      
      <p 
        className="leading-relaxed"
        style={{ 
          fontSize: 'clamp(1rem, 2vw, 1.125rem)',
          color: '#a6b8ad',
          lineHeight: '1.8'
        }}
      >
        I enjoy programming, Linux systems, and understanding how things work.
        This site is a small corner of the internet where I share projects,
        experiments, and things I'm learning along the way 🚀
      </p>

      <p 
        style={{ 
          color: '#7b8f86',
          marginTop: '1.5rem',
          fontSize: '0.9rem'
        }}
      >
        Open a tab above to explore.
      </p>
    </div>
  );
}