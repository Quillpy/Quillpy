import { Tab } from './Browser';
import { Terminal, X } from 'lucide-react';
import { useClickSound } from '../../hooks/useClickSound';
import { motion } from 'motion/react';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onAddTab: () => void;
}

export function TabBar({ tabs, activeTabId, onTabChange, onCloseTab, onAddTab }: TabBarProps) {
  const playClick = useClickSound();

  return (
    <motion.div
      className="scrollbar-hide flex items-center overflow-x-auto border-b"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{
        borderColor: 'var(--chrome-border)',
        backgroundColor: 'var(--chrome-panel-strong)',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        paddingTop: '0.55rem',
        paddingBottom: '0.45rem',
        gap: '0.5rem',
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;

        return (
          <motion.div
            key={tab.id}
            onClick={() => { playClick(); onTabChange(tab.id); }}
            className="ui-hover ui-panel-soft group relative flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap border px-4 py-2.5 text-xs sm:text-sm"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            style={{
              color: isActive ? 'var(--text-strong)' : 'var(--text-muted)',
              backgroundColor: isActive ? 'var(--surface-2)' : 'var(--surface-1)',
              borderColor: isActive ? 'var(--brand)' : 'var(--border)',
              boxShadow: isActive ? 'inset 0 1px 0 var(--brand-soft)' : 'none',
              minWidth: '120px',
              maxWidth: '180px',
            }}
          >
            {isActive && <Terminal size={14} style={{ color: 'var(--brand)' }} />}
            <span className="flex-1 truncate">{tab.title}</span>
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                  onCloseTab(tab.id);
                }}
                className="ui-hover p-1 opacity-0 group-hover:opacity-100"
                style={{ color: 'var(--text-soft)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--brand-soft)';
                  e.currentTarget.style.color = '#d4183d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--text-soft)';
                }}
                title="Close tab"
              >
                <X size={14} />
              </button>
            )}
          </motion.div>
        );
      })}

      <motion.button
        onClick={() => { playClick(); onAddTab(); }}
        className="ui-hover ui-panel-soft ml-1 flex shrink-0 items-center justify-center border p-2.5"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          color: 'var(--text-muted)',
          backgroundColor: 'var(--surface-1)',
          borderColor: 'var(--border)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--brand)';
          e.currentTarget.style.backgroundColor = 'var(--button-hover)';
          e.currentTarget.style.borderColor = 'var(--brand)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-muted)';
          e.currentTarget.style.backgroundColor = 'var(--surface-1)';
          e.currentTarget.style.borderColor = 'var(--border)';
        }}
        title="New Terminal Tab"
      >
        <Terminal size={16} />
      </motion.button>
    </motion.div>
  );
}
