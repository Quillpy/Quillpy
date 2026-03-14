import { useState, useEffect } from 'react';
import { BrowserControls } from './BrowserControls';
import { TabBar } from './TabBar';
import { TabContent } from './TabContent';
import { DevControlOverlay, ControlMode } from './DevControlOverlay';
import { motion } from 'motion/react';

export type TabType = 'welcome' | 'about' | 'projects' | 'philosophy' | 'connect' | 'newtab';

export interface Tab {
  id: string;
  type: TabType;
  title: string;
}

const DEFAULT_TAB_TITLES: Record<TabType, string> = {
  welcome: 'Welcome',
  about: 'About',
  projects: 'Projects',
  philosophy: 'Philosophy',
  connect: 'Connect',
  newtab: 'New Tab'
};

export function Browser() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: '1', type: 'welcome', title: 'Welcome' }
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [controlMode, setControlMode] = useState<ControlMode>(null);
  const [showContent, setShowContent] = useState(true);

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
      type: 'newtab',
      title: 'New Tab'
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const handleCloseTab = (tabId: string) => {
    if (tabs.length === 1) return; // Don't close the last tab
    
    const tabIndex = tabs.findIndex(t => t.id === tabId);
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    // If closing active tab, switch to adjacent tab
    if (tabId === activeTabId) {
      const newActiveIndex = tabIndex > 0 ? tabIndex - 1 : 0;
      setActiveTabId(newTabs[newActiveIndex].id);
    }
  };

  const handleSearch = (query: string) => {
    const validTabs: TabType[] = ['welcome', 'about', 'projects', 'philosophy', 'connect'];
    const lowerQuery = query.toLowerCase().replace('quillpy.dev/', '');
    
    // Check if it's a valid internal page
    if (validTabs.includes(lowerQuery as TabType)) {
      // Update current tab to that page
      setTabs(tabs.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, type: lowerQuery as TabType, title: DEFAULT_TAB_TITLES[lowerQuery as TabType] }
          : tab
      ));
    } else {
      // Open Google search in new window
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
  };

  const handleNavigate = (type: TabType) => {
    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, type, title: DEFAULT_TAB_TITLES[type] }
        : tab
    ));
  };

  const activeTab = tabs.find(t => t.id === activeTabId);

  return (
    <div 
      className="rounded-lg overflow-hidden relative"
      style={{ backgroundColor: '#16221d' }}
    >
      <BrowserControls 
        activeTab={activeTab?.type || 'welcome'} 
        onNavigate={handleNavigate}
        onControlClick={handleControlClick}
        onSearch={handleSearch}
      />
      
      <motion.div
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.3 }}
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
        />
      </motion.div>

      <DevControlOverlay mode={controlMode} onResume={handleResume} />
    </div>
  );
}
