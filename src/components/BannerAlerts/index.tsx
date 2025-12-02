import * as React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { cn } from '../../lib/utils';

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
const BannerAlerts = React.forwardRef<HTMLDivElement, BannerAlertsProps>(
  (
    {
      variant = 'information',
      title,
      description,
      icon,
      className,
      ...props
    },
    ref
  ) => {
    // Configuración de estilos por variante
    const variantStyles = {
      warning: {
        container: 'bg-[#fff3e8]',
        text: 'text-[#d48620]',
        icon: <AlertTriangle size={24} className="text-[#d48620]" />,
      },
      information: {
        container: 'bg-[#e3f2ff]',
        text: 'text-[#4087fb]',
        icon: <Info size={24} className="text-[#4087fb]" />,
      },
      grey: {
        container: 'bg-[#f4f4f4]',
        text: 'text-[#6e6f6e]',
        icon: <Info size={24} className="text-[#202020]" />,
      },
    };

    const currentVariant = variantStyles[variant];
    const displayIcon = icon || currentVariant.icon;

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 p-4 rounded-lg',
          currentVariant.container,
          currentVariant.text,
          className
        )}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {/* Icono */}
        <div className="flex-shrink-0">{displayIcon}</div>

        {/* Contenido */}
        <div className="flex flex-col gap-0 flex-1 min-w-0">
          {/* Título */}
          <div className="font-semibold text-sm leading-[18px]">
            {title}
          </div>

          {/* Descripción */}
          <div className="font-normal text-sm leading-[18px]">
            {description}
          </div>
        </div>
      </div>
    );
  }
);

BannerAlerts.displayName = 'BannerAlerts';

export { BannerAlerts };

