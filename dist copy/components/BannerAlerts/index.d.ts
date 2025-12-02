import * as React from 'react';
export interface BannerAlertsProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Variante del banner alert
     * @default "information"
     */
    variant?: 'warning' | 'information' | 'grey';
    /**
     * Título del alert
     */
    title: string;
    /**
     * Descripción del alert
     */
    description: string;
    /**
     * Icono personalizado (opcional)
     */
    icon?: React.ReactNode;
    /**
     * Clases CSS adicionales
     */
    className?: string;
}
/**
 * Componente BannerAlerts - Banners informativos con diferentes variantes
 *
 * Muestra mensajes de alerta con tres variantes:
 * - warning: Para alertas de advertencia (naranja)
 * - information: Para información general (azul)
 * - grey: Para notificaciones neutras (gris)
 *
 * Cada banner incluye un icono, título y descripción.
 */
declare const BannerAlerts: React.ForwardRefExoticComponent<BannerAlertsProps & React.RefAttributes<HTMLDivElement>>;
export { BannerAlerts };
