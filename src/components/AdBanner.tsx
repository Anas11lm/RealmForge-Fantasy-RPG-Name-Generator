import React from 'react';

export type AdFormat = 'horizontal-banner' | 'sidebar' | 'mobile-anchor';

interface AdBannerProps {
  slotId?: string;
  format?: AdFormat;
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({
  slotId = 'placeholder-ad-slot',
  format = 'horizontal-banner',
  className = '',
}) => {
  // Dimensions specifically designed to eliminate Cumulative Layout Shift (CLS)
  // Mobile: 320x50 (min-h-[60px]) or 300x250 (min-h-[250px]). Desktop: 728x90 (min-h-[90px])
  const formatClasses = {
    'horizontal-banner': 'w-full min-h-[60px] sm:min-h-[90px] md:min-h-[100px] max-w-4xl mx-auto my-6 sm:my-8',
    'sidebar': 'w-full min-h-[250px] lg:min-h-[300px] my-4 sm:my-6',
    'mobile-anchor': 'w-full min-h-[50px] sm:min-h-[60px] max-w-lg mx-auto my-3 sm:my-4',
  }[format];

  return (
    <div
      className={`relative rounded-xl border border-dashed border-white/10 bg-[#090d15]/60 flex flex-col items-center justify-center p-3 overflow-hidden select-none transition-colors ${formatClasses} ${className}`}
      data-ad-slot={slotId}
      data-ad-format={format}
      aria-label="Advertisement container"
    >
      {/* Subtle Advertisement label required for Google AdSense compliance */}
      <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500 mb-1">
        Advertisement
      </span>

      {/* CLS-safe visual container */}
      <div className="w-full h-full flex flex-col items-center justify-center text-center">
        <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent mb-2" />
        <span className="text-xs text-slate-400 font-mono">
          AdSense Responsive Container [{format}]
        </span>
        <span className="text-[10px] text-slate-500 font-mono mt-0.5">
          CLS Pre-Reserved Frame · Slot #{slotId}
        </span>
      </div>
    </div>
  );
};
