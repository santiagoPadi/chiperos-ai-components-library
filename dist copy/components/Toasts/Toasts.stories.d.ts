import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').ToastsProps & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        type: {
            control: "select";
            options: string[];
            description: string;
        };
        text: {
            control: "text";
            description: string;
        };
        icon: {
            control: false;
            description: string;
        };
        onClose: {
            action: string;
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Light: Story;
export declare const Dark: Story;
export declare const WithoutCloseButton: Story;
export declare const CustomIcon: Story;
export declare const AllVariants: Story;
export declare const NotificationTypes: Story;
export declare const TextLengths: Story;
export declare const Interactive: Story;
export declare const MultipleToasts: Story;
export declare const OnDifferentBackgrounds: Story;
export declare const PositionedToast: Story;
export declare const AutoDismiss: Story;
