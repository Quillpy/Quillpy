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
          lineHeight: '1.2',
          fontFamily: "'JetBrains Mono', 'Fira Code', monospace"
        }}
      >
        <span style={{ color: '#7fbf9a' }}>quillpy@dev</span>
        <span style={{ color: '#a6b8ad' }}>:~$</span>
        <span 
          style={{ 
            color: '#7fbf9a',
            opacity: showCursor ? 1 : 0,
            transition: 'opacity 0.1s',
            marginLeft: '2px'
          }}
        >
          _
        </span>
      </h1>
      
      <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
        <div>
          <p style={{ color: '#7fbf9a', fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>
            Hi, I'm Quillpy
          </p>
        </div>
        
        <div className="pl-4 border-l-2" style={{ borderColor: '#1b2a24' }}>
          <p style={{ color: '#a6b8ad', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.8' }}>
            A curious mind exploring code, systems, and ideas.
          </p>
        </div>
        
        <div className="pl-4 border-l-2" style={{ borderColor: '#1b2a24' }}>
          <p style={{ color: '#a6b8ad', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.8' }}>
            I enjoy programming, Linux systems, and understanding how things work.
            This site is a small corner of the internet where I share projects,
            experiments, and things I'm learning along the way.
          </p>
        </div>
        
        <div className="mt-6">
          <p style={{ color: '#7b8f86', fontSize: '0.9rem' }}>
            <span style={{ color: '#7fbf9a' }}>→</span> Open a tab above to explore.
          </p>
        </div>
      </div>
    </div>
  );
}