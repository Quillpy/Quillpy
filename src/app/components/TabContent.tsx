import { TabType } from './Browser';
import { WelcomeTab } from './tabs/WelcomeTab';
import { AboutTab } from './tabs/AboutTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { PhilosophyTab } from './tabs/PhilosophyTab';
import { ConnectTab } from './tabs/ConnectTab';
import { TerminalTab } from './tabs/TerminalTab';
import { SupportTab } from './tabs/SupportTab';
import { LogsTab } from './tabs/LogsTab';
import { motion, AnimatePresence } from 'motion/react';

interface TabContentProps {
  activeTab: TabType;
  onSearch: (query: string) => void;
  bodyFontSize: number;
  onVoid: () => void;
}

export function TabContent({ activeTab, onSearch, bodyFontSize, onVoid }: TabContentProps) {
  return (
    <div 
      className="min-h-0 flex-1 overflow-y-auto browser-scroll"
      style={{ backgroundColor: 'var(--card)', fontSize: `${bodyFontSize}px` }}
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
          className="p-5 sm:p-8 min-h-full"
        >
          {activeTab === 'welcome' && <WelcomeTab />}
          {activeTab === 'about' && <AboutTab />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'philosophy' && <PhilosophyTab />}
          {activeTab === 'connect' && <ConnectTab />}
          {activeTab === 'terminal' && <TerminalTab onNavigate={onSearch} onVoid={onVoid} />}
          {activeTab === 'support' && <SupportTab />}
          {activeTab === 'logs' && <LogsTab />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}