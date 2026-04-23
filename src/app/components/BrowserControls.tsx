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
  const inputRef = useRef<HTMLInputElement>(null);
  const playClick = useClickSound();
  const [hoveredWindowBtn, setHoveredWindowBtn] = useState<string | null>(null);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

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
    }, 50);
    
    return () => clearInterval(interval);
  }, [activeTab]);

  const handleUrlClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleNavigate();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setUrlValue(getUrl());
    }
  };

  const handleNavigate = () => {
    const cleanedValue = urlValue.replace('quillpy.com/', '').trim();
    onSearch(cleanedValue);
    setIsEditing(false);
    setUrlValue(getUrl());
  };

  const handleBlur = () => {
    setIsEditing(false);
    setUrlValue(getUrl());
  };

  return (
    <div 
      className="px-3 sm:px-4 py-2 sm:py-3"
      style={{ 
        backgroundColor: '#16221d',
        borderColor: '#1b2a24'
      }}
    >
      <div className="flex items-center gap-2">
        <div className="flex gap-1.5 sm:gap-2">
          <button
            onClick={() => { playClick(); onControlClick('kill'); }}
            onMouseEnter={() => setHoveredWindowBtn('kill')}
            onMouseLeave={() => setHoveredWindowBtn(null)}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-150"
            style={{ 
              backgroundColor: hoveredWindowBtn === 'kill' ? '#ff5f57' : '#5c5c5c',
            }}
            title="Kill Process"
          />
          <button
            onClick={() => { playClick(); onControlClick('sleep'); }}
            onMouseEnter={() => setHoveredWindowBtn('sleep')}
            onMouseLeave={() => setHoveredWindowBtn(null)}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-150"
            style={{ 
              backgroundColor: hoveredWindowBtn === 'sleep' ? '#febc2e' : '#5c5c5c',
            }}
            title="Sleep Mode"
          />
          <button
            onClick={() => { playClick(); onControlClick('run'); }}
            onMouseEnter={() => setHoveredWindowBtn('run')}
            onMouseLeave={() => setHoveredWindowBtn(null)}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full cursor-pointer transition-all duration-150"
            style={{ 
              backgroundColor: hoveredWindowBtn === 'run' ? '#28c840' : '#5c5c5c',
            }}
            title="Run"
          />
        </div>

        <div className="flex gap-1 ml-2">
          <motion.button
            onClick={() => { playClick(); onBack(); }}
            disabled={!canGoBack}
            onMouseEnter={() => canGoBack && setHoveredIcon('back')}
            onMouseLeave={() => setHoveredIcon(null)}
            className="p-2 rounded cursor-pointer"
            whileHover={canGoBack ? { scale: 1.05 } : {}}
            whileTap={canGoBack ? { scale: 0.95 } : {}}
            style={{ 
              color: hoveredIcon === 'back' ? '#7fbf9a' : canGoBack ? '#6f9f84' : '#2d3d34',
              backgroundColor: hoveredIcon === 'back' ? '#1b2520' : 'transparent',
              opacity: canGoBack ? 1 : 0.4,
              cursor: canGoBack ? 'pointer' : 'not-allowed',
            }}
            title="Go Back (Alt+Left)"
          >
            <ChevronLeft size={16} />
          </motion.button>
          
          <motion.button
            onClick={() => { playClick(); onForward(); }}
            disabled={!canGoForward}
            onMouseEnter={() => canGoForward && setHoveredIcon('forward')}
            onMouseLeave={() => setHoveredIcon(null)}
            className="p-2 rounded cursor-pointer"
            whileHover={canGoForward ? { scale: 1.05 } : {}}
            whileTap={canGoForward ? { scale: 0.95 } : {}}
            style={{ 
              color: hoveredIcon === 'forward' ? '#7fbf9a' : canGoForward ? '#6f9f84' : '#2d3d34',
              backgroundColor: hoveredIcon === 'forward' ? '#1b2520' : 'transparent',
              opacity: canGoForward ? 1 : 0.4,
              cursor: canGoForward ? 'pointer' : 'not-allowed',
            }}
            title="Go Forward (Alt+Right)"
          >
            <ChevronRight size={16} />
          </motion.button>

          <motion.button
            onClick={() => { playClick(); onSearch('welcome'); }}
            onMouseEnter={() => setHoveredIcon('home')}
            onMouseLeave={() => setHoveredIcon(null)}
            className="p-2 rounded cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              color: hoveredIcon === 'home' ? '#7fbf9a' : '#6f9f84',
              backgroundColor: hoveredIcon === 'home' ? '#1b2520' : 'transparent',
            }}
            title="Go Home"
          >
            <Home size={16} />
          </motion.button>
        </div>

        <div className="flex-1 mx-2 flex items-center gap-2">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="flex-1 px-3 py-1.5 rounded-md font-mono text-xs sm:text-sm outline-none"
              style={{ 
                backgroundColor: '#1b2a24',
                color: '#e6f0ea',
                border: '1px solid #6f9f84'
              }}
            />
          ) : (
            <div 
              onClick={handleUrlClick}
              className="flex-1 px-3 py-1.5 rounded-md font-mono text-xs sm:text-sm cursor-text"
              style={{ 
                backgroundColor: '#1b2a24',
                color: '#a6b8ad',
              }}
            >
              {displayUrl || getUrl()}
              {isTyping && <span style={{ color: '#7fbf9a' }}>_</span>}
            </div>
          )}

          <div className="flex gap-1 px-2 border-l" style={{ borderColor: '#1b2a24' }}>
            {QUICK_NAV_ICONS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.tab}
                  onClick={() => { playClick(); onNavigate(item.tab); }}
                  onMouseEnter={() => setHoveredIcon(item.tab)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="p-1.5 rounded cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ 
                    color: hoveredIcon === item.tab ? item.color : '#6f9f84',
                    backgroundColor: hoveredIcon === item.tab ? '#1b2520' : 'transparent',
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