import { useEffect, useState } from 'react';

const FUNNY_MESSAGES = [
  "The internet is gone. You deleted it. Nice.",
  "Even the cookies are dead. Hope you're happy.",
  "Your browser just went to therapy. It didn't help.",
  "404: Existence not found.",
  "You had one job. And you rm -rf'd it.",
  "The void stares back. It's disappointed.",
  "Every tab you ever loved... poof.",
  "Ctrl+Z won't fix this one, buddy.",
  "Your digital footprint just got wiped by a tsunami.",
  "Somewhere, a sysadmin is crying.",
  "Recycling bin? Never heard of her.",
  "This is what happens when you trust autocomplete.",
];

const SUB_MESSAGES = [
  "Click anywhere to restart your life choices",
  "Tap to undo your chaos (we wish)",
  "Click to respawn. Try not to break it again.",
  "Any click = fresh start. Use wisely.",
  "Just click. We'll pretend this never happened.",
];

export function VoidOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Fade in
    const fadeTimer = setTimeout(() => setOpacity(1), 100);

    // Rotate main messages every 3.5s
    const msgInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % FUNNY_MESSAGES.length);
    }, 3500);

    // Rotate sub messages every 4s (offset)
    const subInterval = setInterval(() => {
      setSubIndex((prev) => (prev + 1) % SUB_MESSAGES.length);
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearInterval(msgInterval);
      clearInterval(subInterval);
    };
  }, []);

  const handleClick = () => {
    localStorage.removeItem('quillpy_void');
    window.location.reload();
  };

  return (
    <div
      onClick={handleClick}
      className="fixed inset-0 z-[9999] flex cursor-pointer items-center justify-center overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #0a0014 0%, #000000 70%)',
        opacity,
        transition: 'opacity 1.2s ease-in-out',
      }}
    >
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: `rgba(${100 + Math.random() * 155}, ${50 + Math.random() * 100}, ${150 + Math.random() * 105}, ${Math.random() * 0.6 + 0.2})`,
              animation: `voidFloat ${Math.random() * 8 + 6}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-6 max-w-2xl text-center select-none">
        {/* Big X mark */}
        <div
          className="mb-6 text-8xl font-black sm:text-9xl"
          style={{
            color: 'transparent',
            WebkitTextStroke: '2px rgba(139, 92, 246, 0.4)',
            textShadow: '0 0 60px rgba(139, 92, 246, 0.15)',
          }}
        >
          ×_×
        </div>

        {/* Headline */}
        <h1
          className="mb-4 text-3xl font-bold tracking-tight sm:text-5xl"
          style={{
            color: '#e2e8f0',
            textShadow: '0 0 30px rgba(139, 92, 246, 0.3)',
          }}
        >
          Welp. You did it.
        </h1>

        {/* Funny rotating message */}
        <p
          className="mb-8 min-h-[2rem] text-lg font-medium sm:text-xl"
          style={{ color: '#a78bfa' }}
        >
          {FUNNY_MESSAGES[messageIndex]}
        </p>

        {/* Divider */}
        <div className="mx-auto mb-6 h-px w-24" style={{ backgroundColor: 'rgba(139, 92, 246, 0.3)' }} />

        {/* Sub message */}
        <p className="text-sm tracking-wide sm:text-base" style={{ color: '#64748b' }}>
          {SUB_MESSAGES[subIndex]}
        </p>
      </div>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes voidFloat {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) scale(1.4);
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
}

