import { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';

interface BootScreenProps {
  onComplete: () => void;
}

const TERMINAL_MESSAGES = [
  { text: 'Initializing system...', delay: 0 },
  { text: 'Loading kernel modules...', delay: 180 },
  { text: 'Mounting file systems...', delay: 380 },
  { text: 'Starting services...', delay: 560 },
  { text: 'Loading user environment...', delay: 740 },
  { text: 'Boot complete.', delay: 920, highlight: true },
];

export function BootScreen({ onComplete }: BootScreenProps) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [currentLine, setCurrentLine] = useState(-1);
  const [showCursor, setShowCursor] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('quillpy_theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    TERMINAL_MESSAGES.forEach((msg) => {
      const timer = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
        if (msg.highlight) {
          const finishTimer = setTimeout(onComplete, 500);
          timerRef.current.push(finishTimer);
        }
      }, msg.delay);
      timerRef.current.push(timer);
    });

    return () => {
      timerRef.current.forEach(clearTimeout);
    };
  }, [onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 400);
    return () => clearInterval(cursorInterval);
  }, []);

  const isDark = theme === 'dark';
  const terminalBg = isDark ? '#0a0f0d' : '#f7f3eb';
  const textColor = isDark ? '#7fbf9a' : '#204832';
  const accentColor = isDark ? '#5a9a74' : '#2d5a42';
  const cursorColor = textColor;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 flex flex-col z-50"
      style={{ backgroundColor: terminalBg, padding: '2.5rem' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 font-mono text-sm leading-relaxed"
        style={{ color: textColor }}
      >
        <div className="mb-4 text-xs opacity-60" style={{ color: accentColor }}>
          Quillpy Portfolio {isDark ? 'v2.6.0' : 'v2.6.0'}
          <br />
          {new Date().getFullYear()} Built with care
        </div>

        {TERMINAL_MESSAGES.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -8 }}
            animate={{
              opacity: currentLine >= index ? 1 : 0,
              x: currentLine >= index ? 0 : -8,
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="flex items-center gap-2"
          >
            <span style={{ color: msg.highlight ? accentColor : 'inherit' }}>
              {msg.text}
            </span>
            {currentLine === index && (
              <motion.span
                animate={{ opacity: showCursor ? 1 : 0 }}
                transition={{ duration: 0.05 }}
                style={{
                  color: cursorColor,
                  fontWeight: 700,
                }}
              >
                █
              </motion.span>
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: currentLine >= TERMINAL_MESSAGES.length - 1 ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        className="text-xs opacity-50"
        style={{ color: accentColor }}
      >
        Press any key to continue...
      </motion.div>
    </motion.div>
  );
}