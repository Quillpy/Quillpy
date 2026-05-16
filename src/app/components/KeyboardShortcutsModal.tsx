import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Keyboard } from 'lucide-react';

interface KeyboardShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const shortcuts = [
  { keys: ['Alt', 'T'], action: 'Open terminal tab' },
  { keys: ['Alt', '←'], action: 'Go back' },
  { keys: ['Alt', '→'], action: 'Go forward' },
  { keys: ['?'], action: 'Toggle this help' },
  { keys: ['Ctrl', 'K'], action: 'Focus address bar' },
  { keys: ['Ctrl', 'D'], action: 'Bookmark current page' },
  { keys: ['Ctrl', 'B'], action: 'Toggle bookmarks bar' },
  { keys: ['Esc'], action: 'Wake from sleep mode' },
];

const easterEggs = [
  { trigger: 'Konami code (↑↑↓↓←→←→BA)', action: 'Try it somewhere...' },
  { trigger: 'sudo rm -rf /', action: 'In terminal, if you dare' },
  { trigger: 'Type "restore"', action: 'Escape the void' },
];

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-lg border"
            style={{
              backgroundColor: 'var(--surface-1)',
              borderColor: 'var(--border)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-5 py-3" style={{ borderColor: 'var(--border)' }}>
              <div className="flex items-center gap-2" style={{ color: 'var(--brand)' }}>
                <Keyboard size={16} />
                <span className="text-sm font-medium">Keyboard Shortcuts</span>
              </div>
              <button onClick={onClose} className="p-1" style={{ color: 'var(--text-soft)' }}>
                <X size={16} />
              </button>
            </div>

            <div className="px-5 py-4">
              <div className="space-y-2">
                {shortcuts.map((shortcut) => (
                  <div key={shortcut.action} className="flex items-center justify-between py-1.5">
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{shortcut.action}</span>
                    <div className="flex gap-1">
                      {shortcut.keys.map((key) => (
                        <kbd
                          key={key}
                          className="border px-2 py-0.5 text-xs font-mono"
                          style={{
                            backgroundColor: 'var(--surface-2)',
                            borderColor: 'var(--border)',
                            color: 'var(--text-strong)',
                          }}
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                <div className="mb-2 text-xs uppercase tracking-[0.15em]" style={{ color: 'var(--brand)' }}>
                  Easter Eggs
                </div>
                <div className="space-y-1.5">
                  {easterEggs.map((egg) => (
                    <div key={egg.trigger} className="flex items-center justify-between py-1">
                      <span className="text-xs font-mono" style={{ color: 'var(--text-soft)' }}>{egg.trigger}</span>
                      <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{egg.action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
