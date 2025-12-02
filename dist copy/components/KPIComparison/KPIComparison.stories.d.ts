import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').KPIComparisonProps & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        percentage: {
            control: "number";
            description: string;
        };
        trend: {
            control: "select";
            options: string[];
            description: string;
        };
        label: {
            control: "text";
            description: string;
        };
        showWarning: {
            control: "boolean";
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Positive: Story;
export declare const Negative: Story;
export declare const PositiveWithWarning: Story;
export declare const NegativeWithWarning: Story;
export declare const CustomLabel: Story;
export declare const SmallValue: Story;
export declare const LargeValue: Story;
export declare const AllStates: Story;
export declare const InCardContext: Story;
export declare const MultipleComparisons: Story;
export declare const DifferentLabels: Story;
export declare const ZeroValue: Story;
export declare const PreciseDecimals: Story;
