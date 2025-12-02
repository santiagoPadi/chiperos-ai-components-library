import * as React from 'react';
import { cn } from '../../lib/utils';

export interface OptionCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /**
   * Título/Nombre de la opción
   */
  title: string;
  
  /**
   * Descripción de la opción
   */
  description: string;
  
  /**
   * Valor asociado (útil para radio groups)
   */
  value: string;
  
  /**
   * Si está seleccionada
   * @default false
   */
  selected?: boolean;
  
  /**
   * Callback cuando se selecciona
   */
  onSelect?: (value: string) => void;
  
  /**
   * Si está deshabilitada
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

/**
 * Componente OptionCard
 * 
 * Card seleccionable con radio button integrado.
 * Ideal para selección de opciones, roles, planes, etc.
 * 
 * Estados:
 * - Default: Border gris, radio sin seleccionar
 * - Selected: Border verde, radio seleccionado
 * - Disabled: Opacidad reducida, no interactivo
 * 
 * @example
 * ```tsx
 * <OptionCard
 *   title="Admin"
 *   description="Full access to all features and administrative settings"
 *   value="admin"
 *   selected={selectedRole === 'admin'}
 *   onSelect={(value) => setSelectedRole(value)}
 * />
 * ```
 */
export const OptionCard = React.forwardRef<
  HTMLDivElement,
  OptionCardProps
>(
  (
    {
      title,
      description,
      value,
      selected = false,
      onSelect,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled && onSelect) {
        onSelect(value);
      }
    };

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={cn(
          'bg-white border border-solid rounded-xl p-4 flex flex-col gap-1 transition-all cursor-pointer',
          selected ? 'border-[#00b56b]' : 'border-[#ecebf0]',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'hover:shadow-sm',
          className
        )}
        {...props}
      >
        {/* Radio button y título */}
        <div className="flex gap-3 items-center h-6">
          {/* Radio Button */}
          <div className="flex items-center justify-center shrink-0 w-6 h-6">
            <div
              className={cn(
                'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                selected ? 'border-[#00995a]' : 'border-[#a29fba]'
              )}
            >
              {selected && (
                <div className="w-3 h-3 rounded-full bg-[#00995a]" />
              )}
            </div>
          </div>

          {/* Título */}
          <h3
            className="text-base leading-5 font-medium text-[#312e4d] flex-1"
            style={{ fontFamily: 'Causten Round, sans-serif' }}
          >
            {title}
          </h3>
        </div>

        {/* Descripción */}
        <div className="pl-9">
          <p
            className="text-sm leading-[18px] font-normal text-[#575385]"
            style={{ fontFamily: 'Causten Round, sans-serif' }}
          >
            {description}
          </p>
        </div>
      </div>
    );
  }
);

OptionCard.displayName = 'OptionCard';
