import { useEffect } from 'react';
import { motion } from 'motion/react';

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 400);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: '#0f1a16', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
    >
      <div className="text-center">
        <p style={{ color: '#8a5ca8', fontSize: '1rem', letterSpacing: '0.1em' }}>
          QUILLPY.DEV
        </p>
        <motion.div
          className="mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <span style={{ color: '#7fbf9a' }}>_</span>
        </motion.div>
      </div>
    </motion.div>
  );
}