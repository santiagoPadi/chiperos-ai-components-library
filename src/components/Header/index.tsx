import React from 'react'
import { Search } from 'lucide-react'
import LanguageSwitcher from '../LanguageSwitcher'
import { AppRouterInstance } from '@/types'

export interface HeaderLibProps {
    /**
     * Text for the go-back button. If omitted, no back button is shown.
     */
    goBackText?: string

    /**
     * URL to navigate to when the back button is clicked
     */
    goBackHref?: string

    /**
     * Custom callback for the back button (overrides goBackHref and router.back)
     */
    onBack?: () => void

    /**
     * Main title of the header
     */
    title: string

    /**
     * Description text below the title
     */
    description?: string

    /**
     * Additional content rendered in the header
     */
    children?: React.ReactNode

    /**
     * Custom callback when search icon is clicked
     */
    onSearch?: () => void

    /**
     * Whether to show the search icon button
     * @default true
     */
    showSearch?: boolean

    /**
     * Whether to show the language switcher
     * @default true
     */
    showLanguageSwitcher?: boolean

    /**
     * Hook that returns an AppRouterInstance (e.g., Next.js useRouter)
     */
    useRouter: () => AppRouterInstance
}

const HeaderLib: React.FC<HeaderLibProps> = ({
    goBackText,
    goBackHref,
    onBack,
    title,
    description,
    children,
    onSearch,
    showSearch = true,
    showLanguageSwitcher = true,
    useRouter
}) => {
    const router = useRouter()

    const handleGoBack = () => {
        if (onBack) {
            onBack()
        } else if (goBackHref) {
            router.push(goBackHref)
        } else {
            router.back()
        }
    }

    const handleSearchClick = () => {
        if (onSearch) {
            onSearch()
        } else {
            window.dispatchEvent(new Event('openSearch'))
        }
    }

    return (
        <header className='bg-white border-b border-gray-200'>
            <div className='px-0 py-4'>
                <div className='flex items-start justify-between gap-4'>
                    {/* Left Section */}
                    <div className='flex flex-col gap-2'>
                        {/* Go Back Button */}
                        {goBackText && (
                            <button
                                onClick={handleGoBack}
                                className='flex bg-transparent items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 group w-fit'
                            >
                                <i className='tabler-arrow-left text-lg group-hover:-translate-x-1 transition-transform duration-200' />
                                <span className='text-sm font-medium'>{goBackText}</span>
                            </button>
                        )}

                        {/* Title */}
                        <h1 className='text-[28px] font-bold text-gray-900'>{title}</h1>

                        {/* Description */}
                        {description && (
                            <p className='text-[16px] text-gray-600 max-w-2xl'>{description}</p>
                        )}
                    </div>

                    {/* Right Section - Reversed order (right to left) */}
                    <div className='flex flex-row-reverse items-center gap-3'>
                        {/* Language Switcher */}
                        {showLanguageSwitcher && (
                            <LanguageSwitcher showText={false} />
                        )}

                        {/* Search Icon - Same as NavbarContent.tsx:45 */}
                        {showSearch && (
                            <Search onClick={handleSearchClick} />
                        )}

                        {/* Dynamic Children Components */}
                        {children}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default HeaderLib
