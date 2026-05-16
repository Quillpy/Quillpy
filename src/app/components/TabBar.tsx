import { Tab, TabType } from './Browser';
import { Terminal, X, Sparkles, User, Folder, BookOpen, Link, Heart, MessageSquare } from 'lucide-react';
import { useClickSound } from '../../hooks/useClickSound';
import { motion, AnimatePresence } from 'motion/react';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onAddTab: () => void;
}

const TAB_ICONS: Record<TabType, typeof Terminal> = {
  welcome: Sparkles,
  about: User,
  projects: Folder,
  philosophy: BookOpen,
  connect: Link,
  terminal: Terminal,
  support: Heart,
  logs: MessageSquare,
};

const TAB_COLORS: Record<TabType, string> = {
  welcome: '#a78bda',
  about: '#6f9f84',
  projects: '#7fbf9a',
  philosophy: '#ffd166',
  connect: '#67bcf0',
  terminal: 'var(--brand)',
  support: '#f06b8a',
  logs: '#ffd166',
};

export function TabBar({ tabs, activeTabId, onTabChange, onCloseTab, onAddTab }: TabBarProps) {
  const { playClick } = useClickSound();

  return (
    <div
      className="scrollbar-hide flex items-center overflow-x-auto border-b"
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
      <AnimatePresence mode="popLayout">
        {tabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          const Icon = TAB_ICONS[tab.type] || Terminal;
          const iconColor = TAB_COLORS[tab.type] || 'var(--brand)';

          return (
            <div
              key={tab.id}
              onClick={() => { playClick(); onTabChange(tab.id); }}
              className="group relative flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap border px-4 py-2.5 text-xs sm:text-sm"
              style={{
                color: isActive ? 'var(--text-strong)' : 'var(--text-muted)',
                backgroundColor: isActive ? 'var(--surface-2)' : 'var(--surface-1)',
                borderColor: isActive ? iconColor : 'var(--border)',
                boxShadow: isActive ? `inset 0 1px 0 ${iconColor}20` : 'none',
                minWidth: '120px',
                maxWidth: '180px',
              }}
            >
              <Icon size={14} style={{ color: isActive ? iconColor : 'var(--text-soft)' }} />
              <span className="flex-1 truncate">{tab.title}</span>
              {tabs.length > 1 && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playClick();
                    onCloseTab(tab.id);
                  }}
                  className="ui-hover p-1"
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
                </motion.button>
              )}
            </div>
          );
        })}
      </AnimatePresence>

      <button
        onClick={() => { playClick(); onAddTab(); }}
        className="ml-1 flex shrink-0 items-center justify-center border p-2.5"
        style={{
          color: 'var(--text-muted)',
          backgroundColor: 'var(--surface-1)',
          borderColor: 'var(--border)',
          transition: 'all 0.15s ease',
        }}
        title="New Terminal Tab"
      >
        <Terminal size={16} />
      </button>
    </div>
  );
}
