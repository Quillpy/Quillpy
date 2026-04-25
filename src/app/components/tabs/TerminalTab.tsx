import { useEffect, useRef, useState } from 'react';
import { BookOpen, Folder, Heart, Link, Sparkles, User } from 'lucide-react';
import type { TabType } from '../Browser';

interface TerminalTabProps {
  onNavigate: (tab: TabType) => void;
  onVoid: () => void;
}

interface CommandEntry {
  input: string;
  output: React.ReactNode;
}

const PAGES = [
  { cmd: 'welcome', label: 'Welcome', icon: Sparkles },
  { cmd: 'about', label: 'About', icon: User },
  { cmd: 'projects', label: 'Projects', icon: Folder },
  { cmd: 'philosophy', label: 'Philosophy', icon: BookOpen },
  { cmd: 'logs', label: 'Logs', icon: BookOpen },
  { cmd: 'connect', label: 'Connect', icon: Link },
  { cmd: 'support', label: 'Support', icon: Heart },
  { cmd: 'terminal', label: 'Terminal', icon: Sparkles },
] as const;

const ALL_COMMANDS = [
  'help', 'clear', 'neofetch', 'whoami', 'ls', 'pwd', 'date', 'echo', 'history', 'open', 'cd', 'cat', 'cowsay', 'fortune', 'cmatrix', 'sl', 'figlet', 'sudo',
];

