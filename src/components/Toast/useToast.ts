import { useState, useCallback, useRef, useEffect } from 'react';
import { ToastType } from './index';

/**
 * Interface for a single toast item
 */
export interface ToastItem {
  /**
   * Unique identifier for the toast
   */
  id: string;

  /**
   * Message to display in the toast
   */
  message: string;

  /**
   * Type of toast (success, error, warning, info)
   */
  type: ToastType;

  /**
   * Duration in milliseconds before auto-dismiss
   * If undefined, toast won't auto-dismiss
   */
  duration?: number;

  /**
   * Whether the toast is in the process of exiting
   * Used for exit animations
   */
  isExiting?: boolean;
}

/**
 * Options for showing a toast
 */
export interface ShowToastOptions {
  /**
   * Type of toast notification
   * @default "success"
   */
  type?: ToastType;

  /**
   * Duration in milliseconds before auto-dismiss
   * Set to 0 or undefined to disable auto-dismiss
   * @default 5000
   */
  duration?: number;
}

/**
 * Return type for the useToast hook
 */
export interface UseToastReturn {
  /**
   * Array of currently active toasts
   */
  toasts: ToastItem[];

  /**
   * Function to show a new toast
   * @param message - Message to display
   * @param options - Optional configuration (type, duration)
   * @returns The ID of the created toast
   */
  showToast: (message: string, options?: ShowToastOptions) => string;

  /**
   * Function to hide a specific toast by ID
   * @param id - ID of the toast to hide
   */
  hideToast: (id: string) => void;

  /**
   * Function to hide all toasts
   */
  hideAllToasts: () => void;
}

/**
 * Default duration for auto-dismiss in milliseconds
 */
const DEFAULT_DURATION = 5000;

/**
 * Duration of exit animation in milliseconds
 * Must match the CSS animation duration
 */
const EXIT_ANIMATION_DURATION = 300;

/**
 * Generates a unique ID for each toast
 * Uses timestamp and random string for uniqueness
 * @returns A unique string ID
 */
const generateToastId = (): string => {
  return `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * useToast Hook
 *
 * A custom hook for managing toast notifications state.
 * Provides functions to show, hide, and manage multiple toasts.
 *
 * Features:
 * - Show toasts with different types (success, error, warning, info)
 * - Auto-dismiss after configurable duration
 * - Support for multiple simultaneous toasts
 * - Manual dismiss functionality
 *
 * @example
 * ```tsx
 * const { toasts, showToast, hideToast } = useToast();
 *
 * // Show a success toast
 * const id = showToast('Operation successful', { type: 'success' });
 *
 * // Show an error toast with custom duration
 * showToast('Something went wrong', { type: 'error', duration: 10000 });
 *
 * // Manually hide a toast
 * hideToast(id);
 * ```
 *
 * @returns {UseToastReturn} Object containing toasts array and control functions
 */
export const useToast = (): UseToastReturn => {
  // State to store active toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Ref to store timeout IDs for cleanup
  const timeoutRefs = useRef<Map<string, NodeJS.Timeout>>(new Map());

  /**
   * Clears the timeout for a specific toast
   * @param id - Toast ID to clear timeout for
   */
  const clearToastTimeout = useCallback((id: string) => {
    const timeout = timeoutRefs.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutRefs.current.delete(id);
    }
  }, []);

  /**
   * Removes a toast from state immediately (without animation)
   * Used internally after exit animation completes
   */
  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  /**
   * Hides a specific toast by its ID with exit animation
   * Sets isExiting to true, waits for animation, then removes
   */
  const hideToast = useCallback(
    (id: string) => {
      // Clear the auto-dismiss timeout if exists
      clearToastTimeout(id);

      // Set isExiting to true to trigger exit animation
      setToasts((prevToasts) =>
        prevToasts.map((toast) =>
          toast.id === id ? { ...toast, isExiting: true } : toast
        )
      );

      // Remove toast after animation completes
      setTimeout(() => {
        removeToast(id);
      }, EXIT_ANIMATION_DURATION);
    },
    [clearToastTimeout, removeToast]
  );

  /**
   * Shows a new toast notification
   * @param message - Message to display
   * @param options - Optional configuration
   * @returns The ID of the created toast
   */
  const showToast = useCallback(
    (message: string, options?: ShowToastOptions): string => {
      const id = generateToastId();
      const type = options?.type ?? 'success';
      const duration = options?.duration ?? DEFAULT_DURATION;

      // Create new toast item
      const newToast: ToastItem = {
        id,
        message,
        type,
        duration,
      };

      // Add toast to state
      setToasts((prevToasts) => [...prevToasts, newToast]);

      // Set up auto-dismiss if duration is specified
      if (duration && duration > 0) {
        const timeout = setTimeout(() => {
          hideToast(id);
        }, duration);

        // Store timeout reference for cleanup
        timeoutRefs.current.set(id, timeout);
      }

      return id;
    },
    [hideToast]
  );

  /**
   * Hides all active toasts
   * Clears all timeouts
   */
  const hideAllToasts = useCallback(() => {
    // Clear all timeouts
    timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
    timeoutRefs.current.clear();

    // Clear all toasts
    setToasts([]);
  }, []);

  /**
   * Cleanup effect - clears all timeouts when component unmounts
   */
  useEffect(() => {
    return () => {
      // Cleanup all timeouts on unmount
      timeoutRefs.current.forEach((timeout) => clearTimeout(timeout));
      timeoutRefs.current.clear();
    };
  }, []);

  return {
    toasts,
    showToast,
    hideToast,
    hideAllToasts,
  };
};

export default useToast;
