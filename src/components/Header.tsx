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
      <header className="h-[50px] bg-[#4D4D4D] flex items-center justify-between px-4 z-10 shrink-0 select-none">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/assets/crowdcall-logo.png" alt="CROWDCall" className="h-7 w-auto object-contain" />
          <span className="text-white font-bold text-lg tracking-tight hidden sm:inline">CROWDCall</span>
          <span className="text-[10px] text-white/50 ml-1 hidden md:inline">by 939PRO STUDIO</span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={handleUpload} className="btn-icon">
                <Upload size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-black text-white text-2xs border-none">
              Upload your own image
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={undo} disabled={!canUndo} className="btn-icon disabled:opacity-40 disabled:cursor-not-allowed">
                <Undo2 size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-black text-white text-2xs border-none">
              Undo
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={redo} disabled={!canRedo} className="btn-icon disabled:opacity-40 disabled:cursor-not-allowed">
                <Redo2 size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-black text-white text-2xs border-none">
              Redo
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => dispatch({ type: 'SET_MODAL', modal: 'fullscreen' })} className="btn-icon">
                <Maximize2 size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-black text-white text-2xs border-none">
              View in full screen
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button onClick={() => dispatch({ type: 'SET_SHOW_HELP', show: true })} className="btn-icon">
                <HelpCircle size={20} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-black text-white text-2xs border-none">
              Help
            </TooltipContent>
          </Tooltip>
        </div>
      </header>
    </TooltipProvider>
  );
}
