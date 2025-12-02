import * as React from 'react';
import { cn } from '../../lib/utils';
import { KPIComparison } from '../KPIComparison';
import { TriangleAlert } from 'lucide-react';

export interface KPICardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Título de la card
   */
  title: string;
  
  /**
   * Valor principal a mostrar
   */
  value: number | string;
  
  /**
   * Unidad del valor (%, x, etc.)
   * @default "%"
   */
  unit?: string;
  
  /**
   * Valor total para mostrar fracción (ej: 3/17)
   * Solo se usa si se proporciona
   */
  total?: number;
  
  /**
   * Texto descriptivo
   */
  description?: string;
  
  /**
   * Datos de comparación KPI (opcional)
   */
  comparison?: {
    percentage: number;
    trend: 'positive' | 'negative';
    label?: string;
    showWarning?: boolean;
  };
  
  /**
   * Tag opcional
   */
  tag?: {
    label: string;
    variant?: 'default' | 'red';
  };
  
  /**
   * Ícono personalizado
   */
  icon?: React.ReactNode;
  
  /**
   * Color del ícono
   * @default "primary"
   */
  iconColor?: 'primary' | 'error' | 'brand';
  
  /**
   * Texto adicional del body (para variante Text)
   */
  bodyText?: string;
  
  /**
   * Botón opcional
   */
  button?: {
    label: string;
    onClick?: () => void;
  };
  
  /**
   * Callback al hacer clic en la card
   */
  onClick?: () => void;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

// Ícono de advertencia por defecto (TriangleAlert de lucide-react)
const DefaultWarningIcon: React.FC<{ color?: string }> = ({ color = '#312e4d' }) => (
  <TriangleAlert 
    size={32} 
    color={color}
    strokeWidth={2}
  />
);

/**
 * Componente KPICard
 * 
 * Card completa para mostrar KPIs con diferentes variantes:
 * - Con comparación de tendencia
 * - Con tags
 * - Con descripción
 * - Con botones
 * 
 * @example
 * ```tsx
 * <KPICard
 *   title="Active Users"
 *   value={3}
 *   unit="%"
 *   description="Descriptive text goes here"
 *   comparison={{ percentage: 1.0, trend: "positive" }}
 *   tag={{ label: "Monthly", variant: "default" }}
 * />
 * ```
 */
export const KPICard = React.forwardRef<HTMLDivElement, KPICardProps>(
  (
    {
      title,
      value,
      unit = '%',
      total,
      description,
      comparison,
      tag,
      icon,
      iconColor = 'primary',
      bodyText,
      button,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const iconColors = {
      primary: '#312e4d',
      error: '#d4002c',
      brand: '#00995a',
    };

    const tagStyles = {
      default: {
        bg: '#f4f4f4',
        border: '#c6c6c6',
        text: '#6e6f6e',
      },
      red: {
        bg: '#ffecf0',
        border: '#ff8ea7',
        text: '#ff305f',
      },
    };

    const tagStyle = tagStyles[tag?.variant || 'default'];

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'bg-white border border-[#ecebf0] rounded-xl p-5 px-8 flex gap-2',
          onClick && 'cursor-pointer hover:shadow-md transition-shadow',
          className
        )}
        {...props}
      >
        {/* Ícono */}
        <div className="flex items-center justify-center shrink-0">
          {icon || <DefaultWarningIcon color={iconColors[iconColor]} />}
        </div>

        {/* Contenido */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* Título y Tag */}
          <div className="flex items-center justify-between gap-2 w-full">
            <h3
              className="text-base leading-5 font-medium text-[#575385] flex-1 min-w-0"
              style={{ fontFamily: 'Causten Round, sans-serif' }}
            >
              {title}
            </h3>
            
            {tag && (
              <span
                className="px-2 py-1 rounded-2xl text-sm leading-[18px] font-medium border shrink-0"
                style={{
                  backgroundColor: tagStyle.bg,
                  borderColor: tagStyle.border,
                  color: tagStyle.text,
                  fontFamily: 'Causten Round, sans-serif',
                }}
              >
                {tag.label}
              </span>
            )}
          </div>

          {/* Valor principal */}
          <div className="flex items-end gap-1">
            <span
              className="text-xl leading-[22px] font-semibold text-[#312e4d]"
              style={{ fontFamily: 'Causten Round, sans-serif' }}
            >
              {value}
            </span>
            
            {total !== undefined ? (
              <span
                className="text-base leading-[18px] font-medium text-[#575385]"
                style={{ fontFamily: 'Causten Round, sans-serif' }}
              >
                /{total}
              </span>
            ) : unit ? (
              <span
                className="text-xs leading-[18px] font-medium text-[#312e4d]"
                style={{ fontFamily: 'Causten Round, sans-serif' }}
              >
                {unit}
              </span>
            ) : null}
            
            {description && (
              <span
                className="text-sm leading-[18px] font-normal text-[#575385] flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-right"
                style={{ fontFamily: 'Causten Round, sans-serif' }}
              >
                {description}
              </span>
            )}
          </div>

          {/* Body text adicional (variante Text) */}
          {bodyText && (
            <p
              className="text-sm leading-[18px] font-normal text-[#575385]"
              style={{ fontFamily: 'Causten Round, sans-serif' }}
            >
              {bodyText}
            </p>
          )}

          {/* Comparación */}
          {comparison && (
            <KPIComparison
              percentage={comparison.percentage}
              trend={comparison.trend}
              label={comparison.label}
              showWarning={comparison.showWarning}
            />
          )}

          {/* Botón */}
          {button && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                button.onClick?.();
              }}
              className="text-sm leading-[18px] font-semibold text-[#00995a] text-left self-start hover:underline"
              style={{ fontFamily: 'Causten Round, sans-serif' }}
            >
              {button.label}
            </button>
          )}
        </div>
      </div>
    );
  }
);

KPICard.displayName = 'KPICard';

// Export custom variant
export { KPICardCustom } from './KPICardCustom';
export type { KPICardCustomProps } from './KPICardCustom';

