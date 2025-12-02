import * as React from 'react';
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
export declare const KPICard: React.ForwardRefExoticComponent<KPICardProps & React.RefAttributes<HTMLDivElement>>;
export { KPICardCustom } from './KPICardCustom';
export type { KPICardCustomProps } from './KPICardCustom';
