import * as React from 'react';
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
export declare const KPICardCustom: React.ForwardRefExoticComponent<KPICardCustomProps & React.RefAttributes<HTMLDivElement>>;
