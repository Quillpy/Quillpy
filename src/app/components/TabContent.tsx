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
import { useState, useEffect } from 'react';

interface TabContentProps {
  activeTab: TabType;
  onSearch: (query: string) => void;
  bodyFontSize: number;
}

export function TabContent({ activeTab, onSearch, bodyFontSize }: TabContentProps) {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 200);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div 
      className="min-h-0 flex-1 overflow-y-auto browser-scroll"
      style={{ backgroundColor: '#101814', fontSize: `${bodyFontSize}px` }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="p-5 sm:p-8 min-h-full flex items-center justify-center"
          >
            <p 
              className="font-mono text-sm"
              style={{ color: '#6f9f84' }}
            >
              Loading {activeTab}...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
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
        )}
      </AnimatePresence>
    </div>
  );
}
