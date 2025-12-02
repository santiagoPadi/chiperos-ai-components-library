import * as React from 'react';
declare const LOGO_ASSETS: {
    largeDark: string;
    largeLight: string;
    smallDark: string;
    smallLight: string;
    gradientLarge: string;
};
export interface BrandIconsProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * Tamaño del logo
     * @default "large"
     */
    size?: 'large' | 'small';
    /**
     * Modo de color del logo
     * @default "dark"
     */
    mode?: 'dark' | 'light';
    /**
     * Si el logo tiene gradiente
     * @default false
     */
    gradient?: boolean;
    /**
     * Clases CSS adicionales
     */
    className?: string;
}
/**
 * Componente BrandIcons - Logo de Chiperos
 *
 * Muestra el logo de la marca Chiperos con diferentes variantes:
 * - Tamaños: large (143x32px) y small (40x32px)
 * - Modos: dark y light
 * - Con o sin gradiente
 */
declare const BrandIcons: React.ForwardRefExoticComponent<BrandIconsProps & React.RefAttributes<HTMLImageElement>>;
export { BrandIcons, LOGO_ASSETS };
