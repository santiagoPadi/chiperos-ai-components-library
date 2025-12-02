import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').ButtonProps & import('react').RefAttributes<HTMLButtonElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        variant: {
            control: "select";
            options: string[];
            description: string;
        };
        size: {
            control: "select";
            options: string[];
            description: string;
        };
        iconOnly: {
            control: "boolean";
            description: string;
        };
        disabled: {
            control: "boolean";
            description: string;
        };
        asChild: {
            control: "boolean";
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Primary: Story;
export declare const PrimaryWithLeftIcon: Story;
export declare const PrimaryWithRightIcon: Story;
export declare const PrimaryIconOnly: Story;
export declare const Secondary: Story;
export declare const SecondaryWithLeftIcon: Story;
export declare const SecondaryIconOnly: Story;
export declare const Alert: Story;
export declare const AlertWithIcon: Story;
export declare const Ghost: Story;
export declare const GhostWithIcon: Story;
export declare const Plain: Story;
export declare const SmallSize: Story;
export declare const MediumSize: Story;
export declare const LargeSize: Story;
export declare const Disabled: Story;
export declare const AllVariants: Story;
export declare const AllSizes: Story;
export declare const CTAGroup: Story;
