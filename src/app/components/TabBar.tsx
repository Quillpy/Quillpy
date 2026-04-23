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
      className="flex items-center overflow-x-auto border-b scrollbar-hide"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ 
        borderColor: '#1b2a24',
        backgroundColor: '#0f1a16',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        paddingTop: '0.5rem',
        paddingBottom: '0.25rem',
        gap: '0.5rem'
      }}
    >
      {tabs.map((tab) => (
        <motion.div
          key={tab.id}
          onClick={() => { playClick(); onTabChange(tab.id); }}
          className="group relative flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            color: activeTabId === tab.id ? '#e6f0ea' : '#6f9f84',
            backgroundColor: activeTabId === tab.id ? '#16221d' : 'transparent',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
            border: activeTabId === tab.id ? '1px solid #2a3d34' : '1px solid transparent',
            borderBottom: activeTabId === tab.id ? '2px solid #7fbf9a' : '1px solid transparent',
            minWidth: '120px',
            maxWidth: '180px'
          }}
          onMouseEnter={(e) => {
            if (activeTabId !== tab.id) {
              e.currentTarget.style.backgroundColor = '#121c18';
              e.currentTarget.style.color = '#e6f0ea';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTabId !== tab.id) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#6f9f84';
            }
          }}
        >
          {activeTabId === tab.id && (
            <Terminal size={14} style={{ color: '#7fbf9a' }} />
          )}
          <span className="flex-1 truncate">{tab.title}</span>
          {tabs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                onCloseTab(tab.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 rounded-md"
              style={{ 
                color: '#6f9f84',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(111, 159, 132, 0.2)';
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
      ))}
      
      <motion.button
        onClick={() => { playClick(); onAddTab(); }}
        className="flex items-center justify-center p-2.5 transition-all duration-200 flex-shrink-0 rounded"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          color: '#6f9f84',
          backgroundColor: 'transparent',
          marginLeft: '0.25rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#7fbf9a';
          e.currentTarget.style.backgroundColor = 'rgba(111, 159, 132, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#6f9f84';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        title="New Terminal Tab"
      >
        <Terminal size={16} />
      </motion.button>
    </motion.div>
  );
}