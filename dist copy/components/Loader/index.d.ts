import * as React from 'react';
export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Tipo de loader
     * @default "spinner"
     */
    type?: 'spinner' | 'linear';
    /**
     * Controla la visibilidad del loader
     * @default true
     */
    show?: boolean;
    /**
     * Variante del loader (active o disabled)
     * @default "active"
     */
    variant?: 'active' | 'disabled';
    /**
     * Tamaño del spinner (solo para type="spinner")
     * @default 48
     */
    size?: number;
    /**
     * Ancho de la barra (solo para type="linear")
     * @default 230
     */
    width?: number;
    /**
     * Clases CSS adicionales
     */
    className?: string;
}
/**
 * Componente Loader - Indicadores de carga
 *
 * Muestra indicadores de carga con dos tipos:
 * - spinner: Loader circular que gira
 * - linear: Barra de progreso horizontal animada
 *
 * Incluye parámetro show para controlar visibilidad.
 */
declare const Loader: React.ForwardRefExoticComponent<LoaderProps & React.RefAttributes<HTMLDivElement>>;
export { Loader };
