import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('quillpy_theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(onComplete, 1200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const isDark = theme === 'dark';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: isDark ? '#0a0f0d' : '#f7f3eb',
      }}
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 8 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl"
            style={{
              backgroundColor: isDark ? 'rgba(127, 191, 154, 0.15)' : 'rgba(32, 72, 50, 0.1)',
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: isDark ? '#7fbf9a' : '#204832' }}
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                fill="currentColor"
                fillOpacity="0.2"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <h1
            className="text-2xl font-medium tracking-tight mb-1"
            style={{ color: isDark ? '#e6f0ea' : '#1e2821' }}
          >
            Quillpy
          </h1>
          <p
            className="text-sm tracking-wide"
            style={{ color: isDark ? '#7c9186' : '#728077' }}
          >
            Portfolio
          </p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
          className="mx-auto mt-6 h-px w-16 origin-center"
          style={{ backgroundColor: isDark ? '#2a453a' : '#c7bcaa' }}
        />
      </div>
    </motion.div>
  );
}