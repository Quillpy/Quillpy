import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function WelcomeTab() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto max-w-4xl py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8 sm:mb-12">
          <h1
            className="mb-5"
            style={{
              fontSize: 'clamp(2.25rem, 6vw, 4rem)',
              fontWeight: '300',
              color: '#e6f0ea',
              lineHeight: '1.05',
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}
          >
            <span style={{ color: '#7fbf9a' }}>quillpy@dev</span>
            <span style={{ color: '#a6b8ad' }}>:~$</span>
            <span
              style={{
                color: '#7fbf9a',
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.1s',
                marginLeft: '2px',
              }}
            >
              _
            </span>
          </h1>
          <p className="max-w-2xl" style={{ color: '#9db0a5', lineHeight: '1.9', fontSize: 'clamp(1rem, 2vw, 1.1rem)' }}>
            I build small tools, explore systems, and keep learning by making things that feel clean and useful.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <WelcomeCard
            title="Build"
            text="Projects and experiments shaped around simplicity, speed, and curiosity."
          />
          <WelcomeCard
            title="Explore"
            text="Linux, interfaces, and lower-level ideas that explain how computers really behave."
          />
          <WelcomeCard
            title="Share"
            text="A personal browser-style space for notes, logs, contact, and ongoing work."
          />
        </div>
      </motion.div>
    </div>
  );
}

function WelcomeCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="ui-hover rounded-[22px] border px-4 py-4 sm:px-5 sm:py-5" style={{ borderColor: '#1f2f28', backgroundColor: '#0f1714' }}>
      <div className="mb-2 text-sm uppercase tracking-[0.18em]" style={{ color: '#7fbf9a' }}>
        {title}
      </div>
      <p style={{ color: '#a6b8ad', lineHeight: '1.8' }}>{text}</p>
    </div>
  );
}
