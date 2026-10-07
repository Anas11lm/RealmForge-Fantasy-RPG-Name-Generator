import React, { useState, useEffect } from 'react';
import { Star, Download, Trash2, Copy, Check, X, BookmarkCheck } from 'lucide-react';
import type { GeneratedResult } from '../data/engine.ts';

interface FavoritesDrawerProps {
  favorites: GeneratedResult[];
  onRemoveFavorite: (id: string) => void;
  onClearAll: () => void;
  onShowToast: (text: string) => void;
}

export const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({
  favorites,
  onRemoveFavorite,
  onClearAll,
  onShowToast,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCopy = (item: GeneratedResult) => {
    const textToCopy = item.titleOrMeaning ? `${item.name} — ${item.titleOrMeaning}` : item.name;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    onShowToast(`Copied "${item.name}" to clipboard`);
    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  const handleExportTxt = () => {
    if (favorites.length === 0) return;

    const timestamp = new Date().toISOString().split('T')[0];
    const header = `========================================================\n` +
                   ` REALMFORGE – SAVED FANTASY & RPG NAMES SHORTLIST\n` +
                   ` Generated on: ${timestamp}\n` +
                   ` Total Saved Names: ${favorites.length}\n` +
                   `========================================================\n\n`;

    const content = favorites
      .map((item, index) => {
        const titleLine = item.titleOrMeaning ? ` [${item.titleOrMeaning}]` : '';
        const categoryTag = item.category ? ` (${item.category.toUpperCase()})` : '';
        return `${String(index + 1).padStart(2, '0')}. ${item.name}${titleLine}${categoryTag}`;
      })
      .join('\n\n');

    const fullText = header + content + '\n\n---\nCreated with RealmForge (https://realmforge.app)';
    const blob = new Blob([fullText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `realmforge-favorites-${timestamp}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    onShowToast('Exported favorites to text file (.TXT)');
  };

  return (
    <>
      {/* Floating Trigger Button - Positioned above mobile sticky bar (bottom-20) on mobile and bottom-6 on desktop */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Open Saved Favorites (${favorites.length} items)`}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 min-h-[48px] px-4 py-3 bg-[#111726]/95 border border-amber-500/40 text-amber-200 hover:text-white hover:border-amber-400 hover:bg-[#161f33] active:scale-95 rounded-full shadow-2xl shadow-black/80 backdrop-blur-md transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      >
        <Star className="w-5 h-5 text-amber-400 fill-amber-400/30 group-hover:fill-amber-400 transition-colors" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
          Favorites
        </span>
        <span className="inline-flex items-center justify-center min-w-[22px] h-5 px-1.5 text-xs font-mono font-bold bg-amber-500 text-slate-950 rounded-full tabular-nums">
          {favorites.length}
        </span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Saved Names Shortlist"
          className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end bg-black/75 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          {/* Container: Bottom Sheet on Mobile (< 640px), Slide-Over on Desktop (>= 640px) */}
          <div
            className="w-full sm:max-w-md h-auto max-h-[88vh] sm:max-h-full sm:h-full bg-[#0d121c] border-t sm:border-t-0 sm:border-l border-white/10 rounded-t-3xl sm:rounded-none flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom sm:slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Indicator Bar */}
            <div className="w-full pt-3 pb-1 flex justify-center sm:hidden">
              <div className="w-12 h-1.5 bg-white/20 rounded-full" />
            </div>

            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#101724]">
              <div className="flex items-center gap-2.5">
                <BookmarkCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h2 className="text-base font-semibold tracking-wide text-slate-100 font-fantasy">
                    Saved Shortlist
                  </h2>
                  <p className="text-xs text-slate-400">
                    {favorites.length} {favorites.length === 1 ? 'name' : 'names'} saved locally
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 active:scale-95 transition-all"
                aria-label="Close drawer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2.5 -webkit-overflow-scrolling-touch">
              {favorites.length === 0 ? (
                <div className="h-60 sm:h-72 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <Star className="w-12 h-12 text-slate-600 mb-3" />
                  <p className="text-base sm:text-sm font-medium text-slate-300">Your shortlist is empty</p>
                  <p className="text-xs text-slate-500 mt-1.5 max-w-xs leading-relaxed">
                    Tap the star icon next to any generated name to save it to your campaign notebook.
                  </p>
                </div>
              ) : (
                favorites.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 bg-[#131b29] border border-white/5 rounded-xl flex items-center justify-between gap-3 hover:border-amber-500/20 active:scale-[0.99] transition-all group"
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="text-base sm:text-sm font-semibold text-slate-100 font-fantasy tracking-wide truncate">
                        {item.name}
                      </h4>
                      {item.titleOrMeaning && (
                        <p className="text-xs text-slate-400 truncate mt-0.5">
                          {item.titleOrMeaning}
                        </p>
                      )}
                      <div className="text-[11px] text-slate-500 mt-1">
                        <span>{item.category}</span>
                        {item.gender && (
                          <>
                            <span className="mx-1">·</span>
                            <span className="capitalize">{item.gender}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleCopy(item)}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-amber-300 hover:bg-white/5 active:scale-90 rounded-lg transition-transform"
                        title="Copy to clipboard"
                        aria-label={`Copy ${item.name}`}
                      >
                        {copiedId === item.id ? (
                          <Check className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <Copy className="w-5 h-5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() => onRemoveFavorite(item.id)}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-white/5 active:scale-90 rounded-lg transition-transform"
                        title="Remove from favorites"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Drawer Actions - with safe-area padding for iPhone home indicator */}
            {favorites.length > 0 && (
              <div className="p-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] border-t border-white/10 bg-[#101724] space-y-2.5">
                <button
                  type="button"
                  onClick={handleExportTxt}
                  className="w-full min-h-[48px] flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-amber-950/20"
                >
                  <Download className="w-4 h-4" />
                  Export as .TXT
                </button>

                <button
                  type="button"
                  onClick={onClearAll}
                  className="w-full min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2 text-xs text-slate-400 hover:text-red-400 active:scale-98 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All Saved Names
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

