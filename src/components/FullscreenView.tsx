import { useEffect } from 'react';
import { X, Share2, Download } from 'lucide-react';
import { useFlyer } from '@/store/flyerStore';

export default function FullscreenView() {
  const { dispatch } = useFlyer();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch({ type: 'SET_MODAL', modal: null });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
      onClick={() => dispatch({ type: 'SET_MODAL', modal: null })}
    >
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        onClick={() => dispatch({ type: 'SET_MODAL', modal: null })}
      >
        <X size={24} />
      </button>

      {/* Canvas clone - we need to render the flyer here */}
      <div
        className="relative bg-white shadow-2xl max-w-[90vw] max-h-[85vh]"
        style={{
          aspectRatio: '1080 / 1350',
          maxHeight: '85vh',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* This will mirror the main canvas content */}
        <div className="w-full h-full" id="fullscreen-flyer-mirror" />
      </div>

      {/* Action Bar */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/50 rounded-xl px-6 py-3"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="flex items-center gap-2 text-white text-sm font-bold hover:text-[#F7FF58] transition-colors"
          onClick={() => dispatch({ type: 'SET_MODAL', modal: 'share' })}
        >
          <Share2 size={18} />
          Share
        </button>
        <div className="w-px h-5 bg-white/30" />
        <button
          className="flex items-center gap-2 text-sm font-bold hover:opacity-90 transition-opacity"
          style={{ color: '#F7FF58' }}
          onClick={() => dispatch({ type: 'SET_MODAL', modal: 'download' })}
        >
          <Download size={18} />
          Download
        </button>
      </div>
    </div>
  );
}
