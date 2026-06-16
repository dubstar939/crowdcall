import { useState, useRef, useCallback } from 'react';
import { Image as ImageIcon, Check } from 'lucide-react';
import { useFlyer } from '@/store/flyerStore';
import {
  THEME_COLORS,
  ACCENT_COLORS,
  FONT_OPTIONS,
  FLYER_SIZES,
} from '@/types';
import type { QuickTab, FlyerSize, FlyerDimensions } from '@/types';
import { Switch } from '@/components/ui/switch';

function ContentTab() {
  const { state, dispatch } = useFlyer();
  const { content } = state;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        dispatch({ type: 'SET_CONTENT', payload: { image: ev.target?.result as string } });
      };
      reader.readAsDataURL(file);
    }
  }, [dispatch]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        dispatch({ type: 'SET_CONTENT', payload: { image: ev.target?.result as string } });
      };
      reader.readAsDataURL(file);
    }
  }, [dispatch]);

  const updateField = (field: string, value: string) => {
    dispatch({ type: 'SET_CONTENT', payload: { [field]: value } });
  };

  return (
    <div className="p-4 flex flex-col gap-3">
      {/* Text Fields */}
      <div className="card-panel">
        <h3 className="text-md font-bold mb-3">Text Content</h3>
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs font-bold mb-1 block">Title</label>
            <input
              className="input-field w-full"
              value={content.title}
              onChange={(e) => updateField('title', e.target.value)}
              placeholder="Enter event title"
              maxLength={100}
            />
          </div>
          <div>
            <label className="text-xs font-bold mb-1 block">Subtitle</label>
            <input
              className="input-field w-full"
              value={content.subtitle}
              onChange={(e) => updateField('subtitle', e.target.value)}
              placeholder="Enter subtitle"
              maxLength={150}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold mb-1 block">Date</label>
              <input
                className="input-field w-full"
                value={content.date}
                onChange={(e) => updateField('date', e.target.value)}
                placeholder="Enter date"
                maxLength={50}
              />
            </div>
            <div>
              <label className="text-xs font-bold mb-1 block">Time</label>
              <input
                className="input-field w-full"
                value={content.time}
                onChange={(e) => updateField('time', e.target.value)}
                placeholder="Enter time"
                maxLength={50}
              />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold mb-1 block">Location</label>
            <input
              className="input-field w-full"
              value={content.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="Enter location"
              maxLength={100}
            />
          </div>
        </div>
      </div>

      {/* Image Upload */}
      <div className="card-panel">
        <h3 className="text-md font-bold mb-3">Image</h3>
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
        {!content.image ? (
          <div
            className="border-2 border-dashed border-violet-200 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-violet-400 hover:bg-violet-50/50 transition-all group"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 via-pink-100 to-orange-100 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <ImageIcon size={20} className="text-violet-500" />
            </div>
            <span className="text-sm font-semibold text-slate-600">Drop an image here 📸</span>
            <span className="text-2xs text-slate-400 mt-1">or click to browse</span>
            <span className="text-2xs text-slate-300 mt-2">JPG, PNG, HEIC</span>
          </div>
        ) : (
          <div>
            <div className="rounded-lg overflow-hidden mb-2 max-h-[120px]">
              <img src={content.image} alt="Uploaded" className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-3">
              <button
                className="text-xs text-black underline hover:no-underline"
                onClick={() => fileInputRef.current?.click()}
              >
                Change
              </button>
              <button
                className="text-xs text-[#FF4444] underline hover:no-underline"
                onClick={() => dispatch({ type: 'SET_CONTENT', payload: { image: null } })}
              >
                Remove
              </button>
            </div>
          </div>
        )}
      </div>

      {/* QR Code */}
      <div className="card-panel">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-md font-bold">QR Code</h3>
          <Switch
            checked={content.qrEnabled}
            onCheckedChange={(checked) => dispatch({ type: 'SET_CONTENT', payload: { qrEnabled: checked } })}
          />
        </div>
        {content.qrEnabled && (
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold">QR Code URL</label>
            <input
              className="input-field w-full"
              value={content.qrUrl}
              onChange={(e) => dispatch({ type: 'SET_CONTENT', payload: { qrUrl: e.target.value } })}
              placeholder="https://your-link.com"
            />
          </div>
        )}
      </div>

      {/* Footer Toggle */}
      <div className="card-panel flex items-center justify-between">
        <h3 className="text-md font-bold">Show Footer</h3>
        <Switch
          checked={content.footerEnabled}
          onCheckedChange={(checked) => dispatch({ type: 'SET_CONTENT', payload: { footerEnabled: checked } })}
        />
      </div>
    </div>
  );
}

