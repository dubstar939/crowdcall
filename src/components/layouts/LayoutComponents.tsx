import { useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import type { FlyerContent, FlyerTemplate } from '@/types';
import { THEME_COLORS, ACCENT_COLORS, FONT_OPTIONS } from '@/types';

interface LayoutProps {
  content: FlyerContent;
  template: FlyerTemplate;
}

interface ColorScheme {
  bgColor: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  fontFamily: string;
}

function useColorScheme(content: FlyerContent, template: FlyerTemplate): ColorScheme {
  return useMemo(() => {
    const themeColor = THEME_COLORS.find((c) => c.id === content.themeColorId) || THEME_COLORS[0];
    const accentColor = ACCENT_COLORS.find((c) => c.id === content.accentColorId) || ACCENT_COLORS[0];
    const font = FONT_OPTIONS.find((f) => f.id === content.fontId) || FONT_OPTIONS[0];
    
    return {
      bgColor: themeColor.hex,
      textPrimary: template.textPrimary,
      textSecondary: template.textSecondary,
      accentColor: accentColor.hex,
      fontFamily: font.family,
    };
  }, [content.themeColorId, content.accentColorId, content.fontId, template]);
}

// Empty state illustration component
export function EmptyStateIllustration() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-100 via-pink-100 to-orange-100 flex items-center justify-center mb-3">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-violet-500">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
          <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor"/>
          <path d="M21 15l-5-5L5 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="text-sm font-semibold text-slate-600">Add an image 📸</span>
      <span className="text-xs text-slate-400 mt-1">or pick from templates</span>
    </div>
  );
}

