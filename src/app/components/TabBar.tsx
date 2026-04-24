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
        borderColor: '#1a2721',
        backgroundColor: '#0d1411',
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
            className="ui-hover group relative flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl border px-4 py-2.5 text-xs sm:text-sm"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
            style={{
              color: isActive ? '#e6f0ea' : '#6f9f84',
              backgroundColor: isActive ? '#141f1a' : '#0f1714',
              borderColor: isActive ? '#30483d' : '#18241f',
              boxShadow: isActive ? 'inset 0 1px 0 rgba(127, 191, 154, 0.06)' : 'none',
              minWidth: '120px',
              maxWidth: '180px',
            }}
          >
            {isActive && <Terminal size={14} style={{ color: '#7fbf9a' }} />}
            <span className="flex-1 truncate">{tab.title}</span>
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClick();
                  onCloseTab(tab.id);
                }}
                className="ui-hover rounded-md p-1 opacity-0 group-hover:opacity-100"
                style={{ color: '#6f9f84' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(111, 159, 132, 0.12)';
                  e.currentTarget.style.color = '#ff6b6b';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#6f9f84';
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
        className="ui-hover ml-1 flex shrink-0 items-center justify-center rounded-xl border p-2.5"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        style={{
          color: '#6f9f84',
          backgroundColor: '#0f1714',
          borderColor: '#18241f',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#7fbf9a';
          e.currentTarget.style.backgroundColor = '#16201b';
          e.currentTarget.style.borderColor = '#2b4036';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#6f9f84';
          e.currentTarget.style.backgroundColor = '#0f1714';
          e.currentTarget.style.borderColor = '#18241f';
        }}
        title="New Terminal Tab"
      >
        <Terminal size={16} />
      </motion.button>
    </motion.div>
  );
}
