import { useEffect } from 'react';
import { motion } from 'motion/react';

interface BootScreenProps {
  onComplete: () => void;
}

export function BootScreen({ onComplete }: BootScreenProps) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 180);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: 'var(--shell-bg)', fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
    >
      <div className="flex min-w-[220px] items-center justify-between border px-5 py-3" style={{ borderColor: 'var(--chrome-border)', backgroundColor: 'var(--chrome-panel-strong)' }}>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: 'var(--text-soft)' }}>
            Quillpy
          </p>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-strong)' }}>
            Portfolio
          </p>
        </div>
        <motion.div
          initial={{ scaleX: 0.2, opacity: 0.45 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.14, ease: 'easeOut' }}
          className="h-px w-12 origin-left"
          style={{ backgroundColor: 'var(--brand)' }}
        />
      </div>
    </motion.div>
  );
}
