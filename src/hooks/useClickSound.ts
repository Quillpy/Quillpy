import { useCallback, useEffect, useRef, useState } from 'react';

export function useClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('quillpy_sounds');
      return stored !== 'false';
    }
    return true;
  });

  useEffect(() => {
    const audio = new Audio('/click.mp3');
    audio.preload = 'auto';
    audio.volume = 0.3;
    audioRef.current = audio;
  }, []);

  useEffect(() => {
    localStorage.setItem('quillpy_sounds', String(isEnabled));
  }, [isEnabled]);

  const playClick = useCallback(() => {
    if (!isEnabled || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, [isEnabled]);

  return { playClick, isEnabled, setEnabled: setIsEnabled };
}