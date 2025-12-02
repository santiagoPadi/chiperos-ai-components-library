import { StoryObj } from '@storybook/react';

declare const meta: {
    title: string;
    component: import('react').ForwardRefExoticComponent<import('./index').CardsGridProps & import('react').RefAttributes<HTMLDivElement>>;
    parameters: {
        layout: string;
    };
    tags: string[];
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const ThreeColumnsFeatures: Story;
export declare const TwoColumnsActions: Story;
export declare const FourColumnsFeatures: Story;
export declare const SingleColumnActions: Story;
export declare const OptionCardsInGrid: Story;
export declare const ResponsiveGrid: Story;
export declare const GapVariations: Story;
export declare const MixedCards: Story;
export declare const DashboardLayout: Story;
