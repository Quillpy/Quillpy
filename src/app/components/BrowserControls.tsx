import { TabType } from './Browser';
import { ChevronLeft, ChevronRight, Home, Settings2, Sparkles, Folder, User, Link, Heart, BookOpen, Moon, Sun, Clock, RefreshCw } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ControlMode } from './DevControlOverlay';
import { useClickSound } from '../../hooks/useClickSound';
import { motion, AnimatePresence } from 'motion/react';

interface VisitedEntry {
  type: TabType;
  title: string;
  timestamp: number;
}

const PAGE_ORDER: TabType[] = ['welcome', 'about', 'projects', 'philosophy', 'logs', 'connect', 'support', 'terminal'];

const QUICK_NAV_ICONS = [
  { tab: 'welcome' as TabType, icon: Sparkles, hint: 'Welcome', color: '#a78bda' },
  { tab: 'about' as TabType, icon: User, hint: 'About', color: '#6f9f84' },
  { tab: 'projects' as TabType, icon: Folder, hint: 'Projects', color: '#7fbf9a' },
  { tab: 'logs' as TabType, icon: BookOpen, hint: 'Logs', color: '#ffd166' },
  { tab: 'connect' as TabType, icon: Link, hint: 'Connect', color: '#67bcf0' },
  { tab: 'support' as TabType, icon: Heart, hint: 'Support', color: '#f06b8a' },
];

interface BrowserControlsProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  onControlClick: (mode: ControlMode) => void;
  onSearch: (query: string) => void;
  onBack: () => void;
  onForward: () => void;
  onRefresh?: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  bodyFontSize: number;
  onBodyFontSizeChange: (size: number) => void;
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
  recentlyVisited: VisitedEntry[];
}

