import { Tab } from './Browser';
import { X, Plus } from 'lucide-react';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onTabChange: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onAddTab: () => void;
}

export function TabBar({ tabs, activeTabId, onTabChange, onCloseTab, onAddTab }: TabBarProps) {
  return (
    <div 
      className="flex items-end overflow-x-auto border-b scrollbar-hide"
      style={{ 
        borderColor: '#1b2a24',
        backgroundColor: '#0f1a16',
        paddingLeft: '0.5rem',
        paddingTop: '0.5rem'
      }}
    >
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm transition-all duration-200 whitespace-nowrap flex-shrink-0 cursor-pointer"
          style={{
            color: activeTabId === tab.id ? '#e6f0ea' : '#a6b8ad',
            backgroundColor: activeTabId === tab.id ? '#16221d' : '#121c18',
            borderTopLeftRadius: '0.5rem',
            borderTopRightRadius: '0.5rem',
            marginRight: '0.25rem',
            border: activeTabId === tab.id ? '1px solid #1b2a24' : '1px solid transparent',
            borderBottom: 'none',
            minWidth: '120px',
            maxWidth: '200px'
          }}
          onMouseEnter={(e) => {
            if (activeTabId !== tab.id) {
              e.currentTarget.style.backgroundColor = '#16221d';
            }
          }}
          onMouseLeave={(e) => {
            if (activeTabId !== tab.id) {
              e.currentTarget.style.backgroundColor = '#121c18';
            }
          }}
        >
          <span className="flex-1 truncate">{tab.title}</span>
          {tabs.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCloseTab(tab.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-0.5 rounded hover:bg-opacity-20"
              style={{ 
                color: '#a6b8ad',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(166, 184, 173, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>
      ))}
      
      {/* Add Tab Button */}
      <button
        onClick={onAddTab}
        className="flex items-center justify-center p-2 transition-all duration-200 flex-shrink-0"
        style={{
          color: '#a6b8ad',
          backgroundColor: 'transparent',
          marginLeft: '0.25rem',
          marginBottom: '0.25rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#e6f0ea';
          e.currentTarget.style.backgroundColor = 'rgba(111, 159, 132, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#a6b8ad';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
        title="New Tab"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
