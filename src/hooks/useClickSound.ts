import { useCallback, useEffect, useRef, useSyncExternalStore } from 'react';

let soundEnabled = true;
const listeners = new Set<() => void>();

if (typeof window !== 'undefined') {
  soundEnabled = localStorage.getItem('quillpy_sounds') !== 'false';
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return soundEnabled;
}

function setSoundEnabled(nextValue: boolean) {
  soundEnabled = nextValue;
  if (typeof window !== 'undefined') {
    localStorage.setItem('quillpy_sounds', String(nextValue));
  }
  listeners.forEach((listener) => listener());
}

export function useClickSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isEnabled = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  useEffect(() => {
    const audio = new Audio('/click.mp3');
    audio.preload = 'auto';
    audio.volume = 0.3;
    audioRef.current = audio;
  }, []);

  const playClick = useCallback(() => {
    if (!isEnabled || !audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  }, [isEnabled]);

  return { playClick, isEnabled, setEnabled: setSoundEnabled };
}
