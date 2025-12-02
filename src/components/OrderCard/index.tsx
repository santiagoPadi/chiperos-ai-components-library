import * as React from 'react';
import { cn } from '../../lib/utils';
import { ReceiptText, Package, Route, CircleCheck } from 'lucide-react';

export interface OrderCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Estado de la orden (cada uno con su ícono)
   */
  state: 'received' | 'picking' | 'dispatched' | 'delivered';
  
  /**
   * Cantidad de órdenes/rutas
   */
  count: number;
  
  /**
   * Etiqueta de la cantidad
   * @default "orders"
   */
  countLabel?: string;
  
  /**
   * Ventas brutas
   */
  grossSales: number;
  
  /**
   * Ventas netas
   */
  netSales: number;
  
  /**
   * Mostrar badge de delays
   * @default false
   */
  hasDelays?: boolean;
  
  /**
   * Número de delays (opcional)
   */
  delayCount?: number;
  
  /**
   * Callback al hacer clic en el badge de Delays
   */
  onDelaysClick?: () => void;
  
  /**
   * Callback al hacer clic en el botón Filter
   */
  onFilterClick?: () => void;
  
  /**
   * Ícono personalizado (opcional)
   */
  icon?: React.ReactNode;
  
  /**
   * Símbolo de moneda
   * @default "$"
   */
  currencySymbol?: string;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

// Íconos de lucide-react con el color de marca
const iconColor = '#00995a';
const iconSize = 32;
const iconStrokeWidth = 2;

const ReceivedIcon: React.FC = () => (
  <ReceiptText 
    size={iconSize} 
    color={iconColor}
    strokeWidth={iconStrokeWidth}
  />
);

const PickingIcon: React.FC = () => (
  <Package 
    size={iconSize} 
    color={iconColor}
    strokeWidth={iconStrokeWidth}
  />
);

const DispatchedIcon: React.FC = () => (
  <Route 
    size={iconSize} 
    color={iconColor}
    strokeWidth={iconStrokeWidth}
  />
);

const DeliveredIcon: React.FC = () => (
  <CircleCheck 
    size={iconSize} 
    color={iconColor}
    strokeWidth={iconStrokeWidth}
  />
);

// Mapeo de estados a títulos e íconos
const stateConfig = {
  received: {
    title: 'Received',
    icon: ReceivedIcon,
  },
  picking: {
    title: 'Picking',
    icon: PickingIcon,
  },
  dispatched: {
    title: 'Dispatched',
    icon: DispatchedIcon,
  },
  delivered: {
    title: 'Delivered',
    icon: DeliveredIcon,
  },
};

/**
 * Componente OrderCard
 * 
 * Card para mostrar el estado de órdenes con métricas de ventas,
 * badges de delays opcionales, y botón de filtro.
 * 
 * Estados disponibles:
 * - received: Órdenes recibidas
 * - picking: Órdenes en preparación
 * - dispatched: Órdenes despachadas
 * - delivered: Órdenes entregadas
 * 
 * @example
 * ```tsx
 * <OrderCard
 *   state="received"
 *   count={24}
 *   countLabel="orders"
 *   grossSales={100000.00}
 *   netSales={100000.00}
 *   hasDelays={true}
 *   onFilterClick={() => console.log('Filter')}
 * />
 * ```
 */
export const OrderCard = React.forwardRef<HTMLDivElement, OrderCardProps>(
  (
    {
      state,
      count,
      countLabel = 'orders',
      grossSales,
      netSales,
      hasDelays = false,
      delayCount,
      onDelaysClick,
      onFilterClick,
      icon,
      currencySymbol = '$',
      className,
      ...props
    },
    ref
  ) => {
    const config = stateConfig[state];
    const IconComponent = icon || config.icon;
    
    const formatCurrency = (amount: number): string => {
      return `${currencySymbol}${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    };

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
        <div className="flex items-start justify-center shrink-0">
          {typeof IconComponent === 'function' ? <IconComponent /> : IconComponent}
        </div>

        {/* Contenido */}
        <div className="flex-1 flex gap-2 items-start justify-end min-w-0">
          {/* Información de la orden */}
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            {/* Título */}
            <h3
              className="text-base leading-5 font-medium text-[#575385]"
              style={{ fontFamily: 'Causten Round, sans-serif' }}
            >
              {config.title}
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

            {/* Gross Sales */}
            <div
              className="flex gap-1 text-xs leading-normal font-light text-[#575385]"
              style={{ fontFamily: 'Causten Round, sans-serif' }}
            >
              <span>Gross Sales:</span>
              <span>{formatCurrency(grossSales)}</span>
            </div>

            {/* Net Sales */}
            <div
              className="flex gap-1 text-xs leading-normal font-light text-[#575385]"
              style={{ fontFamily: 'Causten Round, sans-serif' }}
            >
              <span>Net Sales:</span>
              <span>{formatCurrency(netSales)}</span>
            </div>
          </div>

          {/* Badges y botón */}
          <div className="flex flex-col gap-4 items-end justify-end pl-12 pb-[33px]">
            {/* Badge de Delays */}
            {hasDelays && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelaysClick?.();
                }}
                className="px-2 rounded-2xl text-[12px] leading-[18px] font-light border bg-[#ffecf0] border-[#ff8ea7] text-[#ff305f] hover:opacity-80 transition-opacity"
                style={{ fontFamily: 'Causten Round, sans-serif', height: '24px' }}
              >
                {delayCount ? `${delayCount} Delays` : 'Delays'}
              </button>
            )}

            {/* Botón Filter */}
            {onFilterClick && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onFilterClick();
                }}
                className="text-sm leading-[18px] font-medium text-[#00995a] hover:underline"
                style={{ fontFamily: 'Causten Round, sans-serif' }}
              >
                Filter
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
);

OrderCard.displayName = 'OrderCard';

// Export custom variant
export { OrderCardCustom } from './OrderCardCustom';
export type { OrderCardCustomProps } from './OrderCardCustom';

