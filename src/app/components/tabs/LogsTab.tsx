import { motion } from 'motion/react';
import { BookOpenText } from 'lucide-react';

interface LogEntry {
  date: string;
  title: string;
  content: string;
}

const LOGS: LogEntry[] = [
  {
    date: '2024-09',
    title: 'Started Learning Python',
    content: 'First time programming clicked. Started with Python in class 9 and realized writing code felt like solving puzzles.',
  },
  {
    date: '2024-12',
    title: 'Discovered CS50',
    content: 'Started Harvard CS50 after 10th exams. It changed how I see computers — finally understanding what computer science is.',
  },
  {
    date: '2025-01',
    title: 'Created My GitHub Account',
    content: 'Set up GitHub to store experiments and code. Felt like stepping into the real developer world.',
  },
  {
    date: '2025-03',
    title: 'First Scripts',
    content: 'Started writing small automation scripts instead of just following tutorials. Things finally started making sense.',
  },
  {
    date: '2025-06',
    title: 'Linux Curiosity',
    content: 'Got more interested in how computers actually work. Switched to Linux and started exploring lower-level ideas.',
  },
  {
    date: '2025-10',
    title: 'Started This Portfolio',
    content: 'Bought the domain and started building this space. First time building something for myself, not as exercise.',
  },
];

export function LogsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="mx-auto w-full max-w-5xl py-6 sm:py-10"
    >
      <div className="mb-10 max-w-2xl">
        <div className="mb-4 inline-flex items-center gap-2 border px-3 py-1 text-xs uppercase tracking-[0.24em]" style={{ borderColor: 'var(--border)', color: 'var(--brand)' }}>
          <BookOpenText size={14} />
          Timeline
        </div>
        <h1 className="mb-3 text-3xl sm:text-5xl" style={{ color: 'var(--text-strong)', fontWeight: 300 }}>
          Life logs
        </h1>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
          A linear record of the moments that moved me from curiosity into actual building.
        </p>
      </div>

      <div className="relative pl-7 sm:pl-10">
        <div className="absolute bottom-0 left-[11px] top-0 w-px sm:left-[15px]" style={{ background: 'linear-gradient(180deg, color-mix(in srgb, var(--brand) 50%, transparent) 0%, color-mix(in srgb, var(--brand) 10%, transparent) 100%)' }} />

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
                  backgroundColor: 'var(--surface-1)',
                  borderColor: 'var(--brand)',
                  boxShadow: '0 0 0 6px var(--brand-soft)',
                }}
              />

              <div
                className="ui-panel-soft border px-4 py-4 sm:px-5 sm:py-5"
                style={{
                  backgroundColor: 'var(--surface-1)',
                  borderColor: 'var(--border)',
                }}
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span
                    className="border px-2.5 py-1 text-xs font-mono"
                    style={{ borderColor: 'var(--border)', color: 'var(--brand)', backgroundColor: 'var(--surface-2)' }}
                  >
                    {log.date}
                  </span>
                </div>
                <h3 className="mb-2 text-lg sm:text-xl" style={{ color: 'var(--text-strong)', fontWeight: 400 }}>
                  {log.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>
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
