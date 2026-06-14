import { useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useFlyer } from '@/store/flyerStore';
import { TEMPLATES, THEME_COLORS, ACCENT_COLORS, FONT_OPTIONS, FLYER_SIZES } from '@/types';

export default function FlyerCanvas() {
  const { state, dispatch } = useFlyer();
  const { content } = state;

  const template = useMemo(
    () => TEMPLATES.find((t) => t.id === content.templateId) || TEMPLATES[0],
    [content.templateId]
  );

  const font = useMemo(
    () => FONT_OPTIONS.find((f) => f.id === content.fontId) || FONT_OPTIONS[0],
    [content.fontId]
  );

  const themeColor = useMemo(
    () => THEME_COLORS.find((c) => c.id === content.themeColorId) || THEME_COLORS[0],
    [content.themeColorId]
  );

  const accentColor = useMemo(
    () => ACCENT_COLORS.find((c) => c.id === content.accentColorId) || ACCENT_COLORS[0],
    [content.accentColorId]
  );

  const dims = FLYER_SIZES[content.flyerSize];
  const aspectRatio = dims.height / dims.width;

  const bgColor = themeColor.hex;
  const textPrimary = template.textPrimary;
  const textSecondary = template.textSecondary;
  const fontFamily = font.family;

  const currentIdx = TEMPLATES.findIndex(t => t.id === content.templateId);

  const goToPrev = () => {
    if (currentIdx > 0) {
      dispatch({ type: 'APPLY_TEMPLATE', template: TEMPLATES[currentIdx - 1] });
    }
  };

  const goToNext = () => {
    if (currentIdx < TEMPLATES.length - 1) {
      dispatch({ type: 'APPLY_TEMPLATE', template: TEMPLATES[currentIdx + 1] });
    }
  };

  const renderLayout = () => {
    switch (template.layout) {
      case 'classic':
        return (
          <div className="w-full h-full flex flex-col" style={{ backgroundColor: bgColor, fontFamily }}>
            <div className="relative flex-1 min-h-0 overflow-hidden">
              {content.image ? (
                <img src={content.image} alt="Flyer" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: bgColor }}>
                  <div className="text-center opacity-30">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={textPrimary} strokeWidth="1.5" className="mx-auto mb-2">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                    <span className="text-xs" style={{ color: textPrimary }}>Add an image</span>
                  </div>
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
              <div className="w-8 h-0.5 mb-3" style={{ backgroundColor: accentColor.hex }} />
              <div className="flex flex-col items-center gap-1">
                {content.date && <span className="text-xs font-medium uppercase tracking-widest" style={{ color: textSecondary }}>{content.date}</span>}
                {content.time && <span className="text-xs font-medium uppercase tracking-widest" style={{ color: textSecondary }}>{content.time}</span>}
              </div>
              {content.location && (
                <div className="flex items-center gap-1 mt-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor.hex} strokeWidth="2">
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

      case 'modern':
        return (
          <div className="w-full h-full flex flex-col relative" style={{ backgroundColor: bgColor, fontFamily }}>
            <div className="h-2 w-full shrink-0" style={{ backgroundColor: accentColor.hex }} />
            <div className="flex-1 flex flex-col px-6 pt-6 pb-4 overflow-hidden">
              <div className="text-center mb-4">
                {content.title && <h1 className="text-2xl font-bold uppercase tracking-wider leading-tight" style={{ color: textPrimary }}>{content.title}</h1>}
                {content.subtitle && <p className="text-xs mt-1" style={{ color: textSecondary }}>{content.subtitle}</p>}
              </div>
              <div className="relative flex-1 min-h-0 rounded-lg overflow-hidden mb-4">
                {content.image ? (
                  <img src={content.image} alt="Flyer" className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="w-full h-full rounded-lg flex items-center justify-center border-2 border-dashed" style={{ borderColor: `${textSecondary}30` }}>
                    <span className="text-xs opacity-30" style={{ color: textPrimary }}>Add an image</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-end">
                <div className="flex flex-col gap-0.5">
                  {content.date && <span className="text-xs font-medium" style={{ color: textSecondary }}>{content.date}</span>}
                  {content.time && <span className="text-xs" style={{ color: textSecondary }}>{content.time}</span>}
                  {content.location && (
                    <div className="flex items-center gap-1 mt-1">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accentColor.hex} strokeWidth="2.5">
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

      case 'split':
        return (
          <div className="w-full h-full flex relative" style={{ backgroundColor: bgColor, fontFamily }}>
            <div className="w-1/2 h-full relative overflow-hidden">
              {content.image ? (
                <img src={content.image} alt="Flyer" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: bgColor, filter: 'brightness(0.95)' }}>
                  <span className="text-xs opacity-30" style={{ color: textPrimary }}>Add an image</span>
                </div>
              )}
            </div>
            <div className="w-1/2 h-full flex flex-col justify-center px-5 py-6" style={{ backgroundColor: bgColor }}>
              {content.title && <h1 className="text-xl font-bold uppercase leading-tight mb-2" style={{ color: textPrimary }}>{content.title}</h1>}
              <div className="w-6 h-0.5 mb-3" style={{ backgroundColor: accentColor.hex }} />
              {content.subtitle && <p className="text-xs mb-4" style={{ color: textSecondary }}>{content.subtitle}</p>}
              <div className="flex flex-col gap-1">
                {content.date && <span className="text-2xs font-medium uppercase" style={{ color: textSecondary }}>{content.date}</span>}
                {content.time && <span className="text-2xs" style={{ color: textSecondary }}>{content.time}</span>}
              </div>
              {content.location && (
                <div className="flex items-center gap-1 mt-3">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accentColor.hex} strokeWidth="2.5">
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

      case 'overlay':
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
              <div className="w-12 h-0.5 mb-3" style={{ backgroundColor: accentColor.hex }} />
              {content.subtitle && <p className="text-sm mb-4" style={{ color: textSecondary }}>{content.subtitle}</p>}
              <div className="flex flex-col items-center gap-1">
                {content.date && <span className="text-xs font-medium uppercase tracking-widest" style={{ color: textSecondary }}>{content.date}</span>}
                {content.time && <span className="text-xs uppercase tracking-widest" style={{ color: textSecondary }}>{content.time}</span>}
              </div>
              {content.location && (
                <div className="flex items-center gap-1 mt-3">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor.hex} strokeWidth="2">
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

      case 'minimal':
        return (
          <div className="w-full h-full flex flex-col items-center justify-center px-8 text-center relative" style={{ backgroundColor: bgColor, fontFamily }}>
            {content.date && <span className="text-xs uppercase tracking-[0.3em] mb-4" style={{ color: accentColor.hex }}>{content.date}</span>}
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
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={accentColor.hex} strokeWidth="2">
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

      case 'elegant':
        return (
          <div className="w-full h-full flex flex-col relative" style={{ backgroundColor: bgColor, fontFamily }}>
            <div className="h-1 w-full shrink-0" style={{ backgroundColor: accentColor.hex }} />
            <div className="flex-1 flex flex-col px-8 pt-8 pb-6 items-center text-center overflow-hidden">
              {content.date && <span className="text-xs uppercase tracking-[0.2em] mb-4" style={{ color: textSecondary }}>{content.date}</span>}
              {content.image && (
                <div className="w-full h-32 mb-4 overflow-hidden rounded-sm">
                  <img src={content.image} alt="Flyer" className="w-full h-full object-cover" />
                </div>
              )}
              {content.title && <h1 className="text-xl font-bold mb-2" style={{ color: textPrimary }}>{content.title}</h1>}
              <div className="w-16 h-px mb-3" style={{ backgroundColor: accentColor.hex }} />
              {content.subtitle && <p className="text-xs italic mb-4" style={{ color: textSecondary }}>{content.subtitle}</p>}
              {content.time && <span className="text-xs mb-1" style={{ color: textSecondary }}>{content.time}</span>}
              {content.location && (
                <div className="flex items-center gap-1 mt-1">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={accentColor.hex} strokeWidth="2">
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

      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative"
      style={{ background: 'repeating-linear-gradient(45deg, #f5f5f5 0px, #f5f5f5 10px, #fafafa 10px, #fafafa 20px)' }}
    >
      <div
        className="relative bg-white shadow-lg"
        style={{
          width: '100%',
          maxWidth: `${500 / aspectRatio}px`,
          maxHeight: 'calc(100vh - 180px)',
          aspectRatio: `${dims.width} / ${dims.height}`,
          transform: `scale(${state.zoom})`,
          transformOrigin: 'center center',
          transition: 'transform 0.2s ease',
        }}
      >
        {renderLayout()}
      </div>

      {/* Template Navigation */}
      <div className="flex items-center gap-3 mt-3">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full text-black/60 hover:bg-black/5 transition-colors disabled:opacity-30"
          onClick={goToPrev}
          disabled={currentIdx === 0}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <span className="text-xs text-gray-500 min-w-[50px] text-center">{currentIdx + 1} of {TEMPLATES.length}</span>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full text-black/60 hover:bg-black/5 transition-colors disabled:opacity-30"
          onClick={goToNext}
          disabled={currentIdx === TEMPLATES.length - 1}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
        <button
          className="text-xs text-black/60 hover:text-black transition-colors ml-2 underline"
          onClick={() => dispatch({ type: 'SET_MODAL', modal: 'template' })}
        >
          Change Template
        </button>
      </div>
    </div>
  );
}
