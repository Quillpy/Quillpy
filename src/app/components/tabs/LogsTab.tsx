import { motion } from 'motion/react';

interface LogEntry {
  date: string;
  title: string;
  content: string;
}

const LOGS: LogEntry[] = [
  {
    date: '2026-04-23',
    title: 'Building Quillpy Portfolio v2',
    content: 'Finally revamped the entire portfolio with a terminal-based UI. Used React + Vite + Tailwind. Added animations with Framer Motion. Added click sounds too!'
  },
  {
    date: '2026-04-15',
    title: 'Started Learning Rust',
    content: 'Decided to dive deep into Rust. The borrow checker is tough but rewarding. Building a CLI tool as a side project.'
  },
  {
    date: '2026-04-01',
    title: 'New Keyboard Arrived',
    content: 'Got a Keychron Q1 with custom switches. Typing this on it now. The tactile feel is amazing!'
  },
  {
    date: '2026-03-20',
    title: 'Launched First npm Package',
    content: 'Published my first open-source npm package - a simple utility for date formatting. Got 100 downloads in the first week!'
  },
  {
    date: '2026-03-05',
    title: 'Started This Website',
    content: 'Bought quillpy.dev and started building this terminal-styled portfolio. It was supposed to take a week, took a month 😅'
  },
  {
    date: '2026-02-14',
    title: 'Valentine\'s Day Coding Session',
    content: 'Spent the evening refactoring old projects. Not the most romantic, but productive!'
  },
  {
    date: '2026-01-30',
    title: 'First PR Merged',
    content: 'Contributed to an open-source project and got my first PR merged. Feeling part of the community now.'
  }
];

export function LogsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="max-w-2xl mx-auto py-8 sm:py-12"
    >
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
          style={{ backgroundColor: '#1b2a24' }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#7fbf9a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
          </svg>
        </motion.div>
        <h1 
          className="text-2xl sm:text-3xl font-bold mb-3"
          style={{ color: '#e6f0ea' }}
        >
          Life Logs
        </h1>
        <p 
          className="text-sm sm:text-base"
          style={{ color: '#a6b8ad' }}
        >
          Random thoughts, updates, and moments from my coding journey
        </p>
      </div>

      <div className="space-y-4">
        {LOGS.map((log, index) => (
          <motion.div
            key={log.date}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.3 }}
            className="p-4 rounded-lg"
            style={{ backgroundColor: '#0f1a16', border: '1px solid #1b2a24' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span 
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{ backgroundColor: '#1b2a24', color: '#7fbf9a' }}
              >
                {log.date}
              </span>
            </div>
            <h3 
              className="text-base font-semibold mb-1"
              style={{ color: '#e6f0ea' }}
            >
              {log.title}
            </h3>
            <p 
              className="text-sm"
              style={{ color: '#a6b8ad' }}
            >
              {log.content}
            </p>
          </motion.div>
        ))}
      </div>

      <p 
        className="text-center text-xs mt-6"
        style={{ color: '#3a4d42' }}
      >
        More logs coming soon... Stay tuned!
      </p>
    </motion.div>
  );
}