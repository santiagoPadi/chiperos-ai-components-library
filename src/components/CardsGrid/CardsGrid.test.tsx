import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { CardsGrid } from './index';
import { FeatureCard } from '../FeatureCard';
import { ActionCard } from '../ActionCard';

describe('CardsGrid', () => {
  describe('Rendering', () => {
    it('renders correctly', () => {
      const { container } = render(
        <CardsGrid columns={3}>
          <div>Card 1</div>
          <div>Card 2</div>
        </CardsGrid>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('renders children', () => {
      render(
        <CardsGrid columns={3}>
          <div>Card 1</div>
          <div>Card 2</div>
          <div>Card 3</div>
        </CardsGrid>
      );
      expect(screen.getByText('Card 1')).toBeInTheDocument();
      expect(screen.getByText('Card 2')).toBeInTheDocument();
      expect(screen.getByText('Card 3')).toBeInTheDocument();
    });

    it('renders with FeatureCard children', () => {
      render(
        <CardsGrid columns={2}>
          <FeatureCard title="Feature 1" description="Desc 1" icon={<div>Icon</div>} />
          <FeatureCard title="Feature 2" description="Desc 2" icon={<div>Icon</div>} />
        </CardsGrid>
      );
      expect(screen.getByText('Feature 1')).toBeInTheDocument();
      expect(screen.getByText('Feature 2')).toBeInTheDocument();
    });

    it('renders with ActionCard children', () => {
      render(
        <CardsGrid columns={2}>
          <ActionCard title="Action 1" description="Desc 1" icon={<div>Icon</div>} />
          <ActionCard title="Action 2" description="Desc 2" icon={<div>Icon</div>} />
        </CardsGrid>
      );
      expect(screen.getByText('Action 1')).toBeInTheDocument();
      expect(screen.getByText('Action 2')).toBeInTheDocument();
    });
  });

  describe('Columns', () => {
    it('applies correct columns class for desktop', () => {
      const { container } = render(
        <CardsGrid columns={3}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('lg:grid-cols-3');
    });

    it('applies correct columns class for 2 columns', () => {
      const { container } = render(
        <CardsGrid columns={2}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('lg:grid-cols-2');
    });

    it('applies correct columns class for 4 columns', () => {
      const { container } = render(
        <CardsGrid columns={4}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('lg:grid-cols-4');
    });

    it('applies mobile columns class', () => {
      const { container } = render(
        <CardsGrid columns={3} mobileColumns={1}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('grid-cols-1');
    });

    it('applies tablet columns class when provided', () => {
      const { container } = render(
        <CardsGrid columns={3} tabletColumns={2}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('md:grid-cols-2');
    });

    it('uses default mobile columns when not provided', () => {
      const { container } = render(
        <CardsGrid columns={3}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('grid-cols-1');
    });
  });

  describe('Gap', () => {
    it('uses default gap when not provided', () => {
      const { container } = render(
        <CardsGrid columns={3}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('gap-4');
    });

    it('applies custom numeric gap', () => {
      const { container } = render(
        <CardsGrid columns={3} gap={6}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('gap-6');
    });

    it('applies custom string gap via style', () => {
      const { container } = render(
        <CardsGrid columns={3} gap="2rem">
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveStyle({ gap: '2rem' });
    });

    it('applies gap 2', () => {
      const { container } = render(
        <CardsGrid columns={3} gap={2}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('gap-2');
    });

    it('applies gap 8', () => {
      const { container } = render(
        <CardsGrid columns={3} gap={8}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('gap-8');
    });
  });

  describe('Width', () => {
    it('applies w-full to children', () => {
      render(
        <CardsGrid columns={3}>
          <div data-testid="child">Card</div>
        </CardsGrid>
      );
      const child = screen.getByTestId('child');
      expect(child).toHaveClass('w-full');
    });

    it('preserves existing className on children', () => {
      render(
        <CardsGrid columns={3}>
          <div data-testid="child" className="custom-class">Card</div>
        </CardsGrid>
      );
      const child = screen.getByTestId('child');
      expect(child).toHaveClass('w-full');
      expect(child).toHaveClass('custom-class');
    });
  });

  describe('Styling', () => {
    it('has grid display', () => {
      const { container } = render(
        <CardsGrid columns={3}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('grid');
    });

    it('has full width', () => {
      const { container } = render(
        <CardsGrid columns={3}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('w-full');
    });

    it('applies custom className', () => {
      const { container } = render(
        <CardsGrid columns={3} className="custom-grid">
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('custom-grid');
    });

    it('applies custom style', () => {
      const { container } = render(
        <CardsGrid columns={3} style={{ padding: '20px' }}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveStyle({ padding: '20px' });
    });

    it('merges custom style with gap string', () => {
      const { container } = render(
        <CardsGrid columns={3} gap="2rem" style={{ padding: '20px' }}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveStyle({ gap: '2rem', padding: '20px' });
    });
  });

  describe('HTML Attributes', () => {
    it('forwards ref', () => {
      const ref = React.createRef<HTMLDivElement>();
      render(
        <CardsGrid columns={3} ref={ref}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(ref.current).not.toBeNull();
      expect(ref.current?.tagName).toBe('DIV');
    });

    it('passes through HTML attributes', () => {
      render(
        <CardsGrid columns={3} data-testid="grid" id="grid-id">
          <div>Card</div>
        </CardsGrid>
      );
      const grid = screen.getByTestId('grid');
      expect(grid).toHaveAttribute('id', 'grid-id');
    });
  });

  describe('Responsive', () => {
    it('applies all responsive classes', () => {
      const { container } = render(
        <CardsGrid columns={4} tabletColumns={2} mobileColumns={1}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('grid-cols-1');
      expect(container.firstChild).toHaveClass('md:grid-cols-2');
      expect(container.firstChild).toHaveClass('lg:grid-cols-4');
    });

    it('works without tabletColumns', () => {
      const { container } = render(
        <CardsGrid columns={3} mobileColumns={1}>
          <div>Card</div>
        </CardsGrid>
      );
      expect(container.firstChild).toHaveClass('grid-cols-1');
      expect(container.firstChild).toHaveClass('lg:grid-cols-3');
      expect(container.firstChild).not.toHaveClass('md:grid-cols-2');
    });
  });

  describe('Edge Cases', () => {
    it('handles single child', () => {
      render(
        <CardsGrid columns={3}>
          <div>Single Card</div>
        </CardsGrid>
      );
      expect(screen.getByText('Single Card')).toBeInTheDocument();
    });

    it('handles many children', () => {
      render(
        <CardsGrid columns={3}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i}>Card {i + 1}</div>
          ))}
        </CardsGrid>
      );
      expect(screen.getByText('Card 1')).toBeInTheDocument();
      expect(screen.getByText('Card 10')).toBeInTheDocument();
    });

    it('handles empty children', () => {
      const { container } = render(
        <CardsGrid columns={3}>
          {null}
        </CardsGrid>
      );
      expect(container.firstChild).toBeInTheDocument();
    });

    it('handles non-element children', () => {
      render(
        <CardsGrid columns={3}>
          Text content
        </CardsGrid>
      );
      expect(screen.getByText('Text content')).toBeInTheDocument();
    });
  });
});

