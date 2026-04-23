import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Folder, Terminal, User, Link, Heart, BookOpen, Sparkles } from 'lucide-react';

const TIPS = [
  { icon: Link, text: 'Address bar works - try typing "about" or "google.com"' },
  { icon: Sparkles, text: 'Windows buttons actually work - try clicking them' },
  { icon: Terminal, text: 'Use terminal commands: help, ls, cd projects' },
];

interface WelcomeTabProps {
  onNavigate?: (path: string) => void;
}

export function WelcomeTab({ onNavigate }: WelcomeTabProps) {
  const [showCursor, setShowCursor] = useState(true);
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length);
    }, 4000);
    return () => clearInterval(tipInterval);
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
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
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
        </motion.div>
      </div>
    </div>
  );
}