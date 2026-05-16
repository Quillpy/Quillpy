import { useEffect, useState } from 'react';

export function WelcomeTab() {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mx-auto w-full max-w-5xl py-8 sm:py-12">
      <div>
        <div className="mb-8 sm:mb-12">
          <h1
            className="mb-5"
            style={{
              fontSize: 'clamp(2.25rem, 6vw, 4rem)',
              fontWeight: '300',
              color: 'var(--text-strong)',
              lineHeight: '1.05',
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            }}
          >
            <span style={{ color: 'var(--brand)' }}>quillpy@dev</span>
            <span style={{ color: 'var(--text-muted)' }}>:~$</span>
            <span
              style={{
                color: 'var(--brand)',
                opacity: showCursor ? 1 : 0,
                transition: 'opacity 0.1s',
                marginLeft: '2px',
              }}
            >
              _
            </span>
          </h1>
          <p className="max-w-2xl" style={{ color: 'var(--text-muted)', lineHeight: '1.9', fontSize: 'clamp(1rem, 2vw, 1.1rem)' }}>
            Hey! I'm a 16 year old from India who likes building stuff. I break things to figure out how they work, then make them better.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <WelcomeCard
            title="Build"
            text="Making tools and projects that actually help people, not just practice stuff."
          />
          <WelcomeCard
            title="Learn"
            text="CS50, Linux, and trying to figure out how things really work."
          />
          <WelcomeCard
            title="Connect"
            text="Let's chat, work together, or just say hi. I don't bite."
          />
        </div>
      </div>
    </div>
  );
}

function WelcomeCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="ui-panel-soft border px-4 py-4 sm:px-5 sm:py-5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface-1)' }}>
      <div className="mb-2 text-sm uppercase tracking-[0.18em]" style={{ color: 'var(--brand)' }}>
        {title}
      </div>
      <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>{text}</p>
    </div>
  );
}
