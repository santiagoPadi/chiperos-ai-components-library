import type { Meta, StoryObj } from '@storybook/react';
import { Toast, ToastProps, ToastType } from './index';
import { ToastProvider, useToastContext } from './ToastProvider';

/**
 * Storybook meta configuration for Toast component
 */
const meta: Meta<ToastProps> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
      description: 'Type of toast notification (determines color and icon)',
      table: {
        type: { summary: "'success' | 'error' | 'warning' | 'info'" },
        defaultValue: { summary: "'success'" },
      },
    },
    message: {
      control: 'text',
      description: 'Message text to display in the toast',
      table: {
        type: { summary: 'string' },
      },
    },
    onClose: {
      action: 'closed',
      description: 'Callback when close button is clicked. If omitted, close button is hidden.',
      table: {
        type: { summary: '() => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for custom styling',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<ToastProps>;

/**
 * Demo component for showing a single toast type
 * Renders a button that triggers the toast on click
 */
const SingleToastDemo = ({ type, message }: { type: ToastType; message: string }) => {
  const { showToast } = useToastContext();

  /**
   * Button color configuration for each toast type
   */
  const buttonColors: Record<ToastType, { bg: string; hover: string }> = {
    success: { bg: 'bg-[#00995a]', hover: 'hover:bg-[#007a48]' },
    error: { bg: 'bg-[#d4002c]', hover: 'hover:bg-[#a80023]' },
    warning: { bg: 'bg-[#d48620]', hover: 'hover:bg-[#b37019]' },
    info: { bg: 'bg-[#363636]', hover: 'hover:bg-[#1a1a1a]' },
  };

  /**
   * Handle button click - shows toast with 5 second duration
   */
  const handleClick = () => {
    showToast(message, { type, duration: 5000 });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <button
        onClick={handleClick}
        className={`
          px-6 py-3 
          ${buttonColors[type].bg} 
          ${buttonColors[type].hover}
          text-white 
          font-semibold 
          rounded-lg 
          transition-colors
          cursor-pointer
          shadow-md
        `}
      >
        Show {type.charAt(0).toUpperCase() + type.slice(1)} Toast
      </button>
    </div>
  );
};

/**
 * Wrapper component that provides Toast context
 */
const withToastProvider = (Component: React.FC<any>, props: any) => (
  <ToastProvider>
    <Component {...props} />
  </ToastProvider>
);

/**
 * Default toast - Success variant
 * Click the button to show a success toast in the top-right corner
 * Toast auto-dismisses after 5 seconds
 */
export const Default: Story = {
  render: () =>
    withToastProvider(SingleToastDemo, {
      type: 'success',
      message: 'Onboarding completed successfully',
    }),
};

/**
 * Success toast variant
 * Used for successful operations and confirmations
 * Click the button to show toast - disappears after 5 seconds
 */
export const Success: Story = {
  render: () =>
    withToastProvider(SingleToastDemo, {
      type: 'success',
      message: 'Operation completed successfully!',
    }),
};

/**
 * Error toast variant
 * Used for error messages and failed operations
 * Click the button to show toast - disappears after 5 seconds
 */
export const Error: Story = {
  render: () =>
    withToastProvider(SingleToastDemo, {
      type: 'error',
      message: 'Something went wrong. Please try again.',
    }),
};

/**
 * Warning toast variant
 * Used for warnings and cautionary messages
 * Click the button to show toast - disappears after 5 seconds
 */
export const Warning: Story = {
  render: () =>
    withToastProvider(SingleToastDemo, {
      type: 'warning',
      message: 'Please review your input before continuing.',
    }),
};

/**
 * Info toast variant
 * Used for informational messages
 * Click the button to show toast - disappears after 5 seconds
 */
export const Info: Story = {
  render: () =>
    withToastProvider(SingleToastDemo, {
      type: 'info',
      message: 'New update available. Check it out!',
    }),
};

/**
 * Interactive demo component showing all toast variants
 * Demonstrates the complete toast system with multiple buttons
 */
const AllVariantsDemo = () => {
  const { showToast, hideAllToasts, toasts } = useToastContext();

  /**
   * Shows a toast of the specified type
   * All toasts auto-dismiss after 5 seconds
   */
  const handleShowToast = (type: ToastType) => {
    const messages: Record<ToastType, string> = {
      success: 'Operation completed successfully!',
      error: 'An error occurred. Please try again.',
      warning: 'Please review your input before continuing.',
      info: 'New features are available. Check them out!',
    };

    showToast(messages[type], { type, duration: 5000 });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-[#312e4d] mb-2">
          Toast Notifications
        </h2>
        <p className="text-[#575385]">
          Click any button to show a toast. Each toast auto-dismisses after 5 seconds.
        </p>
      </div>

      {/* Toast type buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={() => handleShowToast('success')}
          className="px-6 py-3 bg-[#00995a] text-white font-semibold rounded-lg hover:bg-[#007a48] transition-colors cursor-pointer shadow-md"
        >
          Success Toast
        </button>
        <button
          onClick={() => handleShowToast('error')}
          className="px-6 py-3 bg-[#d4002c] text-white font-semibold rounded-lg hover:bg-[#a80023] transition-colors cursor-pointer shadow-md"
        >
          Error Toast
        </button>
        <button
          onClick={() => handleShowToast('warning')}
          className="px-6 py-3 bg-[#d48620] text-white font-semibold rounded-lg hover:bg-[#b37019] transition-colors cursor-pointer shadow-md"
        >
          Warning Toast
        </button>
        <button
          onClick={() => handleShowToast('info')}
          className="px-6 py-3 bg-[#363636] text-white font-semibold rounded-lg hover:bg-[#1a1a1a] transition-colors cursor-pointer shadow-md"
        >
          Info Toast
        </button>
      </div>

      {/* Clear all button */}
      <button
        onClick={hideAllToasts}
        className="px-6 py-3 border-2 border-[#ecebf0] text-[#312e4d] font-semibold rounded-lg hover:bg-[#f4f4f4] transition-colors cursor-pointer"
      >
        Clear All Toasts
      </button>

      {/* Active toast counter */}
      <p className="text-sm text-[#a29fba]">
        Active toasts: {toasts.length}
      </p>
    </div>
  );
};

/**
 * All variants demo with interactive buttons
 * Shows all four toast types with individual buttons
 * Includes a "Clear All" button and active toast counter
 */
export const AllVariants: Story = {
  render: () => (
    <ToastProvider>
      <AllVariantsDemo />
    </ToastProvider>
  ),
};

/**
 * Static preview of all toast variants
 * Shows how each toast type looks (for documentation)
 */
export const StaticPreview: Story = {
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <p className="text-sm text-[#575385] mb-2">
        Static preview of all toast variants:
      </p>
      <Toast type="success" message="Success message" onClose={() => {}} />
      <Toast type="error" message="Error message" onClose={() => {}} />
      <Toast type="warning" message="Warning message" onClose={() => {}} />
      <Toast type="info" message="Info message" onClose={() => {}} />
    </div>
  ),
};
