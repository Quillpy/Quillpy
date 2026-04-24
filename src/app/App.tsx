import { useState } from 'react';
import { Monitor } from './components/Monitor';
import { BootScreen } from './components/BootScreen';

export default function App() {
  const [booted, setBooted] = useState(false);

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-5 relative" style={{ fontFamily: 'Inter, sans-serif' }}>
      <Monitor />
    </div>
  );
}
