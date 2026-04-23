import { useState, useRef, useEffect } from 'react';
import { TabType } from './Browser';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Package, User, Folder, Link, Heart, BookOpen, Sparkles } from 'lucide-react';

const TIPS = [
  { text: 'Try typing "neofetch" to see system info' },
  { text: 'Use Tab for auto-completion' },
  { text: 'Arrow keys navigate command history' },
];

interface TerminalTabProps {
  onNavigate: (tab: TabType) => void;
}

interface CommandHistory {
  input: string;
  output: React.ReactNode[];
}

const QUICK_LINKS = [
  { cmd: 'welcome', label: 'Welcome', icon: Sparkles },
  { cmd: 'projects', label: 'Projects', icon: Folder },
  { cmd: 'about', label: 'About', icon: User },
  { cmd: 'connect', label: 'Connect', icon: Link },
  { cmd: 'support', label: 'Support', icon: Heart },
  { cmd: 'logs', label: 'Logs', icon: BookOpen },
];

const QUICK_NAV_ICONS = [
  { cmd: 'welcome', label: 'Welcome', icon: Sparkles, hint: 'Go to welcome', color: '#a78bda' },
  { cmd: 'projects', label: 'Projects', icon: Folder, hint: 'View projects', color: '#7fbf9a' },
  { cmd: 'about', label: 'About', icon: User, hint: 'About me', color: '#6f9f84' },
  { cmd: 'connect', label: 'Connect', icon: Link, hint: 'Get in touch', color: '#67bcf0' },
  { cmd: 'support', label: 'Support', icon: Heart, hint: 'Support me', color: '#f06b8a' },
  { cmd: 'logs', label: 'Logs', icon: BookOpen, hint: 'Life logs', color: '#ffd166' },
];

