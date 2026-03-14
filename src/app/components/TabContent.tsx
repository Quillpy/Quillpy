import { TabType } from './Browser';
import { WelcomeTab } from './tabs/WelcomeTab';
import { AboutTab } from './tabs/AboutTab';
import { ProjectsTab } from './tabs/ProjectsTab';
import { PhilosophyTab } from './tabs/PhilosophyTab';
import { ConnectTab } from './tabs/ConnectTab';
import { NewTabPage } from './NewTabPage';
import { motion, AnimatePresence } from 'motion/react';

interface TabContentProps {
  activeTab: TabType;
  onSearch: (query: string) => void;
}

export function TabContent({ activeTab, onSearch }: TabContentProps) {
  return (
    <div 
      className="overflow-hidden"
      style={{ backgroundColor: '#16221d' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="p-4 sm:p-8 min-h-[400px] sm:min-h-[500px]"
        >
          {activeTab === 'welcome' && <WelcomeTab />}
          {activeTab === 'about' && <AboutTab />}
          {activeTab === 'projects' && <ProjectsTab />}
          {activeTab === 'philosophy' && <PhilosophyTab />}
          {activeTab === 'connect' && <ConnectTab />}
          {activeTab === 'newtab' && <NewTabPage onSearch={onSearch} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}