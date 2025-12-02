import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { ActionCard } from './index';

describe('ActionCard', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(
        <ActionCard
          title="Test"
          description="Description"
          icon={<div>Icon</div>}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders title', () => {
      render(<ActionCard title="Test Title" description="Desc" icon={<div>Icon</div>} />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(<ActionCard title="Title" description="Test Description" icon={<div>Icon</div>} />);
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('renders icon', () => {
      render(<ActionCard title="Title" description="Desc" icon={<div data-testid="icon">Icon</div>} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('Action Button', () => {
    it('renders action button when provided', () => {
      render(
        <ActionCard
          title="Title"
          description="Desc"
          icon={<div>Icon</div>}
          action={{ label: 'Click Me', onClick: vi.fn() }}
        />
      );
      expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
    });

    it('does not render button when action not provided', () => {
      const { container } = render(
        <ActionCard title="Title" description="Desc" icon={<div>Icon</div>} />
      );
      expect(container.querySelectorAll('button').length).toBe(0);
    });

    it('calls action onClick when button clicked', async () => {
      const onClick = vi.fn();
      render(
        <ActionCard
          title="Title"
          description="Desc"
          icon={<div>Icon</div>}
          action={{ label: 'Click', onClick }}
        />
      );
      
      await userEvent.click(screen.getByRole('button', { name: 'Click' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when action button clicked', async () => {
      const cardOnClick = vi.fn();
      const actionOnClick = vi.fn();
      
      render(
        <ActionCard
          title="Title"
          description="Desc"
          icon={<div>Icon</div>}
          onClick={cardOnClick}
          action={{ label: 'Click', onClick: actionOnClick }}
        />
      );
      
      await userEvent.click(screen.getByRole('button'));
      expect(actionOnClick).toHaveBeenCalledTimes(1);
      expect(cardOnClick).not.toHaveBeenCalled();
    });
  });

  describe('Card onClick', () => {
    it('calls onClick when card clicked', async () => {
      const onClick = vi.fn();
      const { container } = render(
        <ActionCard title="Title" description="Desc" icon={<div>Icon</div>} onClick={onClick} />
      );
      
      await userEvent.click(container.firstChild as HTMLElement);
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('applies cursor-pointer when onClick provided', () => {
      const { container } = render(
        <ActionCard title="Title" description="Desc" icon={<div>Icon</div>} onClick={() => {}} />
      );
      expect(container.firstChild).toHaveClass('cursor-pointer');
    });
  });

  describe('Styling', () => {
    it('has fixed width', () => {
      const { container } = render(
        <ActionCard title="Title" description="Desc" icon={<div>Icon</div>} />
      );
      expect(container.firstChild).toHaveStyle({ width: '350px' });
    });

    it('applies custom className', () => {
      const { container } = render(
        <ActionCard title="Title" description="Desc" icon={<div>Icon</div>} className="custom" />
      );
      expect(container.firstChild).toHaveClass('custom');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<ActionCard title="Title" description="Desc" icon={<div>Icon</div>} ref={ref} />);
      expect(ref.current).not.toBeNull();
    });

    it('passes through attributes', () => {
      render(
        <ActionCard
          title="Title"
          description="Desc"
          icon={<div>Icon</div>}
          data-testid="test"
          id="test-id"
        />
      );
      expect(screen.getByTestId('test')).toHaveAttribute('id', 'test-id');
    });
  });
});
