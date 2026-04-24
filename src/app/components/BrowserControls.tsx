import { TabType } from './Browser';
import { ChevronLeft, ChevronRight, Home, Sparkles, Folder, User, Link, Heart, BookOpen } from 'lucide-react';
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
}

export function BrowserControls({ activeTab, onNavigate, onControlClick, onSearch, onBack, onForward, canGoBack, canGoForward }: BrowserControlsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const [displayUrl, setDisplayUrl] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredWindowBtn, setHoveredWindowBtn] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const playClick = useClickSound();

  const getUrl = () => {
    if (activeTab === 'newtab') {
      return 'quillpy.com/newtab';
    }
    return `quillpy.com/${activeTab}`;
  };

  useEffect(() => {
    setUrlValue(getUrl());
    setIsTyping(true);
    let currentIndex = 0;
    const targetUrl = getUrl();
    setDisplayUrl('');

    const interval = setInterval(() => {
      if (currentIndex < targetUrl.length) {
        setDisplayUrl(targetUrl.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [activeTab]);

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

  const navButtonStyle = (key: string, enabled = true) => ({
    color: hoveredIcon === key ? '#dbe6df' : enabled ? '#6f9f84' : '#2d3d34',
    backgroundColor: hoveredIcon === key ? '#18231e' : 'transparent',
    opacity: enabled ? 1 : 0.45,
    cursor: enabled ? 'pointer' : 'not-allowed',
  });

  return (
    <div
      className="px-3 sm:px-4 py-2.5"
      style={{
        backgroundColor: '#121b17',
        borderBottom: '1px solid #1d2c25',
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

        <div className="mx-1 flex flex-1 items-center gap-2 sm:mx-2">
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
                backgroundColor: '#18231e',
                color: '#e6f0ea',
                borderColor: '#355246',
              }}
            />
          ) : (
            <div
              onClick={handleUrlClick}
              className="ui-hover ui-panel-soft flex-1 cursor-text border px-3 py-2 font-mono text-xs sm:text-sm"
              style={{
                backgroundColor: '#18231e',
                color: '#a6b8ad',
                borderColor: '#22332b',
              }}
            >
              {displayUrl || getUrl()}
              {isTyping && <span style={{ color: '#7fbf9a' }}>_</span>}
            </div>
          )}

          <div className="flex gap-1 border-l pl-2" style={{ borderColor: '#22332b' }}>
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
                    color: hoveredIcon === item.tab ? item.color : '#6f9f84',
                    backgroundColor: hoveredIcon === item.tab ? '#18231e' : 'transparent',
                  }}
                  title={item.hint}
                >
                  <Icon size={14} />
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
