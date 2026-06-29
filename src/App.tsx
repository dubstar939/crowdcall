import { useState, useRef, useEffect } from 'react';
import { FlyerProvider, useFlyer } from '@/store/flyerStore';
import Header from '@/components/Header';
import FlyerCanvas, { FlyerCanvasRef } from '@/components/FlyerCanvas';
import ControlPanel from '@/components/ControlPanel';
import BottomBar from '@/components/BottomBar';
import TemplateModal from '@/components/TemplateModal';
import DownloadModal from '@/components/DownloadModal';
import ShareModal from '@/components/ShareModal';
import FullscreenView from '@/components/FullscreenView';
import Toast from '@/components/Toast';
import './App.css';

function MobileControlSheet() {
  const { state, dispatch } = useFlyer();
  const [isOpen, setIsOpen] = useState(false);

  // Only render on mobile - use media query listener instead of window check in render
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!isMobile) return null;

  return (
    <>
      {/* Tab Bar */}
      <div className="md:hidden fixed bottom-14 left-0 right-0 bg-white border-t border-[#EEEEEE] z-20 flex">
        <button
          className="flex-1 py-3 text-sm font-medium transition-all"
          style={{
            color: state.quickTab === 'content' && state.editorMode === 'quick' ? '#000' : '#999',
            fontWeight: state.quickTab === 'content' && state.editorMode === 'quick' ? 700 : 500,
            borderBottom: state.quickTab === 'content' && state.editorMode === 'quick' ? '2px solid #F7FF58' : '2px solid transparent',
          }}
          onClick={() => {
            dispatch({ type: 'SET_EDITOR_MODE', mode: 'quick' });
            dispatch({ type: 'SET_QUICK_TAB', tab: 'content' });
            setIsOpen(true);
          }}
        >
          Content
        </button>
        <button
          className="flex-1 py-3 text-sm font-medium transition-all"
          style={{
            color: state.quickTab === 'design' && state.editorMode === 'quick' ? '#000' : '#999',
            fontWeight: state.quickTab === 'design' && state.editorMode === 'quick' ? 700 : 500,
            borderBottom: state.quickTab === 'design' && state.editorMode === 'quick' ? '2px solid #F7FF58' : '2px solid transparent',
          }}
          onClick={() => {
            dispatch({ type: 'SET_EDITOR_MODE', mode: 'quick' });
            dispatch({ type: 'SET_QUICK_TAB', tab: 'design' });
            setIsOpen(true);
          }}
        >
          Design
        </button>
        <button
          className="flex-1 py-3 text-sm font-medium transition-all"
          style={{
            color: state.editorMode === 'advanced' ? '#000' : '#999',
            fontWeight: state.editorMode === 'advanced' ? 700 : 500,
            borderBottom: state.editorMode === 'advanced' ? '2px solid #F7FF58' : '2px solid transparent',
          }}
          onClick={() => {
            dispatch({ type: 'SET_EDITOR_MODE', mode: 'advanced' });
            setIsOpen(true);
          }}
        >
          Advanced
        </button>
      </div>

      {/* Sheet */}
      {isOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="md:hidden fixed bottom-[120px] left-0 right-0 bg-[#FAFAFA] rounded-t-2xl z-40 max-h-[60vh] overflow-y-auto shadow-xl animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 bg-[#CCCCCC] rounded-full" />
            </div>
            <ControlPanel />
          </div>
        </>
      )}
    </>
  );
}

function AppContent() {
  const { state } = useFlyer();
  const canvasRef = useRef<FlyerCanvasRef>(null);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ background: 'var(--color-bg-gradient)' }}>
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas Area */}
        <FlyerCanvas ref={canvasRef} />

        {/* Control Panel - Desktop only */}
        <div className="hidden md:block">
          <ControlPanel />
        </div>
      </div>

      {/* Bottom Bar */}
      <BottomBar />

      {/* Modals */}
      {state.activeModal === 'template' && <TemplateModal />}
      {state.activeModal === 'download' && <DownloadModal canvasRef={canvasRef} />}
      {state.activeModal === 'share' && <ShareModal />}
      {state.activeModal === 'fullscreen' && <FullscreenView />}

      {/* Toast */}
      <Toast />

      {/* Mobile Control Panel - Bottom sheet */}
      <MobileControlSheet />
    </div>
  );
}

export default function App() {
  return (
    <FlyerProvider>
      <AppContent />
    </FlyerProvider>
  );
}
