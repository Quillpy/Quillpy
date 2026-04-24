import { TabType } from './Browser';
import { WelcomeTab } from './tabs/WelcomeTab';
import { AboutTab } from './tabs/AboutTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { PhilosophyTab } from './tabs/PhilosophyTab';
import { ConnectTab } from './tabs/ConnectTab';
import { TerminalTab } from './tabs/TerminalTab';
import { SupportTab } from './tabs/SupportTab';
import { LogsTab } from './tabs/LogsTab';
import { NewTabPage } from './NewTabPage';
import { motion, AnimatePresence } from 'motion/react';

interface TabContentProps {
  activeTab: TabType;
  onSearch: (query: string) => void;
  bodyFontSize: number;
  onVoid: () => void;
}

const TAB_TIPS: Record<TabType, string> = {
  welcome: 'Tip: the address bar is real. Try typing `projects` or `terminal`.',
  about: 'Tip: the red window button really does kill the session.',
  projects: 'Tip: `Alt+T` opens a fresh terminal tab from anywhere.',
  philosophy: 'Tip: the back and forward buttons keep track of page jumps.',
  connect: 'Tip: theme, font size, and sound live in the top-right settings panel.',
  terminal: "Tip: don't try `sudo rm -rf /` unless you enjoy consequences.",
  support: 'Tip: the browser buttons are not decorative. They all do something.',
  logs: 'Tip: quick-nav icons beside the address bar jump pages faster.',
  newtab: 'Tip: search here, or use the address bar above if you prefer keyboard-first.'
};

export function TabContent({ activeTab, onSearch, bodyFontSize, onVoid }: TabContentProps) {
  return (
    <div 
      className="min-h-0 flex-1 overflow-y-auto browser-scroll"
      style={{ backgroundColor: 'var(--card)', fontSize: `${bodyFontSize}px` }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="p-5 sm:p-8 min-h-full"
        >
          <div
            className="mb-5 inline-flex max-w-full items-center border px-3 py-1.5 text-[11px] uppercase tracking-[0.14em]"
            style={{
              backgroundColor: 'var(--surface-overlay)',
              borderColor: 'var(--border)',
              color: 'var(--text-soft)'
            }}
          >
            {TAB_TIPS[activeTab]}
          </div>
          {activeTab === 'welcome' && <WelcomeTab />}
          {activeTab === 'about' && <AboutTab />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'philosophy' && <PhilosophyTab />}
          {activeTab === 'connect' && <ConnectTab />}
          {activeTab === 'terminal' && <TerminalTab onNavigate={onSearch} onVoid={onVoid} />}
          {activeTab === 'support' && <SupportTab />}
          {activeTab === 'logs' && <LogsTab />}
          {activeTab === 'newtab' && <NewTabPage onSearch={onSearch} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
