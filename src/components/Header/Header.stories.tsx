import type { Meta, StoryObj } from '@storybook/react';
import HeaderLib from './index';
import { AppRouterInstance } from '@/types';
import LocaleProvider from '../../configs/LocaleProvider';

// Mock router
const mockRouter: AppRouterInstance = {
    back: () => console.log('router.back()'),
    forward: () => console.log('router.forward()'),
    refresh: () => console.log('router.refresh()'),
    push: (href) => console.log(`router.push(${href})`),
    replace: (href) => console.log(`router.replace(${href})`),
    prefetch: (href) => console.log(`router.prefetch(${href})`),
};

const meta: Meta<typeof HeaderLib> = {
    title: 'Components/Header',
    component: HeaderLib,
    tags: ['autodocs'],
    args: {
        useRouter: () => mockRouter,
    },
    argTypes: {
        title: { control: 'text' },
        description: { control: 'text' },
        goBackText: { control: 'text' },
        showSearch: { control: 'boolean' },
        showLanguageSwitcher: { control: 'boolean' },
    },
    decorators: [
        (Story) => (
            <LocaleProvider loadMessages={async (locale) => {
                const messages = await import(`../../i18n/messages/${locale}.json`);
                return messages.default;
            }}>
                <Story />
            </LocaleProvider>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof HeaderLib>;

export const Default: Story = {
    args: {
        title: 'Page Title',
    },
};

export const WithDescription: Story = {
    args: {
        title: 'Page Title',
        description: 'This is a description for the page header.',
    },
};

export const WithGoBack: Story = {
    args: {
        title: 'Detail Page',
        goBackText: 'Go Back',
        onBack: () => console.log('Custom onBack clicked'),
    },
};

export const WithSearchAndLanguage: Story = {
    args: {
        title: 'Dashboard',
        showSearch: true,
        showLanguageSwitcher: true,
    },
};

export const WithChildren: Story = {
    args: {
        title: 'Header with Children',
        children: (
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
                Custom Action
            </button>
        ),
    },
};
