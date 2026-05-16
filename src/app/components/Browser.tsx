import { useState, useEffect, useRef } from 'react';
import { BrowserControls } from './BrowserControls';
import { TabBar } from './TabBar';
import { TabContent } from './TabContent';
import { DevControlOverlay, ControlMode } from './DevControlOverlay';
import { VoidOverlay } from './VoidOverlay';
import { BookmarksBar } from './BookmarksBar';
import { KeyboardShortcutsModal } from './KeyboardShortcutsModal';
import { motion, AnimatePresence } from 'motion/react';
import { useClickSound } from '../../hooks/useClickSound';
import { useTheme } from '../../hooks/useTheme';

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

interface VisitedEntry {
  type: TabType;
  title: string;
  timestamp: number;
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
  const { theme, setTheme } = useTheme();
  const [tabHistory, setTabHistory] = useState<TabHistory[]>([{ type: 'welcome', title: 'Welcome' }]);
  const [isVoid, setIsVoid] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);
  const { playClick } = useClickSound();
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(() => {
    const stored = localStorage.getItem('quillpy_show_bookmarks');
    return stored !== null ? stored === 'true' : true;
  });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [recentlyVisited, setRecentlyVisited] = useState<VisitedEntry[]>([]);
  const [readProgress, setReadProgress] = useState(0);
  const konamiBuffer = useRef<number[]>([]);
  const [showKonami, setShowKonami] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favicon, setFavicon] = useState('');
  const [zoom, setZoom] = useState(100);

  const KONAMI_CODE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

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
    addRecentlyVisited(type, DEFAULT_TAB_TITLES[type]);
  };

  const addRecentlyVisited = (type: TabType, title: string) => {
    setRecentlyVisited(prev => {
      const filtered = prev.filter(v => v.type !== type);
      return [{ type, title, timestamp: Date.now() }, ...filtered].slice(0, 8);
    });
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
      if (event.altKey && event.key.toLowerCase() === 't') {
        event.preventDefault();
        openTab('terminal');
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        document.querySelector<HTMLInputElement>('.url-bar-input')?.focus();
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === 'b') {
        event.preventDefault();
        setShowBookmarks(prev => {
          const next = !prev;
          localStorage.setItem('quillpy_show_bookmarks', String(next));
          return next;
        });
        return;
      }

      if (event.key === '?') {
        event.preventDefault();
        setShowShortcuts(prev => !prev);
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === 'd') {
        event.preventDefault();
        const bookmarkEvent = new CustomEvent('quillpy_bookmark');
        window.dispatchEvent(bookmarkEvent);
        return;
      }

      if (event.ctrlKey && event.key.toLowerCase() === 'r') {
        event.preventDefault();
        handleRefresh();
        return;
      }

      if (event.ctrlKey && (event.key === '+' || event.key === '=')) {
        event.preventDefault();
        setZoom(prev => Math.min(prev + 10, 150));
        return;
      }

      if (event.ctrlKey && event.key === '-') {
        event.preventDefault();
        setZoom(prev => Math.max(prev - 10, 50));
        return;
      }

      if (event.ctrlKey && event.key === '0') {
        event.preventDefault();
        setZoom(100);
        return;
      }

      const buffer = konamiBuffer.current;
      if (KONAMI_CODE.includes(event.keyCode)) {
        buffer.push(event.keyCode);
        if (buffer.length > KONAMI_CODE.length) buffer.shift();
        if (buffer.length === KONAMI_CODE.length && buffer.every((code, i) => code === KONAMI_CODE[i])) {
          setShowKonami(true);
          setTimeout(() => setShowKonami(false), 3000);
          buffer.length = 0;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const progress = scrollHeight > clientHeight ? (scrollTop / (scrollHeight - clientHeight)) * 100 : 0;
      setReadProgress(Math.min(progress, 100));
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeTabId]);

  useEffect(() => {
    const favicons: Record<TabType, string> = {
      welcome: '🌲',
      about: '🦊',
      projects: '',
      philosophy: '💭',
      connect: '🔗',
      terminal: '⌨️',
      support: '❤️',
      logs: '📝'
    };
    const activeTab = tabs.find(t => t.id === activeTabId);
    if (activeTab) {
      setFavicon(favicons[activeTab.type] || '');
    }
  }, [activeTabId, tabs]);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

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
    openTab('terminal');
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
      addRecentlyVisited(lowerQuery as TabType, DEFAULT_TAB_TITLES[lowerQuery as TabType]);
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
    addRecentlyVisited(type, DEFAULT_TAB_TITLES[type]);
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
  const timeStr = currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div 
      className="overflow-hidden relative flex flex-col"
      style={{ backgroundColor: 'var(--background)', height: '100%' }}
    >
      {readProgress > 0 && readProgress < 100 && (
        <div className="absolute left-0 right-0 top-0 z-50 h-0.5" style={{ backgroundColor: 'var(--brand-soft)' }}>
          <motion.div
            className="h-full"
            style={{ backgroundColor: 'var(--brand)' }}
            animate={{ width: `${readProgress}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
      )}

      {isLoading && (
        <div className="absolute left-0 right-0 top-0 z-50 h-0.5" style={{ backgroundColor: 'var(--brand-soft)' }}>
          <motion.div
            className="h-full"
            style={{ backgroundColor: 'var(--brand)', width: '30%' }}
            animate={{ x: ['-100%', '400%'] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      <BrowserControls 
        activeTab={activeTab?.type || 'welcome'} 
        onNavigate={handleNavigate}
        onControlClick={handleControlClick}
        onSearch={handleSearch}
        onBack={handleBack}
        onForward={handleForward}
        onRefresh={handleRefresh}
        canGoBack={historyIndex > 0}
        canGoForward={historyIndex < tabHistory.length - 1}
        bodyFontSize={bodyFontSize}
        onBodyFontSizeChange={setBodyFontSize}
        theme={theme}
        onThemeChange={setTheme}
        recentlyVisited={recentlyVisited}
        favicon={favicon}
      />
      
      {showBookmarks && (
        <BookmarksBar 
          onNavigate={handleNavigate} 
          currentTab={activeTab?.type || 'welcome'} 
        />
      )}
      
      <motion.div
        ref={contentRef}
        animate={{ opacity: showContent ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="flex min-h-0 flex-1 flex-col"
        style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top left' }}
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
        className="px-4 py-2 border-t flex flex-wrap items-center justify-between gap-2 text-xs font-mono"
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
          <span>Making stuff since 2026</span>
        </div>
        <div className="flex items-center gap-3">
          <span style={{ color: 'var(--text-soft)' }}>Hit ? for shortcuts</span>
          <span style={{ color: 'var(--text-soft)' }}>|</span>
          <span style={{ color: 'var(--text-soft)' }}>{zoom}%</span>
          <span style={{ color: 'var(--text-soft)' }}>|</span>
          <span style={{ color: 'var(--brand)', fontVariantNumeric: 'tabular-nums' }}>{timeStr}</span>
        </div>
      </div>

      <KeyboardShortcutsModal isOpen={showShortcuts} onClose={() => setShowShortcuts(false)} />

      {showKonami && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed bottom-16 left-1/2 z-[200] -translate-x-1/2 border px-4 py-2 text-sm"
          style={{
            backgroundColor: 'var(--surface-overlay)',
            borderColor: 'var(--brand)',
            color: 'var(--brand)',
            backdropFilter: 'blur(8px)',
          }}
        >
          🎮 Konami code activated. You found it.
        </motion.div>
      )}
    </div>
  );
}
