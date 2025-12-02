import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
export interface SwitcherProps extends Omit<React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>, 'checked' | 'onCheckedChange' | 'onChange'> {
    /**
     * Estado del switch (on/off)
     * @default false
     */
    status?: boolean;
    /**
     * Si el switch está deshabilitado
     * @default false
     */
    disabled?: boolean;
    /**
     * Callback que recibe el nuevo estado cuando cambia
     */
    onChange?: (status: boolean) => void;
    /**
     * Clases CSS adicionales
     */
    className?: string;
}
/**
 * Componente Switcher - Toggle Switch
 *
 * Switch toggle basado en Radix UI con el diseño del Portal Design System.
 *
 * Estados:
 * - Off: Fondo gris (#e0e0e0), handle a la izquierda
 * - On: Fondo verde (#00995a), handle a la derecha
 * - Disabled: Estado deshabilitado con opacidad reducida
 *
 * Incluye callback onChange que recibe el nuevo estado.
 */
declare const Switcher: React.ForwardRefExoticComponent<SwitcherProps & React.RefAttributes<HTMLButtonElement>>;
export { Switcher };
