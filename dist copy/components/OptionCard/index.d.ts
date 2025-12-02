import * as React from 'react';
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
export declare const OptionCard: React.ForwardRefExoticComponent<OptionCardProps & React.RefAttributes<HTMLDivElement>>;
