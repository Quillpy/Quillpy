import { Browser } from './Browser';

export function Monitor() {
  return (
    <div 
      className="w-full h-full sm:max-w-6xl sm:max-h-[calc(100vh-1rem)] p-0 sm:p-3 shadow-2xl"
      style={{ 
        backgroundColor: 'var(--chrome-bg)',
        border: '1px solid var(--chrome-border)',
        boxShadow: '0 28px 90px var(--shadow-color)'
      }}
    >
      <Browser />
    </div>
  );
}
