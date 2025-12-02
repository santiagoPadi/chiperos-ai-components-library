import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combina clases de forma inteligente, resolviendo conflictos de Tailwind CSS.
 * @param {...ClassValue} inputs - Clases a combinar.
 * @returns {string} - Cadena de clases finales.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
