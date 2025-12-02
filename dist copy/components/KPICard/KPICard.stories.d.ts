import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').KPICardProps & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        title: {
            control: "text";
            description: string;
        };
        value: {
            control: "text";
            description: string;
        };
        unit: {
            control: "text";
            description: string;
        };
        description: {
            control: "text";
            description: string;
        };
        iconColor: {
            control: "select";
            options: string[];
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Basic: Story;
export declare const WithPositiveComparison: Story;
export declare const WithNegativeComparison: Story;
export declare const WithTag: Story;
export declare const WithRedTag: Story;
export declare const WithFraction: Story;
export declare const WithButton: Story;
export declare const BrandIcon: Story;
export declare const AllVariants: Story;
export declare const Dashboard: Story;
export declare const CustomIcon: Story;
export declare const Clickable: Story;
export declare const LargeValues: Story;
export declare const WithoutComparison: Story;
export declare const LongDescription: Story;
export declare const Compact: Story;
export declare const Complete: Story;
