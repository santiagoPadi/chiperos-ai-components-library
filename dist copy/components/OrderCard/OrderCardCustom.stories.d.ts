import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./OrderCardCustom').OrderCardCustomProps & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const WithUrgentBadge: Story;
export declare const WithSuccessBadge: Story;
export declare const WithInfoBadge: Story;
export declare const SimpleLayout: Story;
export declare const AllVariants: Story;
export declare const FullyCustomized: Story;