export function ClassicLayout({ content, template }: LayoutProps) {
  const { bgColor, textPrimary, textSecondary, accentColor, fontFamily } = useColorScheme(content, template);

  return (
    <div className="w-full h-full flex flex-col" style={{ backgroundColor: bgColor, fontFamily }}>
      <div className="relative flex-1 min-h-0 overflow-hidden">
        {content.image ? (
          <img src={content.image} alt="Flyer" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
            <EmptyStateIllustration />
          </div>
        )}
        <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent 40%, ${bgColor} 100%)` }} />
      </div>
      <div className="px-6 pb-6 pt-2 flex flex-col items-center text-center" style={{ backgroundColor: bgColor }}>
        {content.title && (
          <h1 className="text-3xl font-bold uppercase tracking-wide leading-tight mb-1" style={{ color: textPrimary }}>{content.title}</h1>
        )}
        {content.subtitle && (
          <p className="text-sm mb-3" style={{ color: textSecondary }}>{content.subtitle}</p>
        )}
        <div className="w-8 h-0.5 mb-3" style={{ backgroundColor: accentColor }} />
        <div className="flex flex-col items-center gap-1">
          {content.date && <span className="text-xs font-medium uppercase tracking-widest" style={{ color: textSecondary }}>{content.date}</span>}
          {content.time && <span className="text-xs font-medium uppercase tracking-widest" style={{ color: textSecondary }}>{content.time}</span>}
        </div>
        {content.location && (
          <div className="flex items-center gap-1 mt-2">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-2xs" style={{ color: textSecondary }}>{content.location}</span>
          </div>
        )}
      </div>
      {(content.qrEnabled || content.footerEnabled) && (
        <div className="px-4 pb-3 flex items-end justify-between" style={{ backgroundColor: bgColor }}>
          {content.footerEnabled && <span className="text-[8px] opacity-40" style={{ color: textSecondary }}>Made with CROWDCall</span>}
          {content.qrEnabled && content.qrUrl && (
            <div className="bg-white p-1 rounded"><QRCodeSVG value={content.qrUrl} size={48} level="M" /></div>
          )}
        </div>
      )}
    </div>
  );
}

export function ModernLayout({ content, template }: LayoutProps) {
  const { bgColor, textPrimary, textSecondary, accentColor, fontFamily } = useColorScheme(content, template);

  return (
    <div className="w-full h-full flex flex-col relative" style={{ backgroundColor: bgColor, fontFamily }}>
      <div className="h-2 w-full shrink-0" style={{ backgroundColor: accentColor }} />
      <div className="flex-1 flex flex-col px-6 pt-6 pb-4 overflow-hidden">
        <div className="text-center mb-4">
          {content.title && <h1 className="text-2xl font-bold uppercase tracking-wider leading-tight" style={{ color: textPrimary }}>{content.title}</h1>}
          {content.subtitle && <p className="text-xs mt-1" style={{ color: textSecondary }}>{content.subtitle}</p>}
        </div>
        <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden mb-4">
          {content.image ? (
            <img src={content.image} alt="Flyer" className="w-full h-full object-cover rounded-lg" />
          ) : (
            <div className="w-full h-full rounded-lg flex items-center justify-center border-2 border-dashed bg-gradient-to-br from-violet-50/50 via-pink-50/50 to-orange-50/50" style={{ borderColor: `${accentColor}40` }}>
              <EmptyStateIllustration />
            </div>
          )}
        </div>
        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-0.5">
            {content.date && <span className="text-xs font-medium" style={{ color: textSecondary }}>{content.date}</span>}
            {content.time && <span className="text-xs" style={{ color: textSecondary }}>{content.time}</span>}
            {content.location && (
              <div className="flex items-center gap-1 mt-1">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-2xs" style={{ color: textSecondary }}>{content.location}</span>
              </div>
            )}
          </div>
          {content.qrEnabled && content.qrUrl && (
            <div className="bg-white p-1 rounded"><QRCodeSVG value={content.qrUrl} size={40} level="M" /></div>
          )}
        </div>
      </div>
      {content.footerEnabled && <div className="px-4 pb-2"><span className="text-[7px] opacity-30" style={{ color: textSecondary }}>Made with CROWDCall</span></div>}
    </div>
  );
}

export function SplitLayout({ content, template }: LayoutProps) {
  const { bgColor, textPrimary, textSecondary, accentColor, fontFamily } = useColorScheme(content, template);

  return (
    <div className="w-full h-full flex relative" style={{ backgroundColor: bgColor, fontFamily }}>
      <div className="w-1/2 h-full relative overflow-hidden">
        {content.image ? (
          <img src={content.image} alt="Flyer" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: bgColor, filter: 'brightness(0.95)' }}>
            <EmptyStateIllustration />
          </div>
        )}
      </div>
      <div className="w-1/2 h-full flex flex-col justify-center px-5 py-6" style={{ backgroundColor: bgColor }}>
        {content.title && <h1 className="text-xl font-bold uppercase leading-tight mb-2" style={{ color: textPrimary }}>{content.title}</h1>}
        <div className="w-6 h-0.5 mb-3" style={{ backgroundColor: accentColor }} />
        {content.subtitle && <p className="text-xs mb-4" style={{ color: textSecondary }}>{content.subtitle}</p>}
        <div className="flex flex-col gap-1">
          {content.date && <span className="text-2xs font-medium uppercase" style={{ color: textSecondary }}>{content.date}</span>}
          {content.time && <span className="text-2xs" style={{ color: textSecondary }}>{content.time}</span>}
        </div>
        {content.location && (
          <div className="flex items-center gap-1 mt-3">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-2xs" style={{ color: textSecondary }}>{content.location}</span>
          </div>
        )}
        {content.qrEnabled && content.qrUrl && (
          <div className="mt-4"><div className="bg-white p-1 rounded inline-block"><QRCodeSVG value={content.qrUrl} size={36} level="M" /></div></div>
        )}
      </div>
      {content.footerEnabled && (
        <div className="absolute bottom-2 right-2"><span className="text-[7px] opacity-30" style={{ color: textSecondary }}>Made with CROWDCall</span></div>
      )}
    </div>
  );
}

export function OverlayLayout({ content, template }: LayoutProps) {
  const { bgColor, textPrimary, textSecondary, accentColor, fontFamily } = useColorScheme(content, template);

  return (
    <div className="w-full h-full relative flex flex-col" style={{ fontFamily }}>
      <div className="absolute inset-0">
        {content.image ? (
          <img src={content.image} alt="Flyer" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full" style={{ backgroundColor: bgColor }} />
        )}
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${bgColor}E6 0%, ${bgColor}99 100%)` }} />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-6 text-center">
        {content.title && <h1 className="text-3xl font-bold uppercase tracking-widest mb-2" style={{ color: textPrimary }}>{content.title}</h1>}
        <div className="w-12 h-0.5 mb-3" style={{ backgroundColor: accentColor }} />
        {content.subtitle && <p className="text-sm mb-4" style={{ color: textSecondary }}>{content.subtitle}</p>}
        <div className="flex flex-col items-center gap-1">
          {content.date && <span className="text-xs font-medium uppercase tracking-widest" style={{ color: textSecondary }}>{content.date}</span>}
          {content.time && <span className="text-xs uppercase tracking-widest" style={{ color: textSecondary }}>{content.time}</span>}
        </div>
        {content.location && (
          <div className="flex items-center gap-1 mt-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-2xs" style={{ color: textSecondary }}>{content.location}</span>
          </div>
        )}
        {content.qrEnabled && content.qrUrl && (
          <div className="mt-4 bg-white p-1 rounded"><QRCodeSVG value={content.qrUrl} size={48} level="M" /></div>
        )}
      </div>
      {content.footerEnabled && (
        <div className="relative z-10 px-4 pb-3 text-center"><span className="text-[7px] opacity-30" style={{ color: textSecondary }}>Made with CROWDCall</span></div>
      )}
    </div>
  );
}

