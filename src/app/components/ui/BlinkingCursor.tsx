import { useState } from 'react';

export function BlinkingCursor() {
  const [show, setShow] = useState(true);

  setTimeout(() => setShow(!show), 530);

  return (
    <span 
      style={{ 
        color: '#7fbf9a',
        opacity: show ? 1 : 0,
        transition: 'opacity 0.1s'
      }}
    >
      _
    </span>
  );
}

export function useBlinkingCursor() {
  const [show, setShow] = useState(true);

  useState(() => {
    const interval = setInterval(() => {
      setShow(prev => !prev);
    }, 530);
    return () => clearInterval(interval);
  });

  return show;
}