import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { FlyerContent, EditorMode, QuickTab, ModalType, ZoomLevel, SelectedElement, ToastMessage } from "@/types";
import { initialContent } from "@/types";
import { extractColorIdsFromTemplate } from "@/lib/colorUtils";

interface HistoryEntry {
  content: FlyerContent;
  actionName: string;
}

interface FlyerState {
  content: FlyerContent;
  editorMode: EditorMode;
  quickTab: QuickTab;
  activeModal: ModalType | null;
  zoom: ZoomLevel;
  selectedElement: SelectedElement | null;
  showHelp: boolean;
  toast: ToastMessage | null;
  undoStack: HistoryEntry[];
  redoStack: HistoryEntry[];
  isUndoing: boolean;
  setContent: (payload: Partial<FlyerContent>) => void;
  setEditorMode: (mode: EditorMode) => void;
  setQuickTab: (tab: QuickTab) => void;
  setModal: (modal: ModalType | null) => void;
  setZoom: (zoom: ZoomLevel) => void;
  setSelectedElement: (element: SelectedElement | null) => void;
  setShowHelp: (show: boolean) => void;
  setToast: (toast: ToastMessage | null) => void;
  applyTemplate: (template: any) => void;
  resetFlyer: () => void;
  pushHistory: (content: FlyerContent, actionName: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const serializeContent = (content: FlyerContent): FlyerContent => {
  try {
    return structuredClone(content);
  } catch (e) {
    console.warn("Failed to clone content, using JSON fallback:", e);
    return JSON.parse(JSON.stringify(content));
  }
};

export const useFlyerStore = create<FlyerState>()(
  persist(
    (set, get) => ({
      content: { ...initialContent },
      editorMode: "quick",
      quickTab: "content",
      activeModal: null,
      zoom: 1,
      selectedElement: null,
      showHelp: false,
      toast: null,
      undoStack: [],
      redoStack: [],
      isUndoing: false,
      setContent: (payload) => {
        const newState = { ...get().content, ...payload };
        get().pushHistory(newState, "Content updated");
        set({ content: newState });
      },
      setEditorMode: (mode) => set({ editorMode: mode }),
      setQuickTab: (tab) => set({ quickTab: tab }),
      setModal: (modal) => set({ activeModal: modal }),
      setZoom: (zoom) => set({ zoom }),
      setSelectedElement: (element) => set({ selectedElement: element }),
      setShowHelp: (show) => set({ showHelp: show }),
      setToast: (toast) => set({ toast }),
      applyTemplate: (template) => {
        const { themeColorId, accentColorId } = extractColorIdsFromTemplate(template);
        const newContent = {
          ...get().content,
          title: template.defaultTitle,
          subtitle: template.defaultSubtitle,
          date: template.defaultDate,
          time: template.defaultTime,
          location: template.defaultLocation,
          themeColorId,
          accentColorId,
          fontId: template.fontId,
          templateId: template.id,
        };
        get().pushHistory(newContent, `Applied template: ${template.name}`);
        set({ content: newContent });
      },
      resetFlyer: () => {
        set({
          content: { ...initialContent },
          activeModal: null,
          selectedElement: null,
          undoStack: [],
          redoStack: [],
        });
      },
      pushHistory: (content, actionName) => {
        const { isUndoing, undoStack } = get();
        if (isUndoing) return;
        const serializedContent = serializeContent(content);
        const newUndoStack = [...undoStack, { content: serializedContent, actionName }];
        if (newUndoStack.length > 50) newUndoStack.shift();
        set({ undoStack: newUndoStack, redoStack: [] });
      },
      undo: () => {
        const { undoStack, isUndoing, content } = get();
        if (undoStack.length === 0) return;
        const currentEntry = undoStack[undoStack.length - 1];
        const newUndoStack = undoStack.slice(0, -1);
        const serializedContent = serializeContent(content);
        const newRedoStack = [...get().redoStack, { content: serializedContent, actionName: currentEntry.actionName }];
        set({ isUndoing: true, undoStack: newUndoStack, redoStack: newRedoStack, content: currentEntry.content });
        setTimeout(() => set({ isUndoing: false }), 0);
      },
      redo: () => {
        const { redoStack, isUndoing, content } = get();
        if (redoStack.length === 0) return;
        const entry = redoStack[redoStack.length - 1];
        const newRedoStack = redoStack.slice(0, -1);
        const serializedContent = serializeContent(content);
        const newUndoStack = [...get().undoStack, { content: serializedContent, actionName: entry.actionName }];
        set({ isUndoing: true, undoStack: newUndoStack, redoStack: newRedoStack, content: entry.content });
        setTimeout(() => set({ isUndoing: false }), 0);
      },
      canUndo: () => get().undoStack.length > 0,
      canRedo: () => get().redoStack.length > 0,
    }),
    {
      name: "crowdcall-flyer-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        content: state.content,
        editorMode: state.editorMode,
        quickTab: state.quickTab,
        zoom: state.zoom,
        showHelp: state.showHelp,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) console.log("Flyer state rehydrated from localStorage");
      },
    }
  )
);

export const useFlyer = () => {
  const store = useFlyerStore();
  return {
    state: {
      content: store.content,
      editorMode: store.editorMode,
      quickTab: store.quickTab,
      activeModal: store.activeModal,
      zoom: store.zoom,
      selectedElement: store.selectedElement,
      showHelp: store.showHelp,
      toast: store.toast,
    },
    dispatch: (action: any) => {
      switch (action.type) {
        case "SET_CONTENT": store.setContent(action.payload); break;
        case "SET_EDITOR_MODE": store.setEditorMode(action.mode); break;
        case "SET_QUICK_TAB": store.setQuickTab(action.tab); break;
        case "SET_MODAL": store.setModal(action.modal); break;
        case "SET_ZOOM": store.setZoom(action.zoom); break;
        case "SET_SELECTED_ELEMENT": store.setSelectedElement(action.element); break;
        case "SET_SHOW_HELP": store.setShowHelp(action.show); break;
        case "SET_TOAST": store.setToast(action.toast); break;
        case "APPLY_TEMPLATE": store.applyTemplate(action.template); break;
        case "RESET_FLYER": store.resetFlyer(); break;
      }
    },
    undo: store.undo,
    redo: store.redo,
    canUndo: store.canUndo(),
    canRedo: store.canRedo(),
    pushHistory: store.pushHistory,
  };
};

export default useFlyerStore;
