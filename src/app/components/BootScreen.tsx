import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [lines, setLines] = useState<string[]>([]);
  const bootLines = [
    'Launching quillpy.dev',
    'Loading modules',
    'Ready'
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < bootLines.length) {
        setLines(prev => [...prev, bootLines[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 300);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed inset-0 flex items-center justify-center"
        style={{ backgroundColor: '#0f1a16', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
      >
        <div className="max-w-md">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              style={{ 
                color: i === bootLines.length - 1 ? '#7fbf9a' : '#6f9f84',
                fontSize: '1rem',
                lineHeight: '1.8'
              }}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}