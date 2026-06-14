import { useState } from 'react';
import { X } from 'lucide-react';
import { useFlyer } from '@/store/flyerStore';
import { TEMPLATES, TEMPLATE_CATEGORIES } from '@/types';

export default function TemplateModal() {
  const { dispatch } = useFlyer();
  const [activeCategory, setActiveCategory] = useState('events');

  const filtered = TEMPLATES.filter((t) => t.category === activeCategory);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={() => dispatch({ type: 'SET_MODAL', modal: null })}
    >
      <div
        className="bg-white rounded-2xl max-w-[800px] w-[90vw] max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EEEEEE]">
          <h2 className="text-xl font-bold">Choose a Template</h2>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] transition-colors"
            onClick={() => dispatch({ type: 'SET_MODAL', modal: null })}
          >
            <X size={20} />
          </button>
        </div>

        {/* Categories */}
        <div className="px-6 py-3 border-b border-[#EEEEEE] flex gap-2 overflow-x-auto">
          {TEMPLATE_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeCategory === cat.id ? '#000' : '#EEEEEE',
                color: activeCategory === cat.id ? '#FFF' : '#666',
              }}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-[#999]">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3">
                <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
              </svg>
              <p className="text-sm">No templates available</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {filtered.map((template) => (
                <button
                  key={template.id}
                  className="group relative rounded-xl overflow-hidden transition-all hover:scale-[1.02] hover:shadow-xl"
                  onClick={() => {
                    dispatch({ type: 'APPLY_TEMPLATE', template });
                    dispatch({ type: 'SET_MODAL', modal: null });
                  }}
                >
                  {/* Mini preview */}
                  <div
                    className="aspect-[4/5] w-full"
                    style={{ backgroundColor: template.bgColor }}
                  >
                    <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center" style={{ fontFamily: 'system-ui' }}>
                      <span className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: template.textSecondary }}>
                        {template.defaultDate}
                      </span>
                      <span className="text-sm font-bold uppercase leading-tight" style={{ color: template.textPrimary }}>
                        {template.defaultTitle}
                      </span>
                      <div className="w-4 h-0.5 my-1.5" style={{ backgroundColor: template.accentColor }} />
                      <span className="text-[8px]" style={{ color: template.textSecondary }}>
                        {template.defaultSubtitle}
                      </span>
                    </div>
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 bg-[#F7FF58] text-black text-xs font-bold px-4 py-1.5 rounded-lg transition-all transform translate-y-2 group-hover:translate-y-0">
                      Select
                    </span>
                  </div>
                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-white text-xs font-bold">{template.name}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
