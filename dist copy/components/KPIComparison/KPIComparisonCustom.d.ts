import * as React from 'react';
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
export declare const KPIComparisonCustom: React.ForwardRefExoticComponent<KPIComparisonCustomProps & React.RefAttributes<HTMLDivElement>>;
