import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').OptionCardProps & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Unselected: Story;
export declare const Selected: Story;
export declare const Disabled: Story;
export declare const RoleSelection: Story;
export declare const SubscriptionPlans: Story;
export declare const WithDisabledOptions: Story;
export declare const SettingsConfiguration: Story;
export declare const AllStates: Story;
