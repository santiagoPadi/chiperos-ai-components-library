import * as React from 'react';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import { cn } from '../../lib/utils';

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
const Switcher = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitcherProps
>(
  (
    {
      status = false,
      disabled = false,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <SwitchPrimitive.Root
        ref={ref}
        checked={status}
        onCheckedChange={onChange}
        disabled={disabled}
        className={cn(
          'relative inline-flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00995a] focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          status
            ? 'bg-[#00995a]'
            : 'bg-[#e0e0e0]',
          className
        )}
        {...props}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            'pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out',
            status ? 'translate-x-5' : 'translate-x-0'
          )}
        />
      </SwitchPrimitive.Root>
    );
  }
);

Switcher.displayName = 'Switcher';

export { Switcher };

