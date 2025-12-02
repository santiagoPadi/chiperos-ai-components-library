import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { Switcher } from './index';

describe('Switcher', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      render(<Switcher />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toBeInTheDocument();
    });

    it('has proper switch role', () => {
      render(<Switcher />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('renders with default status off', () => {
      render(<Switcher />);
      const switcher = screen.getByRole('switch');
      expect(switcher).not.toBeChecked();
    });
  });

  describe('Status Prop', () => {
    it('renders with status false (off)', () => {
      render(<Switcher status={false} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).not.toBeChecked();
    });

    it('renders with status true (on)', () => {
      render(<Switcher status={true} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toBeChecked();
    });

    it('updates when status changes', () => {
      const { rerender } = render(<Switcher status={false} />);
      let switcher = screen.getByRole('switch');
      expect(switcher).not.toBeChecked();

      rerender(<Switcher status={true} />);
      switcher = screen.getByRole('switch');
      expect(switcher).toBeChecked();
    });
  });

  describe('Disabled Prop', () => {
    it('renders disabled state correctly', () => {
      render(<Switcher disabled={true} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toBeDisabled();
    });

    it('renders enabled by default', () => {
      render(<Switcher />);
      const switcher = screen.getByRole('switch');
      expect(switcher).not.toBeDisabled();
    });

    it('disabled switch cannot be toggled', async () => {
      const onChange = vi.fn();
      render(<Switcher disabled={true} onChange={onChange} />);
      
      const switcher = screen.getByRole('switch');
      await userEvent.click(switcher);
      
      expect(onChange).not.toHaveBeenCalled();
    });

    it('applies opacity when disabled', () => {
      render(<Switcher disabled={true} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveClass('disabled:opacity-50');
    });
  });

  describe('onChange Callback', () => {
    it('calls onChange when clicked', async () => {
      const onChange = vi.fn();
      render(<Switcher status={false} onChange={onChange} />);
      
      const switcher = screen.getByRole('switch');
      await userEvent.click(switcher);
      
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with correct value when toggling on', async () => {
      const onChange = vi.fn();
      render(<Switcher status={false} onChange={onChange} />);
      
      const switcher = screen.getByRole('switch');
      await userEvent.click(switcher);
      
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('calls onChange with correct value when toggling off', async () => {
      const onChange = vi.fn();
      render(<Switcher status={true} onChange={onChange} />);
      
      const switcher = screen.getByRole('switch');
      await userEvent.click(switcher);
      
      expect(onChange).toHaveBeenCalledWith(false);
    });

    it('does not call onChange when disabled', async () => {
      const onChange = vi.fn();
      render(<Switcher disabled={true} onChange={onChange} />);
      
      const switcher = screen.getByRole('switch');
      await userEvent.click(switcher);
      
      expect(onChange).not.toHaveBeenCalled();
    });

    it('works without onChange callback', async () => {
      render(<Switcher status={false} />);
      
      const switcher = screen.getByRole('switch');
      // No debería lanzar error
      await userEvent.click(switcher);
      
      expect(switcher).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<Switcher className="custom-class" />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveClass('custom-class');
    });

    it('has correct background when off', () => {
      render(<Switcher status={false} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveClass('bg-[#e0e0e0]');
    });

    it('has correct background when on', () => {
      render(<Switcher status={true} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveClass('bg-[#00995a]');
    });

    it('has rounded-full class', () => {
      render(<Switcher />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveClass('rounded-full');
    });

    it('has transition classes', () => {
      render(<Switcher />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveClass('transition-colors');
      expect(switcher).toHaveClass('duration-200');
    });

    it('has correct dimensions', () => {
      render(<Switcher />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveClass('h-5');
      expect(switcher).toHaveClass('w-10');
    });
  });

  describe('Thumb (Handle)', () => {
    it('thumb is at left position when off', () => {
      const { container } = render(<Switcher status={false} />);
      const thumb = container.querySelector('[data-state="unchecked"]')?.firstChild as HTMLElement;
      expect(thumb).toHaveClass('translate-x-0');
    });

    it('thumb is at right position when on', () => {
      const { container } = render(<Switcher status={true} />);
      const thumb = container.querySelector('[data-state="checked"]')?.firstChild as HTMLElement;
      expect(thumb).toHaveClass('translate-x-5');
    });

    it('thumb has transition animation', () => {
      const { container } = render(<Switcher />);
      const thumb = container.querySelector('[data-state="unchecked"]')?.firstChild as HTMLElement;
      expect(thumb).toHaveClass('transition-transform');
      expect(thumb).toHaveClass('duration-200');
    });

    it('thumb is white', () => {
      const { container } = render(<Switcher />);
      const thumb = container.querySelector('[data-state="unchecked"]')?.firstChild as HTMLElement;
      expect(thumb).toHaveClass('bg-white');
    });

    it('thumb is rounded', () => {
      const { container } = render(<Switcher />);
      const thumb = container.querySelector('[data-state="unchecked"]')?.firstChild as HTMLElement;
      expect(thumb).toHaveClass('rounded-full');
    });

    it('thumb has shadow', () => {
      const { container } = render(<Switcher />);
      const thumb = container.querySelector('[data-state="unchecked"]')?.firstChild as HTMLElement;
      expect(thumb).toHaveClass('shadow-lg');
    });
  });

  describe('HTML Attributes', () => {
    it('passes through HTML attributes', () => {
      render(<Switcher data-testid="switcher" id="test-switcher" />);
      const switcher = screen.getByTestId('switcher');
      expect(switcher).toHaveAttribute('id', 'test-switcher');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Switcher ref={ref} />);
      
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('supports aria-label', () => {
      render(<Switcher aria-label="Toggle notifications" />);
      const switcher = screen.getByLabelText('Toggle notifications');
      expect(switcher).toBeInTheDocument();
    });
  });

  describe('Keyboard Interaction', () => {
    it('can be toggled with Space key', async () => {
      const onChange = vi.fn();
      render(<Switcher status={false} onChange={onChange} />);
      
      const switcher = screen.getByRole('switch');
      switcher.focus();
      await userEvent.keyboard(' ');
      
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('can be toggled with Enter key', async () => {
      const onChange = vi.fn();
      render(<Switcher status={false} onChange={onChange} />);
      
      const switcher = screen.getByRole('switch');
      switcher.focus();
      await userEvent.keyboard('{Enter}');
      
      expect(onChange).toHaveBeenCalledWith(true);
    });

    it('is focusable', () => {
      render(<Switcher />);
      const switcher = screen.getByRole('switch');
      switcher.focus();
      expect(switcher).toHaveFocus();
    });

    it('has focus visible styles', () => {
      render(<Switcher />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveClass('focus-visible:outline-none');
      expect(switcher).toHaveClass('focus-visible:ring-2');
    });
  });

  describe('Accessibility', () => {
    it('has switch role', () => {
      render(<Switcher />);
      expect(screen.getByRole('switch')).toBeInTheDocument();
    });

    it('has correct aria-checked when off', () => {
      render(<Switcher status={false} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveAttribute('aria-checked', 'false');
    });

    it('has correct aria-checked when on', () => {
      render(<Switcher status={true} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveAttribute('aria-checked', 'true');
    });

    it('has correct data-state when off', () => {
      render(<Switcher status={false} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveAttribute('data-state', 'unchecked');
    });

    it('has correct data-state when on', () => {
      render(<Switcher status={true} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveAttribute('data-state', 'checked');
    });

    it('is keyboard accessible', () => {
      render(<Switcher />);
      const switcher = screen.getByRole('switch');
      expect(switcher.tagName).toBe('BUTTON');
    });
  });

  describe('Colors', () => {
    it('has gray background when off', () => {
      render(<Switcher status={false} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveClass('bg-[#e0e0e0]');
    });

    it('has green background when on', () => {
      render(<Switcher status={true} />);
      const switcher = screen.getByRole('switch');
      expect(switcher).toHaveClass('bg-[#00995a]');
    });
  });

  describe('Default Values', () => {
    it('uses false as default status', () => {
      render(<Switcher />);
      const switcher = screen.getByRole('switch');
      expect(switcher).not.toBeChecked();
    });

    it('uses false as default disabled', () => {
      render(<Switcher />);
      const switcher = screen.getByRole('switch');
      expect(switcher).not.toBeDisabled();
    });
  });
});

