import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./KPIComparisonCustom').KPIComparisonCustomProps & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const PositiveTrend: Story;
export declare const NegativeTrend: Story;
export declare const WithAlert: Story;
export declare const CustomValues: Story;
export declare const WithCounter: Story;
export declare const MinimalLayout: Story;
export declare const AllVariants: Story;
export declare const InCardContext: Story;
export declare const MultipleMetrics: Story;
