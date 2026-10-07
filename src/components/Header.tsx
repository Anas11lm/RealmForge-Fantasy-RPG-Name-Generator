import React, { useState, useEffect } from 'react';
import { Sparkles, Search, Menu, X, ChevronRight, Compass } from 'lucide-react';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onOpenSearch?: () => void;
  favoritesCount?: number;
  onOpenFavorites?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPath = '/',
  onNavigate,
  onOpenSearch,
  favoritesCount = 0,
  onOpenFavorites,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key or path change
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    }
  };

  const navLinks = [
    { label: 'Elf Names', path: '/fantasy-races/elf-names', category: 'Fantasy Race' },
    { label: 'Dwarf Names', path: '/fantasy-races/dwarf-names', category: 'Fantasy Race' },
    { label: 'Orc Names', path: '/fantasy-races/orc-names', category: 'Fantasy Race' },
    { label: 'Tavern Names', path: '/locations/tavern-names', category: 'Locations' },
    { label: 'Dragon Names', path: '/creatures/dragon-names', category: 'Creatures' },
    { label: 'About & Lore', path: '/about', category: 'Guide' },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 w-full bg-[#080b11]/95 backdrop-blur-md border-b border-white/10 transition-colors">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          {/* Mobile Left: Hamburger Button (WCAG 44x44px touch target) */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 text-slate-300 hover:text-white hover:bg-white/5 active:scale-95 rounded-lg transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Open mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-xl sm:text-2xl font-bold tracking-wider text-amber-300 hover:text-amber-200 transition-colors font-fantasy whitespace-nowrap py-2"
          >
            RealmForge
          </a>

          {/* Zone 2: Desktop Navigation Links (>= 768px) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-300">
            {navLinks.slice(0, 5).map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`py-2 hover:text-amber-300 transition-colors ${
                  currentPath.includes(link.path.replace('/', ''))
                    ? 'text-amber-300 font-semibold'
                    : ''
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/about"
              onClick={(e) => handleLinkClick(e, '/about')}
              className={`py-2 hover:text-amber-300 transition-colors ${
                currentPath === '/about' ? 'text-amber-300 font-semibold' : ''
              }`}
            >
              About & Lore
            </a>
          </nav>

          {/* Zone 3: Primary Actions (Search & Quick Action) */}
          <div className="flex items-center gap-1 sm:gap-3">
            {/* Search Button (WCAG min 44x44px hit-area on mobile) */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 rounded-lg transition-all whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label="Search all generators"
            >
              <Search className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline text-xs">Search...</span>
              <kbd className="hidden sm:inline text-[10px] font-mono px-1.5 py-0.5 bg-black/40 rounded text-slate-400">
                ⌘K
              </kbd>
            </button>

            {/* Desktop CTA */}
            <a
              href="/creatures/dragon-names"
              onClick={(e) => handleLinkClick(e, '/creatures/dragon-names')}
              className="hidden sm:inline-flex items-center gap-1.5 min-h-[36px] px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg transition-all whitespace-nowrap shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Dragon Names</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile Slide-In Navigation Drawer & Backdrop */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-50 flex md:hidden bg-black/70 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Drawer Panel */}
          <div
            className="w-[85vw] max-w-sm h-full bg-[#0b0f19] border-r border-white/10 flex flex-col shadow-2xl p-4 sm:p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <a
                href="/"
                onClick={(e) => handleLinkClick(e, '/')}
                className="text-xl font-bold font-fantasy text-amber-300 tracking-wider"
              >
                RealmForge
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-slate-400 hover:text-white rounded-lg hover:bg-white/5 active:scale-95 transition-all"
                aria-label="Close navigation"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Drawer Quick Search */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenSearch) onOpenSearch();
                }}
                className="w-full min-h-[44px] flex items-center gap-3 px-3.5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-slate-300 hover:text-white hover:border-amber-400/40 transition-colors"
              >
                <Search className="w-4 h-4 text-amber-400" />
                <span>Search 100+ Generators...</span>
              </button>
            </div>

            {/* Navigation Category Links (Min 48px height per tap target) */}
            <div className="flex-1 py-2 space-y-1">
              <div className="text-[11px] font-mono tracking-wider uppercase text-slate-500 px-3 py-2">
                Generators
              </div>
              {navLinks.map((link) => {
                const isActive = currentPath.includes(link.path.replace('/', ''));
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className={`min-h-[48px] flex items-center justify-between px-3.5 py-3 rounded-xl text-base font-medium transition-all active:scale-[0.98] ${
                      isActive
                        ? 'bg-amber-400/10 text-amber-300 font-semibold border border-amber-500/20'
                        : 'text-slate-200 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Compass className="w-4 h-4 text-amber-400/70" />
                      <span>{link.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </a>
                );
              })}

              <div className="pt-4 border-t border-white/10 mt-4 space-y-1">
                <div className="text-[11px] font-mono tracking-wider uppercase text-slate-500 px-3 py-2">
                  Legal & Info
                </div>
                <a
                  href="/privacy-policy"
                  onClick={(e) => handleLinkClick(e, '/privacy-policy')}
                  className="min-h-[44px] flex items-center px-3.5 py-2.5 rounded-xl text-sm text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors"
                >
                  Privacy Policy
                </a>
              </div>
            </div>

            {/* Mobile Footer note */}
            <div className="pt-4 border-t border-white/10 text-xs text-slate-500">
              <p>RealmForge Mobile · Fast & Client-Side</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

