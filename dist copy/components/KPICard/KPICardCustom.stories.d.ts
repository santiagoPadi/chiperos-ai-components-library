import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./KPICardCustom').KPICardCustomProps & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const ComplexContent: Story;
export declare const WithChart: Story;
export declare const WithList: Story;
export declare const WithActions: Story;
export declare const AllVariants: Story;
export declare const FullyCustom: Story;
