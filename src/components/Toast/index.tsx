import * as React from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

/**
 * Toast notification types
 * - success: Green toast for successful operations
 * - error: Red toast for error messages
 * - warning: Orange toast for warning messages
 * - info: Dark toast for informational messages
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Toast component props interface
 */
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Type of toast notification
   * Determines the color scheme and icon
   * @default "success"
   */
  type?: ToastType;

  /**
   * Message text to display in the toast
   */
  message: string;

  /**
   * Callback function when close button is clicked
   * If not provided, close button will not be rendered
   */
  onClose?: () => void;

  /**
   * Additional CSS classes for custom styling
   */
  className?: string;
}

/**
 * Style configuration for each toast type
 * Based on Figma design specifications
 */
const TOAST_STYLES: Record<
  ToastType,
  {
    background: string;
    textColor: string;
    iconColor: string;
    shadow: string;
  }
> = {
  success: {
    background: 'bg-[#e6f8ef]',
    textColor: 'text-[#00995a]',
    iconColor: 'text-[#00995a]',
    shadow: 'shadow-[2px_2px_8px_0px_rgba(0,153,90,0.25)]',
  },
  error: {
    background: 'bg-[#ffecf0]',
    textColor: 'text-[#d4002c]',
    iconColor: 'text-[#d4002c]',
    shadow: 'shadow-[2px_2px_8px_0px_rgba(212,0,44,0.25)]',
  },
  warning: {
    background: 'bg-[#fff3e8]',
    textColor: 'text-[#d48620]',
    iconColor: 'text-[#d48620]',
    shadow: 'shadow-[2px_2px_8px_0px_rgba(212,134,32,0.25)]',
  },
  info: {
    background: 'bg-[#363636]',
    textColor: 'text-white',
    iconColor: 'text-white',
    shadow: 'shadow-[2px_2px_8px_0px_rgba(54,54,54,0.25)]',
  },
};

/**
 * Returns the appropriate icon component based on toast type
 * @param type - The type of toast
 * @param className - CSS classes to apply to the icon
 * @returns React node containing the icon
 */
const getToastIcon = (type: ToastType, className: string): React.ReactNode => {
  const iconSize = 16;

  switch (type) {
    case 'success':
      return <CheckCircle size={iconSize} className={className} />;
    case 'error':
      return <XCircle size={iconSize} className={className} />;
    case 'warning':
    case 'info':
      return <AlertCircle size={iconSize} className={className} />;
    default:
      return <CheckCircle size={iconSize} className={className} />;
  }
};

/**
 * Toast Component
 *
 * A notification component that displays temporary messages to users.
 * Supports 4 variants: success, error, warning, and info.
 *
 * Design specifications from Figma:
 * - Padding: 12px horizontal, 16px vertical
 * - Gap: 12px between elements
 * - Border radius: 4px
 * - Icon size: 16px
 * - Close button size: 12px
 *
 * @example
 * ```tsx
 * <Toast
 *   type="success"
 *   message="Operation completed successfully"
 *   onClose={() => console.log('Toast closed')}
 * />
 * ```
 */
const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ type = 'success', message, onClose, className, ...props }, ref) => {
    // Get styles for the current toast type
    const styles = TOAST_STYLES[type];

    return (
      <div
        ref={ref}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        className={cn(
          // Base styles
          'flex items-center gap-3',
          // Padding: 12px horizontal (px-3), 16px vertical (py-4)
          'px-3 py-4',
          // Border radius: 4px
          'rounded',
          // Type-specific styles
          styles.background,
          styles.shadow,
          className
        )}
        data-testid="toast"
        data-toast-type={type}
        {...props}
      >
        {/* Body: Icon + Message */}
        <div className="flex items-center gap-2">
          {/* Icon */}
          <div className="flex-shrink-0" data-testid="toast-icon">
            {getToastIcon(type, styles.iconColor)}
          </div>

          {/* Message text */}
          <p
            className={cn(
              'text-base leading-5 whitespace-nowrap',
              styles.textColor
            )}
            data-testid="toast-message"
          >
            {message}
          </p>
        </div>

        {/* Close button - only rendered if onClose is provided */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'flex-shrink-0 cursor-pointer',
              'hover:opacity-80 transition-opacity',
              styles.iconColor
            )}
            aria-label="Close notification"
            data-testid="toast-close-button"
          >
            <X size={12} />
          </button>
        )}
      </div>
    );
  }
);

// Display name for React DevTools
Toast.displayName = 'Toast';

export { Toast };
export default Toast;

// Re-export other toast-related components and hooks
export { ToastContainer, type ToastContainerProps } from './ToastContainer';
export { ToastProvider, useToastContext, type ToastProviderProps, type ToastContextValue } from './ToastProvider';
export { useToast, type ToastItem, type ShowToastOptions, type UseToastReturn } from './useToast';
