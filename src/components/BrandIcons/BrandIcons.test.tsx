import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrandIcons, LOGO_ASSETS } from './index';

describe('BrandIcons', () => {
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<BrandIcons />);
      const logo = screen.getByRole('img');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('alt', 'Chiperos Logo');
    });

    it('renders with custom alt text', () => {
      render(<BrandIcons alt="Custom Logo" />);
      const logo = screen.getByAltText('Custom Logo');
      expect(logo).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<BrandIcons className="custom-class" />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveClass('custom-class');
      expect(logo).toHaveClass('inline-block'); // Base class
    });
  });

  describe('Size Variants', () => {
    it('renders large size correctly', () => {
      render(<BrandIcons size="large" />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('width', '143');
      expect(logo).toHaveAttribute('height', '32');
    });

    it('renders small size correctly', () => {
      render(<BrandIcons size="small" />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('width', '40');
      expect(logo).toHaveAttribute('height', '32');
    });
  });

  describe('Mode Variants', () => {
    it('renders dark mode correctly (default)', () => {
      render(<BrandIcons mode="dark" size="large" />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('src', LOGO_ASSETS.largeDark);
    });

    it('renders light mode correctly', () => {
      render(<BrandIcons mode="light" size="large" />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('src', LOGO_ASSETS.largeLight);
    });

    it('renders small dark mode correctly', () => {
      render(<BrandIcons mode="dark" size="small" />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('src', LOGO_ASSETS.smallDark);
    });

    it('renders small light mode correctly', () => {
      render(<BrandIcons mode="light" size="small" />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('src', LOGO_ASSETS.smallLight);
    });
  });

  describe('Gradient Variant', () => {
    it('renders large logo with gradient', () => {
      render(<BrandIcons size="large" gradient />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('src', LOGO_ASSETS.gradientLarge);
    });

    it('gradient only applies to large size', () => {
      render(<BrandIcons size="small" gradient mode="dark" />);
      const logo = screen.getByRole('img');
      // Small logos don't have gradient variant, should use regular dark
      expect(logo).toHaveAttribute('src', LOGO_ASSETS.smallDark);
    });
  });

  describe('HTML Attributes', () => {
    it('passes through standard img attributes', () => {
      render(
        <BrandIcons
          title="Company Logo"
          loading="lazy"
          data-testid="brand-logo"
        />
      );
      const logo = screen.getByTestId('brand-logo');
      expect(logo).toHaveAttribute('title', 'Company Logo');
      expect(logo).toHaveAttribute('loading', 'lazy');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<BrandIcons ref={ref as any} />);
      expect(ref.current).not.toBeNull();
    });
  });

  describe('Default Behavior', () => {
    it('uses large dark as default when no props provided', () => {
      render(<BrandIcons />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('src', LOGO_ASSETS.largeDark);
      expect(logo).toHaveAttribute('width', '143');
      expect(logo).toHaveAttribute('height', '32');
    });
  });

  describe('Asset URLs', () => {
    it('exports LOGO_ASSETS constant', () => {
      expect(LOGO_ASSETS).toBeDefined();
      expect(LOGO_ASSETS.largeDark).toContain('figma.com');
      expect(LOGO_ASSETS.largeLight).toContain('figma.com');
      expect(LOGO_ASSETS.smallDark).toContain('figma.com');
      expect(LOGO_ASSETS.smallLight).toContain('figma.com');
      expect(LOGO_ASSETS.gradientLarge).toContain('figma.com');
    });
  });

  describe('Accessibility', () => {
    it('has proper img role', () => {
      render(<BrandIcons />);
      expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('has alt text by default', () => {
      render(<BrandIcons />);
      const logo = screen.getByRole('img');
      expect(logo).toHaveAttribute('alt');
    });

    it('allows custom alt text for accessibility', () => {
      render(<BrandIcons alt="Chiperos - Company Logo" />);
      expect(screen.getByAltText('Chiperos - Company Logo')).toBeInTheDocument();
    });
  });
});

