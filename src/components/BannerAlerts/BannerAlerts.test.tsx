import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { BannerAlerts } from './index';
import { CheckCircle } from 'lucide-react';

describe('BannerAlerts', () => {
  describe('Rendering', () => {
    it('renders correctly with required props', () => {
      render(
        <BannerAlerts
          title="Test Title"
          description="Test Description"
        />
      );
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
    });

    it('has proper alert role', () => {
      render(
        <BannerAlerts
          title="Test"
          description="Description"
        />
      );
      
      const alert = screen.getByRole('alert');
      expect(alert).toBeInTheDocument();
    });

    it('has aria-live attribute', () => {
      render(
        <BannerAlerts
          title="Test"
          description="Description"
        />
      );
      
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Variants', () => {
    it('renders warning variant correctly', () => {
      const { container } = render(
        <BannerAlerts
          variant="warning"
          title="Warning Title"
          description="Warning Description"
        />
      );
      
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('bg-[#fff3e8]');
      expect(alert).toHaveClass('text-[#d48620]');
    });

    it('renders information variant correctly (default)', () => {
      const { container } = render(
        <BannerAlerts
          variant="information"
          title="Info Title"
          description="Info Description"
        />
      );
      
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('bg-[#e3f2ff]');
      expect(alert).toHaveClass('text-[#4087fb]');
    });

    it('renders grey variant correctly', () => {
      const { container } = render(
        <BannerAlerts
          variant="grey"
          title="Grey Title"
          description="Grey Description"
        />
      );
      
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('bg-[#f4f4f4]');
      expect(alert).toHaveClass('text-[#6e6f6e]');
    });

    it('uses information as default variant', () => {
      const { container } = render(
        <BannerAlerts
          title="Default"
          description="Description"
        />
      );
      
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('bg-[#e3f2ff]');
    });
  });

  describe('Content', () => {
    it('displays title correctly', () => {
      render(
        <BannerAlerts
          title="Custom Title"
          description="Description"
        />
      );
      
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
    });

    it('displays description correctly', () => {
      render(
        <BannerAlerts
          title="Title"
          description="Custom Description"
        />
      );
      
      expect(screen.getByText('Custom Description')).toBeInTheDocument();
    });

    it('renders long text correctly', () => {
      const longTitle = 'This is a very long title that should wrap';
      const longDescription = 'This is a very long description that contains a lot of text and should wrap properly without breaking the layout';
      
      render(
        <BannerAlerts
          title={longTitle}
          description={longDescription}
        />
      );
      
      expect(screen.getByText(longTitle)).toBeInTheDocument();
      expect(screen.getByText(longDescription)).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('renders default icon for warning variant', () => {
      const { container } = render(
        <BannerAlerts
          variant="warning"
          title="Title"
          description="Description"
        />
      );
      
      // AlertTriangle icon should be rendered
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders default icon for information variant', () => {
      const { container } = render(
        <BannerAlerts
          variant="information"
          title="Title"
          description="Description"
        />
      );
      
      // Info icon should be rendered
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders default icon for grey variant', () => {
      const { container } = render(
        <BannerAlerts
          variant="grey"
          title="Title"
          description="Description"
        />
      );
      
      // Info icon should be rendered
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders custom icon when provided', () => {
      render(
        <BannerAlerts
          variant="information"
          title="Title"
          description="Description"
          icon={<CheckCircle data-testid="custom-icon" />}
        />
      );
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('prefers custom icon over default icon', () => {
      render(
        <BannerAlerts
          variant="warning"
          title="Title"
          description="Description"
          icon={<div data-testid="custom">Custom</div>}
        />
      );
      
      expect(screen.getByTestId('custom')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <BannerAlerts
          title="Title"
          description="Description"
          className="custom-class"
        />
      );
      
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('custom-class');
    });

    it('maintains base classes with custom className', () => {
      const { container } = render(
        <BannerAlerts
          title="Title"
          description="Description"
          className="custom-class"
        />
      );
      
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('flex');
      expect(alert).toHaveClass('items-center');
      expect(alert).toHaveClass('gap-3');
      expect(alert).toHaveClass('p-4');
      expect(alert).toHaveClass('rounded-lg');
      expect(alert).toHaveClass('custom-class');
    });
  });

  describe('HTML Attributes', () => {
    it('passes through HTML attributes', () => {
      render(
        <BannerAlerts
          title="Title"
          description="Description"
          data-testid="banner-alert"
          id="test-alert"
        />
      );
      
      const alert = screen.getByTestId('banner-alert');
      expect(alert).toHaveAttribute('id', 'test-alert');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      
      render(
        <BannerAlerts
          ref={ref}
          title="Title"
          description="Description"
        />
      );
      
      expect(ref.current).not.toBeNull();
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Layout', () => {
    it('has correct flexbox layout', () => {
      const { container } = render(
        <BannerAlerts
          title="Title"
          description="Description"
        />
      );
      
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('flex');
      expect(alert).toHaveClass('items-center');
    });

    it('has correct spacing', () => {
      const { container } = render(
        <BannerAlerts
          title="Title"
          description="Description"
        />
      );
      
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('gap-3');
      expect(alert).toHaveClass('p-4');
    });

    it('has rounded corners', () => {
      const { container } = render(
        <BannerAlerts
          title="Title"
          description="Description"
        />
      );
      
      const alert = container.firstChild as HTMLElement;
      expect(alert).toHaveClass('rounded-lg');
    });
  });

  describe('Accessibility', () => {
    it('has accessible role and aria attributes', () => {
      render(
        <BannerAlerts
          title="Important"
          description="Message"
        />
      );
      
      const alert = screen.getByRole('alert');
      expect(alert).toHaveAttribute('aria-live', 'polite');
    });

    it('has semantic structure', () => {
      const { container } = render(
        <BannerAlerts
          title="Title"
          description="Description"
        />
      );
      
      // Should have proper DOM structure
      const alert = container.firstChild as HTMLElement;
      const content = alert.querySelector('.flex-col');
      expect(content).toBeInTheDocument();
    });
  });
});

