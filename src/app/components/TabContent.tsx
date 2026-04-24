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
}

export function TabContent({ activeTab, onSearch, bodyFontSize }: TabContentProps) {
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
          {activeTab === 'welcome' && <WelcomeTab />}
          {activeTab === 'about' && <AboutTab />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'philosophy' && <PhilosophyTab />}
          {activeTab === 'connect' && <ConnectTab />}
          {activeTab === 'terminal' && <TerminalTab onNavigate={onSearch} />}
          {activeTab === 'support' && <SupportTab />}
          {activeTab === 'logs' && <LogsTab />}
          {activeTab === 'newtab' && <NewTabPage onSearch={onSearch} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
