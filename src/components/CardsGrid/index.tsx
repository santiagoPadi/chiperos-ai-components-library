import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CardsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Número de columnas del grid
   * @example 3
   */
  columns: number;
  
  /**
   * Gap entre las cards (en Tailwind units o px)
   * @default 4
   * @example 6 // gap-6
   * @example "1.5rem" // custom gap
   */
  gap?: number | string;
  
  /**
   * Número de columnas en tablets (opcional, responsive)
   * @example 2
   */
  tabletColumns?: number;
  
  /**
   * Número de columnas en móviles (opcional, responsive)
   * @default 1
   * @example 1
   */
  mobileColumns?: number;
  
  /**
   * Children (cards u otros componentes)
   */
  children: React.ReactNode;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

/**
 * Componente CardsGrid
 * 
 * Contenedor de grid para organizar cards de forma responsive.
 * Ajusta automáticamente el ancho de las cards al 100% del espacio disponible.
 * 
 * @example
 * ```tsx
 * <CardsGrid columns={3} gap={6}>
 *   <FeatureCard title="Feature 1" description="..." icon={<Icon />} />
 *   <FeatureCard title="Feature 2" description="..." icon={<Icon />} />
 *   <FeatureCard title="Feature 3" description="..." icon={<Icon />} />
 * </CardsGrid>
 * ```
 * 
 * @example Con responsive
 * ```tsx
 * <CardsGrid columns={3} tabletColumns={2} mobileColumns={1} gap={4}>
 *   <ActionCard title="Action 1" description="..." icon={<Icon />} />
 *   <ActionCard title="Action 2" description="..." icon={<Icon />} />
 * </CardsGrid>
 * ```
 */
export const CardsGrid = React.forwardRef<HTMLDivElement, CardsGridProps>(
  (
    {
      columns,
      gap = 4,
      tabletColumns,
      mobileColumns = 1,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Convertir gap a clase de Tailwind si es número
    const getGapClass = () => {
      if (typeof gap === 'number') {
        return `gap-${gap}`;
      }
      return '';
    };

    // Crear clases responsive para columnas
    const getColumnsClasses = () => {
      const classes = [];
      
      // Mobile (default)
      classes.push(`grid-cols-${mobileColumns}`);
      
      // Tablet
      if (tabletColumns) {
        classes.push(`md:grid-cols-${tabletColumns}`);
      }
      
      // Desktop
      classes.push(`lg:grid-cols-${columns}`);
      
      return classes.join(' ');
    };

    // Style para gap custom (si es string)
    const customStyle = typeof gap === 'string' 
      ? { gap, ...style } 
      : style;

    return (
      <div
        ref={ref}
        className={cn(
          'grid w-full',
          getGapClass(),
          getColumnsClasses(),
          className
        )}
        style={customStyle}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // Forzar width 100% en cada card
            return React.cloneElement(child, {
              ...child.props,
              className: cn('w-full', child.props.className),
            } as any);
          }
          return child;
        })}
      </div>
    );
  }
);

CardsGrid.displayName = 'CardsGrid';