export function TerminalTab({ onNavigate, onVoid }: TerminalTabProps) {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<CommandEntry[]>([
    {
      input: 'boot',
      output: (
        <div style={{ color: 'var(--brand)' }}>shubham@dev:~$ shell ready</div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const [isVoid, setIsVoid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [entries]);

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
      <div><span style={{ color: 'var(--brand)' }}>echo [text]</span> - print text</div>
      <div><span style={{ color: 'var(--brand)' }}>cd [page]</span> - go to page</div>
      <div><span style={{ color: 'var(--brand)' }}>open [page]</span> - open page</div>
      <div><span style={{ color: 'var(--brand)' }}>cat [topic]</span> - read notes</div>
      <div><span style={{ color: 'var(--brand)' }}>cowsay [msg]</span> - cow says</div>
      <div><span style={{ color: 'var(--brand)' }}>fortune</span> - wise words</div>
      <div><span style={{ color: 'var(--brand)' }}>cmatrix</span> - matrix rain</div>
      <div><span style={{ color: 'var(--brand)' }}>sl</span> - steam locomotive</div>
      <div><span style={{ color: 'var(--brand)' }}>figlet [text]</span> - big letters</div>
      <div><span style={{ color: 'var(--destructive)' }}>sudo rm -rf /</span> - don't. seriously. don't.</div>
    </div>
  );

  const renderLs = () => (
    <div style={{ color: 'var(--text-muted)' }}>
      {PAGES.map((page) => (
        <div key={page.cmd} className="pl-4">{page.label}</div>
      ))}
    </div>
  );

  const renderCat = (topic: string) => {
    if (topic === 'stack') return <div style={{ color: 'var(--text-muted)' }}>Primary stack: Python, C, Linux.</div>;
    if (topic === 'contact') return <div style={{ color: 'var(--text-muted)' }}>Best route: use <span style={{ color: 'var(--brand)' }}>open connect</span>.</div>;
    if (topic === 'focus') return <div style={{ color: 'var(--text-muted)' }}>Current focus: building clean tools, shipping more often.</div>;
    return <div style={{ color: 'var(--destructive)' }}>cat: {topic}: No such file or directory</div>;
  };

  const renderCowsay = (msg: string) => {
    const text = msg || 'Moo!';
    const lines = text.match(/.{1,20}/g) || [text];
    const maxLen = Math.max(...lines.map((l) => l.length));
    const top = '_'.repeat(maxLen + 2);
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
      'My left kidney is smaller than my right one. And somehow I still beat you at chess.',
      'Class 10 ending: the last time I touched grass voluntarily.',
      'CS50: because class 9 curiosity demanded a proper answer.',
      'KDE Plasma: making my 2014 laptop look like a spaceship since 2024.',
      'There are 10 types of people: those who understand binary, those who dont.',
      'I shift to Delhi soon. My laptop is more excited than I am.',
      'AIIMS saved my kidney. CS50 saved my sanity.',
      'Linux: Because Windows asked if I am a pirate.',
    ];
    return <div style={{ color: 'var(--text-muted)' }}>{fortunes[Math.floor(Math.random() * fortunes.length)]}</div>;
  };

  const renderCmatrix = () => {
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
    let output = '';
    for (let i = 0; i < 15; i++) {
      output += Array(40).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('') + '\n';
    }
    return <pre style={{ color: 'var(--brand)', fontSize: '0.5rem', lineHeight: '1' }}>{output}</pre>;
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
{`  ____                 _    __  __               
 / ___|__   __|  _ \\ |  __||  _ \\ |__   __|| __ |
| (_ || '__|/ _\\ ||  _| | (_ ||  |_ || '__||  _|  
 \\___||_||_\___,||_|   \\___||_| \\_||_|   |_|   
    _______                   _                  
   |__   __|                 | |                 
      | |  ___ |__   __|  _ \\  __|  _ \\  _ |_ 
      | | / _ \\ '__|/ _\\ ||  _| |  __/| | | || _|  
      | ||  __/| | | (_) || |   | |   | |   |_|   
      |_|\___||_| |__,_||_|   |_|   |_|  (_| `}
      </pre>
    );
  };

  const handleSudo = () => { setIsVoid(true); onVoid(); };

  const executeCommand = (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const [command, ...args] = trimmed.split(/\s+/);
    const lower = command.toLowerCase();
    let output: React.ReactNode;

    if (lower === 'clear') {
      setEntries([]);
      setHistory((prev) => [...prev, rawInput]);
      setHistoryIndex(-1);
      return;
    }

    if (lower === 'help') {
      output = renderHelp();
    } else if (lower === 'neofetch') {
      output = (
        <pre className="text-xs sm:text-sm" style={{ color: 'var(--brand)' }}>
{`   shubham@dev
    -----------
    os      Kubuntu 25.10
    kernel  6.17.0-22-generic
    de      KDE Plasma 6.4.5
    cpu     Intel i3-4160 @ 3.60GHz
    ram     3.7 GiB / 4 GiB (tragic)
    gpu     Intel HD Graphics 4400
    shell   bash
    editor  vim`}
        </pre>
      );
    } else if (lower === 'whoami') {
      output = <div style={{ color: 'var(--text-muted)' }}>shubham - 16 year old, student, Kubuntu enthusiast</div>;
    } else if (lower === 'pwd') {
      output = <div style={{ color: 'var(--text-muted)' }}>/home/shubham</div>;
    } else if (lower === 'date') {
      output = <div style={{ color: 'var(--text-muted)' }}>{new Date().toLocaleString()}</div>;
    } else if (lower === 'echo') {
      output = <div style={{ color: 'var(--text-muted)' }}>{args.join(' ')}</div>;
    } else if (lower === 'history') {
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
    } else if (lower === 'ls') {
      output = renderLs();
    } else if (lower === 'cd' || lower === 'open') {
      const target = args[0]?.toLowerCase();
      if (target && PAGES.some((page) => page.cmd === target)) {
        output = navigateToPage(target);
      } else {
        output = <div style={{ color: 'var(--destructive)' }}>{lowerCommand}: no such page: {target}</div>;
      }
    } else if (lower === 'cat') {
      output = renderCat((args[0] || '').toLowerCase());
    } else if (lower === 'cowsay') {
      output = renderCowsay(args.join(' '));
    } else if (lower === 'fortune') {
      output = renderFortune();
    } else if (lower === 'cmatrix') {
      output = renderCmatrix();
    } else if (lower === 'sl') {
      output = renderSl();
    } else if (lower === 'figlet') {
      output = renderFiglet(args.join(' '));
    } else if (lower === 'sudo' && args[0] === 'rm' && args[1] === '-rf' && args[2] === '/') {
      handleSudo();
      output = (
        <div style={{ color: 'var(--destructive)' }}>
          root@quillpy:~# rm -rf /<br />
          rm: cannot remove '/': Device or resource busy<br />
          Just kidding! YOU HAVE BEEN VOIDED! :D
        </div>
      );
    } else if (PAGES.some((page) => page.cmd === lower)) {
      output = navigateToPage(lower);
    } else {
      output = (
        <div>
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
    if (event.key === 'Enter') { executeCommand(input); setInput(''); return; }
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
      if (nextIndex >= history.length) { setHistoryIndex(-1); setInput(''); }
      else { setHistoryIndex(nextIndex); setInput(history[nextIndex]); }
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
      <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: '#000', color: '#00ff00', fontFamily: "'JetBrains Mono', monospace" }}>
        <div className="text-center select-none">
          <pre style={{ color: '#0f0' }}>
{`
  _____                           _             
 |  ___|                         | |            
 | |__ _ __ __   __ ___  _ __  _| | _ __  _ 
 |  _|| '__| _ \\ / __/ _ \\| '__|| __|| __||    
 |  |  | | |  __/| ||  __/| |   | |  |  __|
 |_|  |_| |_|\\___||___||_|   |_|  |_|  |_|  
                                             
 _   _        _   _                 _   _      
| | | |      | | | |               | | | |     
| |_| | ___ | |_| | __  _   _ ___ | |_| | ___ 
|  _  |/ _ \\|  _  |/ _ \\| | | _ \\|  _  |/ _ \\
| | | |  __/| | | | (_) | |_| (_)|| | | |  __|
\\_| |_/\\___||\\_| |_/\\___/ \\___/|___/\\_| |_/\\___

 __________________________________________
|                                        |
|   YOU HAVE ENTERED THE VOID.             |
|                                        |
|   Every click reloads your fate.         |
|   There is no escape, only restart.       |
|                                        |
|   Click anywhere to reincarnate.         |
|________________________________________|`}
          </pre>
          <div className="mt-4 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'rgba(0, 255, 0, 0.5)' }}>no mouse exits here</div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl py-4 sm:py-8" style={{ fontFamily: "'JetBrains Mono', monospace" }} onClick={() => inputRef.current?.focus()}>
      <div className="overflow-hidden border" style={{ backgroundColor: 'var(--surface-1)', borderColor: 'var(--border)' }}>
        <div className="border-b px-4 py-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-2)' }}>
          <span className="text-xs" style={{ color: 'var(--brand)' }}>shubham@dev:~/app$ ls</span>
        </div>
        <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
          {entries.map((entry, index) => (
            <div key={`${entry.input}-${index}`} className="space-y-1">
              <div className="text-xs" style={{ color: 'var(--text-soft)' }}><span style={{ color: 'var(--brand)' }}>shubham@dev</span>:~$ {entry.input}</div>
              <div className="pl-4 text-sm">{entry.output}</div>
            </div>
          ))}
          <div className="flex items-center text-sm">
            <span style={{ color: 'var(--brand)' }}>shubham@dev</span>
            <span style={{ color: 'var(--text-soft)' }}>:~$</span>
            <input ref={inputRef} type="text" value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={handleKeyDown} className="ml-2 flex-1 bg-transparent outline-none" style={{ color: 'var(--text-strong)', caretColor: 'var(--brand)' }} autoFocus spellCheck={false} placeholder="type a command" />
          </div>
          <div ref={outputRef} />
        </div>
      </div>
    </div>
  );
}