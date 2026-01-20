import * as React from 'react';
import { createContext, useContext, ReactNode } from 'react';
import { useToast, UseToastReturn, ShowToastOptions } from './useToast';
import { ToastContainer } from './ToastContainer';

/**
 * Toast context value interface
 * Extends UseToastReturn for full hook functionality
 */
export interface ToastContextValue extends UseToastReturn {}

/**
 * Toast Context
 * Provides toast functionality throughout the application
 * Default value is undefined - must be used within ToastProvider
 */
const ToastContext = createContext<ToastContextValue | undefined>(undefined);

/**
 * Props interface for ToastProvider
 */
export interface ToastProviderProps {
  /**
   * Child components that will have access to toast context
   */
  children: ReactNode;
}

/**
 * ToastProvider Component
 *
 * A context provider that enables toast notifications throughout the application.
 * Wraps the application to provide global access to toast functionality.
 *
 * Features:
 * - Provides showToast, hideToast, hideAllToasts functions via context
 * - Automatically renders ToastContainer with all active toasts
 * - Manages toast state internally using useToast hook
 *
 * Usage:
 * 1. Wrap your application with ToastProvider
 * 2. Use useToastContext hook in any child component to show toasts
 *
 * @example
 * ```tsx
 * // In your app root
 * function App() {
 *   return (
 *     <ToastProvider>
 *       <YourApp />
 *     </ToastProvider>
 *   );
 * }
 *
 * // In any child component
 * function MyComponent() {
 *   const { showToast } = useToastContext();
 *
 *   return (
 *     <button onClick={() => showToast('Hello!', { type: 'success' })}>
 *       Show Toast
 *     </button>
 *   );
 * }
 * ```
 */
export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  // Initialize toast management hook
  const toastState = useToast();

  return (
    <ToastContext.Provider value={toastState}>
      {/* Render children with access to toast context */}
      {children}

      {/* Render toast container with all active toasts */}
      <ToastContainer toasts={toastState.toasts} onClose={toastState.hideToast} />
    </ToastContext.Provider>
  );
};

// Display name for React DevTools
ToastProvider.displayName = 'ToastProvider';

/**
 * useToastContext Hook
 *
 * A hook to access toast context from any component within ToastProvider.
 * Provides functions to show, hide, and manage toasts.
 *
 * @throws {Error} If used outside of ToastProvider
 * @returns {ToastContextValue} Object containing toast state and control functions
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { showToast, hideToast, hideAllToasts, toasts } = useToastContext();
 *
 *   const handleSuccess = () => {
 *     showToast('Operation completed!', { type: 'success', duration: 3000 });
 *   };
 *
 *   const handleError = () => {
 *     showToast('Something went wrong', { type: 'error' });
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleSuccess}>Success</button>
 *       <button onClick={handleError}>Error</button>
 *       <p>Active toasts: {toasts.length}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export const useToastContext = (): ToastContextValue => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error(
      'useToastContext must be used within a ToastProvider. ' +
        'Wrap your application with <ToastProvider> to use toast functionality.'
    );
  }

  return context;
};

export default ToastProvider;
