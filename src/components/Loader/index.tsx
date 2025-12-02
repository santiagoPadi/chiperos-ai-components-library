import * as React from 'react';
import { cn } from '../../lib/utils';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tipo de loader
   * @default "spinner"
   */
  type?: 'spinner' | 'linear';
  
  /**
   * Controla la visibilidad del loader
   * @default true
   */
  show?: boolean;
  
  /**
   * Variante del loader (active o disabled)
   * @default "active"
   */
  variant?: 'active' | 'disabled';
  
  /**
   * Tamaño del spinner (solo para type="spinner")
   * @default 48
   */
  size?: number;
  
  /**
   * Ancho de la barra (solo para type="linear")
   * @default 230
   */
  width?: number;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

/**
 * Componente Loader - Indicadores de carga
 * 
 * Muestra indicadores de carga con dos tipos:
 * - spinner: Loader circular que gira
 * - linear: Barra de progreso horizontal animada
 * 
 * Incluye parámetro show para controlar visibilidad.
 */
const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (
    {
      type = 'spinner',
      show = true,
      variant = 'active',
      size = 48,
      width = 230,
      className,
      ...props
    },
    ref
  ) => {
    // No renderizar si show es false
    if (!show) {
      return null;
    }

    // Colores según variante
    const colors = {
      active: '#00b56b',
      disabled: '#a29fba',
    };

    const color = colors[variant];

    // Spinner circular
    if (type === 'spinner') {
      return (
        <div
          ref={ref}
          className={cn('inline-flex items-center justify-center', className)}
          role="status"
          aria-label="Cargando"
          {...props}
        >
          <div
            className="rounded-full animate-spin"
            style={{
              width: size,
              height: size,
              border: `4px solid transparent`,
              borderTopColor: color,
              borderRightColor: color,
            }}
          />
          <span className="sr-only">Cargando...</span>
        </div>
      );
    }

    // Linear progress bar
    return (
      <div
        ref={ref}
        className={cn('relative overflow-hidden rounded-full bg-gray-200', className)}
        style={{
          width,
          height: 8,
        }}
        role="progressbar"
        aria-label="Cargando"
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            backgroundColor: color,
            animation: 'linear-progress 1.5s ease-in-out infinite',
          }}
        />
        <span className="sr-only">Cargando...</span>
      </div>
    );
  }
);

Loader.displayName = 'Loader';

export { Loader };

