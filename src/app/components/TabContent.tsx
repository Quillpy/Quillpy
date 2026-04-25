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
import { useState, useEffect } from 'react';

interface TabContentProps {
  activeTab: TabType;
  onSearch: (query: string) => void;
  bodyFontSize: number;
  onVoid: () => void;
}

const TIPS: Record<TabType, string[]> = {
  welcome: ["TRY THE ADDRESS BAR", "TAB AUTOCOMPLETES", "X BUTTON CLOSES APP", "EXPLORE ALL PAGES"],
  about: ["DON'T TRY SUDO RM -RF / PLEASE", "CAT STACK SHOWS TECH", "WHOAMI KNOWS ME", "READ EVERY FILE"],
  projects: ["LOGS HAS MY JOURNEY", "PHILOSOPHY HAS THOUGHTS", "CONNECT TO REACH ME", "SUPPORT KEEPS ME ALIVE"],
  philosophy: ["LOGS PAGE EXISTS", "PROJECTS SHOW WORK", "READ THE JOURNEY", "DEEP STUFF AHEAD"],
  connect: ["FIND ME ELSEWHERE", "DROP A MESSAGE"],
  terminal: ["TAB COMPLETES COMMANDS", "HELP LISTS ALL", "COWSAY SAYS HI", "TYPE COWSAY MOO", "CD TO NAVIGATE", "EXPLORE THE SHELL"],
  support: ["CD WELCOME TO START", "TERMINAL HAS SECRETS", "EVERY PAGE HAS HINTS", "KEEP EXPLORING"],
  logs: ["CD PROJECTS FOR WORK", "PHILOSOPHY IS DEEP", "WELCOME TO BEGIN", "CONNECT FOR CHAT"],
};

export function TabContent({ activeTab, onSearch, bodyFontSize, onVoid }: TabContentProps) {
  const [tipIndex, setTipIndex] = useState(0);
  const tips = TIPS[activeTab];

  useEffect(() => {
    setTipIndex(0);
  }, [activeTab]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTipIndex(prev => (prev + 1) % tips.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [tips]);

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
          <div className="mt-2" style={{ color: 'var(--text-soft)', fontSize: '0.85rem' }}>
            💡 {tips[tipIndex]}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}