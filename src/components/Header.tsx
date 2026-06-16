import { Upload, Undo2, Redo2, Maximize2, HelpCircle } from 'lucide-react';
import { useFlyer } from '@/store/flyerStore';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function Header() {
  const { dispatch, undo, redo, canUndo, canRedo } = useFlyer();

  const handleUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png,image/heic';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          dispatch({ type: 'SET_CONTENT', payload: { image: ev.target?.result as string } });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <TooltipProvider delayDuration={300}>
      <header className="h-[60px] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-4 z-10 shrink-0 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 via-pink-500 to-orange-500 flex items-center justify-center shadow-md">
            <img src="/assets/crowdcall-logo.png" alt="CROWDCall" className="h-5 w-auto object-contain brightness-0 invert" />
          </div>
          <div>
            <span className="text-slate-800 font-bold text-lg tracking-tight block gradient-text">CROWDCall</span>
            <span className="text-[9px] text-slate-400 hidden md:inline">by 939PRO STUDIO</span>
          </div>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleUpload} className="btn-icon" title="Upload image">
                <Upload size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-800 text-white text-2xs border-none rounded-lg">
              Upload your own image
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={undo} disabled={!canUndo} className="btn-icon disabled:opacity-40 disabled:cursor-not-allowed" title="Undo">
                <Undo2 size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-800 text-white text-2xs border-none rounded-lg">
              Undo
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={redo} disabled={!canRedo} className="btn-icon disabled:opacity-40 disabled:cursor-not-allowed" title="Redo">
                <Redo2 size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-800 text-white text-2xs border-none rounded-lg">
              Redo
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => dispatch({ type: 'SET_MODAL', modal: 'fullscreen' })} className="btn-icon" title="Fullscreen">
                <Maximize2 size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-800 text-white text-2xs border-none rounded-lg">
              View in full screen
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => dispatch({ type: 'SET_SHOW_HELP', show: true })} className="btn-icon" title="Help">
                <HelpCircle size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-slate-800 text-white text-2xs border-none rounded-lg">
              Help
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  );
}
