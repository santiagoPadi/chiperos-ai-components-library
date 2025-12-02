import * as React from 'react';
import { CheckCircle, X } from 'lucide-react';
import { cn } from '../../lib/utils';

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
const Toasts = React.forwardRef<HTMLDivElement, ToastsProps>(
  (
    {
      type = 'light',
      text,
      icon,
      onClose,
      className,
      ...props
    },
    ref
  ) => {
    // Configuración de estilos por tipo
    const typeStyles = {
      light: {
        container: 'bg-[#ecebf0]',
        text: 'text-[#575385]',
        iconColor: 'text-[#312e4d]',
        closeColor: 'text-[#312e4d]',
      },
      dark: {
        container: 'bg-[#3f3c5e]',
        text: 'text-white',
        iconColor: 'text-white',
        closeColor: 'text-white',
      },
    };

    const currentType = typeStyles[type];

    // Icono por defecto
    const defaultIcon = (
      <CheckCircle 
        size={16} 
        className={currentType.iconColor}
      />
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 p-3 rounded',
          currentType.container,
          className
        )}
        role="status"
        aria-live="polite"
        {...props}
      >
        {/* Body: Icono + Texto */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Icono */}
          <div className="flex-shrink-0">
            {icon || defaultIcon}
          </div>

          {/* Texto */}
          <div
            className={cn(
              'text-base leading-5 whitespace-nowrap',
              currentType.text
            )}
          >
            {text}
          </div>
        </div>

        {/* Botón de cerrar */}
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'flex-shrink-0 opacity-99 hover:opacity-100 transition-opacity',
              currentType.closeColor
            )}
            aria-label="Cerrar notificación"
          >
            <X size={12} />
          </button>
        )}
      </div>
    );
  }
);

Toasts.displayName = 'Toasts';

export { Toasts };

