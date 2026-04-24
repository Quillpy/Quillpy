import { motion } from 'motion/react';
import { BookOpenText } from 'lucide-react';

interface LogEntry {
  date: string;
  title: string;
  content: string;
}

const LOGS: LogEntry[] = [
  {
    date: '2025-11-18',
    title: 'Started Learning Python',
    content: 'This is where everything began. Started exploring Python out of curiosity and quickly realized programming felt like solving puzzles.',
  },
  {
    date: '2025-12-02',
    title: 'Discovered CS50',
    content: 'Started Harvard CS50. It completely changed how I see computers and problem solving. First time I understood what computer science actually is.',
  },
  {
    date: '2025-12-20',
    title: 'Created My GitHub Account',
    content: 'Started using GitHub to store my experiments and code. Felt like stepping into the real developer world.',
  },
  {
    date: '2026-01-05',
    title: 'Built First Small Scripts',
    content: 'Started writing small automation scripts and experimenting with ideas instead of just following tutorials.',
  },
  {
    date: '2026-01-18',
    title: 'Shifted Toward Systems Curiosity',
    content: 'Became more interested in how computers actually work internally. Started exploring Linux and lower-level programming concepts.',
  },
  {
    date: '2026-02-02',
    title: 'Started Building Real Projects',
    content: 'Moved from learning syntax to building actual tools and experiments. This is when programming started feeling natural.',
  },
];

export function LogsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-auto max-w-4xl py-6 sm:py-10"
    >
      <div className="mb-10 max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs uppercase tracking-[0.24em]" style={{ borderColor: '#22332b', color: '#6f9f84' }}>
          <BookOpenText size={14} />
          Timeline
        </div>
        <h1 className="mb-3 text-3xl sm:text-5xl" style={{ color: '#e6f0ea', fontWeight: 300 }}>
          Life logs
        </h1>
        <p style={{ color: '#9db0a5', lineHeight: '1.8' }}>
          A linear record of the moments that moved me from curiosity into actual building.
        </p>
      </div>

      <div className="relative pl-7 sm:pl-10">
        <div className="absolute bottom-0 left-[11px] top-0 w-px sm:left-[15px]" style={{ background: 'linear-gradient(180deg, rgba(127, 191, 154, 0.45) 0%, rgba(127, 191, 154, 0.08) 100%)' }} />

        <div className="space-y-5">
          {LOGS.map((log, index) => (
            <motion.div
              key={log.date}
              initial={{ opacity: 0, x: -18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 * index, duration: 0.35 }}
              className="relative"
            >
              <div
                className="absolute left-[-27px] top-4 h-3 w-3 rounded-full border sm:left-[-31px]"
                style={{
                  backgroundColor: '#101814',
                  borderColor: '#7fbf9a',
                  boxShadow: '0 0 0 6px rgba(127, 191, 154, 0.08)',
                }}
              />

              <div
                className="ui-hover rounded-[22px] border px-4 py-4 sm:px-5 sm:py-5"
                style={{
                  backgroundColor: '#0f1714',
                  borderColor: '#1f2f28',
                }}
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span
                    className="rounded-full border px-2.5 py-1 text-xs font-mono"
                    style={{ borderColor: '#22332b', color: '#7fbf9a' }}
                  >
                    {log.date}
                  </span>
                </div>
                <h3 className="mb-2 text-lg sm:text-xl" style={{ color: '#e6f0ea', fontWeight: 400 }}>
                  {log.title}
                </h3>
                <p style={{ color: '#a6b8ad', lineHeight: '1.8' }}>
                  {log.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
