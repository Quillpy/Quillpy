import { useState, useEffect } from 'react';
import { BrowserControls } from './BrowserControls';
import { TabBar } from './TabBar';
import { TabContent } from './TabContent';
import { DevControlOverlay, ControlMode } from './DevControlOverlay';
import { VoidOverlay } from './VoidOverlay';
import { motion } from 'motion/react';
import { useClickSound } from '../../hooks/useClickSound';
import { useTheme } from '../../hooks/useTheme';

export type TabType = 'welcome' | 'about' | 'projects' | 'philosophy' | 'connect' | 'terminal' | 'support' | 'logs' | 'newtab';

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
  logs: 'Logs',
  newtab: 'New Tab'
};

export function Browser() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', type: 'welcome', title: 'Welcome' }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [controlMode, setControlMode] = useState<ControlMode>(null);
  const [showContent, setShowContent] = useState(true);
  const [bodyFontSize, setBodyFontSize] = useState(16);
  const { theme, setTheme } = useTheme();
  const [tabHistory, setTabHistory] = useState<TabHistory[]>([{ type: 'welcome', title: 'Welcome' }]);
  const [isVoid, setIsVoid] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);
  const { playClick } = useClickSound();

  const openTab = (type: TabType, activate = true) => {
    const newTab: Tab = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      type,
      title: DEFAULT_TAB_TITLES[type]
    };

    setTabs((prev) => [...prev, newTab]);
    if (activate) {
      setActiveTabId(newTab.id);
    }
    setTabHistory(prev => [...prev.slice(0, historyIndex + 1), { type, title: DEFAULT_TAB_TITLES[type] }]);
    setHistoryIndex(prev => prev + 1);
  };

  useEffect(() => {
    const voided = localStorage.getItem('quillpy_void');
    if (voided) {
      setIsVoid(true);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size', `${bodyFontSize}px`);
  }, [bodyFontSize]);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.altKey || event.key.toLowerCase() !== 't') {
        return;
      }

      event.preventDefault();
      openTab('terminal');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex]);

  const handleResume = () => {
    setShowContent(true);
    setControlMode(null);
  };

  const handleVoid = () => {
    localStorage.setItem('quillpy_void', 'true');
    setIsVoid(true);
  };

  const handleControlClick = (mode: ControlMode) => {
    if (mode === 'run' && controlMode === null) {
      setControlMode('run');
    } else if (mode !== 'run') {
      setControlMode(mode);
    }
  };

  const handleAddTab = () => {
    openTab('newtab');
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
    const validTabs: TabType[] = ['welcome', 'about', 'projects', 'philosophy', 'connect', 'terminal', 'support', 'logs', 'newtab'];
    const lowerQuery = query.toLowerCase().replace('quillpy.com/', '').trim();

    if (!lowerQuery) {
      return;
    }
    
    if (validTabs.includes(lowerQuery as TabType)) {
      setTabs((prev) => prev.map(tab => 
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
    setTabs((prev) => prev.map(tab => 
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
      setTabs((prev) => prev.map(tab => 
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
      setTabs((prev) => prev.map(tab => 
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
      style={{ backgroundColor: 'var(--background)', height: '100%' }}
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
        theme={theme}
        onThemeChange={setTheme}
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
          onVoid={handleVoid}
        />
      </motion.div>

      <DevControlOverlay mode={controlMode} onResume={handleResume} />

      {isVoid && <VoidOverlay />}

      <div
        className="px-4 py-2.5 border-t flex flex-wrap items-center justify-between gap-2 text-xs font-mono"
        style={{
          backgroundColor: 'var(--chrome-panel-strong)',
          borderColor: 'var(--chrome-border)',
          color: 'var(--text-muted)'
        }}
      >
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1">
            <span style={{ color: 'var(--brand)' }}>●</span>
            Connected
          </span>
          <span style={{ color: 'var(--text-soft)' }}>|</span>
          <span>Linux</span>
          <span style={{ color: 'var(--text-soft)' }}>|</span>
          <span>Building things since 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <span>quillpy.com</span>
        </div>
      </div>
    </div>
  );
}
