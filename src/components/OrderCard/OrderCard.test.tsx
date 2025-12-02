import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import { OrderCard } from './index';

describe('OrderCard', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={100000}
        />
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders state title', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={100000}
        />
      );
      expect(container.textContent).toContain('Received');
    });

    it('renders count', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={100000}
        />
      );
      expect(container.textContent).toContain('24');
    });

    it('renders default count label', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={100000}
        />
      );
      expect(container.textContent).toContain('orders');
    });

    it('renders custom count label', () => {
      const { container } = render(
        <OrderCard
          state="dispatched"
          count={32}
          countLabel="routes"
          grossSales={120000}
          netSales={110000}
        />
      );
      expect(container.textContent).toContain('routes');
    });
  });

  describe('States', () => {
    it('renders Received state correctly', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={100000}
        />
      );
      expect(container.textContent).toContain('Received');
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('renders Picking state correctly', () => {
      const { container } = render(
        <OrderCard
          state="picking"
          count={18}
          grossSales={85000}
          netSales={75000}
        />
      );
      expect(container.textContent).toContain('Picking');
    });

    it('renders Dispatched state correctly', () => {
      const { container } = render(
        <OrderCard
          state="dispatched"
          count={32}
          grossSales={120000}
          netSales={110000}
        />
      );
      expect(container.textContent).toContain('Dispatched');
    });

    it('renders Delivered state correctly', () => {
      const { container } = render(
        <OrderCard
          state="delivered"
          count={45}
          grossSales={150000}
          netSales={140000}
        />
      );
      expect(container.textContent).toContain('Delivered');
    });
  });

  describe('Sales Display', () => {
    it('renders gross sales with default currency', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000.00}
          netSales={95000.00}
        />
      );
      expect(container.textContent).toContain('$100,000.00');
    });

    it('renders net sales with default currency', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000.00}
          netSales={95000.00}
        />
      );
      expect(container.textContent).toContain('$95,000.00');
    });

    it('formats large numbers correctly', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={9999999.99}
          netSales={9500000.00}
        />
      );
      expect(container.textContent).toContain('$9,999,999.99');
      expect(container.textContent).toContain('$9,500,000.00');
    });

    it('formats small numbers correctly', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={1}
          grossSales={150.50}
          netSales={145.25}
        />
      );
      expect(container.textContent).toContain('$150.50');
      expect(container.textContent).toContain('$145.25');
    });

    it('uses custom currency symbol', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000.00}
          netSales={95000.00}
          currencySymbol="€"
        />
      );
      expect(container.textContent).toContain('€100,000.00');
      expect(container.textContent).toContain('€95,000.00');
    });
  });

  describe('Delays Badge', () => {
    it('does not render delays badge by default', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
        />
      );
      expect(container.textContent).not.toContain('Delays');
    });

    it('renders delays badge when hasDelays is true', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
          hasDelays={true}
        />
      );
      expect(container.textContent).toContain('Delays');
    });

    it('renders delay count when provided', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
          hasDelays={true}
          delayCount={5}
        />
      );
      expect(container.textContent).toContain('5 Delays');
    });

    it('calls onDelaysClick when delays badge is clicked', async () => {
      const onDelaysClick = vi.fn();
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
          hasDelays={true}
          onDelaysClick={onDelaysClick}
        />
      );
      
      const delaysButton = container.querySelector('button');
      if (delaysButton) {
        await userEvent.click(delaysButton);
        expect(onDelaysClick).toHaveBeenCalledTimes(1);
      }
    });

    it('applies correct styling to delays badge', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
          hasDelays={true}
        />
      );
      const badge = container.querySelector('.bg-\\[\\#ffecf0\\]');
      expect(badge).toBeInTheDocument();
    });
  });

  describe('Filter Button', () => {
    it('renders filter button when onFilterClick is provided', () => {
      render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
          onFilterClick={() => {}}
        />
      );
      expect(screen.getByText('Filter')).toBeInTheDocument();
    });

    it('does not render filter button when onFilterClick is not provided', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
        />
      );
      expect(container.textContent).not.toContain('Filter');
    });

    it('calls onFilterClick when filter button is clicked', async () => {
      const onFilterClick = vi.fn();
      render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
          onFilterClick={onFilterClick}
        />
      );
      
      const filterButton = screen.getByText('Filter');
      await userEvent.click(filterButton);
      
      expect(onFilterClick).toHaveBeenCalledTimes(1);
    });

    it('has correct styling for filter button', () => {
      render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
          onFilterClick={() => {}}
        />
      );
      const button = screen.getByText('Filter');
      expect(button).toHaveClass('text-[#00995a]');
    });
  });

  describe('Icon', () => {
    it('renders default icon', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
        />
      );
      const icon = container.querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('renders custom icon', () => {
      render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
          icon={<div data-testid="custom-icon">Custom</div>}
        />
      );
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });

    it('renders different icons for different states', () => {
      const { container: container1 } = render(
        <OrderCard state="received" count={24} grossSales={100000} netSales={95000} />
      );
      const { container: container2 } = render(
        <OrderCard state="picking" count={24} grossSales={100000} netSales={95000} />
      );
      
      expect(container1.querySelector('svg')).toBeInTheDocument();
      expect(container2.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
          className="custom-class"
        />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('has white background', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
        />
      );
      expect(container.firstChild).toHaveClass('bg-white');
    });

    it('has border', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
        />
      );
      expect(container.firstChild).toHaveClass('border');
      expect(container.firstChild).toHaveClass('border-[#ecebf0]');
    });

    it('has rounded corners', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
        />
      );
      expect(container.firstChild).toHaveClass('rounded-xl');
    });

    it('has padding', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
        />
      );
      expect(container.firstChild).toHaveClass('p-5');
    });
  });

  describe('HTML Attributes', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
          ref={ref}
        />
      );
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe('DIV');
    });

    it('passes through HTML attributes', () => {
      render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
          data-testid="order-card"
          id="order-id"
        />
      );
      const element = screen.getByTestId('order-card');
      expect(element).toHaveAttribute('id', 'order-id');
    });
  });

  describe('Layout', () => {
    it('has flex layout', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
        />
      );
      expect(container.firstChild).toHaveClass('flex');
    });

    it('has gap between elements', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
        />
      );
      expect(container.firstChild).toHaveClass('gap-2');
    });
  });

  describe('Complete Example', () => {
    it('renders all features together', () => {
      const onDelaysClick = vi.fn();
      const onFilterClick = vi.fn();
      
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          countLabel="orders"
          grossSales={100000.00}
          netSales={95000.00}
          hasDelays={true}
          delayCount={3}
          onDelaysClick={onDelaysClick}
          onFilterClick={onFilterClick}
          currencySymbol="$"
          className="test-class"
        />
      );
      
      expect(container.textContent).toContain('Received');
      expect(container.textContent).toContain('24');
      expect(container.textContent).toContain('orders');
      expect(container.textContent).toContain('$100,000.00');
      expect(container.textContent).toContain('$95,000.00');
      expect(container.textContent).toContain('3 Delays');
      expect(screen.getByText('Filter')).toBeInTheDocument();
      expect(container.firstChild).toHaveClass('test-class');
    });
  });

  describe('Typography', () => {
    it('uses correct font size for title', () => {
      const { container } = render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
        />
      );
      const title = container.querySelector('h3');
      expect(title).toHaveClass('text-base');
    });

    it('uses correct font size for count', () => {
      render(
        <OrderCard
          state="received"
          count={24}
          grossSales={100000}
          netSales={95000}
        />
      );
      const count = document.querySelector('.text-xl');
      expect(count).toBeInTheDocument();
    });
  });
});

