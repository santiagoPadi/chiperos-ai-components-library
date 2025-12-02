import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { KPIComparison } from './index';

describe('KPIComparison', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders percentage with positive sign', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      expect(container.textContent).toContain('+1.0%');
    });

    it('renders percentage with negative sign', () => {
      const { container } = render(
        <KPIComparison percentage={-10} trend="negative" />
      );
      expect(container.textContent).toContain('-10.0%');
    });

    it('renders default label', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      expect(container.textContent).toContain('KPI comparison');
    });

    it('renders custom label', () => {
      const { container } = render(
        <KPIComparison percentage={5.0} trend="positive" label="vs last month" />
      );
      expect(container.textContent).toContain('vs last month');
    });
  });

  describe('Trend Icons', () => {
    it('renders trend up icon for positive trend', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('renders trend down icon for negative trend', () => {
      const { container } = render(
        <KPIComparison percentage={-10} trend="negative" />
      );
      const svg = container.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });

    it('applies correct color for positive trend', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      const icon = container.querySelector('svg');
      expect(icon).toHaveClass('text-[#00995a]');
    });

    it('applies correct color for negative trend', () => {
      const { container } = render(
        <KPIComparison percentage={-10} trend="negative" />
      );
      const icon = container.querySelector('svg');
      expect(icon).toHaveClass('text-[#d4002c]');
    });
  });

  describe('Warning Icon', () => {
    it('does not render warning icon by default', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      const svgs = container.querySelectorAll('svg');
      expect(svgs).toHaveLength(1); // Solo el icono de tendencia
    });

    it('renders warning icon when showWarning is true', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" showWarning={true} />
      );
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(1); // Icono de tendencia + warning
    });

    it('applies correct color to warning icon', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" showWarning={true} />
      );
      const svgs = container.querySelectorAll('svg');
      const warningIcon = svgs[svgs.length - 1]; // Último SVG es el warning
      expect(warningIcon).toHaveClass('text-[#d4002c]');
    });
  });

  describe('Percentage Formatting', () => {
    it('formats positive percentage correctly', () => {
      const { container } = render(
        <KPIComparison percentage={5.2} trend="positive" />
      );
      expect(container.textContent).toContain('+5.2%');
    });

    it('formats negative percentage correctly', () => {
      const { container } = render(
        <KPIComparison percentage={-10.5} trend="negative" />
      );
      expect(container.textContent).toContain('-10.5%');
    });

    it('formats zero percentage correctly', () => {
      const { container } = render(
        <KPIComparison percentage={0} trend="positive" />
      );
      expect(container.textContent).toContain('0.0%');
    });

    it('rounds percentage to one decimal place', () => {
      const { container } = render(
        <KPIComparison percentage={1.456} trend="positive" />
      );
      expect(container.textContent).toContain('+1.5%');
    });

    it('formats large numbers correctly', () => {
      const { container } = render(
        <KPIComparison percentage={125.8} trend="positive" />
      );
      expect(container.textContent).toContain('+125.8%');
    });
  });

  describe('Text Colors', () => {
    it('applies green color for positive percentage', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      const percentageText = container.querySelector('.text-\\[\\#00995a\\]');
      expect(percentageText).toBeInTheDocument();
    });

    it('applies red color for negative percentage', () => {
      const { container } = render(
        <KPIComparison percentage={-10} trend="negative" />
      );
      const percentageText = container.querySelector('.text-\\[\\#d4002c\\]');
      expect(percentageText).toBeInTheDocument();
    });

    it('applies secondary color for label', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" label="Test label" />
      );
      const labelText = container.querySelector('.text-\\[\\#575385\\]');
      expect(labelText).toBeInTheDocument();
      expect(labelText?.textContent).toBe('Test label');
    });
  });

  describe('Custom Props', () => {
    it('applies custom className', () => {
      const { container } = render(
        <KPIComparison 
          percentage={1.0} 
          trend="positive" 
          className="custom-class" 
        />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <KPIComparison percentage={1.0} trend="positive" ref={ref} />
      );
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe('DIV');
    });

    it('passes through HTML attributes', () => {
      render(
        <KPIComparison 
          percentage={1.0} 
          trend="positive" 
          data-testid="kpi-test"
          id="kpi-id"
        />
      );
      const element = screen.getByTestId('kpi-test');
      expect(element).toHaveAttribute('id', 'kpi-id');
    });
  });

  describe('Layout', () => {
    it('has flex layout', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      expect(container.firstChild).toHaveClass('flex');
      expect(container.firstChild).toHaveClass('items-center');
    });

    it('has space-between justify when warning is shown', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" showWarning={true} />
      );
      expect(container.firstChild).toHaveClass('justify-between');
    });

    it('has full width', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      expect(container.firstChild).toHaveClass('w-full');
    });
  });

  describe('Typography', () => {
    it('uses correct font size for text', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      const textElements = container.querySelectorAll('.text-xs');
      expect(textElements.length).toBeGreaterThan(0);
    });

    it('uses correct line height', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      const textElements = container.querySelectorAll('.leading-\\[14px\\]');
      expect(textElements.length).toBeGreaterThan(0);
    });

    it('applies whitespace-nowrap to prevent wrapping', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      const nowrapElements = container.querySelectorAll('.whitespace-nowrap');
      expect(nowrapElements.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles very small positive percentage', () => {
      const { container } = render(
        <KPIComparison percentage={0.1} trend="positive" />
      );
      expect(container.textContent).toContain('+0.1%');
    });

    it('handles very small negative percentage', () => {
      const { container } = render(
        <KPIComparison percentage={-0.1} trend="negative" />
      );
      expect(container.textContent).toContain('-0.1%');
    });

    it('handles very large percentage', () => {
      const { container } = render(
        <KPIComparison percentage={999.9} trend="positive" />
      );
      expect(container.textContent).toContain('+999.9%');
    });

    it('handles empty label', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" label="" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('is accessible as a div element', () => {
      const { container } = render(
        <KPIComparison percentage={1.0} trend="positive" />
      );
      expect(container.firstChild?.nodeName).toBe('DIV');
    });

    it('can receive aria-label', () => {
      render(
        <KPIComparison 
          percentage={1.0} 
          trend="positive" 
          aria-label="KPI increase of 1 percent"
        />
      );
      const element = screen.getByLabelText('KPI increase of 1 percent');
      expect(element).toBeInTheDocument();
    });
  });
});

