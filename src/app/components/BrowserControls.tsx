import { TabType } from './Browser';
import { ChevronLeft, ChevronRight, Home, Settings2, Sparkles, Folder, User, Link, Heart, BookOpen, Moon, Sun } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ControlMode } from './DevControlOverlay';
import { useClickSound } from '../../hooks/useClickSound';
import { motion } from 'motion/react';

const QUICK_NAV_ICONS = [
  { tab: 'welcome' as TabType, icon: Sparkles, hint: 'Welcome', color: '#a78bda' },
  { tab: 'projects' as TabType, icon: Folder, hint: 'Projects', color: '#7fbf9a' },
  { tab: 'about' as TabType, icon: User, hint: 'About', color: '#6f9f84' },
  { tab: 'connect' as TabType, icon: Link, hint: 'Connect', color: '#67bcf0' },
  { tab: 'support' as TabType, icon: Heart, hint: 'Support', color: '#f06b8a' },
  { tab: 'logs' as TabType, icon: BookOpen, hint: 'Logs', color: '#ffd166' },
];

interface BrowserControlsProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  onControlClick: (mode: ControlMode) => void;
  onSearch: (query: string) => void;
  onBack: () => void;
  onForward: () => void;
  canGoBack: boolean;
  canGoForward: boolean;
  bodyFontSize: number;
  onBodyFontSizeChange: (size: number) => void;
  theme: 'dark' | 'light';
  onThemeChange: (theme: 'dark' | 'light') => void;
}

