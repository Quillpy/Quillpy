import { useEffect, useRef, useState } from 'react';
import { BookOpen, Folder, Heart, Link, Sparkles, User } from 'lucide-react';
import { TabType } from './Browser';

interface TerminalTabProps {
  onNavigate: (tab: TabType) => void;
}

interface CommandEntry {
  input: string;
  output: React.ReactNode;
}

const PAGES = [
  { cmd: 'welcome', label: 'Welcome', icon: Sparkles },
  { cmd: 'projects', label: 'Projects', icon: Folder },
  { cmd: 'about', label: 'About', icon: User },
  { cmd: 'connect', label: 'Connect', icon: Link },
  { cmd: 'support', label: 'Support', icon: Heart },
  { cmd: 'logs', label: 'Logs', icon: BookOpen },
] as const;

const ALL_COMMANDS = [
  'help',
  'clear',
  'neofetch',
  'whoami',
  'ls',
  'pwd',
  'date',
  'echo',
  'history',
  'open',
  'cd',
  'cat',
  'cowsay',
  'fortune',
  'cmatrix',
  'sl',
  'figlet',
  'aafire',
  'asciiview',
  'sudo',
];

const VISIBLE_COMMANDS = [
  'help',
  'clear',
  'neofetch',
  'whoami',
  'ls',
  'pwd',
  'date',
  'echo',
  'history',
  'open',
  'cd',
  'cat',
  'cowsay',
  'fortune',
  'cmatrix',
  'sl',
  'figlet',
  'aafire',
];

