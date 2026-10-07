import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Sparkles,
  Search,
  Dices,
  BookOpen,
  ArrowRight,
  Shield,
  Layers,
  Zap,
  ChevronDown,
  X,
  ExternalLink,
} from 'lucide-react';
import { Header } from './components/Header.tsx';
import { Footer } from './components/Footer.tsx';
import { Generator } from './components/Generator.tsx';
import { FavoritesDrawer } from './components/FavoritesDrawer.tsx';
import { Toast, type ToastMessage } from './components/Toast.tsx';
import { AdBanner } from './components/AdBanner.tsx';
import type { GeneratedResult } from './data/engine.ts';

import elfData from './content/generators/elf-names.json';
import dwarfData from './content/generators/dwarf-names.json';
import orcData from './content/generators/orc-names.json';
import tavernData from './content/generators/tavern-names.json';
import dragonData from './content/generators/dragon-names.json';

const ALL_GENERATORS = [elfData, dwarfData, orcData, tavernData, dragonData];

const STORAGE_KEY = 'realmforge_favorites_v1';

export default function App() {
  // Routing state
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      return path && path !== '' ? path : '/';
    }
    return '/';
  });

  // Favorites state persisted to LocalStorage
  const [favorites, setFavorites] = useState<GeneratedResult[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return JSON.parse(stored);
      } catch {
        // Fallback
      }
    }
    return [];
  });

  // Toast feedback state
  const [toast, setToast] = useState<ToastMessage | null>(null);

  // Search Dialog state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync favorites to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // LocalStorage quota or blocked
    }
  }, [favorites]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Keyboard shortcut for Cmd+K / Ctrl+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen]);

  // Route navigation helper
  const navigate = useCallback((path: string) => {
    setCurrentPath(path);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSearchOpen(false);
  }, []);

  const showToast = useCallback((text: string, type: 'success' | 'info' = 'success') => {
    setToast({ id: `${Date.now()}-${Math.random()}`, text, type });
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 2800);
    return () => clearTimeout(timer);
  }, [toast]);

  // Favorite management
  const handleSaveFavorite = useCallback((item: GeneratedResult) => {
    setFavorites((prev) => {
      if (prev.some((f) => f.id === item.id || f.name === item.name)) return prev;
      return [item, ...prev];
    });
  }, []);

  const handleRemoveFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const handleClearAllFavorites = useCallback(() => {
    setFavorites([]);
    showToast('Cleared all saved favorites', 'info');
  }, [showToast]);

  const isFavorited = useCallback(
    (id: string, name: string) => {
      return favorites.some((item) => item.id === id || item.name === name);
    },
    [favorites]
  );

  // Active generator match based on path
  const activeGenerator = useMemo(() => {
    return ALL_GENERATORS.find(
      (gen) =>
        currentPath === `/${gen.category}/${gen.slug}` ||
        currentPath.includes(gen.slug)
    );
  }, [currentPath]);

  // Filtered generators for search modal
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return ALL_GENERATORS;
    const q = searchQuery.toLowerCase();
    return ALL_GENERATORS.filter(
      (g) =>
        g.title.toLowerCase().includes(q) ||
        g.metaDescription.toLowerCase().includes(q) ||
        g.categoryName.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Update dynamic SEO meta tags, social cards, canonical URL, and Schema.org in document head
  useEffect(() => {
    let title = 'Fantasy & RPG Name Generator — 100,000+ Lore-Friendly Names';
    let description =
      'Generate endless unique, lore-friendly fantasy names for D&D 5e, Pathfinder, fantasy writing, and worldbuilding. 1-click copy & save your favorites.';
    const canonicalURL = `https://realmforge.app${currentPath === '/' ? '' : currentPath.replace(/\/+$/, '')}`;

    if (activeGenerator) {
      title = `${activeGenerator.title} — 1,000+ Lore-Friendly Names`;
      description = `Generate endless unique, lore-friendly ${activeGenerator.title.replace(
        ' Generator',
        ''
      )} names for D&D 5e, Pathfinder, fantasy writing, and worldbuilding. 1-click copy & save your favorites.`;
    } else if (currentPath === '/privacy-policy') {
      title = 'Privacy Policy — RealmForge';
      description =
        'RealmForge Privacy Policy. Full disclosure on Google AdSense, cookies, analytics, and user privacy rights under GDPR and CCPA.';
    } else if (currentPath === '/about') {
      title = 'About RealmForge — Fantasy & RPG Naming Algorithms';
      description =
        'Discover the linguistics, morphological rules, and algorithmic syllable synthesis powering RealmForge fantasy name generators.';
    }

    // 1. Update Document Title
    document.title = title;

    // 2. Helper to set/create meta tag
    const setMeta = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', canonicalURL);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);

    // 3. Update Canonical link
    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', canonicalURL);

    // 4. Inject / update Structured Data: WebApplication
    let webAppScript = document.getElementById('webapp-schema-jsonld') as HTMLScriptElement | null;
    if (!webAppScript) {
      webAppScript = document.createElement('script');
      webAppScript.id = 'webapp-schema-jsonld';
      webAppScript.type = 'application/ld+json';
      document.head.appendChild(webAppScript);
    }
    webAppScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: title,
      url: canonicalURL,
      description,
      applicationCategory: 'EntertainmentApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      isAccessibleForFree: true,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      publisher: {
        '@type': 'Organization',
        name: 'RealmForge',
        url: 'https://realmforge.app',
      },
    });

    // 5. Inject / update Structured Data: BreadcrumbList
    let bcScript = document.getElementById('breadcrumb-schema-jsonld') as HTMLScriptElement | null;
    if (!bcScript) {
      bcScript = document.createElement('script');
      bcScript.id = 'breadcrumb-schema-jsonld';
      bcScript.type = 'application/ld+json';
      document.head.appendChild(bcScript);
    }

    const breadcrumbs = [
      { name: 'Home', item: 'https://realmforge.app/' },
    ];
    if (activeGenerator) {
      breadcrumbs.push({
        name: activeGenerator.categoryName,
        item: `https://realmforge.app/${activeGenerator.category}/${activeGenerator.slug}`,
      });
      breadcrumbs.push({
        name: activeGenerator.title,
        item: canonicalURL,
      });
    }

    bcScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((bc, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: bc.name,
        item: bc.item,
      })),
    });

    // 6. Inject / update Structured Data: FAQPage (if on a generator page)
    let faqScript = document.getElementById('faq-schema-jsonld') as HTMLScriptElement | null;
    if (activeGenerator && activeGenerator.faqs) {
      if (!faqScript) {
        faqScript = document.createElement('script');
        faqScript.id = 'faq-schema-jsonld';
        faqScript.type = 'application/ld+json';
        document.head.appendChild(faqScript);
      }
      faqScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: activeGenerator.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    } else if (faqScript) {
      faqScript.remove();
    }
  }, [activeGenerator, currentPath]);

  return (
    <div className="min-h-screen flex flex-col bg-[#080b11] text-slate-100 selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Bar Navigation */}
      <Header
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        favoritesCount={favorites.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        {/* VIEW 1: DYNAMIC PROGRAMMATIC GENERATOR PAGE */}
        {activeGenerator ? (
          <div>
            {/* Breadcrumb Navigation */}
            <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6 flex items-center gap-2 text-xs text-slate-400 overflow-x-auto no-scrollbar whitespace-nowrap">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/');
                }}
                className="hover:text-amber-300 transition-colors py-1"
              >
                Home
              </a>
              <span className="text-slate-600">/</span>
              <span className="capitalize text-slate-400 py-1">{activeGenerator.categoryName}</span>
              <span className="text-slate-600">/</span>
              <span className="text-amber-300 font-medium py-1" aria-current="page">
                {activeGenerator.title}
              </span>
            </nav>

            {/* Page Header */}
            <header className="mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-fantasy text-slate-100 tracking-tight text-balance">
                {activeGenerator.title}
              </h1>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
                {activeGenerator.heroSubtitle}
              </p>
            </header>

            {/* Core Interactive Generator Island */}
            <section className="mb-8 sm:mb-10">
              <Generator
                type={activeGenerator.type}
                categoryTitle={activeGenerator.title}
                onSaveFavorite={handleSaveFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                isFavorited={isFavorited}
                onShowToast={showToast}
              />
            </section>

            {/* AdSense CLS-Safe Banner Placeholder */}
            <AdBanner
              format="horizontal-banner"
              slotId={`ads-${activeGenerator.slug}-hero-sub`}
            />

            {/* Rich Content Sections (Google AdSense Quality & SEO) */}
            <div className="mt-10 sm:mt-14 space-y-10 sm:space-y-12">
              {/* Naming Conventions */}
              <section className="bg-[#0b0f19] border border-white/10 rounded-2xl p-5 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
                <h2 className="text-xl sm:text-2xl font-bold font-fantasy text-amber-200 mb-3 sm:mb-4 tracking-wide">
                  Naming Conventions of {activeGenerator.title.replace(' Generator', '')}
                </h2>
                <div className="prose prose-invert max-w-full text-base sm:text-lg leading-relaxed space-y-3 sm:space-y-4 text-slate-300">
                  <p>{activeGenerator.namingConventions.summary}</p>
                  <p>{activeGenerator.namingConventions.phonetics}</p>
                  <p>{activeGenerator.namingConventions.surnames}</p>
                </div>
              </section>

              {/* Notable Names & Meanings Data Table */}
              <section>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold font-fantasy text-slate-100 tracking-wide">
                    Examples of Notable Names & Lore
                  </h2>
                  <span className="text-xs text-slate-400 sm:hidden">
                    Scroll table →
                  </span>
                </div>
                <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0b0f19] shadow-inner -mx-4 sm:mx-0 px-4 sm:px-0">
                  <table className="w-full text-left border-collapse text-sm min-w-[520px]">
                    <thead>
                      <tr className="border-b border-white/10 bg-[#101726] text-xs font-semibold uppercase tracking-wider text-slate-300">
                        <th className="py-3.5 px-4 sm:px-6">Name</th>
                        <th className="py-3.5 px-4 sm:px-6">Origin / Realm</th>
                        <th className="py-3.5 px-4 sm:px-6">Meaning & Significance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {activeGenerator.notableNames.map((item, idx) => (
                        <tr key={idx} className="hover:bg-white/5 transition-colors">
                          <td className="py-3.5 px-4 sm:px-6 font-semibold text-amber-200 font-fantasy whitespace-nowrap">
                            {item.name}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-slate-400 whitespace-nowrap">
                            {item.origin}
                          </td>
                          <td className="py-3.5 px-4 sm:px-6 text-slate-300">
                            <span className="font-medium text-slate-200">{item.meaning}</span>
                            <span className="block text-xs text-slate-400 mt-0.5">
                              {item.significance}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Frequently Asked Questions Accordion */}
              <section>
                <h2 className="text-xl sm:text-2xl font-bold font-fantasy text-slate-100 mb-4 sm:mb-6 tracking-wide">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-3 sm:space-y-3.5">
                  {activeGenerator.faqs.map((faq, idx) => (
                    <details
                      key={idx}
                      className="group bg-[#0b0f19] border border-white/10 rounded-xl p-4 sm:p-5 open:border-amber-500/30 transition-all cursor-pointer"
                    >
                      <summary className="min-h-[48px] font-semibold text-slate-200 list-none flex items-center justify-between text-base group-hover:text-amber-200 select-none">
                        <span className="pr-3">{faq.question}</span>
                        <ChevronDown className="w-5 h-5 text-amber-400 shrink-0 ml-2 transition-transform duration-200 group-open:rotate-180" />
                      </summary>
                      <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Related Generators Mesh */}
              <section className="pt-6 sm:pt-8 border-t border-white/10">
                <h3 className="text-lg sm:text-xl font-bold font-fantasy text-slate-200 mb-4 tracking-wide">
                  Explore Related Generators
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {activeGenerator.relatedSlugs.map((related, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => navigate(`/${related.category}/${related.slug}`)}
                      className="min-h-[64px] p-4 bg-[#0d1320] border border-white/5 rounded-xl hover:border-amber-500/30 hover:bg-[#121a2d] active:scale-[0.98] transition-all text-left group cursor-pointer flex flex-col justify-center"
                    >
                      <h4 className="text-sm font-semibold text-slate-200 group-hover:text-amber-300 font-fantasy">
                        {related.title}
                      </h4>
                      <span className="text-xs text-slate-500 mt-1 flex items-center gap-1 group-hover:text-slate-400">
                        <span>Generate names</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </button>
                  ))}
                </div>
              </section>
            </div>
          </div>
        ) : currentPath === '/privacy-policy' ? (
          /* VIEW 2: PRIVACY POLICY PAGE */
          <div className="max-w-4xl mx-auto py-4 sm:py-6">
            <header className="mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-white/10">
              <h1 className="text-2xl sm:text-4xl font-bold font-fantasy text-slate-100">
                Privacy Policy
              </h1>
              <p className="text-xs text-slate-400 mt-2">
                Last updated: October 2026 · Compliant with Google AdSense, GDPR & CCPA
              </p>
            </header>

            <div className="space-y-6 sm:space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">
              <section className="space-y-2.5 sm:space-y-3">
                <h2 className="text-lg sm:text-xl font-bold font-fantasy text-amber-200">
                  1. Introduction & Overview
                </h2>
                <p>
                  At RealmForge (accessible from realmforge.app), the privacy of our visitors is of paramount importance. This Privacy Policy document outlines the types of information collected and how it is used.
                </p>
              </section>

              <section className="space-y-2.5 sm:space-y-3">
                <h2 className="text-lg sm:text-xl font-bold font-fantasy text-amber-200">
                  2. Google DoubleClick DART Cookies & Google AdSense
                </h2>
                <p>
                  Google is a third-party vendor on our site. Google uses cookies, known as DART cookies, to serve ads to visitors based on visits to this website and other websites across the Internet. Visitors may opt out of personalized advertising by visiting the Google Ad and Content Network Privacy Policy at: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">https://policies.google.com/technologies/ads</a>.
                </p>
              </section>

              <section className="space-y-2.5 sm:space-y-3">
                <h2 className="text-lg sm:text-xl font-bold font-fantasy text-amber-200">
                  3. LocalStorage Privacy & Shortlists
                </h2>
                <p>
                  RealmForge utilizes HTML5 LocalStorage exclusively to retain your personal bookmarked names on your device. This data is never sent to our servers and remains completely under your control.
                </p>
              </section>

              <section className="space-y-2.5 sm:space-y-3">
                <h2 className="text-lg sm:text-xl font-bold font-fantasy text-amber-200">
                  4. Log Files & Analytics
                </h2>
                <p>
                  Like most modern web services, standard non-identifying technical log files (browser type, timestamp, referrer URL) are recorded by hosting providers to maintain server uptime, security, and performance.
                </p>
              </section>
            </div>
          </div>
        ) : currentPath === '/about' ? (
          /* VIEW 3: ABOUT PAGE */
          <div className="max-w-4xl mx-auto py-4 sm:py-6">
            <header className="mb-8 sm:mb-10 pb-5 sm:pb-6 border-b border-white/10">
              <h1 className="text-2xl sm:text-4xl font-bold font-fantasy text-slate-100">
                About RealmForge
              </h1>
              <p className="text-xs text-slate-400 mt-2">
                The science and lore of algorithmic fantasy naming.
              </p>
            </header>

            <div className="space-y-6 sm:space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed">
              <section className="space-y-2.5 sm:space-y-3">
                <h2 className="text-lg sm:text-xl font-bold font-fantasy text-amber-200">
                  Phonetic Syllable Synthesis
                </h2>
                <p>
                  Too many random name generators output unpronounceable consonant clusters. RealmForge uses custom algorithmic combinatorics modeled on linguistic morphology. Each fantasy race has its own phonotactic constraints, prefix roots, and cultural suffixes.
                </p>
              </section>

              <section className="space-y-2.5 sm:space-y-3">
                <h2 className="text-lg sm:text-xl font-bold font-fantasy text-amber-200">
                  100% Free & Royalty Free
                </h2>
                <p>
                  All generated names are completely free to use in your tabletop D&D campaigns, fantasy novels, video games, worldbuilding wikis, and screenplays.
                </p>
              </section>

              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="min-h-[48px] inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-xl transition-all cursor-pointer"
                >
                  Return to Generator Hub
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* VIEW 4: HOMEPAGE (DIRECTORY HUB) */
          <div>
            {/* Hero Section */}
            <section className="text-center py-6 sm:py-14 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs text-amber-300 font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Programmatic Syllable Engine</span>
                <span className="text-slate-500">·</span>
                <span>100,000+ Combinations</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold font-fantasy text-slate-100 tracking-tight text-balance">
                Fantasy & RPG Name Generator
              </h1>
              <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
                Forge authentic names for elves, dwarves, orcs, taverns, and dragon lords. Features instant 1-click copy, spacebar reroll, and exportable shortlist.
              </p>
            </section>

            {/* Featured Interactive Generator Island */}
            <section className="mb-10 sm:mb-12">
              <Generator
                type="elves"
                categoryTitle="Elven Kingdoms"
                onSaveFavorite={handleSaveFavorite}
                onRemoveFavorite={handleRemoveFavorite}
                isFavorited={isFavorited}
                onShowToast={showToast}
              />
            </section>

            {/* AdSense Leaderboard Placeholder */}
            <AdBanner format="horizontal-banner" slotId="home-leaderboard-top" />

            {/* Popular Generators Hub Grid */}
            <section className="mt-12 sm:mt-16">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-fantasy text-slate-100 tracking-wide">
                    Explore Dedicated Generator Tools
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Each generator includes full lore, phonetic conventions, and notable name tables.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {ALL_GENERATORS.map((gen) => (
                  <button
                    key={gen.slug}
                    type="button"
                    onClick={() => navigate(`/${gen.category}/${gen.slug}`)}
                    className="min-h-[140px] p-5 sm:p-6 bg-[#0c101a] border border-white/10 rounded-2xl hover:border-amber-500/40 hover:bg-[#101726] active:scale-[0.98] transition-all text-left flex flex-col justify-between group cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2 sm:mb-3">
                        <span className="text-[11px] uppercase tracking-wider text-amber-400/90 font-semibold">
                          {gen.categoryName}
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold font-fantasy text-slate-100 group-hover:text-amber-200 transition-colors">
                        {gen.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
                        {gen.metaDescription}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                      <span>Interactive Island</span>
                      <span className="text-amber-300/80 group-hover:text-amber-300 font-medium">
                        Open Generator →
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {/* Why RealmForge / Feature Matrix */}
            <section className="mt-14 sm:mt-20 pt-10 sm:pt-12 border-t border-white/10">
              <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
                <h2 className="text-xl sm:text-3xl font-bold font-fantasy text-slate-100">
                  Engineered for Tabletop & Worldbuilding
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5 sm:mt-2">
                  Built to be lightning fast, responsive, and completely friction-free.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                <div className="p-5 sm:p-6 bg-[#0b0f19] border border-white/5 rounded-xl">
                  <Zap className="w-6 h-6 text-amber-400 mb-3" />
                  <h3 className="text-base font-bold font-fantasy text-slate-100">
                    Instant Zero-Lag Generation
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Runs entirely in your browser using pure combinatoric algorithms. Press the Spacebar or tap to reroll in under 5 milliseconds.
                  </p>
                </div>

                <div className="p-5 sm:p-6 bg-[#0b0f19] border border-white/5 rounded-xl">
                  <Shield className="w-6 h-6 text-amber-400 mb-3" />
                  <h3 className="text-base font-bold font-fantasy text-slate-100">
                    AdSense & CLS Safe
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Designed with fixed-geometry advertising containers and zero Cumulative Layout Shift, exceeding Google Web Vitals standards.
                  </p>
                </div>

                <div className="p-5 sm:p-6 bg-[#0b0f19] border border-white/5 rounded-xl">
                  <BookOpen className="w-6 h-6 text-amber-400 mb-3" />
                  <h3 className="text-base font-bold font-fantasy text-slate-100">
                    Campaign Export Ready
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Bookmark names with 1 tap to your LocalStorage tray and export your shortlist directly to a formatted .TXT document.
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Floating Favorites Drawer (Slide-over tray with LocalStorage & .txt export) */}
      <FavoritesDrawer
        favorites={favorites}
        onRemoveFavorite={handleRemoveFavorite}
        onClearAll={handleClearAllFavorites}
        onShowToast={showToast}
      />

      {/* Toast Notification Container */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Search Modal (Triggered by Cmd+K or search bar) */}
      {isSearchOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Search Generators"
          className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-3 sm:px-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-[#0e1422] border border-white/15 rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3.5 sm:p-4 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-amber-400 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search generators (e.g. Elf, Dwarf, Tavern, Dragon)..."
                autoFocus
                className="w-full bg-transparent text-base text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsSearchOpen(false)}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-white rounded-lg active:scale-90 transition-transform"
                aria-label="Close search"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="max-h-[60vh] sm:max-h-80 overflow-y-auto p-2 divide-y divide-white/5 -webkit-overflow-scrolling-touch">
              {searchResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">
                  No generator found matching "{searchQuery}"
                </div>
              ) : (
                searchResults.map((item) => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={() => navigate(`/${item.category}/${item.slug}`)}
                    className="w-full min-h-[56px] p-3 sm:p-3.5 flex items-center justify-between text-left hover:bg-white/5 active:scale-[0.98] rounded-xl transition-all group cursor-pointer"
                  >
                    <div>
                      <h4 className="text-base sm:text-sm font-semibold text-slate-200 group-hover:text-amber-300 font-fantasy">
                        {item.title}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1">{item.metaDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-amber-300 shrink-0 ml-2 transition-colors" />
                  </button>
                ))
              )}
            </div>

            <div className="p-3 bg-[#0a0e18] border-t border-white/10 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Press ESC to close</span>
              <span>RealmForge Quick Search</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <Footer onNavigate={navigate} />
    </div>
  );
}
