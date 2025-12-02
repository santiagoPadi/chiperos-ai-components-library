import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').OrderCardProps & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        state: {
            control: "select";
            options: string[];
            description: string;
        };
        count: {
            control: "number";
            description: string;
        };
        countLabel: {
            control: "text";
            description: string;
        };
        grossSales: {
            control: "number";
            description: string;
        };
        netSales: {
            control: "number";
            description: string;
        };
        hasDelays: {
            control: "boolean";
            description: string;
        };
        currencySymbol: {
            control: "text";
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Received: Story;
export declare const Picking: Story;
export declare const Dispatched: Story;
export declare const Delivered: Story;
export declare const WithoutDelays: Story;
export declare const WithDelayCount: Story;
export declare const WithoutFilter: Story;
export declare const EuroCurrency: Story;
export declare const AllStates: Story;
export declare const OrdersDashboard: Story;
export declare const SmallValues: Story;
export declare const LargeValues: Story;
export declare const InteractiveCallbacks: Story;
export declare const SalesComparison: Story;
export declare const DifferentCountLabels: Story;
export declare const CustomIcon: Story;
