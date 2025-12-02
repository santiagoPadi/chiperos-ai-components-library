import { ClassValue } from 'clsx';

/**
 * Combina clases de forma inteligente, resolviendo conflictos de Tailwind CSS.
 * @param {...ClassValue} inputs - Clases a combinar.
 * @returns {string} - Cadena de clases finales.
 */
export declare function cn(...inputs: ClassValue[]): string;
