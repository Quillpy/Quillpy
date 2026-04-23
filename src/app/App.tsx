import { useState } from 'react';
import { Monitor } from './components/Monitor';
import { BootScreen } from './components/BootScreen';

export default function App() {
  const [booted, setBooted] = useState(false);

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ backgroundColor: '#0f1a16', fontFamily: 'Inter, sans-serif' }}>
      <Monitor />
    </div>
  );
}
