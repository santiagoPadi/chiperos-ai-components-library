import * as React from 'react';
export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Título de la característica
     */
    title: string;
    /**
     * Descripción de la característica
     */
    description: string;
    /**
     * Ícono de la característica (React node)
     */
    icon: React.ReactNode;
    /**
     * Background del contenedor del ícono
     * @default "#e6f8ef"
     */
    iconBackground?: string;
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
 * Componente FeatureCard
 *
 * Card centrada para destacar características o features.
 * Ideal para landing pages, páginas de bienvenida y showcase de características.
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   icon={<Lock size={32} color="#00995a" strokeWidth={2} />}
 *   title="Built for Security"
 *   description="Your data is protected by enterprise-grade, zero-trust architecture."
 * />
 * ```
 */
export declare const FeatureCard: React.ForwardRefExoticComponent<FeatureCardProps & React.RefAttributes<HTMLDivElement>>;
