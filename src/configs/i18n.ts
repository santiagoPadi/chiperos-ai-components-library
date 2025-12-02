export const SUPPORTED_LOCALES = ['es', 'en', 'pt'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'es'
