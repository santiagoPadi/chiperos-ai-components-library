'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react';
import { NextIntlClientProvider } from 'next-intl';

import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from './i18n';

interface Props {
  children: ReactNode;
  loadMessages: (locale: Locale) => Promise<Record<string, string>>;
}

interface LocaleContextType {
  locale: Locale
  changeLocale: (locale: Locale) => void;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

const LocaleProvider = ({ children, loadMessages }: Props) => {
  const [locale, setLocale] = useState<Locale>(DEFAULT_LOCALE);
  const [messages, setMessages] = useState<Record<string, string> | null>(null);

  const changeLocale = useCallback((newLocale: Locale) => {
    const finalLocale = SUPPORTED_LOCALES.includes(newLocale) ? newLocale : DEFAULT_LOCALE;
    localStorage.setItem('locale', finalLocale);
    document.documentElement.lang = finalLocale;
    setLocale(finalLocale);
    loadMessages(finalLocale).then(setMessages);
  }, [loadMessages]);

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale') as Locale | null;
    if (storedLocale && SUPPORTED_LOCALES.includes(storedLocale)) {
      changeLocale(storedLocale);
      return;
    }
    const navLang = navigator.language.split('-')[0] as Locale;
    changeLocale(navLang);
  }, [changeLocale]);

  if (!messages) return null;

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within LocaleProvider');
  }
  return context;
};

export default LocaleProvider;