function DesignTab() {
  const { state, dispatch } = useFlyer();
  const { content } = state;

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Theme Color */}
      <div className="card-panel">
        <h3 className="text-md font-bold mb-1">Theme Color</h3>
        <p className="text-xs text-[#666666] mb-3">Choose a color theme for your flyer</p>
        <div className="grid grid-cols-7 gap-2">
          {THEME_COLORS.map((color) => (
            <button
              key={color.id}
              className="w-8 h-8 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
              style={{
                backgroundColor: color.hex,
                border: content.themeColorId === color.id ? '2px solid #000' : '2px solid transparent',
              }}
              onClick={() => dispatch({ type: 'SET_CONTENT', payload: { themeColorId: color.id } })}
              title={color.name}
            >
              {content.themeColorId === color.id && (
                <Check size={12} className={color.hex === '#FFFFFF' || color.hex === '#F5F5DC' ? 'text-black' : 'text-white'} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color */}
      <div className="card-panel">
        <h3 className="text-md font-bold mb-1">Accent Color</h3>
        <p className="text-xs text-[#666666] mb-3">Highlight color for accents</p>
        <div className="grid grid-cols-6 gap-2">
          {ACCENT_COLORS.map((color) => (
            <button
              key={color.id}
              className="w-8 h-8 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
              style={{
                backgroundColor: color.hex,
                border: content.accentColorId === color.id ? '2px solid #000' : '2px solid transparent',
              }}
              onClick={() => dispatch({ type: 'SET_CONTENT', payload: { accentColorId: color.id } })}
              title={color.name}
            >
              {content.accentColorId === color.id && (
                <Check size={12} className={color.hex === '#FFFFFF' || color.hex === '#F7FF58' ? 'text-black' : 'text-white'} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Font Selection */}
      <div className="card-panel">
        <h3 className="text-md font-bold mb-1">Font</h3>
        <p className="text-xs text-[#666666] mb-3">Choose a font style</p>
        <div className="flex flex-col gap-1">
          {(['impactful', 'elegant', 'friendly', 'utility'] as const).map((category) => (
            <div key={category}>
              <span className="text-2xs font-bold uppercase tracking-wider text-[#999999] px-2 py-1 block">
                {category}
              </span>
              {FONT_OPTIONS.filter((f) => f.category === category).map((font) => (
                <button
                  key={font.id}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all hover:bg-[#F5F5F5]"
                  style={{
                    borderLeft: content.fontId === font.id ? '3px solid #F7FF58' : '3px solid transparent',
                    backgroundColor: content.fontId === font.id ? 'rgba(247,255,88,0.08)' : 'transparent',
                  }}
                  onClick={() => dispatch({ type: 'SET_CONTENT', payload: { fontId: font.id } })}
                >
                  <span className="text-xs font-medium">{font.name}</span>
                  <span className="text-lg text-[#666666]" style={{ fontFamily: font.family }}>Aa</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdvancedPanel() {
  const { state, dispatch } = useFlyer();
  const { content } = state;
  const [openSection, setOpenSection] = useState<string | null>('size');

  const sections = [
    { id: 'size', label: 'Size & Type' },
    { id: 'color', label: 'Color' },
    { id: 'typography', label: 'Typography' },
    { id: 'background', label: 'Background' },
    { id: 'effects', label: 'Design Effects' },
  ];

  return (
    <div className="p-4 flex flex-col gap-3">
      {sections.map((section) => (
        <div key={section.id} className="card-panel">
          <button
            className="w-full flex items-center justify-between"
            onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
          >
            <span className="text-md font-bold">{section.label}</span>
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              className={`transition-transform ${openSection === section.id ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {openSection === section.id && (
            <div className="mt-3 pt-3 border-t border-[#EEEEEE]">
              {section.id === 'size' && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-[#666666]">Choose flyer dimensions</p>
                  {(Object.entries(FLYER_SIZES) as [FlyerSize, FlyerDimensions][]).map(([key, size]) => (
                    <button
                      key={key}
                      className="w-full text-left px-3 py-2 rounded-lg text-xs transition-all hover:bg-[#F5F5F5]"
                      style={{
                        backgroundColor: content.flyerSize === key ? 'rgba(247,255,88,0.15)' : 'transparent',
                        borderLeft: content.flyerSize === key ? '3px solid #F7FF58' : '3px solid transparent',
                      }}
                      onClick={() => dispatch({ type: 'SET_CONTENT', payload: { flyerSize: key } })}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>
              )}

              {section.id === 'color' && (
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold mb-2 block">Theme Color</label>
                    <div className="grid grid-cols-7 gap-1.5">
                      {THEME_COLORS.map((color) => (
                        <button
                          key={color.id}
                          className="w-7 h-7 rounded-full transition-transform hover:scale-110"
                          style={{
                            backgroundColor: color.hex,
                            border: content.themeColorId === color.id ? '2px solid #000' : '1px solid #ddd',
                          }}
                          onClick={() => dispatch({ type: 'SET_CONTENT', payload: { themeColorId: color.id } })}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold mb-2 block">Accent Color</label>
                    <div className="grid grid-cols-6 gap-1.5">
                      {ACCENT_COLORS.map((color) => (
                        <button
                          key={color.id}
                          className="w-7 h-7 rounded-full transition-transform hover:scale-110"
                          style={{
                            backgroundColor: color.hex,
                            border: content.accentColorId === color.id ? '2px solid #000' : '1px solid #ddd',
                          }}
                          onClick={() => dispatch({ type: 'SET_CONTENT', payload: { accentColorId: color.id } })}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {section.id === 'typography' && (
                <div className="flex flex-col gap-3">
                  <p className="text-xs text-[#666666]">Font settings</p>
                  <div>
                    <label className="text-xs font-bold mb-1 block">Font Family</label>
                    <select
                      className="input-field w-full"
                      value={content.fontId}
                      onChange={(e) => dispatch({ type: 'SET_CONTENT', payload: { fontId: e.target.value } })}
                    >
                      {FONT_OPTIONS.map((f) => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {section.id === 'background' && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-[#666666]">Background options</p>
                  <div className="grid grid-cols-7 gap-1.5">
                    {THEME_COLORS.map((color) => (
                      <button
                        key={color.id}
                        className="w-7 h-7 rounded-full transition-transform hover:scale-110"
                        style={{
                          backgroundColor: color.hex,
                          border: content.themeColorId === color.id ? '2px solid #000' : '1px solid #ddd',
                        }}
                        onClick={() => dispatch({ type: 'SET_CONTENT', payload: { themeColorId: color.id } })}
                      />
                    ))}
                  </div>
                </div>
              )}

              {section.id === 'effects' && (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">QR Code</span>
                    <Switch
                      checked={content.qrEnabled}
                      onCheckedChange={(checked) => dispatch({ type: 'SET_CONTENT', payload: { qrEnabled: checked } })}
                    />
                  </div>
                  {content.qrEnabled && (
                    <input
                      className="input-field w-full"
                      value={content.qrUrl}
                      onChange={(e) => dispatch({ type: 'SET_CONTENT', payload: { qrUrl: e.target.value } })}
                      placeholder="https://your-link.com"
                    />
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">Show Footer</span>
                    <Switch
                      checked={content.footerEnabled}
                      onCheckedChange={(checked) => dispatch({ type: 'SET_CONTENT', payload: { footerEnabled: checked } })}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      <button
        className="btn-secondary w-full mt-2"
        onClick={() => dispatch({ type: 'SET_EDITOR_MODE', mode: 'quick' })}
      >
        Back to Editor
      </button>
    </div>
  );
}

export default function ControlPanel() {
  const { state, dispatch } = useFlyer();
  const { quickTab, editorMode } = state;

  return (
    <div className="w-[370px] min-w-[370px] bg-[#FAFAFA] border-l border-[#EEEEEE] flex flex-col z-10 max-h-[calc(100vh-50px)]">
      {/* Mode Switch */}
      <div className="bg-white border-b border-[#EEEEEE] flex">
        {(['content', 'design'] as QuickTab[]).map((tab) => (
          <button
            key={tab}
            className="flex-1 py-3 text-md font-medium capitalize transition-all"
            style={{
              color: editorMode === 'quick' && quickTab === tab ? '#000' : '#999',
              fontWeight: editorMode === 'quick' && quickTab === tab ? 700 : 500,
              borderBottom: editorMode === 'quick' && quickTab === tab ? '2px solid #F7FF58' : '2px solid transparent',
            }}
            onClick={() => {
              dispatch({ type: 'SET_EDITOR_MODE', mode: 'quick' });
              dispatch({ type: 'SET_QUICK_TAB', tab });
            }}
          >
            {tab}
          </button>
        ))}
        <button
          className="flex-1 py-3 text-md font-medium capitalize transition-all"
          style={{
            color: editorMode === 'advanced' ? '#000' : '#999',
            fontWeight: editorMode === 'advanced' ? 700 : 500,
            borderBottom: editorMode === 'advanced' ? '2px solid #F7FF58' : '2px solid transparent',
          }}
          onClick={() => dispatch({ type: 'SET_EDITOR_MODE', mode: 'advanced' })}
        >
          Advanced
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto scroll-panel">
        {editorMode === 'advanced' ? (
          <AdvancedPanel />
        ) : quickTab === 'content' ? (
          <ContentTab />
        ) : (
          <DesignTab />
        )}
      </div>
    </div>
  );
}
