import { useState, useEffect } from 'react';
import { BrowserControls } from './BrowserControls';
import { TabBar } from './TabBar';
import { TabContent } from './TabContent';
import { DevControlOverlay, ControlMode } from './DevControlOverlay';
import { motion } from 'motion/react';
import { useClickSound } from '../../hooks/useClickSound';

export type TabType = 'welcome' | 'about' | 'projects' | 'philosophy' | 'connect' | 'terminal' | 'support' | 'logs';

export interface Tab {
  id: string;
  type: TabType;
  title: string;
}

interface TabHistory {
  type: TabType;
  title: string;
}

const DEFAULT_TAB_TITLES: Record<TabType, string> = {
  welcome: 'Welcome',
  about: 'About',
  projects: 'Projects',
  philosophy: 'Philosophy',
  connect: 'Connect',
  terminal: 'Terminal',
  support: 'Support',
  logs: 'Logs'
};

export function Browser() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', type: 'welcome', title: 'Welcome' }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [controlMode, setControlMode] = useState<ControlMode>(null);
  const [showContent, setShowContent] = useState(true);
  const [bodyFontSize, setBodyFontSize] = useState(16);
  const [tabHistory, setTabHistory] = useState<TabHistory[]>([{ type: 'welcome', title: 'Welcome' }]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const playClick = useClickSound();

  useEffect(() => {
    const handleClick = () => playClick();
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [playClick]);

  useEffect(() => {
    if (controlMode === 'kill') {
      setShowContent(false);
      const timer = setTimeout(() => {
        window.location.reload();
      }, 2000);
      return () => clearTimeout(timer);
    } else if (controlMode === 'sleep') {
      setShowContent(false);
    } else if (controlMode === 'run') {
      setShowContent(false);
      const timer = setTimeout(() => {
        setShowContent(true);
        setControlMode(null);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [controlMode]);

  const handleResume = () => {
    setShowContent(true);
    setControlMode(null);
  };

  const handleControlClick = (mode: ControlMode) => {
    if (mode === 'run' && controlMode === null) {
      setControlMode('run');
    } else if (mode !== 'run') {
      setControlMode(mode);
    }
  };

  const handleAddTab = () => {
    const newTab: Tab = {
      id: Date.now().toString(),
      type: 'terminal',
      title: 'Terminal'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
    setTabHistory(prev => [...prev.slice(0, historyIndex + 1), { type: 'terminal', title: 'Terminal' }]);
    setHistoryIndex(prev => prev + 1);
  };

  const handleCloseTab = (tabId: string) => {
    if (tabs.length === 1) return;
    
    const tabIndex = tabs.findIndex(t => t.id === tabId);
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    if (tabId === activeTabId) {
      const newActiveIndex = tabIndex > 0 ? tabIndex - 1 : 0;
      setActiveTabId(newTabs[newActiveIndex].id);
    }
  };

  const handleSearch = (query: string) => {
    const validTabs: TabType[] = ['welcome', 'about', 'projects', 'philosophy', 'connect', 'terminal', 'support', 'logs'];
    const lowerQuery = query.toLowerCase().replace('quillpy.com/', '');
    
    if (validTabs.includes(lowerQuery as TabType)) {
      setTabs(tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, type: lowerQuery as TabType, title: DEFAULT_TAB_TITLES[lowerQuery as TabType] }
          : tab
      ));
      setTabHistory(prev => [...prev.slice(0, historyIndex + 1), { type: lowerQuery as TabType, title: DEFAULT_TAB_TITLES[lowerQuery as TabType] }]);
      setHistoryIndex(prev => prev + 1);
    } else {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
  };

  const handleNavigate = (type: TabType) => {
    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, type, title: DEFAULT_TAB_TITLES[type] }
        : tab
    ));
    setTabHistory(prev => [...prev.slice(0, historyIndex + 1), { type, title: DEFAULT_TAB_TITLES[type] }]);
    setHistoryIndex(prev => prev + 1);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prevState = tabHistory[historyIndex - 1];
      setTabs(tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, type: prevState.type, title: prevState.title }
          : tab
      ));
      setHistoryIndex(prev => prev - 1);
    }
  };

  const handleForward = () => {
    if (historyIndex < tabHistory.length - 1) {
      const nextState = tabHistory[historyIndex + 1];
      setTabs(tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, type: nextState.type, title: nextState.title }
          : tab
      ));
      setHistoryIndex(prev => prev + 1);
    }
  };

  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <div 
      className="overflow-hidden relative flex flex-col"
      style={{ backgroundColor: '#101814', height: '100%' }}
    >
      <BrowserControls 
        activeTab={activeTab?.type || 'welcome'} 
        onNavigate={handleNavigate}
        onControlClick={handleControlClick}
        onSearch={handleSearch}
        onBack={handleBack}
        onForward={handleForward}
        canGoBack={historyIndex > 0}
        canGoForward={historyIndex < tabHistory.length - 1}
        bodyFontSize={bodyFontSize}
        onBodyFontSizeChange={setBodyFontSize}
      />
      
      <motion.div
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex min-h-0 flex-1 flex-col"
      >
        <TabBar 
          tabs={tabs}
          activeTabId={activeTabId}
          onTabChange={setActiveTabId}
          onCloseTab={handleCloseTab}
          onAddTab={handleAddTab}
        />
        <TabContent 
          activeTab={activeTab?.type || 'welcome'} 
          onSearch={handleSearch}
          bodyFontSize={bodyFontSize}
        />
      </motion.div>

      <DevControlOverlay mode={controlMode} onResume={handleResume} />
      
      <div 
        className="px-4 py-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs font-mono"
        style={{ 
          backgroundColor: '#0c120f',
          borderColor: '#1a2721',
          color: '#6f9f84'
        }}
      >
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span style={{ color: '#7fbf9a' }}>●</span>
            Connected
          </span>
          <span style={{ color: '#3a4d42' }}>|</span>
          <span>Linux</span>
          <span style={{ color: '#3a4d42' }}>|</span>
          <span>Building things since 2024</span>
        </div>
        <div className="flex items-center gap-2">
          <span>quillpy.dev</span>
        </div>
      </div>
    </div>
  );
}
