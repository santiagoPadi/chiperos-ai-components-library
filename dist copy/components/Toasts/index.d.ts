import * as React from 'react';
export interface ToastsProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Tipo de toast (light o dark)
     * @default "light"
     */
    type?: 'light' | 'dark';
    /**
     * Texto del toast
     */
    text: string;
    /**
     * Icono personalizado (opcional)
     * Por defecto muestra CheckCircle
     */
    icon?: React.ReactNode;
    /**
     * Callback para cerrar el toast
     */
    onClose?: () => void;
    /**
     * Clases CSS adicionales
     */
    className?: string;
}
/**
 * Componente Toasts - Notificaciones temporales
 *
 * Muestra notificaciones breves con dos variantes:
 * - light: Fondo claro para interfaces claras
 * - dark: Fondo oscuro para interfaces oscuras o mayor contraste
 *
 * Incluye un icono (personalizable), texto y botón de cerrar.
 */
declare const Toasts: React.ForwardRefExoticComponent<ToastsProps & React.RefAttributes<HTMLDivElement>>;
export { Toasts };
