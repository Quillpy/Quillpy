import { Browser } from './Browser';

export function Monitor() {
  return (
    <div 
      className="p-2 sm:p-3 shadow-2xl w-full max-w-6xl h-full"
      style={{ 
        backgroundColor: '#121b17',
        border: '1px solid #24362f',
        boxShadow: '0 28px 90px rgba(0, 0, 0, 0.45)'
      }}
    >
      <Browser />
    </div>
  );
}
