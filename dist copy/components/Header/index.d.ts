import { default as React } from 'react';
import { AppRouterInstance } from '../../types';

interface HeaderLibProps {
    goBackText?: string;
    goBackHref?: string;
    onBack?: () => void;
    title: string;
    description?: string;
    children?: React.ReactNode;
    onSearch?: () => void;
    showSearch?: boolean;
    showLanguageSwitcher?: boolean;
    useRouter: () => AppRouterInstance;
}
declare const HeaderLib: React.FC<HeaderLibProps>;
export default HeaderLib;
