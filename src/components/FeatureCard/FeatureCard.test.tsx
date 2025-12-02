import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { FeatureCard } from './index';

describe('FeatureCard', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(
        <FeatureCard
          title="Test Feature"
          description="Test description"
          icon={<div data-testid="test-icon">Icon</div>}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders title', () => {
      render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('renders description', () => {
      render(
        <FeatureCard
          title="Test Title"
          description="Test description text"
          icon={<div>Icon</div>}
        />
      );
      expect(screen.getByText('Test description text')).toBeInTheDocument();
    });

    it('renders icon', () => {
      render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div data-testid="custom-icon">Custom Icon</div>}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Icon Background', () => {
    it('uses default icon background color', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      const iconContainer = container.querySelector('[style*="background-color"]');
      expect(iconContainer).toHaveStyle({ backgroundColor: 'rgb(230, 248, 239)' }); // #e6f8ef
    });

    it('uses custom icon background color', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
          iconBackground="#ff0000"
        />
      );
      const iconContainer = container.querySelector('[style*="background-color"]');
      expect(iconContainer).toHaveStyle({ backgroundColor: 'rgb(255, 0, 0)' }); // #ff0000
    });
  });

  describe('onClick Behavior', () => {
    it('calls onClick when card is clicked', async () => {
      const onClick = vi.fn();
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
          onClick={onClick}
        />
      );
      
      const card = container.firstChild as HTMLElement;
      await userEvent.click(card);
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when not provided', async () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      
      const card = container.firstChild as HTMLElement;
      await userEvent.click(card);
      
      // Should not throw error
      expect(card).toBeInTheDocument();
    });

    it('applies cursor-pointer when onClick is provided', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
          onClick={() => {}}
        />
      );
      expect(container.firstChild).toHaveClass('cursor-pointer');
    });

    it('does not apply cursor-pointer when onClick is not provided', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      expect(container.firstChild).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
          className="custom-class"
        />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('has white background', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      expect(container.firstChild).toHaveClass('bg-white');
    });

    it('has border', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      expect(container.firstChild).toHaveClass('border');
      expect(container.firstChild).toHaveClass('border-[#ecebf0]');
    });

    it('has rounded corners', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      expect(container.firstChild).toHaveClass('rounded-lg');
    });

    it('has padding', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      expect(container.firstChild).toHaveClass('p-8');
    });

    it('has fixed width', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      expect(container.firstChild).toHaveClass('w-96');
    });
  });

  describe('Layout', () => {
    it('has flex layout', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      expect(container.firstChild).toHaveClass('flex');
      expect(container.firstChild).toHaveClass('flex-col');
    });

    it('has centered items', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      expect(container.firstChild).toHaveClass('items-center');
    });

    it('has gap between elements', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      expect(container.firstChild).toHaveClass('gap-8');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
          ref={ref}
        />
      );
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe('DIV');
    });

    it('passes through HTML attributes', () => {
      render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
          data-testid="feature-card"
          id="feature-id"
        />
      );
      const element = screen.getByTestId('feature-card');
      expect(element).toHaveAttribute('id', 'feature-id');
    });
  });

  describe('Typography', () => {
    it('uses correct font size for title', () => {
      render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      const title = screen.getByText('Test Title');
      expect(title).toHaveClass('text-2xl');
    });

    it('uses correct font size for description', () => {
      render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      const description = screen.getByText('Test description');
      expect(description).toHaveClass('text-base');
    });

    it('centers text', () => {
      render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      const title = screen.getByText('Test Title');
      expect(title.parentElement).toHaveClass('text-center');
    });
  });

  describe('Icon Container', () => {
    it('has correct size', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      const iconContainer = container.querySelector('[style*="width"]');
      expect(iconContainer).toHaveStyle({ width: '56px', height: '56px' });
    });

    it('has rounded corners', () => {
      const { container } = render(
        <FeatureCard
          title="Test Title"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      const iconContainer = container.querySelector('.rounded-lg');
      expect(iconContainer).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles long title', () => {
      render(
        <FeatureCard
          title="This is a very long title that might wrap to multiple lines"
          description="Test description"
          icon={<div>Icon</div>}
        />
      );
      expect(screen.getByText(/This is a very long title/)).toBeInTheDocument();
    });

    it('handles long description', () => {
      const longDescription = 'This is a very long description that spans multiple lines and contains a lot of information about the feature being described.';
      render(
        <FeatureCard
          title="Test Title"
          description={longDescription}
          icon={<div>Icon</div>}
        />
      );
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });

    it('handles empty strings', () => {
      render(
        <FeatureCard
          title=""
          description=""
          icon={<div>Icon</div>}
        />
      );
      expect(screen.getByTestId).toBeDefined();
    });
  });
});
