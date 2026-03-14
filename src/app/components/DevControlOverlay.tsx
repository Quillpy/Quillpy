import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

export type ControlMode = 'kill' | 'sleep' | 'run' | null;

interface DevControlOverlayProps {
  mode: ControlMode;
  onResume: () => void;
}

export function DevControlOverlay({ mode, onResume }: DevControlOverlayProps) {
  useEffect(() => {
    if (mode === 'sleep') {
      const handleKeyPress = () => {
        onResume();
      };
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [mode, onResume]);

  return (
    <AnimatePresence>
      {mode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{
            backgroundColor: mode === 'sleep' ? 'rgba(15, 26, 22, 0.95)' : 'rgba(15, 26, 22, 0.98)',
            pointerEvents: mode === 'sleep' ? 'all' : 'none',
          }}
        >
          {mode === 'kill' && <KillMode />}
          {mode === 'sleep' && <SleepMode />}
          {mode === 'run' && <RunMode />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function KillMode() {
  return (
    <div className="font-mono text-center">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ color: '#a6b8ad', fontSize: '1rem', marginBottom: '1rem' }}>
          $ kill quillpy.dev
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          style={{ color: '#ff6b6b', fontSize: '0.875rem', marginBottom: '2rem' }}
        >
          process terminated...
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        style={{ color: '#7fbf9a', fontSize: '1.25rem', marginTop: '2rem' }}
      >
        <div>Session ended.</div>
        <div style={{ color: '#a6b8ad', fontSize: '1rem', marginTop: '0.5rem' }}>
          Reload to reconnect.
        </div>
      </motion.div>
    </div>
  );
}

function SleepMode() {
  return (
    <div className="font-mono text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div style={{ color: '#ffd93d', fontSize: '1.25rem', marginBottom: '1rem' }}>
          system suspended...
        </div>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: '#a6b8ad', fontSize: '0.875rem' }}
        >
          press any key
        </motion.div>
      </motion.div>
    </div>
  );
}

function RunMode() {
  return (
    <div className="font-mono">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div style={{ color: '#a6b8ad', fontSize: '1rem', marginBottom: '1rem' }}>
          $ running portfolio...
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.3 }}
        style={{ color: '#7fbf9a', fontSize: '0.875rem', marginBottom: '0.5rem' }}
      >
        loading modules...
      </motion.div>

      <div style={{ color: '#6f9f84', fontSize: '0.75rem', fontFamily: 'monospace' }}>
        {['[✓] react.js', '[✓] components.tsx', '[✓] styles.css', '[✓] animations.js'].map((item, index) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.2 }}
            style={{ marginBottom: '0.25rem' }}
          >
            {item}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.3 }}
        style={{ color: '#7fbf9a', fontSize: '0.875rem', marginTop: '1rem' }}
      >
        ✓ ready
      </motion.div>
    </div>
  );
}
