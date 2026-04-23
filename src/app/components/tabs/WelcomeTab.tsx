import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Folder, Terminal, User, Link, Heart, BookOpen, Sparkles } from 'lucide-react';

const QUICK_ACTIONS = [
  { label: 'Projects', icon: Folder, hint: 'View my projects and work', path: 'projects' },
  { label: 'Terminal', icon: Terminal, hint: 'Open the terminal', path: 'terminal' },
  { label: 'About', icon: User, hint: 'Learn more about me', path: 'about' },
  { label: 'Connect', icon: Link, hint: 'Get in touch', path: 'connect' },
  { label: 'Support', icon: Heart, hint: 'Support my work', path: 'support' },
  { label: 'Logs', icon: BookOpen, hint: 'Read my life logs', path: 'logs' },
];

interface WelcomeTabProps {
  onNavigate?: (path: string) => void;
}

export function WelcomeTab({ onNavigate }: WelcomeTabProps) {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.div>
      
      <div className="mt-8 sm:mt-12 space-y-4 sm:space-y-6" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <p style={{ color: '#7fbf9a', fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}>
            Hi, I'm Quillpy
          </p>
        </motion.div>
        
        <motion.div 
          className="pl-4 border-l-2"
          style={{ borderColor: '#1b2a24' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p style={{ color: '#a6b8ad', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.8' }}>
            A curious mind exploring code, systems, and ideas.
          </p>
        </motion.div>
        
        <motion.div 
          className="pl-4 border-l-2"
          style={{ borderColor: '#1b2a24' }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p style={{ color: '#a6b8ad', fontSize: 'clamp(0.875rem, 2vw, 1rem)', lineHeight: '1.8' }}>
            I enjoy programming, Linux systems, and understanding how things work.
            This site is a small corner of the internet where I share projects,
            experiments, and things I'm learning along the way.
          </p>
        </motion.div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <p style={{ color: '#7b8f86', fontSize: '0.9rem', marginBottom: '1rem' }}>
            Quick tips:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {QUICK_ACTIONS.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.path}
                  onClick={() => handleNavigate(action.path)}
                  className="flex items-center gap-2 p-3 rounded-lg text-left transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.02, backgroundColor: '#1b2a24' }}
                  whileTap={{ scale: 0.98 }}
                  style={{ 
                    backgroundColor: '#0f1a16', 
                    border: '1px solid #1b2a24',
                    color: '#a6b8ad'
                  }}
                  title={action.hint}
                >
                  <Icon size={16} style={{ color: '#7fbf9a' }} />
                  <span className="text-xs sm:text-sm">{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p style={{ color: '#3a4d42', fontSize: '0.8rem' }}>
            <span style={{ color: '#7fbf9a' }}>💡</span> Tip: Use the terminal (cd projects, ls, help)
          </p>
        </motion.div>
      </div>
    </div>
  );
}