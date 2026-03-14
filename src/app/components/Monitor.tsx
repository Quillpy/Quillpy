import { Browser } from './Browser';

export function Monitor() {
  return (
    <div 
      className="rounded-xl sm:rounded-2xl p-3 sm:p-6 shadow-2xl w-full max-w-5xl"
      style={{ 
        backgroundColor: '#1b2a24',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      <Browser />
    </div>
  );
}