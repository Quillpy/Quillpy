import { useState, useEffect, useRef } from 'react';
import { Monitor } from './components/Monitor';
import { BootScreen } from './components/BootScreen';

export default function App() {
  const [booted, setBooted] = useState(false);
  const cursorRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      
      clearTimeout(timeout);
      timeout = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  if (!booted) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative" style={{ backgroundColor: '#0f1a16', fontFamily: 'Inter, sans-serif' }}>
      <div 
        className="fixed pointer-events-none transition-opacity duration-300"
        style={{
          left: cursorPos.x,
          top: cursorPos.y,
          transform: 'translate(-50%, -50%)',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(138, 92, 168, 0.08) 0%, rgba(217, 175, 55, 0.05) 40%, transparent 70%)',
          opacity: isMoving ? 1 : 0,
          zIndex: 9999,
        }}
      />
      <Monitor />
    </div>
  );
}
