import * as React from 'react';
import { cn } from '../../lib/utils';

export interface KPIComparisonCustomProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Ícono izquierdo personalizado
   */
  icon: React.ReactNode;
  
  /**
   * Texto principal (ej: porcentaje, valor, etc.)
   */
  primaryText: string;
  
  /**
   * Color del texto principal
   * @default "#312e4d"
   */
  primaryTextColor?: string;
  
  /**
   * Texto secundario/label
   */
  secondaryText?: string;
  
  /**
   * Color del texto secundario
   * @default "#575385"
   */
  secondaryTextColor?: string;
  
  /**
   * Ícono derecho opcional (ej: warning)
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

/**
 * Componente KPIComparisonCustom
 * 
 * Versión completamente personalizable de KPIComparison donde puedes
 * especificar cualquier ícono, texto y colores sin limitaciones de
 * tendencias predefinidas.
 * 
 * @example
 * ```tsx
 * <KPIComparisonCustom
 *   icon={<CustomIcon />}
 *   primaryText="1.2M"
 *   primaryTextColor="#00995a"
 *   secondaryText="total users"
 *   rightIcon={<InfoIcon />}
 * />
 * ```
 */
export const KPIComparisonCustom = React.forwardRef<HTMLDivElement, KPIComparisonCustomProps>(
  (
    {
      icon,
      primaryText,
      primaryTextColor = '#312e4d',
      secondaryText,
      secondaryTextColor = '#575385',
      rightIcon,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center justify-between w-full',
          className
        )}
        {...props}
      >
        <div className="flex items-center gap-1">
          {/* Ícono izquierdo */}
          <div className="shrink-0">
            {icon}
          </div>
          
          {/* Texto principal */}
          <span
            className="text-xs leading-[14px] font-normal whitespace-nowrap"
            style={{ 
              fontFamily: 'Causten Round, sans-serif',
              color: primaryTextColor,
            }}
          >
            {primaryText}
          </span>
          
          {/* Texto secundario */}
          {secondaryText && (
            <span
              className="text-xs leading-[14px] font-normal whitespace-nowrap"
              style={{ 
                fontFamily: 'Causten Round, sans-serif',
                color: secondaryTextColor,
              }}
            >
              {secondaryText}
            </span>
          )}
        </div>
        
        {/* Ícono derecho opcional */}
        {rightIcon && (
          <div className="shrink-0">
            {rightIcon}
          </div>
        )}
      </div>
    );
  }
);

KPIComparisonCustom.displayName = 'KPIComparisonCustom';

