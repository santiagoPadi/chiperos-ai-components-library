import * as React from 'react';
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
export declare const KPIComparison: React.ForwardRefExoticComponent<KPIComparisonProps & React.RefAttributes<HTMLDivElement>>;
export { KPIComparisonCustom } from './KPIComparisonCustom';
export type { KPIComparisonCustomProps } from './KPIComparisonCustom';
