import { ReactNode } from 'react';
import { Locale } from './i18n';

interface Props {
    children: ReactNode;
    loadMessages: (locale: Locale) => Promise<Record<string, string>>;
}
interface LocaleContextType {
    locale: Locale;
    changeLocale: (locale: Locale) => void;
}
declare const LocaleProvider: ({ children, loadMessages }: Props) => import("react/jsx-runtime").JSX.Element | null;
export declare const useLocale: () => LocaleContextType;
export default LocaleProvider;
