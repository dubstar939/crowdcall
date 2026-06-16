import { Share2, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useFlyer } from '@/store/flyerStore';

export default function BottomBar() {
  const { state, dispatch } = useFlyer();

  return (
    <div className="h-[68px] bg-white/90 backdrop-blur-xl border-t border-slate-200/60 flex items-center justify-between px-4 z-10 shrink-0 shadow-lg shadow-violet-100">
      {/* Zoom controls - visible on all screens */}
      <div className="flex items-center gap-2">
        <button
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-violet-50 hover:text-violet-600 transition-all duration-200"
          onClick={() => dispatch({ type: 'SET_ZOOM', zoom: Math.max(0.25, state.zoom - 0.25) })}
          title="Zoom out"
        >
          <ZoomOut size={18} />
        </button>
        <span className="text-xs font-semibold text-slate-600 min-w-[40px] text-center bg-slate-100 px-2 py-1 rounded-lg">{Math.round(state.zoom * 100)}%</span>
        <button
          className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-500 hover:bg-violet-50 hover:text-violet-600 transition-all duration-200"
          onClick={() => dispatch({ type: 'SET_ZOOM', zoom: Math.min(2, state.zoom + 0.25) })}
          title="Zoom in"
        >
          <ZoomIn size={18} />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          className="btn-secondary flex items-center gap-2 px-5 py-2.5"
          onClick={() => dispatch({ type: 'SET_MODAL', modal: 'share' })}
        >
          <Share2 size={16} />
          <span className="text-sm font-bold">Share</span>
        </button>
        <button
          className="btn-primary flex items-center gap-2 px-5 py-2.5"
          onClick={() => dispatch({ type: 'SET_MODAL', modal: 'download' })}
        >
          <Download size={16} />
          <span className="text-sm font-bold">Download</span>
        </button>
      </div>
    </div>
  );
}
