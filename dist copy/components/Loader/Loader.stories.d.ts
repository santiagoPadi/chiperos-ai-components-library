import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').LoaderProps & import('react').RefAttributes<HTMLDivElement>>;
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
        show: {
            control: "boolean";
            description: string;
        };
        variant: {
            control: "select";
            options: string[];
            description: string;
        };
        size: {
            control: "number";
            description: string;
        };
        width: {
            control: "number";
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const SpinnerActive: Story;
export declare const SpinnerDisabled: Story;
export declare const LinearActive: Story;
export declare const LinearDisabled: Story;
export declare const SpinnerHidden: Story;
export declare const AllTypes: Story;
export declare const SpinnerSizes: Story;
export declare const LinearWidths: Story;
export declare const Interactive: Story;
export declare const LoadingContext: Story;
export declare const OverlaySpinner: Story;
export declare const FormProgress: Story;
export declare const MultipleLoaders: Story;
