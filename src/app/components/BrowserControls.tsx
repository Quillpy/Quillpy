import { TabType } from './Browser';
import { Circle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { ControlMode } from './DevControlOverlay';

interface BrowserControlsProps {
  activeTab: TabType;
  onNavigate: (tab: TabType) => void;
  onControlClick: (mode: ControlMode) => void;
  onSearch: (query: string) => void;
}

export function BrowserControls({ activeTab, onNavigate, onControlClick, onSearch }: BrowserControlsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [urlValue, setUrlValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const getUrl = () => {
    if (activeTab === 'newtab') {
      return 'quillpy.dev/newtab';
    }
    return `quillpy.dev/${activeTab}`;
  };

  useEffect(() => {
    setUrlValue(getUrl());
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
    const cleanedValue = urlValue.replace('quillpy.dev/', '').trim();
    
    // Use the search function which handles both navigation and Google redirect
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
      className="px-3 sm:px-4 py-2 sm:py-3 border-b"
      style={{ 
        backgroundColor: '#16221d',
        borderColor: '#1b2a24'
      }}
    >
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <div className="flex gap-1.5 sm:gap-2">
          {/* Red - Kill */}
          <button
            onClick={() => onControlClick('kill')}
            onMouseEnter={() => setHoveredButton('kill')}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 cursor-pointer relative group"
            style={{ 
              backgroundColor: hoveredButton === 'kill' ? '#ff6b6b' : '#6f9f84'
            }}
            title="Kill Process"
          />
          
          {/* Yellow - Sleep */}
          <button
            onClick={() => onControlClick('sleep')}
            onMouseEnter={() => setHoveredButton('sleep')}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 cursor-pointer"
            style={{ 
              backgroundColor: hoveredButton === 'sleep' ? '#ffd93d' : '#6f9f84',
              opacity: hoveredButton === 'sleep' ? 1 : 0.5
            }}
            title="Sleep Mode"
          />
          
          {/* Green - Run */}
          <button
            onClick={() => onControlClick('run')}
            onMouseEnter={() => setHoveredButton('run')}
            onMouseLeave={() => setHoveredButton(null)}
            className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 cursor-pointer"
            style={{ 
              backgroundColor: hoveredButton === 'run' ? '#7fbf9a' : '#6f9f84',
              opacity: hoveredButton === 'run' ? 1 : 0.5
            }}
            title="Run"
          />
        </div>
      </div>
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={urlValue}
          onChange={(e) => setUrlValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="w-full px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-mono text-xs sm:text-sm outline-none"
          style={{ 
            backgroundColor: '#1b2a24',
            color: '#e6f0ea',
            border: '1px solid #6f9f84'
          }}
        />
      ) : (
        <div 
          onClick={handleUrlClick}
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-md font-mono text-xs sm:text-sm cursor-text"
          style={{ 
            backgroundColor: '#1b2a24',
            color: '#a6b8ad'
          }}
        >
          {getUrl()}
        </div>
      )}
    </div>
  );
}