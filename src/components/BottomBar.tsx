import { Share2, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { useFlyer } from '@/store/flyerStore';

export default function BottomBar() {
  const { state, dispatch } = useFlyer();

  return (
    <div className="h-14 bg-white border-t border-[#EEEEEE] flex items-center justify-between px-4 z-10 shrink-0">
      {/* Zoom controls - visible on all screens */}
      <div className="flex items-center gap-2">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg text-black/60 hover:bg-black/5 transition-colors"
          onClick={() => dispatch({ type: 'SET_ZOOM', zoom: Math.max(0.25, state.zoom - 0.25) })}
        >
          <ZoomOut size={18} />
        </button>
        <span className="text-xs text-[#666666] min-w-[32px] text-center">{Math.round(state.zoom * 100)}%</span>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-lg text-black/60 hover:bg-black/5 transition-colors"
          onClick={() => dispatch({ type: 'SET_ZOOM', zoom: Math.min(2, state.zoom + 0.25) })}
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
          <Share2 size={18} />
          <span className="text-sm font-bold">Share</span>
        </button>
        <button
          className="btn-primary flex items-center gap-2 px-5 py-2.5"
          onClick={() => dispatch({ type: 'SET_MODAL', modal: 'download' })}
        >
          <Download size={18} />
          <span className="text-sm font-bold">Download</span>
        </button>
      </div>
    </div>
  );
}
