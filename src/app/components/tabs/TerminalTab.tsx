import { useState, useRef, useEffect } from 'react';
import { TabType } from './Browser';

interface TerminalTabProps {
  onNavigate: (tab: TabType) => void;
}

interface CommandHistory {
  input: string;
  output: string[];
}

export function TerminalTab({ onNavigate }: TerminalTabProps) {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<CommandHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [localHistory, setLocalHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    outputRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [commandHistory]);

  const processCommand = (cmd: string) => {
    const lowerCmd = cmd.toLowerCase().trim();
    let output: string[] = [];

    if (lowerCmd === 'help') {
      output = [
        'Available commands:',
        '  neofetch     - Display system info',
        '  help        - Show this help',
        '  clear       - Clear terminal',
        '  welcome     - Go to welcome page',
        '  projects    - Go to projects page',
        '  about       - Go to about page',
        '  philosophy  - Go to philosophy page',
        '  connect     - Go to connect page'
      ];
    } else if (lowerCmd === 'neofetch') {
      output = [
        '                    ',
        '   .---..---..---.  ',
        '  /  user: Quillpy  ',
        ' |  os:   Linux   |',
        ' |  focus: prog +  |',
        ' |  editor: vim   |',
        '  \\  status: 🚀  /  ',
        '   \'---..---..---\'  ',
        '                    '
      ];
    } else if (lowerCmd === 'clear') {
      setCommandHistory([]);
      return;
    } else if (['welcome', 'projects', 'about', 'philosophy', 'connect'].includes(lowerCmd)) {
      onNavigate(lowerCmd as TabType);
      output = [`Navigating to ${lowerCmd}...`];
    } else if (lowerCmd === '') {
      output = [];
    } else {
      output = [`Command not found: ${cmd}`, 'Type "help" for available commands.'];
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
    }
  };

  return (
    <div 
      className="max-w-3xl mx-auto py-6 sm:py-12"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div 
        className="mb-4 p-4 rounded-lg"
        style={{ backgroundColor: '#0f1a16', border: '1px solid #1b2a24' }}
      >
        <p style={{ color: '#7fbf9a', fontSize: '0.875rem', marginBottom: '1rem' }}>
          Quillpy Terminal v1.0.0 - Type "help" for commands
        </p>
        
        <div className="space-y-3">
          {commandHistory.map((entry, i) => (
            <div key={i}>
              <p style={{ color: '#a6b8ad' }}>
                <span style={{ color: '#7fbf9a' }}>quillpy@dev</span>
                <span style={{ color: '#6f9f84' }}>:~$</span>{' '}
                {entry.input}
              </p>
              {entry.output.map((line, j) => (
                <p 
                  key={j} 
                  style={{ 
                    color: line.startsWith('  \\') || line.startsWith('   \'') || line.startsWith('   .') ? '#7fbf9a' : '#a6b8ad',
                    marginLeft: line.startsWith('Available') || line.startsWith('  neofetch') || line.startsWith('  help') || line.startsWith('  clear') || line.startsWith('  welcome') || line.startsWith('  projects') || line.startsWith('  about') || line.startsWith('  philosophy') || line.startsWith('  connect') ? '1rem' : '0'
                  }}
                >
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>
        
        <div className="flex items-center mt-2">
          <span style={{ color: '#7fbf9a' }}>quillpy@dev</span>
          <span style={{ color: '#6f9f84' }}>:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none ml-2"
            style={{ color: '#e6f0ea', caretColor: '#7fbf9a' }}
            autoFocus
          />
        </div>
      </div>
      
      <div ref={outputRef} />
    </div>
  );
}