export function TerminalTab({ onNavigate }: TerminalTabProps) {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<CommandEntry[]>([
    {
      input: 'boot',
      output: (
        <div className="space-y-1">
          <div style={{ color: 'var(--brand)' }}>quillpy shell ready</div>
          <div style={{ color: 'var(--text-soft)' }}>Type help to see available commands.</div>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const [isVoid, setIsVoid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const voided = localStorage.getItem('quillpy_void');
    if (voided) {
      setIsVoid(true);
    }
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [entries]);

  const navigateToPage = (page: string) => {
    onNavigate(page as TabType);
    return <div style={{ color: 'var(--brand)' }}>Opening {page}...</div>;
  };

  const renderHelp = () => (
    <div className="grid gap-1 sm:grid-cols-2" style={{ color: 'var(--text-muted)' }}>
      <div><span style={{ color: 'var(--brand)' }}>help</span> - list commands</div>
      <div><span style={{ color: 'var(--brand)' }}>clear</span> - reset terminal</div>
      <div><span style={{ color: 'var(--brand)' }}>neofetch</span> - system info</div>
      <div><span style={{ color: 'var(--brand)' }}>whoami</span> - your profile</div>
      <div><span style={{ color: 'var(--brand)' }}>ls</span> - list pages</div>
      <div><span style={{ color: 'var(--brand)' }}>pwd</span> - current path</div>
      <div><span style={{ color: 'var(--brand)' }}>date</span> - show date</div>
      <div><span style={{ color: 'var(--brand)' }}>history</span> - command history</div>
      <div><span style={{ color: 'var(--brand)' }}>echo [text]</span> - print text</div>
      <div><span style={{ color: 'var(--brand)' }}>cd [page]</span> - go to page</div>
      <div><span style={{ color: 'var(--brand)' }}>open [page]</span> - open page</div>
      <div><span style={{ color: 'var(--brand)' }}>cat [topic]</span> - read notes</div>
      <div><span style={{ color: 'var(--brand)' }}>cowsay [msg]</span> - cow says</div>
      <div><span style={{ color: 'var(--brand)' }}>fortune</span> - wise words</div>
      <div><span style={{ color: 'var(--brand)' }}>cmatrix</span> - matrix rain</div>
      <div><span style={{ color: 'var(--brand)' }}>sl</span> - steam locomotive</div>
      <div><span style={{ color: 'var(--brand)' }}>figlet [text]</span> - big letters</div>
      <div><span style={{ color: 'var(--brand)' }}>aafire</span> - fire animation</div>
    </div>
  );

  const renderLs = () => (
    <div style={{ color: 'var(--text-muted)' }}>
      <div className="mb-1">Pages in /app:</div>
      {PAGES.map((page) => (
        <div key={page.cmd} className="flex items-center gap-2 pl-4">
          <span style={{ color: 'var(--brand)' }}>d</span>
          <span style={{ color: 'var(--text-strong)' }}>{page.label}</span>
        </div>
      ))}
    </div>
  );

  const renderCat = (topic: string) => {
    if (topic === 'stack') {
      return (
        <div style={{ color: 'var(--text-muted)' }}>
          Primary stack: Python, C, Linux, small experiments, interface design.
        </div>
      );
    }
    if (topic === 'contact') {
      return (
        <div style={{ color: 'var(--text-muted)' }}>
          Best route: use <span style={{ color: 'var(--brand)' }}>open connect</span> command.
        </div>
      );
    }
    if (topic === 'focus') {
      return (
        <div style={{ color: 'var(--text-muted)' }}>
          Current focus: building clean tools, learning systems, shipping more often.
        </div>
      );
    }
    return <div style={{ color: 'var(--destructive)' }}>cat: {topic}: No such file or directory</div>;
  };

  const renderCowsay = (msg: string) => {
    const text = msg || 'Moo!';
    const lines = text.match(/.{1,20}/g) || [text];
    const maxLen = Math.max(...lines.map((l: string) => l.length));
    const top = '_' .repeat(maxLen + 2);
    return (
      <pre style={{ color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.4' }}>
{` ${top}
< ${lines[0]} >
 ${'-'.repeat(maxLen + 2)}
        \\   ^__^
         \\  (oo)\\_______
            (__)\\       )\\/\\
                ||----w |
                ||     ||`}
      </pre>
    );
  };

  const renderFortune = () => {
    const fortunes = [
      'The only way to do great work is to love what you do.',
      'Simplicity is the ultimate sophistication.',
      'Stay hungry, stay foolish.',
      'Code is like humor. When you have to explain it, it\'s bad.',
      'Make it work, make it right, make it fast.',
      'First, solve the problem. Then, write the code.',
      'Linux: Because booting is for emergency vehicles.',
      'There are 10 types of people in the world: those who understand binary and those who don\'t.',
    ];
    const fortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    return <div style={{ color: 'var(--text-muted)' }}>{fortune}</div>;
  };

  const renderCmatrix = () => {
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    let output = '';
    for (let i = 0; i < 15; i++) {
      output += Array(40).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('') + '\n';
    }
    return (
      <pre style={{ color: 'var(--brand)', fontSize: '0.5rem', lineHeight: '1' }}>{output}</pre>
    );
  };

  const renderSl = () => (
    <pre style={{ color: 'var(--brand)', fontSize: '0.6rem', lineHeight: '1.1' }}>
{`      ====        ________        ___________
  _DQQ|      _DQQ|        _DQQ|        _DQQ|
QQ|       QQ|       QQ|       QQ|       QQ|
QQ|       QQ|       QQ|       QQ|       QQ|
QQ| _____QQ| _____QQ| _____QQ| _____QQ| _____QQ|____
QQ|_DQ|_DQQ| QQ|_DQ|_DQQ| QQ|_DQ|_DQQ| QQ|_DQ|_DQQ||_DQQ|
  |_DQQ|     |_DQQ|       |_DQQ|       |_DQQ|    |_DQQ|
QQ|       QQ|       QQ|       QQ|       QQ|       QQ|
QQ|       QQ|       QQ|       QQ|       QQ|       QQ|
Q||_DQQ| Q||_DQQ| Q||_DQQ| Q||_DQQ| Q||_DQQ|  |_DQQ|
 |___|QQ|  |___|QQ|  |___|QQ|  |___|QQ|   |___|
    |_|      |_|       |_|       |_|        |_|`}
    </pre>
  );

  const renderFiglet = (text: string) => {
    const msg = text || 'quillpy';
    return (
      <pre style={{ color: 'var(--brand)', fontSize: '0.5rem', lineHeight: '1.2' }}>
  ____                 _    __  __               
 / ___|__   __|  _ \ |  __||  _ \ |__   __|| __ |
| (_ || '__|/ _` ||  _| | (_ ||  |_ || '__||  _|  
 \___||_||_|\___,||_|   \___||_| \_||_|   |_|   
      _______                   _                  
     |__   __|                 | |                 
        | |  ___ |__   __|  _ \  __|  _ \  _ |_ 
        | | / _ \ '__|/ _` ||  _| |  __/| | | || _|  
        | ||  __/| | | (_) || |   | |   | |   |_|   
        |_|\___||_| |__,_||_|   |_|   |_|  (_|   
      </pre>
    );
  };

  const renderAafire = () => {
    let fire = '';
    const chars = ' .,:!i1tfLCG0@#';
    for (let i = 0; i < 20; i++) {
      fire += Array(50).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('') + '\n';
    }
    return (
      <pre style={{ color: '#ff6600', fontSize: '0.5rem', lineHeight: '1' }}>{fire}</pre>
    );
  };

  const handleSudo = () => {
    localStorage.setItem('quillpy_void', 'true');
    setIsVoid(true);
  };

  const executeCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    const lower = trimmed.toLowerCase();

    if (!trimmed) {
      return;
    }

    const [command, ...args] = trimmed.split(/\s+/);
    const lowerCommand = command.toLowerCase();
    let output: React.ReactNode;

    if (lowerCommand === 'clear') {
      setEntries([]);
      setHistory((prev) => [...prev, rawInput]);
      setHistoryIndex(-1);
      return;
    }

    if (lowerCommand === 'help') {
      output = renderHelp();
    } else if (lowerCommand === 'neofetch') {
      output = (
        <pre className="text-xs sm:text-sm" style={{ color: 'var(--brand)' }}>
{`   quillpy@dev
    -----------
    os      linux / quillpy
    shell   bash
    editor  vim
    style   minimal
    version 0.1`}
        </pre>
      );
    } else if (lowerCommand === 'whoami') {
      output = (
        <div style={{ color: 'var(--text-muted)' }}>quillpy - student, builder, systems explorer</div>
      );
    } else if (lowerCommand === 'pwd') {
      output = <div style={{ color: 'var(--text-muted)' }}>/home/quillpy</div>;
    } else if (lowerCommand === 'date') {
      output = <div style={{ color: 'var(--text-muted)' }}>{new Date().toLocaleString()}</div>;
    } else if (lowerCommand === 'echo') {
      output = <div style={{ color: 'var(--text-muted)' }}>{args.join(' ')}</div>;
    } else if (lowerCommand === 'history') {
      output = history.length ? (
        <div className="space-y-1" style={{ color: 'var(--text-muted)' }}>
          {history.map((item, index) => (
            <div key={`${item}-${index}`}>
              <span style={{ color: 'var(--text-soft)' }}>{String(index + 1).padStart(2, '0')}</span> {item}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: 'var(--text-soft)' }}>No commands in history.</div>
      );
    } else if (lowerCommand === 'ls') {
      output = renderLs();
    } else if (lowerCommand === 'cd' || lowerCommand === 'open') {
      const target = args[0]?.toLowerCase();
      if (target && PAGES.some((page) => page.cmd === target)) {
        output = navigateToPage(target);
      } else {
        output = <div style={{ color: 'var(--destructive)' }}>{lowerCommand}: no such page: {target}</div>;
      }
    } else if (lowerCommand === 'cat') {
      output = renderCat((args[0] || '').toLowerCase());
    } else if (lowerCommand === 'cowsay') {
      output = renderCowsay(args.join(' '));
    } else if (lowerCommand === 'fortune') {
      output = renderFortune();
    } else if (lowerCommand === 'cmatrix') {
      output = renderCmatrix();
    } else if (lowerCommand === 'sl') {
      output = renderSl();
    } else if (lowerCommand === 'figlet') {
      output = renderFiglet(args.join(' '));
    } else if (lowerCommand === 'aafire') {
      output = renderAafire();
    } else if (lowerCommand === 'sudo' && args[0] === 'rm' && args[1] === '-rf' && args[2] === '/') {
      handleSudo();
      output = (
        <div style={{ color: 'var(--destructive)' }}>
          root@quillpy:~# rm -rf /<br />
          rm: cannot remove '/': Device or resource busy<br />
          Just kidding! YOU HAVE BEEN VOIDED! :D
        </div>
      );
    } else if (lower === 'about' || lower === 'projects' || lower === 'welcome' || lower === 'connect' || lower === 'support' || lower === 'logs') {
      output = navigateToPage(lower);
    } else {
      output = (
        <div className="space-y-1">
          <div style={{ color: 'var(--destructive)' }}>{command}: command not found</div>
          <div style={{ color: 'var(--text-soft)' }}>Type help for available commands.</div>
        </div>
      );
    }

    setEntries((prev) => [...prev, { input: rawInput, output }]);
    setHistory((prev) => [...prev, rawInput]);
    setHistoryIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      executeCommand(input);
      setInput('');
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!history.length) return;
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(-1);
        setInput('');
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      const match = ALL_COMMANDS.find((cmd) => cmd.startsWith(input.toLowerCase()));
      if (match) setInput(match);
    }
  };

  if (isVoid) {
    return (
      <div
        onClick={() => window.location.reload()}
        className="flex h-full w-full cursor-pointer items-center justify-center"
        style={{ 
          backgroundColor: '#000', 
          color: '#00ff00', 
          fontFamily: "'JetBrains Mono', monospace",
        }}
      >
        <div className="text-center select-none">
          <pre style={{ color: '#0f0' }}>
{`
  _____                           _             
 |  ___|                         | |            
 | |__ _ __ __   __ ___  _ __  _| | _ __  _ 
 |  _|| '__| _ \\ / __/ _ \\| '__|| __|| __||    
 | |  | | |  __/| ||  __/| |   | |  | |  __|
 |_|  |_| |_|\\___||___||_|   |_|  |_|  |_|  
                                            
 _   _        _   _                 _   _      
| | | |      | | | |               | | | |     
| |_| | ___ | |_| | __  _   _ ___ | |_| | ___ 
|  _  |/ _ \\|  _  |/ _ \\| | | _ \\|  _  |/ _ \\
| | | |  __/| | | | (_) | |_| (_)|| | | |  __|
\\_| |_/\\___||\_| |_/\\___/ \\___/|___/\\_| |_/\\___

 __________________________________________
|                                        |
|   YOU HAVE ENTERED THE VOID.             |
|                                        |
|   Every click reloads your fate.         |
|   There is no escape, only restart.       |
|                                        |
|   The void remembers your choice.     |
|   But fresh start... awaits.           |
|                                        |
|   Click anywhere to reincarnate.     |
|____________________________________| `}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mx-auto w-full max-w-5xl py-4 sm:py-8"
      style={{ fontFamily: "'JetBrains Mono', monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className="overflow-hidden border"
        style={{ backgroundColor: 'var(--surface-1)', borderColor: 'var(--border)' }}
      >
        <div className="border-b px-4 py-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-2)' }}>
          <span className="text-xs" style={{ color: 'var(--brand)' }}>
            quillpy@dev:~/app$ ls
          </span>
        </div>

        <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
          {entries.map((entry, index) => (
            <div key={`${entry.input}-${index}`} className="space-y-1">
              <div className="text-xs" style={{ color: 'var(--text-soft)' }}>
                <span style={{ color: 'var(--brand)' }}>quillpy@dev</span>:~$ {entry.input}
              </div>
              <div className="pl-4 text-sm">{entry.output}</div>
            </div>
          ))}

          <div className="flex items-center text-sm">
            <span style={{ color: 'var(--brand)' }}>quillpy@dev</span>
            <span style={{ color: 'var(--text-soft)' }}>:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              className="ml-2 flex-1 bg-transparent outline-none"
              style={{ color: 'var(--text-strong)', caretColor: 'var(--brand)' }}
              autoFocus
              spellCheck={false}
              placeholder="type a command"
            />
          </div>
          <div ref={outputRef} />
        </div>
      </div>
    </div>
  );
}