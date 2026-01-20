import * as React from 'react';
import { Toast } from './index';
import { ToastItem } from './useToast';
import { cn } from '../../lib/utils';

/**
 * Props interface for ToastContainer component
 */
export interface ToastContainerProps {
  /**
   * Array of toast items to render
   */
  toasts: ToastItem[];

  /**
   * Callback function when a toast is closed
   * @param id - ID of the toast being closed
   */
  onClose: (id: string) => void;

  /**
   * Additional CSS classes for the container
   */
  className?: string;
}

/**
 * CSS Keyframe animations for toast enter/exit
 * Injected as a style tag for animation support
 */
const toastAnimationStyles = `
  @keyframes toast-slide-in {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes toast-slide-out {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }

  .toast-enter {
    animation: toast-slide-in 0.3s ease-out forwards;
  }

  .toast-exit {
    animation: toast-slide-out 0.3s ease-in forwards;
  }
`;

/**
 * ToastContainer Component
 *
 * A container component responsible for positioning and rendering toast notifications.
 * Renders toasts in a fixed position at the top-right corner of the viewport.
 *
 * Positioning (as per requirements):
 * - Position: fixed
 * - Top: 5vh (5% of viewport height)
 * - Right: 2vw (2% of viewport width)
 * - Z-index: 9999 (renders above all other content)
 *
 * Animation:
 * - Enter: Slides in from the right (300ms ease-out)
 * - Exit: Slides out to the right (300ms ease-in)
 *
 * Features:
 * - Stacks multiple toasts vertically with 12px gap
 * - Renders toasts in order (newest at bottom)
 * - Passes close handler to each toast
 * - Smooth enter/exit animations
 *
 * @example
 * ```tsx
 * const { toasts, hideToast } = useToast();
 *
 * <ToastContainer
 *   toasts={toasts}
 *   onClose={hideToast}
 * />
 * ```
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
  className,
}) => {
  // Don't render container if no toasts
  if (toasts.length === 0) {
    return null;
  }

  return (
    <>
      {/* Inject animation styles */}
      <style>{toastAnimationStyles}</style>
      
      <div
        className={cn(
          // Fixed positioning at top-right corner
          'fixed',
          'top-[5vh] right-[2vw]',
          // High z-index to render above everything
          'z-[9999]',
          // Flex column layout for stacking toasts
          'flex flex-col gap-3',
          // Pointer events only on children
          'pointer-events-none',
          className
        )}
        data-testid="toast-container"
        aria-label="Notifications"
        role="region"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              'pointer-events-auto',
              // Apply enter or exit animation based on state
              toast.isExiting ? 'toast-exit' : 'toast-enter'
            )}
            data-testid={`toast-wrapper-${toast.id}`}
          >
            <Toast
              type={toast.type}
              message={toast.message}
              onClose={() => onClose(toast.id)}
            />
          </div>
        ))}
      </div>
    </>
  );
};

// Display name for React DevTools
ToastContainer.displayName = 'ToastContainer';

export default ToastContainer;
