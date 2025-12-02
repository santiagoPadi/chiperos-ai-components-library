import * as React from 'react';
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
export declare const ActionCard: React.ForwardRefExoticComponent<ActionCardProps & React.RefAttributes<HTMLDivElement>>;
