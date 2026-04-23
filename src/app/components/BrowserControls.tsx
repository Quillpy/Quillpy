import { TabType } from './Browser';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ControlMode } from './DevControlOverlay';
import { useClickSound } from '../../hooks/useClickSound';
import { motion } from 'motion/react';

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
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
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
            onMouseEnter={() => setHoveredButton('kill')}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 cursor-pointer"
            style={{ 
              backgroundColor: hoveredButton === 'kill' ? '#ff6b6b' : '#6f9f84',
              boxShadow: hoveredButton === 'kill' ? '0 0 8px rgba(255, 107, 107, 0.5)' : 'none'
            }}
            title="Kill Process"
          />
          
          <button
            onClick={() => { playClick(); onControlClick('sleep'); }}
            onMouseEnter={() => setHoveredButton('sleep')}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 cursor-pointer"
            style={{ 
              backgroundColor: hoveredButton === 'sleep' ? '#ffd93d' : '#6f9f84',
              opacity: hoveredButton === 'sleep' ? 1 : 0.5,
              boxShadow: hoveredButton === 'sleep' ? '0 0 8px rgba(255, 217, 61, 0.5)' : 'none'
            }}
            title="Sleep Mode"
          />
          
          <button
            onClick={() => { playClick(); onControlClick('run'); }}
            onMouseEnter={() => setHoveredButton('run')}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 cursor-pointer"
            style={{ 
              backgroundColor: hoveredButton === 'run' ? '#7fbf9a' : '#6f9f84',
              opacity: hoveredButton === 'run' ? 1 : 0.5,
              boxShadow: hoveredButton === 'run' ? '0 0 8px rgba(127, 191, 154, 0.5)' : 'none'
            }}
            title="Run"
          />
        </div>

        <div className="flex gap-1 ml-2">
          <motion.button
            onClick={() => { playClick(); onBack(); }}
            disabled={!canGoBack}
            className="p-2 rounded transition-all duration-200 cursor-pointer"
            whileHover={canGoBack ? { scale: 1.05 } : {}}
            whileTap={canGoBack ? { scale: 0.95 } : {}}
            style={{ 
              backgroundColor: canGoBack ? 'transparent' : 'transparent',
              color: canGoBack ? '#7fbf9a' : '#2d3d34',
              opacity: canGoBack ? 1 : 0.4,
              cursor: canGoBack ? 'pointer' : 'not-allowed',
              border: '1px solid #1b2a24'
            }}
            onMouseEnter={(e) => {
              if (canGoBack) {
                e.currentTarget.style.backgroundColor = '#1b2a24';
                e.currentTarget.style.borderColor = '#7fbf9a';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#1b2a24';
            }}
            title="Go Back (Alt+Left)"
          >
            <ChevronLeft size={16} />
          </motion.button>
          
          <motion.button
            onClick={() => { playClick(); onForward(); }}
            disabled={!canGoForward}
            className="p-2 rounded transition-all duration-200 cursor-pointer"
            whileHover={canGoForward ? { scale: 1.05 } : {}}
            whileTap={canGoForward ? { scale: 0.95 } : {}}
            style={{ 
              backgroundColor: 'transparent',
              color: canGoForward ? '#7fbf9a' : '#2d3d34',
              opacity: canGoForward ? 1 : 0.4,
              cursor: canGoForward ? 'pointer' : 'not-allowed',
              border: '1px solid #1b2a24'
            }}
            onMouseEnter={(e) => {
              if (canGoForward) {
                e.currentTarget.style.backgroundColor = '#1b2a24';
                e.currentTarget.style.borderColor = '#7fbf9a';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#1b2a24';
            }}
            title="Go Forward (Alt+Right)"
          >
            <ChevronRight size={16} />
          </motion.button>

          <motion.button
            onClick={() => { playClick(); onSearch('welcome'); }}
            className="p-2 rounded transition-all duration-200 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              backgroundColor: 'transparent',
              color: '#7fbf9a',
              border: '1px solid #1b2a24'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#1b2a24';
              e.currentTarget.style.borderColor = '#7fbf9a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = '#1b2a24';
            }}
            title="Go Home"
          >
            <Home size={16} />
          </motion.button>
        </div>

        <div className="flex-1 mx-2">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={urlValue}
              onChange={(e) => setUrlValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              className="w-full px-3 py-1.5 rounded-md font-mono text-xs sm:text-sm outline-none"
              style={{ 
                backgroundColor: '#1b2a24',
                color: '#e6f0ea',
                border: '1px solid #6f9f84'
              }}
            />
          ) : (
            <div 
              onClick={handleUrlClick}
              className="px-3 py-1.5 rounded-md font-mono text-xs sm:text-sm cursor-text"
              style={{ 
                backgroundColor: '#1b2a24',
                color: '#a6b8ad',
                border: '1px solid transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#3a4d42';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              {displayUrl || getUrl()}
              {isTyping && <span style={{ color: '#7fbf9a' }}>_</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
