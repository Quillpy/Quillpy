import { useCallback, useEffect, useRef } from 'react';

export function useClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/click.mp3');
    audio.preload = 'auto';
    audio.volume = 0.3;
    audioRef.current = audio;
  }, []);

  const playClick = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  return playClick;
}
