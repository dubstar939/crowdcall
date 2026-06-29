import { useState } from 'react';
import { X, Download, Image as ImageIcon, FileImage } from 'lucide-react';
import { useFlyer } from '@/store/flyerStore';
import { Slider } from '@/components/ui/slider';
import { type FlyerCanvasRef } from '@/components/FlyerCanvas';

interface DownloadModalProps {
  canvasRef: React.RefObject<FlyerCanvasRef | null>;
}

export default function DownloadModal({ canvasRef }: DownloadModalProps) {
  const { dispatch } = useFlyer();
  const [format, setFormat] = useState<'png' | 'jpg'>('png');
  const [quality, setQuality] = useState([90]);
  const [fileName, setFileName] = useState('crowdcall-flyer');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      // Use the ref passed from FlyerCanvas instead of querying DOM
      const canvasElement = canvasRef.current?.getElement();
      
      if (!canvasElement) {
        throw new Error('Canvas element not found');
      }

      const html2canvas = (await import('html2canvas-pro')).default;
      const canvas = await html2canvas(canvasElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
      });
      
      const link = document.createElement('a');
      link.download = `${fileName}.${format}`;
      link.href = canvas.toDataURL(format === 'png' ? 'image/png' : 'image/jpeg', quality[0] / 100);
      link.click();
      
      dispatch({ type: 'SET_TOAST', toast: { message: 'Download started!', visible: true } });
      setTimeout(() => dispatch({ type: 'SET_TOAST', toast: null }), 2000);
      dispatch({ type: 'SET_MODAL', modal: null });
    } catch (err) {
      console.error('Download error:', err);
      dispatch({ type: 'SET_TOAST', toast: { message: 'Download failed. Please try again.', visible: true } });
      setTimeout(() => dispatch({ type: 'SET_TOAST', toast: null }), 3000);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
      onClick={() => dispatch({ type: 'SET_MODAL', modal: null })}
    >
      <div
        className="bg-white rounded-2xl w-[420px] max-w-[95vw] p-6 animate-in fade-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-5 border-b border-[#EEEEEE] pb-4">
          <h2 className="text-xl font-bold">Download Flyer</h2>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#F5F5F5] transition-colors"
            onClick={() => dispatch({ type: 'SET_MODAL', modal: null })}
          >
            <X size={20} />
          </button>
        </div>

        {/* Format Selection */}
        <div className="mb-5">
          <h3 className="text-sm font-bold mb-3">Format</h3>
          <div className="flex gap-3">
            <button
              className="flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2"
              style={{
                borderColor: format === 'png' ? '#F7FF58' : '#EEEEEE',
                backgroundColor: format === 'png' ? 'rgba(247,255,88,0.1)' : 'transparent',
              }}
              onClick={() => setFormat('png')}
            >
              <FileImage size={32} className="text-[#333]" />
              <span className="text-sm font-bold">PNG</span>
              <span className="text-2xs text-[#666]">Best quality</span>
            </button>
            <button
              className="flex-1 p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2"
              style={{
                borderColor: format === 'jpg' ? '#F7FF58' : '#EEEEEE',
                backgroundColor: format === 'jpg' ? 'rgba(247,255,88,0.1)' : 'transparent',
              }}
              onClick={() => setFormat('jpg')}
            >
              <ImageIcon size={32} className="text-[#333]" />
              <span className="text-sm font-bold">JPG</span>
              <span className="text-2xs text-[#666]">Smaller file</span>
            </button>
          </div>
        </div>

        {/* Quality Slider (JPG only) */}
        {format === 'jpg' && (
          <div className="mb-5 animate-in slide-in-from-top-2 duration-200">
            <h3 className="text-sm font-bold mb-2">Quality</h3>
            <Slider
              value={quality}
              onValueChange={setQuality}
              min={10}
              max={100}
              step={10}
              className="mb-1"
            />
            <div className="flex justify-between">
              <span className="text-2xs text-[#999]">Low</span>
              <span className="text-xs font-bold">{quality[0]}%</span>
              <span className="text-2xs text-[#999]">High</span>
            </div>
          </div>
        )}

        {/* File Name */}
        <div className="mb-5">
          <label className="text-xs font-bold mb-1 block">File name</label>
          <input
            className="input-field w-full"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            placeholder="crowdcall-flyer"
          />
          <span className="text-2xs text-[#999] mt-1 block">.{format} will be added automatically</span>
        </div>

        {/* Download Button */}
        <button
          className="btn-primary w-full py-3 text-sm flex items-center justify-center gap-2"
          onClick={handleDownload}
          disabled={isDownloading}
        >
          {isDownloading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Downloading...</span>
            </>
          ) : (
            <>
              <Download size={18} />
              <span>Download</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