export function MinimalLayout({ content, template }: LayoutProps) {
  const { bgColor, textPrimary, textSecondary, accentColor, fontFamily } = useColorScheme(content, template);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8 text-center relative" style={{ backgroundColor: bgColor, fontFamily }}>
      {content.date && <span className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: accentColor }}>{content.date}</span>}
      {content.title && <h1 className="text-2xl font-bold mb-2" style={{ color: textPrimary }}>{content.title}</h1>}
      {content.subtitle && <p className="text-sm mb-6" style={{ color: textSecondary }}>{content.subtitle}</p>}
      {content.image && (
        <div className="w-2/3 aspect-square rounded-full overflow-hidden mb-6">
          <img src={content.image} alt="Flyer" className="w-full h-full object-cover" />
        </div>
      )}
      {content.time && <span className="text-xs uppercase tracking-widest mb-2" style={{ color: textSecondary }}>{content.time}</span>}
      {content.location && (
        <div className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
          </svg>
          <span className="text-xs" style={{ color: textSecondary }}>{content.location}</span>
        </div>
      )}
      {content.qrEnabled && content.qrUrl && (
        <div className="mt-4 bg-white p-1 rounded"><QRCodeSVG value={content.qrUrl} size={44} level="M" /></div>
      )}
      {content.footerEnabled && (
        <div className="absolute bottom-3"><span className="text-[7px] opacity-30" style={{ color: textSecondary }}>Made with CROWDCall</span></div>
      )}
    </div>
  );
}

export function ElegantLayout({ content, template }: LayoutProps) {
  const { bgColor, textPrimary, textSecondary, accentColor, fontFamily } = useColorScheme(content, template);

  return (
    <div className="w-full h-full flex flex-col relative" style={{ backgroundColor: bgColor, fontFamily }}>
      <div className="h-1 w-full shrink-0" style={{ backgroundColor: accentColor }} />
      <div className="flex-1 flex flex-col px-8 pt-8 pb-6 items-center text-center overflow-hidden">
        {content.date && <span className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: textSecondary }}>{content.date}</span>}
        {content.image && (
          <div className="w-full h-32 mb-4 overflow-hidden rounded-sm">
            <img src={content.image} alt="Flyer" className="w-full h-full object-cover" />
          </div>
        )}
        {content.title && <h1 className="text-xl font-bold mb-2" style={{ color: textPrimary }}>{content.title}</h1>}
        <div className="w-16 h-px mb-3" style={{ backgroundColor: accentColor }} />
        {content.subtitle && <p className="text-xs italic mb-4" style={{ color: textSecondary }}>{content.subtitle}</p>}
        {content.time && <span className="text-xs mb-1" style={{ color: textSecondary }}>{content.time}</span>}
        {content.location && (
          <div className="flex items-center gap-1 mt-1">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span className="text-2xs" style={{ color: textSecondary }}>{content.location}</span>
          </div>
        )}
        {content.qrEnabled && content.qrUrl && (
          <div className="mt-4 bg-white p-1 rounded"><QRCodeSVG value={content.qrUrl} size={40} level="M" /></div>
        )}
      </div>
      {content.footerEnabled && <div className="px-4 pb-3 text-center"><span className="text-[7px] opacity-30" style={{ color: textSecondary }}>Made with CROWDCall</span></div>}
    </div>
  );
}
