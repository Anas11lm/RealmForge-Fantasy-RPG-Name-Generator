import React, { useState, useEffect, useCallback, useId, useRef } from 'react';
import { Sparkles, Copy, Check, Star, RefreshCw, Dices } from 'lucide-react';
import { generateNames, type GenderOption, type GeneratedResult } from '../data/engine.ts';

interface GeneratorProps {
  type: string;
  categoryTitle?: string;
  onSaveFavorite?: (item: GeneratedResult) => void;
  onRemoveFavorite?: (id: string) => void;
  isFavorited?: (id: string, name: string) => boolean;
  onShowToast?: (text: string) => void;
}

export const Generator: React.FC<GeneratorProps> = ({
  type = 'elves',
  categoryTitle = 'Fantasy',
  onSaveFavorite,
  onRemoveFavorite,
  isFavorited,
  onShowToast,
}) => {
  const [gender, setGender] = useState<GenderOption>('all');
  const [includeSurname, setIncludeSurname] = useState<boolean>(true);
  const [names, setNames] = useState<GeneratedResult[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [showStickyBottomBar, setShowStickyBottomBar] = useState(false);

  const surnameCheckboxId = useId();
  const topButtonRef = useRef<HTMLButtonElement | null>(null);

  const isLocationOrCompound = type === 'taverns';

  // Generate new batch of names
  const handleGenerate = useCallback(() => {
    setIsRolling(true);
    const newBatch = generateNames(type, {
      gender,
      includeSurname,
      count: 10,
    });
    setNames(newBatch);
    setTimeout(() => setIsRolling(false), 200);
  }, [type, gender, includeSurname]);

  // Initial load
  useEffect(() => {
    handleGenerate();
  }, [handleGenerate]);

  // Observer to reveal Mobile Sticky Bottom Action Bar when top CTA scrolls out of view
  useEffect(() => {
    const target = topButtonRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When top button is NOT intersecting (scrolled past), show sticky bar on mobile
        setShowStickyBottomBar(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  // Global Spacebar listener for instant reroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        handleGenerate();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  const handleCopy = (item: GeneratedResult) => {
    navigator.clipboard.writeText(item.name);
    setCopiedId(item.id);
    if (onShowToast) {
      onShowToast(`Copied "${item.name}" to clipboard`);
    }
    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  const handleToggleFavorite = (item: GeneratedResult) => {
    const favorited = isFavorited ? isFavorited(item.id, item.name) : false;
    if (favorited) {
      if (onRemoveFavorite) onRemoveFavorite(item.id);
      if (onShowToast) onShowToast(`Removed "${item.name}" from favorites`);
    } else {
      if (onSaveFavorite) onSaveFavorite(item);
      if (onShowToast) onShowToast(`Added "${item.name}" to favorites`);
    }
  };

  return (
    <div className="w-full bg-[#0c101a] border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Generator Controls Bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        {/* Left: Filter Controls - Scrollable & touch-friendly on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full md:w-auto">
          {!isLocationOrCompound && (
            <div className="w-full sm:w-auto overflow-x-auto no-scrollbar snap-x snap-mandatory flex items-center gap-1.5 p-1 bg-[#131b29] border border-white/10 rounded-xl">
              {(['all', 'male', 'female', 'neutral'] as GenderOption[]).map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setGender(opt)}
                  className={`min-h-[44px] sm:min-h-[36px] px-4 sm:px-3 py-2 text-sm sm:text-xs font-semibold uppercase tracking-wider rounded-lg transition-all whitespace-nowrap active:scale-95 snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
                    gender === opt
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  aria-pressed={gender === opt}
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {!isLocationOrCompound && (
            <label
              htmlFor={surnameCheckboxId}
              className="min-h-[44px] flex items-center gap-3 px-3 py-2 bg-white/5 sm:bg-transparent rounded-xl sm:rounded-none cursor-pointer select-none group active:scale-[0.98] transition-transform"
            >
              <input
                id={surnameCheckboxId}
                type="checkbox"
                checked={includeSurname}
                onChange={(e) => setIncludeSurname(e.target.checked)}
                className="w-5 h-5 rounded border-slate-700 bg-slate-900 text-amber-500 focus:ring-amber-400 focus:ring-offset-0 focus:ring-2"
              />
              <span className="text-sm sm:text-xs font-medium text-slate-200 group-hover:text-white transition-colors">
                Include Surnames / Titles
              </span>
            </label>
          )}

          {isLocationOrCompound && (
            <div className="min-h-[44px] flex items-center gap-2 text-xs text-slate-300">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Compound Heraldic & Atmospheric Generator</span>
            </div>
          )}
        </div>

        {/* Right: Primary CTA and Spacebar indicator */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-slate-400">
            <kbd className="px-2 py-0.5 text-[11px] font-mono bg-white/5 border border-white/15 rounded text-slate-300 shadow-xs">
              Spacebar
            </kbd>
            <span>to reroll</span>
          </div>

          <button
            ref={topButtonRef}
            type="button"
            onClick={handleGenerate}
            disabled={isRolling}
            className="w-full md:w-auto min-h-[48px] sm:min-h-[44px] flex items-center justify-center gap-2.5 px-6 py-3 text-base sm:text-sm font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.97] rounded-xl shadow-lg shadow-amber-500/20 transition-all cursor-pointer whitespace-nowrap group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <RefreshCw
              className={`w-4 h-4 transition-transform ${isRolling ? 'animate-spin' : 'group-hover:rotate-45'}`}
            />
            <span>Generate 10 Names</span>
          </button>
        </div>
      </div>

      {/* Generated Names Grid - Mobile 1-col stacked, Tablet 2-col */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 pt-6">
        {names.map((item, index) => {
          const favorited = isFavorited ? isFavorited(item.id, item.name) : false;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              onClick={() => handleCopy(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCopy(item);
                }
              }}
              className="p-4 sm:p-4.5 bg-[#101624] hover:bg-[#131b2c] active:scale-[0.98] border border-white/5 hover:border-amber-500/30 rounded-xl transition-all duration-150 flex items-center justify-between gap-3 sm:gap-4 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400 tabular-nums shrink-0">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 font-fantasy tracking-wide truncate group-hover:text-amber-200 transition-colors">
                    {item.name}
                  </h3>
                </div>
                {item.titleOrMeaning && (
                  <p className="text-xs text-slate-400 truncate mt-1 pl-6">
                    {item.titleOrMeaning}
                  </p>
                )}
              </div>

              {/* Action Buttons with WCAG 44x44px touch targets */}
              <div
                className="flex items-center gap-1 shrink-0"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Copy Button */}
                <button
                  type="button"
                  onClick={() => handleCopy(item)}
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-all active:scale-90 ${
                    isCopied
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                  title="Copy name to clipboard"
                  aria-label={`Copy ${item.name}`}
                >
                  {isCopied ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>

                {/* Favorite Button */}
                <button
                  type="button"
                  onClick={() => handleToggleFavorite(item)}
                  className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl transition-all active:scale-90 ${
                    favorited
                      ? 'text-amber-400 bg-amber-500/15'
                      : 'text-slate-400 hover:text-amber-300 hover:bg-white/10'
                  }`}
                  title={favorited ? 'Remove from favorites' : 'Save to favorites'}
                  aria-label={`Save ${item.name}`}
                >
                  <Star
                    className={`w-5 h-5 ${favorited ? 'fill-amber-400' : ''}`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer bar with quick shortcut tip */}
      <div className="relative z-10 mt-6 pt-4 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-1.5">
          <Dices className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
          <span>Combinatorial Generator Engine · 100,000+ Unique Possibilities</span>
        </div>
        <div className="text-slate-400">
          Showing 10 randomized results for <strong className="text-slate-300 capitalize">{categoryTitle}</strong>
        </div>
      </div>

      {/* Mobile Sticky Bottom Action Bar (Thumb-Zone Optimization) */}
      {showStickyBottomBar && (
        <aside
          aria-label="Quick Actions"
          className="fixed bottom-0 left-0 right-0 z-40 bg-[#0d121c]/95 backdrop-blur-md border-t border-white/10 p-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:hidden shadow-2xl animate-in slide-in-from-bottom duration-200"
        >
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isRolling}
            className="w-full min-h-[48px] flex items-center justify-center gap-2.5 px-6 py-3 text-base font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 active:scale-[0.98] rounded-xl shadow-lg shadow-black/50 transition-all cursor-pointer"
          >
            <RefreshCw
              className={`w-5 h-5 transition-transform ${isRolling ? 'animate-spin' : ''}`}
            />
            <span>Generate New Names</span>
          </button>
        </aside>
      )}
    </div>
  );
};

