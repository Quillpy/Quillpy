import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
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

const COMMANDS = [
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
];

export function TerminalTab({ onNavigate }: TerminalTabProps) {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<CommandEntry[]>([
    {
      input: 'boot',
      output: (
        <div className="space-y-1">
          <div style={{ color: '#7fbf9a' }}>quillpy shell ready</div>
          <div style={{ color: '#5d7367' }}>Type help to inspect available commands.</div>
        </div>
      ),
    },
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [history, setHistory] = useState<string[]>([]);
  const [hoveredWindowBtn, setHoveredWindowBtn] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    outputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [entries]);

  const navigateToPage = (page: string) => {
    onNavigate(page as TabType);
    return <div style={{ color: '#7fbf9a' }}>Opening {page}...</div>;
  };

  const renderHelp = () => (
    <div className="grid gap-2 sm:grid-cols-2" style={{ color: '#a6b8ad' }}>
      <div><span style={{ color: '#7fbf9a' }}>help</span> list commands</div>
      <div><span style={{ color: '#7fbf9a' }}>clear</span> reset terminal output</div>
      <div><span style={{ color: '#7fbf9a' }}>neofetch</span> show system card</div>
      <div><span style={{ color: '#7fbf9a' }}>whoami</span> short profile</div>
      <div><span style={{ color: '#7fbf9a' }}>ls</span> list available pages</div>
      <div><span style={{ color: '#7fbf9a' }}>pwd</span> show current path</div>
      <div><span style={{ color: '#7fbf9a' }}>date</span> show local date</div>
      <div><span style={{ color: '#7fbf9a' }}>history</span> show recent commands</div>
      <div><span style={{ color: '#7fbf9a' }}>echo &lt;text&gt;</span> print text</div>
      <div><span style={{ color: '#7fbf9a' }}>cd &lt;page&gt;</span> navigate to a page</div>
      <div><span style={{ color: '#7fbf9a' }}>open &lt;page&gt;</span> open a page</div>
      <div><span style={{ color: '#7fbf9a' }}>cat stack|contact|focus</span> read notes</div>
    </div>
  );

  const renderLs = () => (
    <div className="mt-1 flex flex-wrap gap-2">
      {PAGES.map((page) => {
        const Icon = page.icon;
        return (
          <motion.button
            key={page.cmd}
            onClick={() => onNavigate(page.cmd as TabType)}
            className="ui-hover flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: '#111a16',
              borderColor: '#22332b',
              color: '#7fbf9a',
            }}
          >
            <Icon size={12} />
            {page.label}
          </motion.button>
        );
      })}
    </div>
  );

  const renderCat = (topic: string) => {
    if (topic === 'stack') {
      return (
        <div style={{ color: '#a6b8ad' }}>
          Primary stack: Python, C, Linux, small experiments, interface design.
        </div>
      );
    }

    if (topic === 'contact') {
      return (
        <div style={{ color: '#a6b8ad' }}>
          Best route: open the <span style={{ color: '#7fbf9a' }}>connect</span> page.
        </div>
      );
    }

    if (topic === 'focus') {
      return (
        <div style={{ color: '#a6b8ad' }}>
          Current focus: building clean tools, learning systems, and shipping more often.
        </div>
      );
    }

    return <div style={{ color: '#ff7d7d' }}>cat: {topic}: no such file</div>;
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
        <pre className="text-xs sm:text-sm" style={{ color: '#7fbf9a' }}>
{`   quillpy@dev
   -----------
   os      linux
   shell   bash
   editor  vim
   style   minimal
   mode    building`}
        </pre>
      );
    } else if (lowerCommand === 'whoami') {
      output = (
        <div style={{ color: '#a6b8ad' }}>
          Quillpy. Student, builder, Linux user, and curious systems explorer.
        </div>
      );
    } else if (lowerCommand === 'pwd') {
      output = <div style={{ color: '#a6b8ad' }}>/home/quillpy</div>;
    } else if (lowerCommand === 'date') {
      output = <div style={{ color: '#a6b8ad' }}>{new Date().toLocaleString()}</div>;
    } else if (lowerCommand === 'echo') {
      output = <div style={{ color: '#a6b8ad' }}>{args.join(' ')}</div>;
    } else if (lowerCommand === 'history') {
      output = history.length ? (
        <div className="space-y-1" style={{ color: '#a6b8ad' }}>
          {history.map((item, index) => (
            <div key={`${item}-${index}`}>
              <span style={{ color: '#5d7367' }}>{String(index + 1).padStart(2, '0')}</span> {item}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ color: '#5d7367' }}>No commands in history.</div>
      );
    } else if (lowerCommand === 'ls') {
      output = renderLs();
    } else if (lowerCommand === 'cd' || lowerCommand === 'open') {
      const target = args[0]?.toLowerCase();
      if (target && PAGES.some((page) => page.cmd === target)) {
        output = navigateToPage(target);
      } else {
        output = <div style={{ color: '#ff7d7d' }}>{lowerCommand}: invalid target</div>;
      }
    } else if (lowerCommand === 'cat') {
      output = renderCat((args[0] || '').toLowerCase());
    } else if (lower === 'about' || lower === 'projects' || lower === 'welcome' || lower === 'connect' || lower === 'support' || lower === 'logs') {
      output = navigateToPage(lower);
    } else {
      output = (
        <div className="space-y-1">
          <div style={{ color: '#ff7d7d' }}>command not found: {rawInput}</div>
          <div style={{ color: '#5d7367' }}>Try help.</div>
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
      if (!history.length) {
        return;
      }
      const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(historyIndex - 1, 0);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (historyIndex === -1) {
        return;
      }
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
      const match = COMMANDS.find((command) => command.startsWith(input.toLowerCase()));
      if (match) {
        setInput(match);
      }
    }
  };

  return (
    <div
      className="mx-auto max-w-4xl py-4 sm:py-8"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
      onClick={() => inputRef.current?.focus()}
    >
      <div
        className="overflow-hidden rounded-2xl border"
        style={{ backgroundColor: '#0b120f', borderColor: '#1c2a23' }}
      >
        <div
          className="flex items-center justify-between border-b px-4 py-3"
          style={{ backgroundColor: '#101814', borderColor: '#1c2a23' }}
        >
          <div className="flex gap-1.5">
            {[0, 1, 2].map((button) => (
              <div
                key={button}
                onMouseEnter={() => setHoveredWindowBtn(button)}
                onMouseLeave={() => setHoveredWindowBtn(null)}
                className="ui-hover h-3 w-3 rounded-full"
                style={{
                  backgroundColor: hoveredWindowBtn === button ? ['#ff5f57', '#febc2e', '#28c840'][button] : '#566861',
                }}
              />
            ))}
          </div>
          <span className="text-xs" style={{ color: '#6f9f84' }}>
            quillpy@dev / shell
          </span>
        </div>

        <div className="border-b px-4 py-3" style={{ borderColor: '#1c2a23' }}>
          <div className="flex flex-wrap gap-2">
            {PAGES.map((page) => {
              const Icon = page.icon;
              return (
                <button
                  key={page.cmd}
                  onClick={() => onNavigate(page.cmd as TabType)}
                  className="ui-hover flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs"
                  style={{
                    backgroundColor: '#101814',
                    borderColor: '#22332b',
                    color: '#8ea99a',
                  }}
                >
                  <Icon size={12} />
                  {page.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-4 px-4 py-4 sm:px-5 sm:py-5">
          {entries.map((entry, index) => (
            <div key={`${entry.input}-${index}`} className="space-y-1.5">
              <div className="text-xs" style={{ color: '#5d7367' }}>
                <span style={{ color: '#7fbf9a' }}>quillpy@dev</span>:~$ {entry.input}
              </div>
              <div className="pl-4 text-sm">{entry.output}</div>
            </div>
          ))}

          <div className="flex items-center text-sm">
            <span style={{ color: '#7fbf9a' }}>quillpy@dev</span>
            <span style={{ color: '#5d7367' }}>:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              className="ml-2 flex-1 bg-transparent outline-none"
              style={{ color: '#dbe6df', caretColor: '#7fbf9a' }}
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
