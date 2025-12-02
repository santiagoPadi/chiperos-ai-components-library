import React from 'react';
import { ChevronDown } from 'lucide-react';
import { type Locale } from '../../configs/i18n';
import { useLocale } from '../../configs/LocaleProvider';

interface Language {
    code: string;
    name: string;
    flag: string;
}

const languages: Language[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇲🇽' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' }
];

interface LanguageSwitcherProps {
    className?: string;
    showText?: boolean;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    className = '',
    showText = true
}) => {

    const [isOpen, setIsOpen] = React.useState(false);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const { locale, changeLocale } = useLocale();

    const currentLanguage =
        languages.find(language => language.code === locale) || languages[0];

    // Close dropdown when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLanguageChange = (languageCode: string) => {
        changeLocale(languageCode as Locale);
        setIsOpen(false);
    };

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex bg-transparent border border-gray-200 border-solid items-center space-x-2 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#00B56B] focus:ring-offset-2 cursor-pointer"
                aria-label="Select language"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <span className="text-lg">{currentLanguage.flag}</span>
                {showText && (
                    <span className="text-sm font-medium text-gray-700 ">
                        {currentLanguage.name}
                    </span>
                )}
                <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-2">
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageChange(language.code)}
                                className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50  transition-colors duration-200  cursor-pointer ${currentLanguage.code === language.code
                                    ? 'bg-[#00B56B]/10 text-[#00B56B] '
                                    : 'text-gray-700 '
                                    }`}
                                role="menuitem"
                            >
                                <span className="text-lg">{language.flag}</span>
                                <span className="text-sm font-medium">{language.name}</span>
                                {currentLanguage.code === language.code && (
                                    <div className="ml-auto w-2 h-2 bg-[#00B56B] rounded-full"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;