export function BrowserControls({ activeTab, onNavigate, onControlClick, onSearch, onBack, onForward, canGoBack, canGoForward, bodyFontSize, onBodyFontSizeChange, theme, onThemeChange }: BrowserControlsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hoveredWindowBtn, setHoveredWindowBtn] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const playClick = useClickSound();

  const getUrl = () => {
    if (activeTab === 'newtab') {
      return 'quillpy.com/newtab';
    }
    return `quillpy.com/${activeTab}`;
  };

  useEffect(() => {
    setUrlValue(getUrl());
  }, [activeTab]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!settingsRef.current?.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleUrlClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const handleNavigate = () => {
    const cleanedValue = urlValue.replace('quillpy.com/', '').trim();
    onSearch(cleanedValue);
    setIsEditing(false);
    setUrlValue(getUrl());
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setUrlValue(getUrl());
    }
  };

  const navButtonStyle = (key: string, enabled = true) => {
    return {
      color: hoveredIcon === key ? 'var(--text-strong)' : enabled ? 'var(--text-muted)' : 'var(--text-soft)',
      backgroundColor: hoveredIcon === key ? 'var(--button-hover)' : 'transparent',
      opacity: enabled ? 1 : 0.45,
      cursor: enabled ? 'pointer' : 'not-allowed',
    };
  };

  const urlBarBg = 'var(--chrome-panel)';
  const urlBarBorder = 'var(--border)';
  const urlBarText = 'var(--text-muted)';
  const urlBarCaret = 'var(--brand)';
  const settingsBg = 'var(--surface-1)';
  const settingsBorder = 'var(--border)';
  const settingsText = 'var(--text-muted)';
  const accentColor = 'var(--brand)';
  const headerColor = 'var(--brand)';
  const borderColor = 'var(--border)';

  return (
    <div
      className="px-3 sm:px-4 py-2.5"
      style={{
        backgroundColor: 'var(--chrome-bg)',
        borderBottom: '1px solid var(--chrome-border)',
      }}
    >
      <div className="flex items-center gap-2.5">
        <div className="flex gap-1.5 sm:gap-2">
          <button
            onClick={() => { playClick(); onControlClick('kill'); }}
            onMouseEnter={() => setHoveredWindowBtn('kill')}
            onMouseLeave={() => setHoveredWindowBtn(null)}
            className="ui-hover h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full cursor-pointer"
            style={{
              backgroundColor: hoveredWindowBtn === 'kill' ? '#ff5f57' : '#5c5c5c',
              boxShadow: hoveredWindowBtn === 'kill' ? '0 0 0 5px rgba(255, 95, 87, 0.12)' : 'none',
            }}
            title="Kill Process"
          />
          <button
            onClick={() => { playClick(); onControlClick('sleep'); }}
            onMouseEnter={() => setHoveredWindowBtn('sleep')}
            onMouseLeave={() => setHoveredWindowBtn(null)}
            className="ui-hover h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full cursor-pointer"
            style={{
              backgroundColor: hoveredWindowBtn === 'sleep' ? '#febc2e' : '#5c5c5c',
              boxShadow: hoveredWindowBtn === 'sleep' ? '0 0 0 5px rgba(254, 188, 46, 0.12)' : 'none',
            }}
            title="Sleep Mode"
          />
          <button
            onClick={() => { playClick(); onControlClick('run'); }}
            onMouseEnter={() => setHoveredWindowBtn('run')}
            onMouseLeave={() => setHoveredWindowBtn(null)}
            className="ui-hover h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full cursor-pointer"
            style={{
              backgroundColor: hoveredWindowBtn === 'run' ? '#28c840' : '#5c5c5c',
              boxShadow: hoveredWindowBtn === 'run' ? '0 0 0 5px rgba(40, 200, 64, 0.12)' : 'none',
            }}
            title="Run"
          />
        </div>

        <div className="ml-1 flex gap-1 sm:ml-2">
          <motion.button
            onClick={() => { playClick(); onBack(); }}
            disabled={!canGoBack}
            onMouseEnter={() => canGoBack && setHoveredIcon('back')}
            onMouseLeave={() => setHoveredIcon(null)}
            className="ui-hover ui-press p-2"
            whileHover={canGoBack ? { scale: 1.03 } : {}}
            whileTap={canGoBack ? { scale: 0.97 } : {}}
            style={navButtonStyle('back', canGoBack)}
            title="Go Back (Alt+Left)"
          >
            <ChevronLeft size={16} />
          </motion.button>

          <motion.button
            onClick={() => { playClick(); onForward(); }}
            disabled={!canGoForward}
            onMouseEnter={() => canGoForward && setHoveredIcon('forward')}
            onMouseLeave={() => setHoveredIcon(null)}
            className="ui-hover ui-press p-2"
            whileHover={canGoForward ? { scale: 1.03 } : {}}
            whileTap={canGoForward ? { scale: 0.97 } : {}}
            style={navButtonStyle('forward', canGoForward)}
            title="Go Forward (Alt+Right)"
          >
            <ChevronRight size={16} />
          </motion.button>

          <motion.button
            onClick={() => { playClick(); onSearch('welcome'); }}
            onMouseEnter={() => setHoveredIcon('home')}
            onMouseLeave={() => setHoveredIcon(null)}
            className="ui-hover ui-press p-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={navButtonStyle('home')}
            title="Go Home"
          >
            <Home size={16} />
          </motion.button>
        </div>

        <div className="mx-1 flex flex-1 items-center gap-2 sm:mx-2 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                setIsEditing(false);
                setUrlValue(getUrl());
              }}
              className="flex-1 border px-3 py-2 font-mono text-xs sm:text-sm outline-none ui-panel-soft"
              style={{
                backgroundColor: urlBarBg,
                color: urlBarText,
                borderColor: urlBarBorder,
              }}
            />
          ) : (
            <div
              onClick={handleUrlClick}
              className="ui-hover ui-panel-soft flex-1 cursor-text border px-3 py-2 font-mono text-xs sm:text-sm"
              style={{
                backgroundColor: urlBarBg,
                color: urlBarText,
                borderColor: urlBarBorder,
              }}
            >
              {getUrl()}
            </div>
          )}

          <div className="flex gap-1 border-l pl-2" style={{ borderColor: urlBarBorder }}>
            {QUICK_NAV_ICONS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.tab}
                  onClick={() => { playClick(); onNavigate(item.tab); }}
                  onMouseEnter={() => setHoveredIcon(item.tab)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="ui-hover ui-press p-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    color: hoveredIcon === item.tab ? item.color : 'var(--text-muted)',
                    backgroundColor: hoveredIcon === item.tab ? 'var(--button-hover)' : 'transparent',
                  }}
                  title={item.hint}
                >
                  <Icon size={14} />
                </motion.button>
              );
            })}
          </div>

          <div className="relative ml-1 flex-shrink-0" ref={settingsRef}>
            <motion.button
              onClick={() => setIsSettingsOpen((prev) => !prev)}
              onMouseEnter={() => setHoveredIcon('settings')}
              onMouseLeave={() => setHoveredIcon(null)}
              className="ui-hover ui-press p-2 border ui-panel-soft"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
                style={{
                color: hoveredIcon === 'settings' ? 'var(--text-strong)' : 'var(--text-muted)',
                backgroundColor: hoveredIcon === 'settings' || isSettingsOpen ? 'var(--button-hover)' : 'var(--chrome-panel-strong)',
                borderColor: urlBarBorder,
              }}
              title="Settings"
            >
              <Settings2 size={14} />
            </motion.button>

            {isSettingsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.18 }}
                className="absolute right-0 top-[calc(100%+0.5rem)] w-52 border ui-panel z-20"
                style={{
                  backgroundColor: settingsBg,
                  borderColor: settingsBorder,
                }}
              >
                <div className="px-3 py-2.5 border-b text-[11px] uppercase tracking-[0.16em]" style={{ borderColor, color: headerColor }}>
                  Settings
                </div>
                <div className="px-3 py-3">
                  <div className="mb-2 flex items-center justify-between text-xs" style={{ color: settingsText }}>
                    <span>Body font size</span>
                    <span style={{ color: accentColor }}>{bodyFontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="14"
                    max="20"
                    step="1"
                    value={bodyFontSize}
                    onChange={(e) => onBodyFontSizeChange(Number(e.target.value))}
                    className="w-full"
                    style={{ accentColor }}
                  />
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[14, 16, 18].map((size) => (
                      <button
                        key={size}
                        onClick={() => onBodyFontSizeChange(size)}
                        className="ui-hover px-2 py-1.5 border text-xs"
                        style={{
                          backgroundColor: bodyFontSize === size ? 'var(--button-hover)' : 'var(--surface-2)',
                          borderColor: bodyFontSize === size ? urlBarBorder : settingsBorder,
                          color: bodyFontSize === size ? 'var(--text-strong)' : settingsText,
                        }}
                      >
                        {size}px
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t" style={{ borderColor }}>
                    <div className="mb-2 flex items-center justify-between text-xs" style={{ color: settingsText }}>
                      <span>Theme</span>
                      <span style={{ color: accentColor }}>{theme === 'dark' ? 'Dark' : 'Light'}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onThemeChange('dark')}
                        className="ui-hover flex items-center justify-center gap-2 px-2 py-1.5 border text-xs"
                        style={{
                          backgroundColor: theme === 'dark' ? 'var(--button-hover)' : 'var(--surface-2)',
                          borderColor: theme === 'dark' ? urlBarBorder : settingsBorder,
                          color: theme === 'dark' ? 'var(--text-strong)' : settingsText,
                        }}
                      >
                        <Moon size={12} />
                        Dark
                      </button>
                      <button
                        onClick={() => onThemeChange('light')}
                        className="ui-hover flex items-center justify-center gap-2 px-2 py-1.5 border text-xs"
                        style={{
                          backgroundColor: theme === 'light' ? 'var(--button-hover)' : 'var(--surface-2)',
                          borderColor: theme === 'light' ? urlBarBorder : settingsBorder,
                          color: theme === 'light' ? 'var(--text-strong)' : settingsText,
                        }}
                      >
                        <Sun size={12} />
                        Light
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
