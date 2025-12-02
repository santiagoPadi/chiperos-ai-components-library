import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { Loader } from './index';

describe('Loader', () => {
  describe('Rendering', () => {
    it('renders spinner by default', () => {
      const { container } = render(<Loader />);
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders when show is true', () => {
      render(<Loader show={true} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('does not render when show is false', () => {
      const { container } = render(<Loader show={false} />);
      expect(container.firstChild).toBeNull();
    });

    it('has proper status role', () => {
      render(<Loader />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('has accessible label', () => {
      render(<Loader />);
      expect(screen.getByLabelText('Cargando')).toBeInTheDocument();
    });

    it('has sr-only text for screen readers', () => {
      render(<Loader />);
      expect(screen.getByText('Cargando...')).toHaveClass('sr-only');
    });
  });

  describe('Types', () => {
    it('renders spinner type correctly', () => {
      render(<Loader type="spinner" />);
      const loader = screen.getByRole('status');
      expect(loader).toBeInTheDocument();
    });

    it('renders linear type correctly', () => {
      render(<Loader type="linear" />);
      const loader = screen.getByRole('progressbar');
      expect(loader).toBeInTheDocument();
    });

    it('linear has progressbar role', () => {
      render(<Loader type="linear" />);
      const loader = screen.getByRole('progressbar');
      expect(loader).toHaveAttribute('aria-valuemin', '0');
      expect(loader).toHaveAttribute('aria-valuemax', '100');
    });
  });

  describe('Variants', () => {
    it('renders active variant by default', () => {
      render(<Loader variant="active" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('renders disabled variant correctly', () => {
      render(<Loader variant="disabled" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders spinner with default size 48', () => {
      const { container } = render(<Loader type="spinner" />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveStyle({ width: '48px', height: '48px' });
    });

    it('renders spinner with custom size', () => {
      const { container } = render(<Loader type="spinner" size={64} />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveStyle({ width: '64px', height: '64px' });
    });

    it('renders linear with default width 230', () => {
      const { container } = render(<Loader type="linear" />);
      const linear = container.firstChild as HTMLElement;
      expect(linear).toHaveStyle({ width: '230px' });
    });

    it('renders linear with custom width', () => {
      const { container } = render(<Loader type="linear" width={300} />);
      const linear = container.firstChild as HTMLElement;
      expect(linear).toHaveStyle({ width: '300px' });
    });

    it('linear always has height of 8px', () => {
      const { container } = render(<Loader type="linear" />);
      const linear = container.firstChild as HTMLElement;
      expect(linear).toHaveStyle({ height: '8px' });
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(<Loader className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('spinner has spin animation', () => {
      const { container } = render(<Loader type="spinner" />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('animate-spin');
    });

    it('spinner has rounded-full class', () => {
      const { container } = render(<Loader type="spinner" />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveClass('rounded-full');
    });

    it('linear has rounded-full class', () => {
      const { container } = render(<Loader type="linear" />);
      const linear = container.firstChild as HTMLElement;
      expect(linear).toHaveClass('rounded-full');
    });

    it('linear has overflow-hidden', () => {
      const { container } = render(<Loader type="linear" />);
      const linear = container.firstChild as HTMLElement;
      expect(linear).toHaveClass('overflow-hidden');
    });
  });

  describe('Colors', () => {
    it('active variant uses green color for spinner', () => {
      const { container } = render(<Loader type="spinner" variant="active" />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveStyle({ borderTopColor: '#00b56b' });
    });

    it('disabled variant uses gray color for spinner', () => {
      const { container } = render(<Loader type="spinner" variant="disabled" />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveStyle({ borderTopColor: '#a29fba' });
    });

    it('active variant uses green color for linear', () => {
      const { container } = render(<Loader type="linear" variant="active" />);
      const progressbar = container.querySelector('[role="progressbar"]');
      const bar = progressbar?.querySelector('div');
      expect(bar).toHaveStyle({ backgroundColor: '#00b56b' });
    });

    it('disabled variant uses gray color for linear', () => {
      const { container } = render(<Loader type="linear" variant="disabled" />);
      const progressbar = container.querySelector('[role="progressbar"]');
      const bar = progressbar?.querySelector('div');
      expect(bar).toHaveStyle({ backgroundColor: '#a29fba' });
    });
  });

  describe('HTML Attributes', () => {
    it('passes through HTML attributes', () => {
      render(<Loader data-testid="loader" id="test-loader" />);
      const loader = screen.getByTestId('loader');
      expect(loader).toHaveAttribute('id', 'test-loader');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(<Loader ref={ref} />);
      
      expect(ref.current).not.toBeNull();
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
    });
  });

  describe('Accessibility', () => {
    it('spinner has role="status"', () => {
      render(<Loader type="spinner" />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('linear has role="progressbar"', () => {
      render(<Loader type="linear" />);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('has aria-label', () => {
      render(<Loader />);
      expect(screen.getByLabelText('Cargando')).toBeInTheDocument();
    });

    it('linear has aria-valuemin and aria-valuemax', () => {
      render(<Loader type="linear" />);
      const loader = screen.getByRole('progressbar');
      expect(loader).toHaveAttribute('aria-valuemin', '0');
      expect(loader).toHaveAttribute('aria-valuemax', '100');
    });

    it('has sr-only text for screen readers', () => {
      render(<Loader />);
      const srText = screen.getByText('Cargando...');
      expect(srText).toHaveClass('sr-only');
    });
  });

  describe('Show/Hide Behavior', () => {
    it('shows loader when show is true', () => {
      render(<Loader show={true} />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('hides loader when show is false', () => {
      const { container } = render(<Loader show={false} />);
      expect(container.firstChild).toBeNull();
    });

    it('shows by default', () => {
      render(<Loader />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('returns null when show is false', () => {
      const { container } = render(<Loader show={false} />);
      expect(container.innerHTML).toBe('');
    });
  });

  describe('Animations', () => {
    it('spinner has animate-spin class', () => {
      const { container } = render(<Loader type="spinner" />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toBeInTheDocument();
    });

    it('linear progress bar has animation style', () => {
      const { container } = render(<Loader type="linear" />);
      const progressbar = container.querySelector('[role="progressbar"]');
      const bar = progressbar?.querySelector('div');
      expect(bar).toHaveStyle({ animation: 'linear-progress 1.5s ease-in-out infinite' });
    });
  });

  describe('Default Values', () => {
    it('uses spinner as default type', () => {
      render(<Loader />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('uses active as default variant', () => {
      const { container } = render(<Loader type="spinner" />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveStyle({ borderTopColor: '#00b56b' });
    });

    it('uses true as default show', () => {
      render(<Loader />);
      expect(screen.getByRole('status')).toBeInTheDocument();
    });

    it('uses 48 as default size for spinner', () => {
      const { container } = render(<Loader type="spinner" />);
      const spinner = container.querySelector('.animate-spin');
      expect(spinner).toHaveStyle({ width: '48px', height: '48px' });
    });

    it('uses 230 as default width for linear', () => {
      const { container } = render(<Loader type="linear" />);
      const linear = container.firstChild as HTMLElement;
      expect(linear).toHaveStyle({ width: '230px' });
    });
  });
});

