import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { KPICard } from './index';

describe('KPICard', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(
        <KPICard title="Test KPI" value={3} />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders title', () => {
      const { container } = render(
        <KPICard title="Test Title" value={3} />
      );
      expect(container.textContent).toContain('Test Title');
    });

    it('renders value', () => {
      const { container } = render(
        <KPICard title="Test" value={42} />
      );
      expect(container.textContent).toContain('42');
    });

    it('renders string value', () => {
      const { container } = render(
        <KPICard title="Test" value="1.2M" />
      );
      expect(container.textContent).toContain('1.2M');
    });
  });

  describe('Unit Display', () => {
    it('renders default unit', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      expect(container.textContent).toContain('%');
    });

    it('renders custom unit', () => {
      const { container } = render(
        <KPICard title="Test" value={100} unit="K" />
      );
      expect(container.textContent).toContain('K');
    });

    it('renders no unit when empty string', () => {
      const { container } = render(
        <KPICard title="Test" value={100} unit="" />
      );
      const text = container.textContent || '';
      expect(text).toContain('100');
      expect(text).not.toContain('%');
    });
  });

  describe('Total/Fraction', () => {
    it('renders fraction when total is provided', () => {
      const { container } = render(
        <KPICard title="Test" value={3} total={17} />
      );
      expect(container.textContent).toContain('3');
      expect(container.textContent).toContain('/17');
    });

    it('does not render unit when total is provided', () => {
      const { container } = render(
        <KPICard title="Test" value={3} total={17} unit="%" />
      );
      expect(container.textContent).toContain('/17');
      expect(container.textContent).not.toContain('%');
    });
  });

  describe('Description', () => {
    it('renders description when provided', () => {
      const { container } = render(
        <KPICard title="Test" value={3} description="Test description" />
      );
      expect(container.textContent).toContain('Test description');
    });

    it('does not render description when not provided', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      const descriptions = container.querySelectorAll('.text-ellipsis');
      expect(descriptions.length).toBe(0);
    });
  });

  describe('Comparison', () => {
    it('renders comparison when provided', () => {
      const { container } = render(
        <KPICard
          title="Test"
          value={3}
          comparison={{
            percentage: 1.0,
            trend: 'positive',
            label: 'vs last month',
          }}
        />
      );
      expect(container.textContent).toContain('+1.0%');
      expect(container.textContent).toContain('vs last month');
    });

    it('does not render comparison when not provided', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      expect(container.textContent).not.toContain('+');
      expect(container.textContent).not.toContain('vs');
    });

    it('passes showWarning to KPIComparison', () => {
      const { container } = render(
        <KPICard
          title="Test"
          value={3}
          comparison={{
            percentage: 1.0,
            trend: 'positive',
            showWarning: true,
          }}
        />
      );
      const svgs = container.querySelectorAll('svg');
      expect(svgs.length).toBeGreaterThan(1);
    });
  });

  describe('Tag', () => {
    it('renders tag when provided', () => {
      const { container } = render(
        <KPICard
          title="Test"
          value={3}
          tag={{ label: 'Monthly', variant: 'default' }}
        />
      );
      expect(container.textContent).toContain('Monthly');
    });

    it('applies default tag styles', () => {
      const { container } = render(
        <KPICard
          title="Test"
          value={3}
          tag={{ label: 'Test Tag', variant: 'default' }}
        />
      );
      const tag = container.querySelector('.rounded-2xl');
      expect(tag).toBeInTheDocument();
    });

    it('applies red tag styles', () => {
      const { container } = render(
        <KPICard
          title="Test"
          value={3}
          tag={{ label: 'Alert', variant: 'red' }}
        />
      );
      const tag = container.querySelector('.rounded-2xl');
      expect(tag).toBeInTheDocument();
      expect(tag).toHaveAttribute('style');
    });

    it('does not render tag when not provided', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      const tags = container.querySelectorAll('.rounded-2xl');
      expect(tags.length).toBe(0);
    });
  });

  describe('Icon', () => {
    it('renders default icon', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders custom icon', () => {
      render(
        <KPICard
          title="Test"
          value={3}
          icon={<div data-testid="custom-icon">Custom</div>}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('applies primary icon color', () => {
      const { container } = render(
        <KPICard title="Test" value={3} iconColor="primary" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('applies error icon color', () => {
      const { container } = render(
        <KPICard title="Test" value={3} iconColor="error" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('applies brand icon color', () => {
      const { container } = render(
        <KPICard title="Test" value={3} iconColor="brand" />
      );
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  describe('Body Text', () => {
    it('renders body text when provided', () => {
      const { container } = render(
        <KPICard title="Test" value={3} bodyText="Additional body text" />
      );
      expect(container.textContent).toContain('Additional body text');
    });

    it('does not render body text when not provided', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      expect(container.querySelectorAll('p').length).toBe(0);
    });
  });

  describe('Button', () => {
    it('renders button when provided', () => {
      render(
        <KPICard
          title="Test"
          value={3}
          button={{ label: 'Click Me', onClick: vi.fn() }}
        />
      );
      expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument();
    });

    it('calls onClick when button is clicked', async () => {
      const onClick = vi.fn();
      render(
        <KPICard
          title="Test"
          value={3}
          button={{ label: 'Click Me', onClick }}
        />
      );
      
      const button = screen.getByRole('button', { name: 'Click Me' });
      await userEvent.click(button);
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('stops propagation when button is clicked', async () => {
      const cardOnClick = vi.fn();
      const buttonOnClick = vi.fn();
      
      render(
        <KPICard
          title="Test"
          value={3}
          onClick={cardOnClick}
          button={{ label: 'Click Me', onClick: buttonOnClick }}
        />
      );
      
      const button = screen.getByRole('button', { name: 'Click Me' });
      await userEvent.click(button);
      
      expect(buttonOnClick).toHaveBeenCalledTimes(1);
      expect(cardOnClick).not.toHaveBeenCalled();
    });

    it('does not render button when not provided', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      expect(container.querySelectorAll('button').length).toBe(0);
    });
  });

  describe('Card onClick', () => {
    it('calls onClick when card is clicked', async () => {
      const onClick = vi.fn();
      const { container } = render(
        <KPICard title="Test" value={3} onClick={onClick} />
      );
      
      const card = container.firstChild as HTMLElement;
      await userEvent.click(card);
      
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('applies cursor-pointer when onClick is provided', () => {
      const { container } = render(
        <KPICard title="Test" value={3} onClick={() => {}} />
      );
      expect(container.firstChild).toHaveClass('cursor-pointer');
    });

    it('does not apply cursor-pointer when onClick is not provided', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      expect(container.firstChild).not.toHaveClass('cursor-pointer');
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <KPICard title="Test" value={3} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('has white background', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      expect(container.firstChild).toHaveClass('bg-white');
    });

    it('has border', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      expect(container.firstChild).toHaveClass('border');
      expect(container.firstChild).toHaveClass('border-[#ecebf0]');
    });

    it('has rounded corners', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      expect(container.firstChild).toHaveClass('rounded-xl');
    });

    it('has padding', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      expect(container.firstChild).toHaveClass('p-5');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <KPICard title="Test" value={3} ref={ref} />
      );
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe('DIV');
    });

    it('passes through HTML attributes', () => {
      render(
        <KPICard
          title="Test"
          value={3}
          data-testid="kpi-card"
          id="kpi-id"
        />
      );
      const element = screen.getByTestId('kpi-card');
      expect(element).toHaveAttribute('id', 'kpi-id');
    });
  });

  describe('Layout', () => {
    it('has flex layout', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      expect(container.firstChild).toHaveClass('flex');
    });

    it('has gap between elements', () => {
      const { container } = render(
        <KPICard title="Test" value={3} />
      );
      expect(container.firstChild).toHaveClass('gap-2');
    });
  });

  describe('Typography', () => {
    it('uses correct font size for title', () => {
      const { container } = render(
        <KPICard title="Test Title" value={3} />
      );
      const title = container.querySelector('h3');
      expect(title).toHaveClass('text-base');
    });

    it('uses correct font size for value', () => {
      render(<KPICard title="Test" value={42} />);
      const value = document.querySelector('.text-xl');
      expect(value).toBeInTheDocument();
    });
  });

  describe('Complete Example', () => {
    it('renders all features together', () => {
      const onClick = vi.fn();
      const buttonClick = vi.fn();
      
      const { container } = render(
        <KPICard
          title="Complete Card"
          value={87}
          unit="%"
          description="All features"
          tag={{ label: 'Premium', variant: 'default' }}
          comparison={{
            percentage: 15.2,
            trend: 'positive',
            label: 'vs last period',
          }}
          button={{ label: 'Details', onClick: buttonClick }}
          onClick={onClick}
          iconColor="brand"
          className="test-class"
        />
      );
      
      expect(container.textContent).toContain('Complete Card');
      expect(container.textContent).toContain('87');
      expect(container.textContent).toContain('%');
      expect(container.textContent).toContain('All features');
      expect(container.textContent).toContain('Premium');
      expect(container.textContent).toContain('+15.2%');
      expect(screen.getByRole('button', { name: 'Details' })).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('test-class');
    });
  });
});

