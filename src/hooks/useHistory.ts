import { useRef, useCallback } from 'react';

export interface UseHistoryOptions {
  maxHistory?: number;
}

export interface useHistoryReturn<T> {
  push: (state: T) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  clear: () => void;
}

/**
 * Composable history management hook for undo/redo functionality.
 * Supports any state type and provides clean separation of concerns.
 * 
 * @param currentState - Current state value
 * @param setState - State setter function
 * @param options - Configuration options (maxHistory length)
 * @returns History control methods and status flags
 */
export function useHistory<T>(
  currentState: T,
  setState: (state: T) => void,
  options: UseHistoryOptions = {}
): useHistoryReturn<T> {
  const { maxHistory = 50 } = options;
  
  // Use refs to avoid re-renders when history changes
  const historyRef = useRef<T[]>([]);
  const redoRef = useRef<T[]>([]);
  const isUndoing = useRef(false);
  const initialized = useRef(false);

  // Initialize with current state if not already done
  if (!initialized.current) {
    historyRef.current = [];
    redoRef.current = [];
    initialized.current = true;
  }

  const push = useCallback((state: T) => {
    if (isUndoing.current) return;
    
    // Deep clone to prevent reference issues
    const clonedState = structuredClone(state);
    historyRef.current.push(clonedState);
    
    // Trim history if exceeds max
    if (historyRef.current.length > maxHistory) {
      historyRef.current.shift();
    }
    
    // Clear redo stack on new action
    redoRef.current = [];
  }, [maxHistory]);

  const undo = useCallback(() => {
    if (historyRef.current.length === 0) return;
    
    isUndoing.current = true;
    
    const previous = historyRef.current.pop()!;
    redoRef.current.push(structuredClone(currentState));
    
    setState(previous);
    
    // Reset flag after React processes the update
    setTimeout(() => {
      isUndoing.current = false;
    }, 0);
  }, [currentState, setState]);

  const redo = useCallback(() => {
    if (redoRef.current.length === 0) return;
    
    isUndoing.current = true;
    
    const next = redoRef.current.pop()!;
    historyRef.current.push(structuredClone(currentState));
    
    setState(next);
    
    setTimeout(() => {
      isUndoing.current = false;
    }, 0);
  }, [currentState, setState]);

  const clear = useCallback(() => {
    historyRef.current = [];
    redoRef.current = [];
  }, []);

  return {
    push,
    undo,
    redo,
    canUndo: historyRef.current.length > 0,
    canRedo: redoRef.current.length > 0,
    clear,
  };
}
