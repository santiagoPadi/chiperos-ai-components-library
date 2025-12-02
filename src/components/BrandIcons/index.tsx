import * as React from 'react';
import { cn } from '../../lib/utils';

// Asset URLs from Figma (valid for 7 days)
const LOGO_ASSETS = {
  largeDark: 'https://www.figma.com/api/mcp/asset/4d8371e7-dff3-4ec8-bbce-b93185151f4c',
  largeLight: 'https://www.figma.com/api/mcp/asset/8a7267d5-2fb8-494e-a13a-3795b42fde22',
  smallDark: 'https://www.figma.com/api/mcp/asset/9d2e5067-f587-40b6-b0a5-5ce6da0aad4c',
  smallLight: 'https://www.figma.com/api/mcp/asset/f01bbe9b-2dae-44fe-892f-97ff47e10e8e',
  gradientLarge: 'https://www.figma.com/api/mcp/asset/972e7e1a-3343-4868-9c4d-97d6dfce3ce8',
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
const BrandIcons = React.forwardRef<HTMLImageElement, BrandIconsProps>(
  (
    {
      size = 'large',
      mode = 'dark',
      gradient = false,
      className,
      alt = 'Chiperos Logo',
      ...props
    },
    ref
  ) => {
    // Determinar la URL del asset según las props
    const getLogoSrc = (): string => {
      if (gradient && size === 'large') {
        return LOGO_ASSETS.gradientLarge;
      }
      
      if (size === 'large' && mode === 'dark') {
        return LOGO_ASSETS.largeDark;
      }
      
      if (size === 'large' && mode === 'light') {
        return LOGO_ASSETS.largeLight;
      }
      
      if (size === 'small' && mode === 'dark') {
        return LOGO_ASSETS.smallDark;
      }
      
      if (size === 'small' && mode === 'light') {
        return LOGO_ASSETS.smallLight;
      }
      
      // Default: large dark
      return LOGO_ASSETS.largeDark;
    };

    // Determinar las dimensiones según el tamaño
    const dimensions = {
      large: { width: 143, height: 32 },
      small: { width: 40, height: 32 },
    };

    const { width, height } = dimensions[size];

    return (
      <img
        ref={ref}
        src={getLogoSrc()}
        alt={alt}
        width={width}
        height={height}
        className={cn('inline-block', className)}
        {...props}
      />
    );
  }
);

BrandIcons.displayName = 'BrandIcons';

export { BrandIcons, LOGO_ASSETS };