export function BrowserControls({ activeTab, onNavigate, onControlClick, onSearch, onBack, onForward, onRefresh, canGoBack, canGoForward, bodyFontSize, onBodyFontSizeChange, theme, onThemeChange, recentlyVisited }: BrowserControlsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [hoveredWindowBtn, setHoveredWindowBtn] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const { playClick, isEnabled, setEnabled } = useClickSound();

  const getUrl = () => `quillpy.com/${activeTab}`;

  useEffect(() => setUrlValue(getUrl()), [activeTab]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
      if (historyRef.current && !historyRef.current.contains(event.target as Node)) {
        setIsHistoryOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleUrlClick = () => {
    setIsEditing(true);
    setTimeout(() => { inputRef.current?.focus(); inputRef.current?.select(); }, 0);
  };

  const handleNavigate = () => {
    const cleanedValue = urlValue.replace('quillpy.com/', '').trim();
    onSearch(cleanedValue);
    setIsEditing(false);
    setUrlValue(getUrl());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleNavigate();
    else if (e.key === 'Escape') { setIsEditing(false); setUrlValue(getUrl()); }
  };

  const navButtonStyle = (key: string, enabled = true) => ({
    color: hoveredIcon === key ? 'var(--text-strong)' : enabled ? 'var(--text-muted)' : 'var(--text-soft)',
    backgroundColor: hoveredIcon === key ? 'var(--button-hover)' : 'transparent',
    opacity: enabled ? 1 : 0.45,
    cursor: enabled ? 'pointer' : 'not-allowed',
  });

  const urlBarBg = 'var(--chrome-panel)';
  const urlBarBorder = 'var(--border)';
  const urlBarText = 'var(--text-muted)';
  const settingsBg = 'var(--surface-1)';
  const settingsBorder = 'var(--border)';
  const settingsText = 'var(--text-muted)';
  const accentColor = 'var(--brand)';
  const headerColor = 'var(--brand)';
  const borderColor = 'var(--border)';

  return (
    <div
      className="px-3 sm:px-4 py-2.5"
      style={{ backgroundColor: 'var(--chrome-bg)', borderBottom: '1px solid var(--chrome-border)' }}
    >
      <div className="flex items-center gap-2.5">
        <div className="flex gap-1.5 sm:gap-2">
          <button onClick={() => { playClick(); onControlClick('kill'); }} onMouseEnter={() => setHoveredWindowBtn('kill')} onMouseLeave={() => setHoveredWindowBtn(null)} className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full cursor-pointer" style={{ backgroundColor: hoveredWindowBtn === 'kill' ? '#ff5f57' : '#5c5c5c', boxShadow: hoveredWindowBtn === 'kill' ? '0 0 0 5px rgba(255, 95, 87, 0.12)' : 'none' }} title="Kill Process" />
          <button onClick={() => { playClick(); onControlClick('sleep'); }} onMouseEnter={() => setHoveredWindowBtn('sleep')} onMouseLeave={() => setHoveredWindowBtn(null)} className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full cursor-pointer" style={{ backgroundColor: hoveredWindowBtn === 'sleep' ? '#febc2e' : '#5c5c5c', boxShadow: hoveredWindowBtn === 'sleep' ? '0 0 0 5px rgba(254, 188, 46, 0.12)' : 'none' }} title="Sleep Mode" />
          <button onClick={() => { playClick(); onControlClick('run'); }} onMouseEnter={() => setHoveredWindowBtn('run')} onMouseLeave={() => setHoveredWindowBtn(null)} className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full cursor-pointer" style={{ backgroundColor: hoveredWindowBtn === 'run' ? '#28c840' : '#5c5c5c', boxShadow: hoveredWindowBtn === 'run' ? '0 0 0 5px rgba(40, 200, 64, 0.12)' : 'none' }} title="Run" />
        </div>

        <div className="ml-1 flex gap-1 sm:ml-2">
          <button onClick={() => { playClick(); onBack(); }} disabled={!canGoBack} onMouseEnter={() => canGoBack && setHoveredIcon('back')} onMouseLeave={() => setHoveredIcon(null)} className="p-2" style={navButtonStyle('back', canGoBack)} title="Go Back (Alt+Left)"><ChevronLeft size={16} /></button>
          <button onClick={() => { playClick(); onForward(); }} disabled={!canGoForward} onMouseEnter={() => canGoForward && setHoveredIcon('forward')} onMouseLeave={() => setHoveredIcon(null)} className="p-2" style={navButtonStyle('forward', canGoForward)} title="Go Forward (Alt+Right)"><ChevronRight size={16} /></button>
          <button onClick={() => { playClick(); onRefresh?.(); }} onMouseEnter={() => setHoveredIcon('refresh')} onMouseLeave={() => setHoveredIcon(null)} className="p-2" style={navButtonStyle('refresh')} title="Refresh (Ctrl+R)"><RefreshCw size={16} /></button>
          <button onClick={() => { playClick(); onSearch('welcome'); }} onMouseEnter={() => setHoveredIcon('home')} onMouseLeave={() => setHoveredIcon(null)} className="p-2" style={navButtonStyle('home')} title="Go Home"><Home size={16} /></button>
        </div>

        <div className="mx-1 flex flex-1 items-center gap-2 sm:mx-2 min-w-0">
          <div className="relative flex-1">
            {isEditing ? (
              <input ref={inputRef} type="text" value={urlValue} onChange={(e) => setUrlValue(e.target.value)} onKeyDown={handleKeyDown} onBlur={() => { setIsEditing(false); setUrlValue(getUrl()); }} className="url-bar-input flex-1 border px-3 py-2 font-mono text-xs sm:text-sm outline-none" style={{ backgroundColor: urlBarBg, color: urlBarText, borderColor: urlBarBorder }} />
            ) : (
              <div onClick={handleUrlClick} className="url-bar-input flex-1 cursor-text border px-3 py-2 font-mono text-xs sm:text-sm" style={{ backgroundColor: urlBarBg, color: urlBarText, borderColor: urlBarBorder, transition: 'all 0.15s ease' }}>{getUrl()}</div>
            )}

            <AnimatePresence>
              {recentlyVisited.length > 0 && !isEditing && (
                <motion.button
                  onClick={() => setIsHistoryOpen(prev => !prev)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  whileHover={{ opacity: 1 }}
                  style={{ color: 'var(--text-soft)' }}
                  title="Recently visited"
                >
                  <Clock size={12} />
                </motion.button>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {isHistoryOpen && recentlyVisited.length > 0 && (
                <motion.div
                  ref={historyRef}
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto border"
                  style={{
                    backgroundColor: settingsBg,
                    borderColor: settingsBorder,
                  }}
                >
                  <div className="px-3 py-2 border-b text-[11px] uppercase tracking-[0.16em]" style={{ borderColor, color: headerColor }}>
                    Recently Visited
                  </div>
                  {recentlyVisited.map((entry) => {
                    const Icon = QUICK_NAV_ICONS.find(q => q.tab === entry.type)?.icon || Sparkles;
                    const iconColor = QUICK_NAV_ICONS.find(q => q.tab === entry.type)?.color || 'var(--brand)';
                    return (
                      <button
                        key={`${entry.type}-${entry.timestamp}`}
                        onClick={() => {
                          onNavigate(entry.type);
                          setIsHistoryOpen(false);
                        }}
                        className="flex w-full items-center gap-2.5 border-b px-3 py-2 text-left text-xs last:border-b-0"
                        style={{
                          borderColor: 'var(--border)',
                          color: 'var(--text-muted)',
                          backgroundColor: entry.type === activeTab ? 'var(--button-hover)' : 'transparent',
                        }}
                      >
                        <Icon size={12} style={{ color: iconColor }} />
                        <span className="flex-1 truncate">{entry.title}</span>
                        <span style={{ color: 'var(--text-soft)', fontSize: '10px' }}>
                          {new Date(entry.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex gap-1 border-l pl-2" style={{ borderColor: urlBarBorder }}>
            {QUICK_NAV_ICONS.map((item) => {
              const Icon = item.icon;
              return (
                <button key={item.tab} onClick={() => { playClick(); onNavigate(item.tab); }} onMouseEnter={() => setHoveredIcon(item.tab)} onMouseLeave={() => setHoveredIcon(null)} className="p-2" style={{ color: hoveredIcon === item.tab ? item.color : 'var(--text-muted)', transition: 'color 0.15s ease' }} title={item.hint}><Icon size={14} /></button>
              );
            })}
          </div>

          <div className="relative ml-1 flex-shrink-0" ref={settingsRef}>
            <button onClick={() => setIsSettingsOpen((prev) => !prev)} onMouseEnter={() => setHoveredIcon('settings')} onMouseLeave={() => setHoveredIcon(null)} className="p-2 border" style={{ color: hoveredIcon === 'settings' || isSettingsOpen ? 'var(--text-strong)' : 'var(--text-muted)', backgroundColor: hoveredIcon === 'settings' || isSettingsOpen ? 'var(--button-hover)' : 'var(--chrome-panel-strong)', borderColor: urlBarBorder, transition: 'all 0.15s ease' }} title="Settings"><Settings2 size={14} /></button>

            <AnimatePresence>
              {isSettingsOpen && (
                <motion.div initial={{ opacity: 0, y: 6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6, scale: 0.98 }} transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }} className="absolute right-0 top-[calc(100%+0.5rem)] w-52 border z-20" style={{ backgroundColor: settingsBg, borderColor: settingsBorder }}>
                  <div className="px-3 py-2.5 border-b text-[11px] uppercase tracking-[0.16em]" style={{ borderColor, color: headerColor }}>Settings</div>
                  <div className="px-3 py-3">
                    <div className="mb-2 flex items-center justify-between text-xs" style={{ color: settingsText }}><span>Body font size</span><span style={{ color: accentColor }}>{bodyFontSize}px</span></div>
                    <input type="range" min="14" max="20" step="1" value={bodyFontSize} onChange={(e) => onBodyFontSizeChange(Number(e.target.value))} className="w-full" style={{ accentColor }} />
                    <div className="mt-3 flex gap-2">
                      {[14, 16, 18].map((size) => (<button key={size} onClick={() => onBodyFontSizeChange(size)} className="flex-1 px-2 py-1.5 border text-xs" style={{ backgroundColor: bodyFontSize === size ? 'var(--button-hover)' : 'var(--surface-2)', borderColor: bodyFontSize === size ? urlBarBorder : settingsBorder, color: bodyFontSize === size ? 'var(--text-strong)' : settingsText, transition: 'all 0.15s ease' }}>{size}px</button>))}
                    </div>
                    <div className="mt-4 pt-3 border-t" style={{ borderColor }}>
                      <div className="mb-2 flex items-center justify-between text-xs" style={{ color: settingsText }}><span>Theme</span><span style={{ color: accentColor }}>{theme === 'dark' ? 'Dark' : 'Light'}</span></div>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => onThemeChange('dark')} className="flex items-center justify-center gap-2 px-2 py-1.5 border text-xs" style={{ backgroundColor: theme === 'dark' ? 'var(--button-hover)' : 'var(--surface-2)', borderColor: theme === 'dark' ? urlBarBorder : settingsBorder, color: theme === 'dark' ? 'var(--text-strong)' : settingsText, transition: 'all 0.15s ease' }}><Moon size={12} />Dark</button>
                        <button onClick={() => onThemeChange('light')} className="flex items-center justify-center gap-2 px-2 py-1.5 border text-xs" style={{ backgroundColor: theme === 'light' ? 'var(--button-hover)' : 'var(--surface-2)', borderColor: theme === 'light' ? urlBarBorder : settingsBorder, color: theme === 'light' ? 'var(--text-strong)' : settingsText, transition: 'all 0.15s ease' }}><Sun size={12} />Light</button>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t" style={{ borderColor }}>
                      <div className="mb-2 flex items-center justify-between text-xs" style={{ color: settingsText }}><span>Sounds</span><span style={{ color: accentColor }}>{isEnabled ? 'On' : 'Off'}</span></div>
                      <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => setEnabled(true)} className="flex items-center justify-center gap-2 px-2 py-1.5 border text-xs" style={{ backgroundColor: isEnabled ? 'var(--button-hover)' : 'var(--surface-2)', borderColor: isEnabled ? urlBarBorder : settingsBorder, color: isEnabled ? 'var(--text-strong)' : settingsText, transition: 'all 0.15s ease' }}>On</button>
                        <button onClick={() => setEnabled(false)} className="flex items-center justify-center gap-2 px-2 py-1.5 border text-xs" style={{ backgroundColor: !isEnabled ? 'var(--button-hover)' : 'var(--surface-2)', borderColor: !isEnabled ? urlBarBorder : settingsBorder, color: !isEnabled ? 'var(--text-strong)' : settingsText, transition: 'all 0.15s ease' }}>Off</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
