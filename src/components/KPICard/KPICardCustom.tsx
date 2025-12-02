import * as React from 'react';
import { cn } from '../../lib/utils';

export interface KPICardCustomProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * Título de la card
   */
  title: string;
  
  /**
   * Contenido principal (puede ser cualquier React node)
   */
  content: React.ReactNode;
  
  /**
   * Contenido secundario/descriptivo (opcional)
   */
  description?: React.ReactNode;
  
  /**
   * Contenido del footer (opcional)
   */
  footer?: React.ReactNode;
  
  /**
   * Tag personalizado (opcional)
   */
  tag?: {
    label: string;
    variant?: 'default' | 'red' | 'green' | 'blue' | 'yellow';
  };
  
  /**
   * Ícono personalizado
   */
  icon: React.ReactNode;
  
  /**
   * Callback al hacer clic en la card
   */
  onClick?: () => void;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}

const tagStyles = {
  default: {
    bg: '#f4f4f4',
    border: '#c6c6c6',
    text: '#6e6f6e',
  },
  red: {
    bg: '#ffecf0',
    border: '#ff8ea7',
    text: '#ff305f',
  },
  green: {
    bg: '#e6f7f0',
    border: '#8ed9b8',
    text: '#00995a',
  },
  blue: {
    bg: '#e8f4fd',
    border: '#8ec9ed',
    text: '#0066cc',
  },
  yellow: {
    bg: '#fff9e6',
    border: '#ffd966',
    text: '#cc8800',
  },
};

/**
 * Componente KPICardCustom
 * 
 * Versión completamente personalizable de KPICard donde puedes
 * especificar cualquier contenido usando React nodes, sin limitaciones
 * de estructura predefinida.
 * 
 * @example
 * ```tsx
 * <KPICardCustom
 *   title="Custom Metric"
 *   icon={<CustomIcon />}
 *   content={
 *     <div>
 *       <h2>42</h2>
 *       <p>Custom layout</p>
 *     </div>
 *   }
 *   description="Any custom description"
 *   footer={<button>Action</button>}
 *   tag={{ label: "New", variant: "green" }}
 * />
 * ```
 */
export const KPICardCustom = React.forwardRef<HTMLDivElement, KPICardCustomProps>(
  (
    {
      title,
      content,
      description,
      footer,
      tag,
      icon,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    const tagStyle = tag ? tagStyles[tag.variant || 'default'] : tagStyles.default;

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'bg-white border border-[#ecebf0] rounded-xl p-5 px-8 flex gap-2',
          onClick && 'cursor-pointer hover:shadow-md transition-shadow',
          className
        )}
        {...props}
      >
        {/* Ícono */}
        <div className="flex items-center justify-center shrink-0">
          {icon}
        </div>

        {/* Contenido */}
        <div className="flex-1 flex flex-col gap-2 min-w-0">
          {/* Título y Tag */}
          <div className="flex items-center justify-between gap-2 w-full">
            <h3
              className="text-base leading-5 font-medium text-[#575385] flex-1 min-w-0"
              style={{ fontFamily: 'Causten Round, sans-serif' }}
            >
              {title}
            </h3>
            
            {tag && (
              <span
                className="px-2 py-1 rounded-2xl text-sm leading-[18px] font-medium border shrink-0"
                style={{
                  backgroundColor: tagStyle.bg,
                  borderColor: tagStyle.border,
                  color: tagStyle.text,
                  fontFamily: 'Causten Round, sans-serif',
                }}
              >
                {tag.label}
              </span>
            )}
          </div>

          {/* Contenido principal */}
          <div className="min-w-0">
            {content}
          </div>

          {/* Descripción */}
          {description && (
            <div className="min-w-0">
              {description}
            </div>
          )}

          {/* Footer */}
          {footer && (
            <div className="min-w-0">
              {footer}
            </div>
          )}
        </div>
      </div>
    );
  }
);

KPICardCustom.displayName = 'KPICardCustom';

