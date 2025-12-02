import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').BannerAlertsProps & import('react').RefAttributes<HTMLDivElement>>;
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
        title: {
            control: "text";
            description: string;
        };
        description: {
            control: "text";
            description: string;
        };
        icon: {
            control: false;
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Warning: Story;
export declare const Information: Story;
export declare const Grey: Story;
export declare const CustomIcon: Story;
export declare const AllVariants: Story;
export declare const DifferentLengths: Story;
export declare const CommonUseCases: Story;
export declare const CustomIcons: Story;
export declare const InForms: Story;
export declare const InDashboard: Story;
export declare const Responsive: Story;
