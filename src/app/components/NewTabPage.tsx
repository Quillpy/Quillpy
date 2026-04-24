import { useState } from 'react';
import { Search } from 'lucide-react';

interface NewTabPageProps {
  onSearch: (query: string) => void;
}

export function NewTabPage({ onSearch }: NewTabPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
      setSearchQuery('');
    }
  };

  return (
    <div 
      className="flex flex-col items-center justify-center px-4"
      style={{ 
        backgroundColor: '#0f1a16',
        minHeight: '400px',
        height: '100%'
      }}
    >
      <div className="w-full max-w-2xl">
        <div 
          className="text-center mb-8"
          style={{ 
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            color: '#7fbf9a',
            letterSpacing: '-0.02em'
          }}
        >
          Quillpy
        </div>

        <form onSubmit={handleSearch} className="relative mb-6">
          <div className="relative">
            <Search 
              className="absolute left-4 top-1/2 transform -translate-y-1/2"
              size={20}
              style={{ color: '#6f9f84' }}
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type anything to search or navigate..."
              className="w-full pl-12 pr-4 py-4 text-base outline-none transition-all duration-200 ui-panel-soft"
              style={{ 
                backgroundColor: '#16221d',
                color: '#e6f0ea',
                border: '2px solid #1b2a24'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#6f9f84';
                e.target.style.boxShadow = '0 0 0 4px rgba(111, 159, 132, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#1b2a24';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
        </form>

        <p 
          className="text-center text-sm"
          style={{ color: '#7a8f82' }}
        >
          Search the web or navigate to: welcome, about, projects, philosophy, connect
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-8">
          {[
            { name: 'Welcome', path: 'welcome' },
            { name: 'About', path: 'about' },
            { name: 'Projects', path: 'projects' },
            { name: 'Terminal', path: 'terminal' },
            { name: 'Connect', path: 'connect' }
          ].map((link) => (
            <button
              key={link.path}
              onClick={() => onSearch(link.path)}
              className="ui-hover ui-panel-soft p-4 text-center transition-all duration-200 cursor-pointer"
              style={{ 
                backgroundColor: '#16221d',
                color: '#a6b8ad',
                border: '1px solid #1b2a24'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1b2a24';
                e.currentTarget.style.borderColor = '#6f9f84';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#16221d";
                e.currentTarget.style.borderColor = "#1b2a24";
              }}
            >
              <div style={{ fontSize: '0.875rem' }}>{link.name}</div>
            </button>
          ))}
        </div>

        <p 
          className="text-center text-sm mt-4"
          style={{ color: '#7a8f82' }}
        >
          Search the web or navigate to: welcome, about, projects, philosophy, terminal, connect
        </p>
      </div>
    </div>
  );
}
