import { useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { useFlyer } from '@/store/flyerStore';
import { TEMPLATES, FLYER_SIZES } from '@/types';
import {
  ClassicLayout,
  ModernLayout,
  SplitLayout,
  OverlayLayout,
  MinimalLayout,
  ElegantLayout,
} from '@/components/layouts/LayoutComponents';

export interface FlyerCanvasRef {
  getElement: () => HTMLDivElement | null;
}

export default forwardRef<FlyerCanvasRef, object>(function FlyerCanvas(_, ref) {
  const { state, dispatch } = useFlyer();
  const { content } = state;
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // Expose the canvas element to parent components via ref
  useImperativeHandle(ref, () => ({
    getElement: () => canvasRef.current,
  }));

  const template = useMemo(
    () => TEMPLATES.find((t) => t.id === content.templateId) || TEMPLATES[0],
    [content.templateId]
  );

  const dims = FLYER_SIZES[content.flyerSize];
  const aspectRatio = dims.height / dims.width;

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
        return <ClassicLayout content={content} template={template} />;
      case 'modern':
        return <ModernLayout content={content} template={template} />;
      case 'split':
        return <SplitLayout content={content} template={template} />;
      case 'overlay':
        return <OverlayLayout content={content} template={template} />;
      case 'minimal':
        return <MinimalLayout content={content} template={template} />;
      case 'elegant':
        return <ElegantLayout content={content} template={template} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 relative"
      style={{ background: 'repeating-linear-gradient(45deg, #f5f5f5 0px, #f5f5f5 10px, #fafafa 10px, #fafafa 20px)' }}
    >
      <div
        ref={canvasRef}
        data-flyer-canvas
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
