import * as React from 'react';
import { cn } from '../../lib/utils';

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Título de la característica
   */
  title: string;
  
  /**
   * Descripción de la característica
   */
  description: string;
  
  /**
   * Ícono de la característica (React node)
   */
  icon: React.ReactNode;
  
  /**
   * Background del contenedor del ícono
   * @default "#e6f8ef"
   */
  iconBackground?: string;
  
  /**
   * Callback al hacer clic en la card
   */
  onClick?: () => void;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

/**
 * Componente FeatureCard
 * 
 * Card centrada para destacar características o features.
 * Ideal para landing pages, páginas de bienvenida y showcase de características.
 * 
 * @example
 * ```tsx
 * <FeatureCard
 *   icon={<Lock size={32} color="#00995a" strokeWidth={2} />}
 *   title="Built for Security"
 *   description="Your data is protected by enterprise-grade, zero-trust architecture."
 * />
 * ```
 */
export const FeatureCard = React.forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      title,
      description,
      icon,
      iconBackground = '#e6f8ef',
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'bg-white border border-[#ecebf0] rounded-lg p-8 flex flex-col items-center gap-8 w-96',
          onClick && 'cursor-pointer hover:shadow-md transition-shadow',
          className
        )}
        {...props}
      >
        {/* Ícono */}
        <div
          className="flex items-center justify-center rounded-lg shrink-0"
          style={{
            width: '56px',
            height: '56px',
            backgroundColor: iconBackground,
          }}
        >
          {icon}
        </div>

        {/* Contenido */}
        <div className="flex flex-col gap-2 items-center text-center" style={{ width: '300px' }}>
          {/* Título */}
          <h3
            className="text-2xl leading-8 font-medium text-[#312e4d]"
            style={{ fontFamily: 'Causten Round, sans-serif' }}
          >
            {title}
          </h3>
          
          {/* Descripción */}
          <p
            className="text-base leading-5 font-normal text-[#575385]"
            style={{ fontFamily: 'Causten Round, sans-serif' }}
          >
            {description}
          </p>
        </div>
      </div>
    );
  }
);

FeatureCard.displayName = 'FeatureCard';
