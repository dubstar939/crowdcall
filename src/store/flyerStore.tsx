import React, { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import type {
  FlyerState,
  FlyerAction,
  FlyerContent,
} from '@/types';
import { initialContent } from '@/types';
import { extractColorIdsFromTemplate } from '@/lib/colorUtils';

interface HistoryEntry {
  content: FlyerContent;
  actionName: string;
}

interface FlyerContextValue {
  state: FlyerState;
  dispatch: React.Dispatch<FlyerAction>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  pushHistory: (content: FlyerContent, actionName: string) => void;
}

const FlyerContext = createContext<FlyerContextValue | null>(null);

function flyerReducer(state: FlyerState, action: FlyerAction): FlyerState {
  switch (action.type) {
    case 'SET_CONTENT':
      return { ...state, content: { ...state.content, ...action.payload } };
    case 'SET_EDITOR_MODE':
      return { ...state, editorMode: action.mode };
    case 'SET_QUICK_TAB':
      return { ...state, quickTab: action.tab };
    case 'SET_MODAL':
      return { ...state, activeModal: action.modal };
    case 'SET_ZOOM':
      return { ...state, zoom: action.zoom };
    case 'SET_SELECTED_ELEMENT':
      return { ...state, selectedElement: action.element };
    case 'SET_SHOW_HELP':
      return { ...state, showHelp: action.show };
    case 'SET_TOAST':
      return { ...state, toast: action.toast };
    case 'APPLY_TEMPLATE': {
      const t = action.template;
      const { themeColorId, accentColorId } = extractColorIdsFromTemplate(t);
      return {
        ...state,
        content: {
          ...state.content,
          title: t.defaultTitle,
          subtitle: t.defaultSubtitle,
          date: t.defaultDate,
          time: t.defaultTime,
          location: t.defaultLocation,
          themeColorId,
          accentColorId,
          fontId: t.fontId,
          templateId: t.id,
        },
      };
    }
    case 'RESET_FLYER':
      return {
        ...state,
        content: { ...initialContent },
        activeModal: null,
        selectedElement: null,
      };
    default:
      return state;
  }
}

const initialState: FlyerState = {
  content: { ...initialContent },
  editorMode: 'quick',
  quickTab: 'content',
  activeModal: null,
  zoom: 1,
  selectedElement: null,
  showHelp: false,
  toast: null,
};

export function FlyerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(flyerReducer, initialState);
  const undoStack = useRef<HistoryEntry[]>([]);
  const redoStack = useRef<HistoryEntry[]>([]);
  const isUndoing = useRef(false);

  const pushHistory = useCallback((content: FlyerContent, actionName: string) => {
    if (isUndoing.current) return;
    undoStack.current.push({ content: structuredClone(content), actionName });
    if (undoStack.current.length > 50) undoStack.current.shift();
    redoStack.current = [];
  }, []);

  const undo = useCallback(() => {
    if (undoStack.current.length === 0) return;
    isUndoing.current = true;
    const currentEntry = undoStack.current.pop()!;
    redoStack.current.push({ content: structuredClone(state.content), actionName: currentEntry.actionName });
    dispatch({ type: 'SET_CONTENT', payload: currentEntry.content });
    setTimeout(() => { isUndoing.current = false; }, 0);
  }, [state.content]);

  const redo = useCallback(() => {
    if (redoStack.current.length === 0) return;
    isUndoing.current = true;
    const entry = redoStack.current.pop()!;
    undoStack.current.push({ content: structuredClone(state.content), actionName: entry.actionName });
    dispatch({ type: 'SET_CONTENT', payload: entry.content });
    setTimeout(() => { isUndoing.current = false; }, 0);
  }, [state.content]);

  const canUndo = undoStack.current.length > 0;
  const canRedo = redoStack.current.length > 0;

  // Auto-save to localStorage every 30 seconds (reduced from 3s for less intrusive saves)
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        localStorage.setItem('crowdcall-autosave', JSON.stringify(state.content));
        // Silent save - no toast notification to avoid being intrusive
      } catch (e) {
        // Handle localStorage quota exceeded scenarios
        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          console.warn('localStorage quota exceeded. Consider clearing old data.');
        } else {
          console.warn('Failed to auto-save:', e);
        }
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [state.content]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('crowdcall-autosave');
      if (saved) {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'SET_CONTENT', payload: parsed });
      }
    } catch (e) {
      // Handle parse errors and corrupted data
      console.warn('Failed to load saved flyer data:', e);
      // Optionally clear corrupted data
      try {
        localStorage.removeItem('crowdcall-autosave');
      } catch (removeErr) {
        console.warn('Failed to remove corrupted data:', removeErr);
      }
    }
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undo();
      }
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        redo();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        dispatch({ type: 'SET_MODAL', modal: 'download' });
      }
      if (e.key === 'Escape') {
        if (state.activeModal) {
          dispatch({ type: 'SET_MODAL', modal: null });
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, state.activeModal]);

  return (
    <FlyerContext.Provider value={{ state, dispatch, undo, redo, canUndo, canRedo, pushHistory }}>
      {children}
    </FlyerContext.Provider>
  );
}

export function useFlyer(): FlyerContextValue {
  const ctx = useContext(FlyerContext);
  if (!ctx) throw new Error('useFlyer must be used within FlyerProvider');
  return ctx;
}
