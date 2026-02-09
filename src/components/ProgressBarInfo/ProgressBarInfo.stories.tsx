import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBarInfo } from './index';

const meta: Meta<typeof ProgressBarInfo> = {
    title: 'Components/ProgressBarInfo',
    component: ProgressBarInfo,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        segments: {
            control: 'object',
            description: 'Array of segments to display (id, label, percentage, change, color)',
            table: {
                type: { summary: 'ProgressBarSegment[]' },
            },
        },
        barHeight: {
            control: 'number',
            description: 'Height of the progress bar in pixels',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '24' },
            },
        },
        borderRadius: {
            control: 'number',
            description: 'Border radius of the progress bar',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '8' },
            },
        },
        legendColumns: {
            control: 'number',
            description: 'Number of columns for the legend grid',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '2' },
            },
        },
        showLegend: {
            control: 'boolean',
            description: 'Whether to show the legend',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        legendGap: {
            control: 'number',
            description: 'Gap between legend items in pixels',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '16' },
            },
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes',
            table: {
                type: { summary: 'string' },
            },
        },
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '800px', width: '100%' }}>
                <Story />
            </div>
        ),
    ],
};

export default meta;
type Story = StoryObj<typeof ProgressBarInfo>;

// Sample data matching the Figma design
const productCategoryData = [
    { id: '1', label: 'Bebidas no Alcohólicas', percentage: 41.2, change: '+5.9%' },
    { id: '2', label: 'Despensa', percentage: 12.3, change: '+1.7%' },
    { id: '3', label: 'Pide tu bulto aquí', percentage: 8, change: '+23.2%' },
    { id: '4', label: 'Confites y Snacks', percentage: 6.8, change: '+1.7%' },
    { id: '5', label: 'Abarrotes', percentage: 5.6, change: '+0.7%' },
    { id: '6', label: 'Others', percentage: 26.1, change: '+4.4%' },
];

/**
 * Default example matching the Product Category Breakdown design
 */
export const Default: Story = {
    args: {
        segments: productCategoryData,
        barHeight: 24,
        legendColumns: 2,
    },
};

/**
 * Single column legend layout
 */
export const SingleColumnLegend: Story = {
    args: {
        segments: productCategoryData,
        legendColumns: 1,
        barHeight: 24,
    },
};

/**
 * Three segments example
 */
export const ThreeSegments: Story = {
    args: {
        segments: [
            { id: '1', label: 'Completed', percentage: 65, change: '+12%' },
            { id: '2', label: 'In Progress', percentage: 25, change: '+5%' },
            { id: '3', label: 'Pending', percentage: 10, change: '-3%' },
        ],
        barHeight: 24,
    },
};

/**
 * Without change indicators
 */
export const WithoutChange: Story = {
    args: {
        segments: [
            { id: '1', label: 'Sales', percentage: 45 },
            { id: '2', label: 'Marketing', percentage: 30 },
            { id: '3', label: 'Operations', percentage: 15 },
            { id: '4', label: 'Other', percentage: 10 },
        ],
        barHeight: 24,
    },
};

/**
 * Custom colors example
 */
export const CustomColors: Story = {
    args: {
        segments: [
            { id: '1', label: 'Red Category', percentage: 40, color: '#FE6A35', change: '+8%' },
            { id: '2', label: 'Blue Category', percentage: 35, color: '#5D89DF', change: '+4%' },
            { id: '3', label: 'Yellow Category', percentage: 25, color: '#EECA34', change: '+2%' },
        ],
        barHeight: 24,
    },
};

/**
 * Taller bar variant
 */
export const TallBar: Story = {
    args: {
        segments: productCategoryData,
        barHeight: 40,
        borderRadius: 12,
    },
};

/**
 * Thin bar variant
 */
export const ThinBar: Story = {
    args: {
        segments: productCategoryData,
        barHeight: 12,
        borderRadius: 6,
    },
};

/**
 * Without legend
 */
export const WithoutLegend: Story = {
    args: {
        segments: productCategoryData,
        barHeight: 24,
        showLegend: false,
    },
};

/**
 * Three column legend
 */
export const ThreeColumnLegend: Story = {
    args: {
        segments: productCategoryData,
        legendColumns: 3,
        barHeight: 24,
    },
};
