import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').FeatureCardProps & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
    argTypes: {
        title: {
            control: "text";
            description: string;
        };
        description: {
            control: "text";
            description: string;
        };
        iconBackground: {
            control: "color";
            description: string;
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Security: Story;
export declare const Performance: Story;
export declare const Collaboration: Story;
export declare const Protection: Story;
export declare const CloudBased: Story;
export declare const AIFeature: Story;
export declare const Clickable: Story;
export declare const FeaturesGrid: Story;
export declare const ColorVariants: Story;
export declare const CustomStyling: Story;
export declare const LongDescription: Story;
export declare const Minimal: Story;
