import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { OptionCard } from './index';

describe('OptionCard', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(
        <OptionCard title="Test" description="Desc" value="test" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders title', () => {
      render(<OptionCard title="Test Title" description="Desc" value="test" />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<OptionCard title="Title" description="Test Description" value="test" />);
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });
  });

  describe('Selection State', () => {
    it('renders unselected by default', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" />
      );
      expect(container.firstChild).toHaveClass('border-[#ecebf0]');
    });

    it('renders selected state correctly', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" selected={true} />
      );
      expect(container.firstChild).toHaveClass('border-[#00b56b]');
    });

    it('shows filled radio button when selected', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" selected={true} />
      );
      const radioFill = container.querySelector('.bg-\\[\\#00995a\\]');
      expect(radioFill).toBeInTheDocument();
    });

    it('does not show filled radio button when unselected', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" selected={false} />
      );
      const radioFill = container.querySelector('.bg-\\[\\#00995a\\]');
      expect(radioFill).not.toBeInTheDocument();
    });
  });

  describe('Radio Button', () => {
    it('has correct border color when unselected', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" selected={false} />
      );
      const radio = container.querySelector('.rounded-full');
      expect(radio).toHaveClass('border-[#a29fba]');
    });

    it('has correct border color when selected', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" selected={true} />
      );
      const radio = container.querySelector('.rounded-full');
      expect(radio).toHaveClass('border-[#00995a]');
    });

    it('has transition animation', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" />
      );
      const radio = container.querySelector('.rounded-full');
      expect(radio).toHaveClass('transition-colors');
    });
  });

  describe('onSelect Callback', () => {
    it('calls onSelect when card is clicked', async () => {
      const onSelect = vi.fn();
      const { container } = render(
        <OptionCard
          title="Title"
          description="Desc"
          value="test-value"
          onSelect={onSelect}
        />
      );
      
      await userEvent.click(container.firstChild as HTMLElement);
      expect(onSelect).toHaveBeenCalledWith('test-value');
    });

    it('does not call onSelect when disabled', async () => {
      const onSelect = vi.fn();
      const { container } = render(
        <OptionCard
          title="Title"
          description="Desc"
          value="test"
          disabled={true}
          onSelect={onSelect}
        />
      );
      
      await userEvent.click(container.firstChild as HTMLElement);
      expect(onSelect).not.toHaveBeenCalled();
    });

    it('works without onSelect callback', async () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" />
      );
      
      await userEvent.click(container.firstChild as HTMLElement);
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('applies opacity when disabled', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" disabled={true} />
      );
      expect(container.firstChild).toHaveClass('opacity-50');
    });

    it('applies cursor-not-allowed when disabled', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" disabled={true} />
      );
      expect(container.firstChild).toHaveClass('cursor-not-allowed');
    });

    it('is not clickable when disabled', async () => {
      const onSelect = vi.fn();
      const { container } = render(
        <OptionCard
          title="Title"
          description="Desc"
          value="test"
          disabled={true}
          onSelect={onSelect}
        />
      );
      
      await userEvent.click(container.firstChild as HTMLElement);
      expect(onSelect).not.toHaveBeenCalled();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" className="custom" />
      );
      expect(container.firstChild).toHaveClass('custom');
    });

    it('has white background', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" />
      );
      expect(container.firstChild).toHaveClass('bg-white');
    });

    it('has rounded corners', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" />
      );
      expect(container.firstChild).toHaveClass('rounded-xl');
    });

    it('has padding', () => {
      const { container } = render(
        <OptionCard title="Title" description="Desc" value="test" />
      );
      expect(container.firstChild).toHaveClass('p-4');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<OptionCard title="Title" description="Desc" value="test" ref={ref} />);
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe('DIV');
    });

    it('passes through attributes', () => {
      render(
        <OptionCard
          title="Title"
          description="Desc"
          value="test"
          data-testid="option"
          id="option-id"
        />
      );
      expect(screen.getByTestId('option')).toHaveAttribute('id', 'option-id');
    });
  });

  describe('Typography', () => {
    it('uses correct font size for title', () => {
      render(<OptionCard title="Title" description="Desc" value="test" />);
      const title = screen.getByText('Title');
      expect(title).toHaveClass('text-base');
    });

    it('uses correct font size for description', () => {
      render(<OptionCard title="Title" description="Desc" value="test" />);
      const description = screen.getByText('Desc');
      expect(description).toHaveClass('text-sm');
    });
  });
});
