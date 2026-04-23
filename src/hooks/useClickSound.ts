import { useCallback, useRef } from 'react';

export function useClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playClick = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/click_soundeffect.mp3');
      audioRef.current.volume = 0.3;
    }
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, []);

  return playClick;
}