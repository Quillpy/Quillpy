import { useState, useEffect } from 'react';
import { Bookmark, Star, Trash2 } from 'lucide-react';
import { TabType } from './Browser';

interface Bookmark {
  id: string;
  type: TabType;
  title: string;
  addedAt: number;
}

interface BookmarksBarProps {
  onNavigate: (type: TabType) => void;
  currentTab: TabType;
}

const DEFAULT_TAB_TITLES: Record<TabType, string> = {
  welcome: 'Welcome',
  about: 'About',
  projects: 'Projects',
  philosophy: 'Philosophy',
  connect: 'Connect',
  terminal: 'Terminal',
  support: 'Support',
  logs: 'Logs',
};

export function BookmarksBar({ onNavigate, currentTab }: BookmarksBarProps) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('quillpy_bookmarks');
    if (stored) {
      try {
        setBookmarks(JSON.parse(stored));
      } catch {
        setBookmarks([]);
      }
    }
  }, []);

  const saveBookmarks = (newBookmarks: Bookmark[]) => {
    setBookmarks(newBookmarks);
    localStorage.setItem('quillpy_bookmarks', JSON.stringify(newBookmarks));
  };

  const addBookmark = () => {
    if (bookmarks.some((b) => b.type === currentTab)) return;
    const newBookmark: Bookmark = {
      id: `${Date.now()}`,
      type: currentTab,
      title: DEFAULT_TAB_TITLES[currentTab],
      addedAt: Date.now(),
    };
    saveBookmarks([...bookmarks, newBookmark]);
  };

  const removeBookmark = (id: string) => {
    saveBookmarks(bookmarks.filter((b) => b.id !== id));
  };

  const isBookmarked = bookmarks.some((b) => b.type === currentTab);

  return (
    <div
      className="flex items-center gap-1 border-b px-3 py-1.5"
      style={{
        backgroundColor: 'var(--chrome-panel-strong)',
        borderColor: 'var(--chrome-border)',
      }}
    >
      <button
        onClick={addBookmark}
        className="p-1.5"
        style={{
          color: isBookmarked ? 'var(--brand)' : 'var(--text-soft)',
          opacity: isBookmarked ? 1 : 0.6,
        }}
        title={isBookmarked ? 'Page bookmarked' : 'Bookmark this page'}
      >
        {isBookmarked ? <Star size={14} fill="currentColor" /> : <Bookmark size={14} />}
      </button>

      <div className="h-4 w-px" style={{ backgroundColor: 'var(--border)' }} />

      <div className="flex flex-1 items-center gap-1 overflow-x-auto scrollbar-hide">
        {bookmarks.length === 0 ? (
          <span className="text-xs" style={{ color: 'var(--text-soft)' }}>
            No bookmarks yet. Click the star to add one.
          </span>
        ) : (
          bookmarks.map((bookmark) => (
            <div key={bookmark.id} className="group relative">
              <button
                onClick={() => onNavigate(bookmark.type)}
                className="flex items-center gap-1.5 border px-2.5 py-1 text-xs"
                style={{
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--surface-1)',
                  color: 'var(--text-muted)',
                }}
              >
                <span className="truncate max-w-[100px]">{bookmark.title}</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeBookmark(bookmark.id);
                }}
                className="absolute -right-1.5 -top-1.5 hidden rounded-full border p-0.5 group-hover:block"
                style={{
                  backgroundColor: 'var(--surface-overlay)',
                  borderColor: 'var(--border)',
                  color: 'var(--destructive)',
                }}
                title="Remove bookmark"
              >
                <Trash2 size={8} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
