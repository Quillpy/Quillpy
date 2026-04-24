import { useState } from 'react';
import { Monitor } from './components/Monitor';
import { BootScreen } from './components/BootScreen';

export default function App() {
  const [booted, setBooted] = useState(false);

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <div
      className="h-screen overflow-hidden flex items-center justify-center p-0 sm:p-2 relative"
      style={{ fontFamily: 'var(--font-sans)', backgroundColor: 'var(--shell-bg)' }}
    >
      <Monitor />
    </div>
  );
}
