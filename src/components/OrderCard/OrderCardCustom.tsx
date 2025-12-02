import * as React from 'react';
import { cn } from '../../lib/utils';

export interface OrderCardCustomProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Título personalizado de la card
   */
  title: string;
  
  /**
   * Cantidad principal
   */
  count: number | string;
  
  /**
   * Etiqueta de la cantidad
   * @default "orders"
   */
  countLabel?: string;
  
  /**
   * Línea 1 de información (ej: "Gross Sales: $100,000.00")
   */
  infoLine1?: string;
  
  /**
   * Línea 2 de información (ej: "Net Sales: $100,000.00")
   */
  infoLine2?: string;
  
  /**
   * Ícono personalizado (React node)
   */
  icon: React.ReactNode;
  
  /**
   * Badge personalizado (opcional)
   */
  badge?: {
    label: string;
    variant?: 'default' | 'red' | 'green' | 'blue';
    onClick?: () => void;
  };
  
  /**
   * Botón personalizado (opcional)
   */
  button?: {
    label: string;
    onClick?: () => void;
  };
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

const badgeStyles = {
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
  green: {
    bg: '#e6f7f0',
    border: '#8ed9b8',
    text: '#00995a',
  },
  blue: {
    bg: '#e8f4fd',
    border: '#8ec9ed',
    text: '#0066cc',
  },
};

/**
 * Componente OrderCardCustom
 * 
 * Versión personalizable de OrderCard donde puedes especificar
 * cualquier título, ícono, información y badges sin estar limitado
 * a estados predefinidos.
 * 
 * @example
 * ```tsx
 * <OrderCardCustom
 *   title="Processing"
 *   count={42}
 *   countLabel="items"
 *   infoLine1="Total: $50,000.00"
 *   infoLine2="Pending: 12 items"
 *   icon={<CustomIcon />}
 *   badge={{ label: "Urgent", variant: "red" }}
 *   button={{ label: "View", onClick: () => {} }}
 * />
 * ```
 */
export const OrderCardCustom = React.forwardRef<HTMLDivElement, OrderCardCustomProps>(
  (
    {
      title,
      count,
      countLabel = 'orders',
      infoLine1,
      infoLine2,
      icon,
      badge,
      button,
      className,
      ...props
    },
    ref
  ) => {
    const badgeStyle = badge ? badgeStyles[badge.variant || 'default'] : badgeStyles.default;

    return (
      <div
        ref={ref}
        className={cn(
          'bg-white border border-[#ecebf0] rounded-xl p-5 flex gap-2',
          className
        )}
        {...props}
      >
        {/* Ícono */}
        <div className="flex items-center justify-center shrink-0">
          {icon}
        </div>

        {/* Contenido */}
        <div className="flex-1 flex gap-2 items-start justify-end min-w-0">
          {/* Información principal */}
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            {/* Título */}
            <h3
              className="text-base leading-5 font-medium text-[#575385]"
              style={{ fontFamily: 'Causten Round, sans-serif' }}
            >
              {title}
            </h3>

            {/* Contador */}
            <div className="flex items-end gap-1">
              <span
                className="text-xl leading-[22px] font-semibold text-[#312e4d]"
                style={{ fontFamily: 'Causten Round, sans-serif' }}
              >
                {count}
              </span>
              <span
                className="text-base leading-[18px] font-medium text-[#575385]"
                style={{ fontFamily: 'Causten Round, sans-serif' }}
              >
                {countLabel}
              </span>
            </div>

            {/* Info Line 1 */}
            {infoLine1 && (
              <div
                className="text-xs leading-normal font-normal text-[#575385]"
                style={{ fontFamily: 'Causten Round, sans-serif' }}
              >
                {infoLine1}
              </div>
            )}

            {/* Info Line 2 */}
            {infoLine2 && (
              <div
                className="text-xs leading-normal font-normal text-[#575385]"
                style={{ fontFamily: 'Causten Round, sans-serif' }}
              >
                {infoLine2}
              </div>
            )}
          </div>

          {/* Badges y botón */}
          <div className="flex flex-col gap-4 items-end justify-end pb-[33px]">
            {/* Badge personalizado */}
            {badge && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  badge.onClick?.();
                }}
                disabled={!badge.onClick}
                className={cn(
                  'px-2 py-1 rounded-2xl text-sm leading-[18px] font-medium border transition-opacity',
                  badge.onClick && 'hover:opacity-80 cursor-pointer'
                )}
                style={{
                  fontFamily: 'Causten Round, sans-serif',
                  height: '24px',
                  backgroundColor: badgeStyle.bg,
                  borderColor: badgeStyle.border,
                  color: badgeStyle.text,
                }}
              >
                {badge.label}
              </button>
            )}

            {/* Botón personalizado */}
            {button && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  button.onClick?.();
                }}
                className="text-sm leading-[18px] font-semibold text-[#00995a] hover:underline"
                style={{ fontFamily: 'Causten Round, sans-serif' }}
              >
                {button.label}
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

OrderCardCustom.displayName = 'OrderCardCustom';

