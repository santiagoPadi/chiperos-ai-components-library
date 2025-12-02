import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Toasts } from './index';
import { AlertCircle } from 'lucide-react';

describe('Toasts', () => {
  describe('Rendering', () => {
    it('renders correctly with required props', () => {
      render(<Toasts text="Test message" />);
      expect(screen.getByText('Test message')).toBeInTheDocument();
    });

    it('has proper status role', () => {
      render(<Toasts text="Test" />);
      const toast = screen.getByRole('status');
      expect(toast).toBeInTheDocument();
    });

    it('has aria-live attribute', () => {
      render(<Toasts text="Test" />);
      const toast = screen.getByRole('status');
      expect(toast).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Types', () => {
    it('renders light type correctly (default)', () => {
      const { container } = render(
        <Toasts type="light" text="Light toast" />
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('bg-[#ecebf0]');
    });

    it('renders dark type correctly', () => {
      const { container } = render(
        <Toasts type="dark" text="Dark toast" />
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('bg-[#3f3c5e]');
    });

    it('uses light as default type', () => {
      const { container } = render(<Toasts text="Default" />);
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('bg-[#ecebf0]');
    });
  });

  describe('Text', () => {
    it('displays text correctly', () => {
      render(<Toasts text="Custom message" />);
      expect(screen.getByText('Custom message')).toBeInTheDocument();
    });

    it('displays long text correctly', () => {
      const longText = 'This is a very long message that should be displayed correctly';
      render(<Toasts text={longText} />);
      expect(screen.getByText(longText)).toBeInTheDocument();
    });

    it('displays short text correctly', () => {
      render(<Toasts text="OK" />);
      expect(screen.getByText('OK')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('renders default icon (CheckCircle)', () => {
      const { container } = render(<Toasts text="Test" />);
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      render(
        <Toasts
          text="Test"
          icon={<AlertCircle data-testid="custom-icon" />}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('prefers custom icon over default', () => {
      render(
        <Toasts
          text="Test"
          icon={<div data-testid="custom">Custom</div>}
        />
      );
      expect(screen.getByTestId('custom')).toBeInTheDocument();
    });
  });

  describe('Close Button', () => {
    it('renders close button when onClose is provided', () => {
      const onClose = vi.fn();
      render(<Toasts text="Test" onClose={onClose} />);
      
      const closeButton = screen.getByLabelText('Cerrar notificación');
      expect(closeButton).toBeInTheDocument();
    });

    it('does not render close button when onClose is not provided', () => {
      render(<Toasts text="Test" />);
      
      const closeButton = screen.queryByLabelText('Cerrar notificación');
      expect(closeButton).not.toBeInTheDocument();
    });

    it('calls onClose when close button is clicked', async () => {
      const onClose = vi.fn();
      render(<Toasts text="Test" onClose={onClose} />);
      
      const closeButton = screen.getByLabelText('Cerrar notificación');
      await userEvent.click(closeButton);
      
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('close button has correct aria-label', () => {
      const onClose = vi.fn();
      render(<Toasts text="Test" onClose={onClose} />);
      
      expect(screen.getByLabelText('Cerrar notificación')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <Toasts text="Test" className="custom-class" />
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('custom-class');
    });

    it('maintains base classes with custom className', () => {
      const { container } = render(
        <Toasts text="Test" className="custom-class" />
      );
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('flex');
      expect(toast).toHaveClass('items-center');
      expect(toast).toHaveClass('gap-3');
      expect(toast).toHaveClass('p-3');
      expect(toast).toHaveClass('rounded');
      expect(toast).toHaveClass('custom-class');
    });

    it('has correct text color for light type', () => {
      render(<Toasts type="light" text="Test" />);
      const textElement = screen.getByText('Test');
      expect(textElement).toHaveClass('text-[#575385]');
    });

    it('has correct text color for dark type', () => {
      render(<Toasts type="dark" text="Test" />);
      const textElement = screen.getByText('Test');
      expect(textElement).toHaveClass('text-white');
    });
  });

  describe('HTML Attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <Toasts
          text="Test"
          data-testid="toast"
          id="test-toast"
        />
      );
      const toast = screen.getByTestId('toast');
      expect(toast).toHaveAttribute('id', 'test-toast');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Toasts ref={ref} text="Test" />);
      
      expect(ref.current).not.toBeNull();
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Layout', () => {
    it('has correct flexbox layout', () => {
      const { container } = render(<Toasts text="Test" />);
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('flex');
      expect(toast).toHaveClass('items-center');
    });

    it('has correct spacing', () => {
      const { container } = render(<Toasts text="Test" />);
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('gap-3');
      expect(toast).toHaveClass('p-3');
    });

    it('has rounded corners', () => {
      const { container } = render(<Toasts text="Test" />);
      const toast = container.firstChild as HTMLElement;
      expect(toast).toHaveClass('rounded');
    });
  });

  describe('Accessibility', () => {
    it('has accessible role', () => {
      render(<Toasts text="Test" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has aria-live for screen readers', () => {
      render(<Toasts text="Important message" />);
      const toast = screen.getByRole('status');
      expect(toast).toHaveAttribute('aria-live', 'polite');
    });

    it('close button is accessible', () => {
      const onClose = vi.fn();
      render(<Toasts text="Test" onClose={onClose} />);
      
      const closeButton = screen.getByRole('button');
      expect(closeButton).toHaveAttribute('aria-label', 'Cerrar notificación');
      expect(closeButton).toHaveAttribute('type', 'button');
    });
  });

  describe('Interactions', () => {
    it('handles close button click', async () => {
      const onClose = vi.fn();
      render(<Toasts text="Test" onClose={onClose} />);
      
      const closeButton = screen.getByLabelText('Cerrar notificación');
      await userEvent.click(closeButton);
      
      expect(onClose).toHaveBeenCalled();
    });

    it('does not throw error when clicked without onClose', async () => {
      render(<Toasts text="Test" />);
      
      // No debería haber botón de cerrar
      expect(screen.queryByLabelText('Cerrar notificación')).not.toBeInTheDocument();
    });
  });

  describe('Text Styling', () => {
    it('has correct font size', () => {
      render(<Toasts text="Test" />);
      const textElement = screen.getByText('Test');
      expect(textElement).toHaveClass('text-base');
    });

    it('has correct line height', () => {
      render(<Toasts text="Test" />);
      const textElement = screen.getByText('Test');
      expect(textElement).toHaveClass('leading-5');
    });

    it('prevents text wrapping', () => {
      render(<Toasts text="Test" />);
      const textElement = screen.getByText('Test');
      expect(textElement).toHaveClass('whitespace-nowrap');
    });
  });
});

