import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').ActionCardProps & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const LowInventory: Story;
export declare const TopPerformers: Story;
export declare const AlertAction: Story;
export declare const InfoAction: Story;
export declare const PendingTasks: Story;
export declare const Notification: Story;
export declare const WithoutAction: Story;
export declare const ClickableCard: Story;
export declare const DashboardGrid: Story;
export declare const LongDescription: Story;