export function TerminalTab({ onNavigate }: TerminalTabProps) {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [localHistory, setLocalHistory] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);
  const [hoveredWindowBtn, setHoveredWindowBtn] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    outputRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  useEffect(() => {
    const tipInterval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % TIPS.length);
    }, 5000);
    return () => clearInterval(tipInterval);
  }, []);

  const processCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();
    let output: React.ReactNode[] = [];

    if (lowerCmd === 'help') {
      output = [
        <div key="help-header" className="mb-2" style={{ color: '#7fbf9a' }}>Available commands:</div>,
        <div key="help-list" className="space-y-1" style={{ color: '#a6b8ad' }}>
          <div><span style={{ color: '#7fbf9a' }}>help</span> - Show this help message</div>
          <div><span style={{ color: '#7fbf9a' }}>clear</span> - Clear terminal</div>
          <div><span style={{ color: '#7fbf9a' }}>neofetch</span> - Display system info</div>
          <div><span style={{ color: '#7fbf9a' }}>whoami</span> - About me</div>
          <div><span style={{ color: '#7fbf9a' }}>ls</span> - List all pages</div>
          <div><span style={{ color: '#7fbf9a' }}>cd [page]</span> - Navigate to page</div>
          <div><span style={{ color: '#7fbf9a' }}>support</span> - Support my work</div>
          <div><span style={{ color: '#7fbf9a' }}>logs</span> - Read life logs</div>
        </div>
      ];
    } else if (lowerCmd === 'neofetch') {
      output = [
        <pre key="neofetch" className="text-xs sm:text-sm" style={{ color: '#7fbf9a' }}>
{`       ▄██████████████▄
     ███            ███
   ███    Quillpy     ███
   ███   ─────────    ███
   ███   os:  linux   ███
   ███   editor:  vim  ███
   ███   shell:  zsh   ███
     ███          ███
       ▀████████▀`}
        </pre>
      ];
    } else if (lowerCmd === 'clear') {
      setCommandHistory([]);
      return;
    } else if (lowerCmd === 'whoami' || lowerCmd === 'about') {
      output = [
        <div key="whoami" style={{ color: '#a6b8ad' }}>
          <span style={{ color: '#7fbf9a' }}>Quillpy</span> - Developer, creator, dreamer.
          <br />
          Building things one commit at a time.
        </div>
      ];
    } else if (lowerCmd === 'ls') {
      output = [
        <div key="ls" className="flex flex-wrap gap-2 mt-1">
          {QUICK_LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <motion.button
                key={link.cmd}
                onClick={() => onNavigate(link.cmd as TabType)}
                className="flex items-center gap-1.5 px-2 py-1 rounded text-xs"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ backgroundColor: '#1b2a24', color: '#7fbf9a' }}
              >
                <Icon size={12} />
                {link.label}
              </motion.button>
            );
          })}
        </div>
      ];
    } else if (lowerCmd === 'support') {
      onNavigate('support');
      output = [<div key="nav" style={{ color: '#7fbf9a' }}>Navigating to Support...</div>];
    } else if (lowerCmd === 'logs') {
      onNavigate('logs');
      output = [<div key="nav" style={{ color: '#7fbf9a' }}>Navigating to Logs...</div>];
    } else if (QUICK_LINKS.some(l => l.cmd === lowerCmd)) {
      onNavigate(lowerCmd as TabType);
      output = [<div key="nav" style={{ color: '#7fbf9a' }}>Navigating to {lowerCmd}...</div>];
    } else if (lowerCmd.startsWith('cd ')) {
      const target = lowerCmd.replace('cd ', '').trim();
      if (QUICK_LINKS.some(l => l.cmd === target)) {
        onNavigate(target as TabType);
        output = [<div key="nav" style={{ color: '#7fbf9a' }}>Navigating to {target}...</div>];
      } else {
        output = [<div key="error" style={{ color: '#ff6b6b' }}>cd: no such page: {target}</div>];
      }
    } else if (lowerCmd === '') {
      output = [];
    } else {
      output = [
        <div key="error" style={{ color: '#ff6b6b' }}>Command not found: {cmd}</div>,
        <div key="hint" style={{ color: '#3a4d42' }}>Type "help" for available commands</div>
      ];
    }

    if (output.length > 0) {
      setCommandHistory(prev => [...prev, { input: cmd, output }]);
      setLocalHistory(prev => [...prev, cmd]);
      setHistoryIndex(localHistory.length);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      processCommand(input);
      setInput('');
      setShowSuggestions(false);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(prev => prev - 1);
        setInput(localHistory[historyIndex - 1]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < localHistory.length - 1) {
        setHistoryIndex(prev => prev + 1);
        setInput(localHistory[historyIndex + 1]);
      } else {
        setHistoryIndex(localHistory.length);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const matches = QUICK_LINKS.filter(l => l.cmd.startsWith(input.toLowerCase()));
      if (matches.length === 1) {
        setInput(matches[0].cmd);
      }
    }
  };

  return (
    <div 
      className="max-w-3xl mx-auto py-4 sm:py-8"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div 
        className="rounded-lg overflow-hidden"
        style={{ backgroundColor: '#0d1512', border: '1px solid #1a2822' }}
      >
        <div 
          className="px-4 py-2.5 flex items-center gap-2 border-b"
          style={{ borderColor: '#1a2822', backgroundColor: '#0f1c16' }}
        >
          <div className="flex gap-1.5">
            <div 
              onMouseEnter={() => setHoveredWindowBtn(0)}
              onMouseLeave={() => setHoveredWindowBtn(null)}
              className="w-3 h-3 rounded-full cursor-pointer transition-all duration-150" 
              style={{ backgroundColor: hoveredWindowBtn === 0 ? '#ff5f57' : '#5c6b64' }} 
            />
            <div 
              onMouseEnter={() => setHoveredWindowBtn(1)}
              onMouseLeave={() => setHoveredWindowBtn(null)}
              className="w-3 h-3 rounded-full cursor-pointer transition-all duration-150" 
              style={{ backgroundColor: hoveredWindowBtn === 1 ? '#febc2e' : '#5c6b64' }} 
            />
            <div 
              onMouseEnter={() => setHoveredWindowBtn(2)}
              onMouseLeave={() => setHoveredWindowBtn(null)}
              className="w-3 h-3 rounded-full cursor-pointer transition-all duration-150" 
              style={{ backgroundColor: hoveredWindowBtn === 2 ? '#28c840' : '#5c6b64' }} 
            />
          </div>
          <span className="text-xs ml-3 opacity-60" style={{ color: '#6f9f84' }}>quillpy@dev — bash</span>
        </div>

        <div className="p-4">
          <div className="flex flex-wrap gap-1 mb-4">
            {QUICK_NAV_ICONS.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.cmd}
                  onClick={() => { onNavigate(link.cmd as TabType); }}
                  onMouseEnter={() => setHoveredIcon(link.cmd)}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="p-1.5 rounded transition-colors cursor-pointer"
                  style={{ 
                    backgroundColor: hoveredIcon === link.cmd ? '#1b2520' : '#1a2822',
                    color: hoveredIcon === link.cmd ? link.color : '#5c6b64',
                  }}
                  title={link.hint}
                >
                  <Icon size={14} />
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            {commandHistory.map((entry, i) => (
              <div key={i}>
                <div className="text-xs" style={{ color: '#5c6b64' }}>
                  <span style={{ color: '#6f9f84' }}>quillpy@dev</span>
                  <span style={{ marginLeft: '4px' }}>$</span>{' '}
                  {entry.input}
                </div>
                <div className="ml-4 mt-1">
                  {entry.output}
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center mt-2">
            <span style={{ color: '#6f9f84' }}>$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none ml-2"
              style={{ color: '#a6b8ad', caretColor: '#7fbf9a' }}
              autoFocus
              placeholder="..."
            />
          </div>
        </div>
        
        <div className="mt-3 pt-3 border-t flex items-center gap-2" style={{ borderColor: '#1a2822' }}>
          <AnimatePresence mode="wait">
            <motion.p 
              key={currentTip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs"
              style={{ color: '#4a5a53' }}
            >
              {TIPS[currentTip].text}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
      
      <div ref={outputRef} />
    </div>
  );
}