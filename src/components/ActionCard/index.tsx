import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ActionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Título de la acción
   */
  title: string;
  
  /**
   * Descripción de la acción
   */
  description: string;
  
  /**
   * Ícono de la acción (React node)
   */
  icon: React.ReactNode;
  
  /**
   * Botón de acción (CTA) opcional
   */
  action?: {
    label: string;
    onClick: () => void;
  };
  
  /**
   * Callback al hacer clic en toda la card
   */
  onClick?: () => void;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

/**
 * Componente ActionCard
 * 
 * Card con ícono, título, descripción y call-to-action opcional.
 * Ideal para dashboards, acciones rápidas y notificaciones.
 * 
 * @example
 * ```tsx
 * <ActionCard
 *   icon={<Package size={32} color="#d48620" strokeWidth={2} />}
 *   title="Identify Low Inventory Items"
 *   description="Find SKUs with less than 5 days of inventory remaining."
 *   action={{
 *     label: "Show low inventory",
 *     onClick: () => navigate('/inventory/low')
 *   }}
 * />
 * ```
 */
export const ActionCard = React.forwardRef<HTMLDivElement, ActionCardProps>(
  (
    {
      title,
      description,
      icon,
      action,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'bg-white border border-[#ecebf0] rounded-xl p-5 flex gap-2',
          onClick && 'cursor-pointer hover:shadow-md transition-shadow',
          className
        )}
        style={{ width: '350px' }}
        {...props}
      >
        {/* Ícono */}
        <div className="flex items-center justify-center shrink-0">
          {icon}
        </div>

        {/* Contenido */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* Título */}
          <h3
            className="text-base leading-5 font-semibold text-[#312e4d] capitalize"
            style={{ fontFamily: 'Causten Round, sans-serif' }}
          >
            {title}
          </h3>

          {/* Descripción */}
          <p
            className="text-sm leading-[18px] font-normal text-[#575385]"
            style={{ fontFamily: 'Causten Round, sans-serif' }}
          >
            {description}
          </p>

          {/* CTA Button */}
          {action && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              className="text-sm leading-[18px] font-semibold text-[#00995a] hover:underline self-start"
              style={{ fontFamily: 'Causten Round, sans-serif' }}
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    );
  }
);

ActionCard.displayName = 'ActionCard';
