import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Toast, ToastType } from './index';
import { ToastContainer } from './ToastContainer';
import { ToastProvider, useToastContext } from './ToastProvider';
import { useToast, ToastItem } from './useToast';
import { renderHook } from '@testing-library/react';

/**
 * Test suite for Toast Component
 */
describe('Toast Component', () => {
  /**
   * Tests that toast renders with correct message
   */
  it('renders with message', () => {
    render(<Toast message="Test message" />);
    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  /**
   * Tests that toast renders with correct type attribute
   */
  it('renders with correct type', () => {
    render(<Toast type="error" message="Error message" />);
    const toast = screen.getByTestId('toast');
    expect(toast).toHaveAttribute('data-toast-type', 'error');
  });

  /**
   * Tests that close button triggers onClose callback
   */
  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(<Toast message="Test" onClose={onClose} />);
    
    const closeButton = screen.getByTestId('toast-close-button');
    fireEvent.click(closeButton);
    
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  /**
   * Tests that close button is not rendered when onClose is not provided
   */
  it('does not render close button when onClose is not provided', () => {
    render(<Toast message="Test" />);
    expect(screen.queryByTestId('toast-close-button')).not.toBeInTheDocument();
  });

  /**
   * Tests all four toast variants render correctly
   */
  describe('variants', () => {
    const variants: ToastType[] = ['success', 'error', 'warning', 'info'];

    variants.forEach((type) => {
      it(`renders ${type} variant correctly`, () => {
        render(<Toast type={type} message={`${type} message`} />);
        
        const toast = screen.getByTestId('toast');
        expect(toast).toHaveAttribute('data-toast-type', type);
        expect(screen.getByText(`${type} message`)).toBeInTheDocument();
      });
    });
  });

  /**
   * Tests accessibility attributes
   */
  it('has correct accessibility attributes', () => {
    render(<Toast message="Accessible toast" />);
    
    const toast = screen.getByTestId('toast');
    expect(toast).toHaveAttribute('role', 'alert');
    expect(toast).toHaveAttribute('aria-live', 'assertive');
    expect(toast).toHaveAttribute('aria-atomic', 'true');
  });

  /**
   * Tests that icon is rendered
   */
  it('renders icon', () => {
    render(<Toast message="Test" />);
    expect(screen.getByTestId('toast-icon')).toBeInTheDocument();
  });
});

/**
 * Test suite for useToast Hook
 */
describe('useToast Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  /**
   * Tests initial state is empty
   */
  it('starts with empty toasts array', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toEqual([]);
  });

  /**
   * Tests showToast adds a toast
   */
  it('showToast adds a toast', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast('Test message', { type: 'success' });
    });
    
    expect(result.current.toasts).toHaveLength(1);
    expect(result.current.toasts[0].message).toBe('Test message');
    expect(result.current.toasts[0].type).toBe('success');
  });

  /**
   * Tests hideToast removes a toast
   */
  it('hideToast removes a toast', () => {
    const { result } = renderHook(() => useToast());
    
    let toastId: string;
    act(() => {
      toastId = result.current.showToast('Test message');
    });
    
    expect(result.current.toasts).toHaveLength(1);
    
    act(() => {
      result.current.hideToast(toastId);
    });
    
    expect(result.current.toasts).toHaveLength(0);
  });

  /**
   * Tests hideAllToasts clears all toasts
   */
  it('hideAllToasts clears all toasts', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast('Toast 1');
      result.current.showToast('Toast 2');
      result.current.showToast('Toast 3');
    });
    
    expect(result.current.toasts).toHaveLength(3);
    
    act(() => {
      result.current.hideAllToasts();
    });
    
    expect(result.current.toasts).toHaveLength(0);
  });

  /**
   * Tests auto-dismiss after duration
   */
  it('auto-dismisses toast after duration', async () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast('Auto dismiss', { duration: 3000 });
    });
    
    expect(result.current.toasts).toHaveLength(1);
    
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    
    expect(result.current.toasts).toHaveLength(0);
  });

  /**
   * Tests default type is success
   */
  it('defaults to success type', () => {
    const { result } = renderHook(() => useToast());
    
    act(() => {
      result.current.showToast('Test');
    });
    
    expect(result.current.toasts[0].type).toBe('success');
  });
});

/**
 * Test suite for ToastContainer Component
 */
describe('ToastContainer Component', () => {
  const mockToasts: ToastItem[] = [
    { id: '1', message: 'Toast 1', type: 'success', duration: 5000 },
    { id: '2', message: 'Toast 2', type: 'error', duration: 5000 },
  ];

  /**
   * Tests that container renders nothing when toasts array is empty
   */
  it('renders nothing when toasts array is empty', () => {
    render(<ToastContainer toasts={[]} onClose={() => {}} />);
    expect(screen.queryByTestId('toast-container')).not.toBeInTheDocument();
  });

  /**
   * Tests that container renders all toasts
   */
  it('renders all toasts', () => {
    render(<ToastContainer toasts={mockToasts} onClose={() => {}} />);
    
    expect(screen.getByText('Toast 1')).toBeInTheDocument();
    expect(screen.getByText('Toast 2')).toBeInTheDocument();
  });

  /**
   * Tests that onClose is called with correct toast id
   */
  it('calls onClose with correct id when toast is closed', () => {
    const onClose = vi.fn();
    render(<ToastContainer toasts={mockToasts} onClose={onClose} />);
    
    const closeButtons = screen.getAllByTestId('toast-close-button');
    fireEvent.click(closeButtons[0]);
    
    expect(onClose).toHaveBeenCalledWith('1');
  });

  /**
   * Tests container has correct positioning classes
   */
  it('has correct positioning', () => {
    render(<ToastContainer toasts={mockToasts} onClose={() => {}} />);
    
    const container = screen.getByTestId('toast-container');
    expect(container).toHaveClass('fixed');
    expect(container).toHaveClass('top-[5vh]');
    expect(container).toHaveClass('right-[2vw]');
    expect(container).toHaveClass('z-[9999]');
  });
});

/**
 * Test suite for ToastProvider Component
 */
describe('ToastProvider Component', () => {
  /**
   * Helper component to test useToastContext
   */
  const TestComponent = () => {
    const { showToast, toasts } = useToastContext();
    
    return (
      <div>
        <button onClick={() => showToast('Test toast')}>Show Toast</button>
        <span data-testid="toast-count">{toasts.length}</span>
      </div>
    );
  };

  /**
   * Tests that context provides toast functions
   */
  it('provides toast context to children', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    expect(screen.getByTestId('toast-count')).toHaveTextContent('0');
    
    fireEvent.click(screen.getByText('Show Toast'));
    
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1');
  });

  /**
   * Tests that useToastContext throws error when used outside provider
   */
  it('throws error when useToastContext is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useToastContext must be used within a ToastProvider');
    
    consoleSpy.mockRestore();
  });

  /**
   * Tests that ToastContainer is rendered by provider
   */
  it('renders ToastContainer when toasts are shown', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );
    
    // Initially no container (no toasts)
    expect(screen.queryByTestId('toast-container')).not.toBeInTheDocument();
    
    // Show a toast
    fireEvent.click(screen.getByText('Show Toast'));
    
    // Container should now be rendered
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });
});
