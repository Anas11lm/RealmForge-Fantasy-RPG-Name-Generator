import React from 'react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="w-full bg-[#06080d] border-t border-white/10 text-slate-400 pt-10 pb-[calc(env(safe-area-inset-bottom)+5.5rem)] sm:py-12 px-4 sm:px-6 lg:px-8 mt-16 sm:mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10 sm:mb-12">
        {/* Col 1: Brand & Mission */}
        <div className="space-y-3 sm:col-span-2 lg:col-span-1">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="text-lg font-bold font-fantasy text-amber-300 block tracking-wide py-1"
          >
            RealmForge
          </a>
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Fast, client-side programmatic generator crafted for dungeon masters, tabletop adventurers, novelists, and game developers worldwide.
          </p>
          <div className="text-[11px] text-slate-500 pt-2">
            <span>Client-side Engine</span>
            <span className="mx-1.5">·</span>
            <span>Zero Server Latency</span>
            <span className="mx-1.5">·</span>
            <span>100% Free</span>
          </div>
        </div>

        {/* Col 2: Fantasy Races */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Fantasy Races
          </h4>
          <ul className="space-y-0.5 text-xs">
            <li>
              <a
                href="/fantasy-races/elf-names"
                onClick={(e) => handleLinkClick(e, '/fantasy-races/elf-names')}
                className="min-h-[40px] flex items-center hover:text-amber-300 transition-colors py-1.5"
              >
                Elf Name Generator
              </a>
            </li>
            <li>
              <a
                href="/fantasy-races/dwarf-names"
                onClick={(e) => handleLinkClick(e, '/fantasy-races/dwarf-names')}
                className="min-h-[40px] flex items-center hover:text-amber-300 transition-colors py-1.5"
              >
                Dwarf Name Generator
              </a>
            </li>
            <li>
              <a
                href="/fantasy-races/orc-names"
                onClick={(e) => handleLinkClick(e, '/fantasy-races/orc-names')}
                className="min-h-[40px] flex items-center hover:text-amber-300 transition-colors py-1.5"
              >
                Orc Name Generator
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3: Locations & Beasts */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Worlds & Havens
          </h4>
          <ul className="space-y-0.5 text-xs">
            <li>
              <a
                href="/locations/tavern-names"
                onClick={(e) => handleLinkClick(e, '/locations/tavern-names')}
                className="min-h-[40px] flex items-center hover:text-amber-300 transition-colors py-1.5"
              >
                Tavern & Inn Names
              </a>
            </li>
            <li>
              <a
                href="/creatures/dragon-names"
                onClick={(e) => handleLinkClick(e, '/creatures/dragon-names')}
                className="min-h-[40px] flex items-center hover:text-amber-300 transition-colors py-1.5"
              >
                Dragon & Wyrm Names
              </a>
            </li>
            <li>
              <a
                href="/about"
                onClick={(e) => handleLinkClick(e, '/about')}
                className="min-h-[40px] flex items-center hover:text-amber-300 transition-colors py-1.5"
              >
                Phonetic Syllable Engine
              </a>
            </li>
          </ul>
        </div>

        {/* Col 4: Legal & AdSense Compliance */}
        <div className="space-y-2">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
            Legal & Policies
          </h4>
          <ul className="space-y-0.5 text-xs">
            <li>
              <a
                href="/privacy-policy"
                onClick={(e) => handleLinkClick(e, '/privacy-policy')}
                className="min-h-[40px] flex items-center hover:text-amber-300 transition-colors py-1.5"
              >
                Privacy Policy (AdSense / GDPR)
              </a>
            </li>
            <li>
              <a
                href="/about"
                onClick={(e) => handleLinkClick(e, '/about')}
                className="min-h-[40px] flex items-center hover:text-amber-300 transition-colors py-1.5"
              >
                About RealmForge
              </a>
            </li>
            <li className="py-1.5">
              <span className="text-slate-500">
                All generated names are royalty-free.
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* AdSense Compliance & Copyright Bar */}
      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
        <p>
          © {new Date().getFullYear()} RealmForge. Built for storytellers & worldbuilders.
        </p>
        <p className="text-center sm:text-right">
          This site uses cookies and standard programmatic ad placements to support free hosting.
        </p>
      </div>
    </footer>
  );
};
