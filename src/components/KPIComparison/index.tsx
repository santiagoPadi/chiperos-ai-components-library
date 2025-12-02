import * as React from 'react';
import { cn } from '../../lib/utils';

export interface KPIComparisonProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Porcentaje de cambio (puede ser positivo o negativo)
   * @example 1.0, -10.5
   */
  percentage: number;
  
  /**
   * Tendencia del KPI
   * - 'positive': Verde con flecha arriba
   * - 'negative': Rojo con flecha abajo
   */
  trend: 'positive' | 'negative';
  
  /**
   * Texto descriptivo al lado del porcentaje
   * @default "KPI comparison"
   */
  label?: string;
  
  /**
   * Mostrar ícono de alerta/warning
   * @default false
   */
  showWarning?: boolean;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

// Ícono de tendencia arriba (TrendUp)
const TrendUpIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11 3L6.5 7.5L4 5L1 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 3H11V6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Ícono de tendencia abajo (TrendDown)
const TrendDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M11 9L6.5 4.5L4 7L1 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 9H11V6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Ícono de advertencia (WarningCircle)
const WarningIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle
      cx="8"
      cy="8"
      r="6.375"
      stroke="currentColor"
      strokeWidth="1.25"
    />
    <path
      d="M8 4.5V8.5"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <circle
      cx="8"
      cy="11"
      r="0.5"
      fill="currentColor"
    />
  </svg>
);

/**
 * Componente KPIComparison
 * 
 * Muestra una comparación de KPI con tendencia (positiva o negativa)
 * y un ícono de alerta opcional.
 * 
 * @example
 * ```tsx
 * <KPIComparison percentage={1.0} trend="positive" label="KPI comparison" />
 * <KPIComparison percentage={-10} trend="negative" showWarning={true} />
 * ```
 */
export const KPIComparison = React.forwardRef<HTMLDivElement, KPIComparisonProps>(
  (
    {
      percentage,
      trend,
      label = 'KPI comparison',
      showWarning = false,
      className,
      ...props
    },
    ref
  ) => {
    const isPositive = trend === 'positive';
    const formattedPercentage = percentage > 0 ? `+${percentage.toFixed(1)}%` : `${percentage.toFixed(1)}%`;
    
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
          {isPositive ? (
            <TrendUpIcon className="text-[#00995a] shrink-0" />
          ) : (
            <TrendDownIcon className="text-[#d4002c] shrink-0" />
          )}
          
          <span
            className={cn(
              'text-xs leading-[14px] font-normal whitespace-nowrap',
              isPositive ? 'text-[#00995a]' : 'text-[#d4002c]'
            )}
            style={{ fontFamily: 'Causten Round, sans-serif' }}
          >
            {formattedPercentage}
          </span>
          
          <span
            className="text-xs leading-[14px] font-normal text-[#575385] whitespace-nowrap"
            style={{ fontFamily: 'Causten Round, sans-serif' }}
          >
            {label}
          </span>
        </div>
        
        {showWarning && (
          <WarningIcon className="text-[#d4002c] shrink-0" />
        )}
      </div>
    );
  }
);

KPIComparison.displayName = 'KPIComparison';

// Export custom variant
export { KPIComparisonCustom } from './KPIComparisonCustom';
export type { KPIComparisonCustomProps } from './KPIComparisonCustom';

