import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').BrandIconsProps & import('react').RefAttributes<HTMLImageElement>>;
    parameters: {
        layout: string;
        backgrounds: {
            default: string;
            values: {
                name: string;
                value: string;
            }[];
        };
    };
    tags: string[];
    argTypes: {
        size: {
            control: "select";
            options: string[];
            description: string;
        };
        mode: {
            control: "select";
            options: string[];
            description: string;
        };
        gradient: {
            control: "boolean";
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const LargeDark: Story;
export declare const LargeLight: Story;
export declare const LargeGradient: Story;
export declare const SmallDark: Story;
export declare const SmallLight: Story;
export declare const AllVariants: Story;
export declare const SizeComparison: Story;
export declare const InNavigation: Story;
export declare const InFooter: Story;
export declare const ResponsiveLogo: Story;
