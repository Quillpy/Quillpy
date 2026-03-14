import { useState } from 'react';
import { Monitor } from './components/Monitor';

export default function App() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: '#0f1a16', fontFamily: 'Inter, sans-serif' }}>
      <Monitor />
    </div>
  );
}
