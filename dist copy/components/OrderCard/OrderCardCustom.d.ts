import * as React from 'react';
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
export declare const OrderCardCustom: React.ForwardRefExoticComponent<OrderCardCustomProps & React.RefAttributes<HTMLDivElement>>;
