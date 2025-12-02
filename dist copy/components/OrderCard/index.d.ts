import * as React from 'react';
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
export declare const OrderCard: React.ForwardRefExoticComponent<OrderCardProps & React.RefAttributes<HTMLDivElement>>;
export { OrderCardCustom } from './OrderCardCustom';
export type { OrderCardCustomProps } from './OrderCardCustom';
