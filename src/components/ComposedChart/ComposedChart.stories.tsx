import type { Meta, StoryObj } from '@storybook/react';
import { ComposedChart } from './index';

const meta: Meta<typeof ComposedChart> = {
    title: 'Components/ComposedChart',
    component: ComposedChart,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComposedChart>;

// Sample data for stories
const monthlyData = [
    { month: 'Jan', sales: 400, revenue: 2400, profit: 1200 },
    { month: 'Feb', sales: 300, revenue: 1398, profit: 800 },
    { month: 'Mar', sales: 520, revenue: 3200, profit: 1600 },
    { month: 'Apr', sales: 278, revenue: 1908, profit: 900 },
    { month: 'May', sales: 189, revenue: 2800, profit: 1400 },
    { month: 'Jun', sales: 390, revenue: 2500, profit: 1250 },
];

const performanceData = [
    { name: 'Page A', uv: 590, pv: 800, amt: 1400 },
    { name: 'Page B', uv: 868, pv: 967, amt: 1506 },
    { name: 'Page C', uv: 1397, pv: 1098, amt: 989 },
    { name: 'Page D', uv: 1480, pv: 1200, amt: 1228 },
    { name: 'Page E', uv: 1520, pv: 1108, amt: 1100 },
    { name: 'Page F', uv: 1400, pv: 680, amt: 1700 },
];

/**
 * Default example showing a mixed chart with bars and a line
 */
export const Default: Story = {
    args: {
        data: monthlyData,
        xAxisKey: 'month',
        series: [
            { type: 'bar', dataKey: 'sales', name: 'Sales', color: '#00995a' },
            { type: 'line', dataKey: 'revenue', name: 'Revenue', color: '#312e4d' },
        ],
        height: 400,
    },
};

/**
 * Chart with Area, Bar, and Line combined
 */
export const WithArea: Story = {
    args: {
        data: monthlyData,
        xAxisKey: 'month',
        series: [
            { type: 'area', dataKey: 'profit', name: 'Profit', color: '#4a90d9' },
            { type: 'bar', dataKey: 'sales', name: 'Sales', color: '#00995a' },
            { type: 'line', dataKey: 'revenue', name: 'Revenue', color: '#ff305f' },
        ],
        height: 400,
    },
};

/**
 * Multiple bars chart
 */
export const BarsOnly: Story = {
    args: {
        data: performanceData,
        xAxisKey: 'name',
        series: [
            { type: 'bar', dataKey: 'uv', name: 'UV', color: '#00995a' },
            { type: 'bar', dataKey: 'pv', name: 'PV', color: '#312e4d' },
        ],
        height: 400,
    },
};

/**
 * Multiple lines chart
 */
export const LinesOnly: Story = {
    args: {
        data: performanceData,
        xAxisKey: 'name',
        series: [
            { type: 'line', dataKey: 'uv', name: 'UV', color: '#00995a' },
            { type: 'line', dataKey: 'pv', name: 'PV', color: '#ff305f' },
            { type: 'line', dataKey: 'amt', name: 'AMT', color: '#4a90d9' },
        ],
        height: 400,
    },
};

/**
 * Stacked bars example
 */
export const StackedBars: Story = {
    args: {
        data: monthlyData,
        xAxisKey: 'month',
        series: [
            { type: 'bar', dataKey: 'sales', name: 'Sales', color: '#00995a', stackId: 'a' },
            { type: 'bar', dataKey: 'profit', name: 'Profit', color: '#312e4d', stackId: 'a' },
        ],
        height: 400,
    },
};

/**
 * Full composed example with all three types
 */
export const FullComposed: Story = {
    args: {
        data: performanceData,
        xAxisKey: 'name',
        series: [
            { type: 'area', dataKey: 'amt', name: 'AMT', color: '#e8f5e9' },
            { type: 'bar', dataKey: 'pv', name: 'PV', color: '#00995a' },
            { type: 'line', dataKey: 'uv', name: 'UV', color: '#ff305f' },
        ],
        height: 400,
    },
};

/**
 * Chart with dual Y-axis
 */
export const DualYAxis: Story = {
    args: {
        data: monthlyData,
        xAxisKey: 'month',
        series: [
            { type: 'bar', dataKey: 'sales', name: 'Sales', color: '#00995a', yAxisId: 'left' },
            { type: 'line', dataKey: 'revenue', name: 'Revenue', color: '#ff305f', yAxisId: 'right' },
        ],
        showRightYAxis: true,
        height: 400,
    },
};

/**
 * Minimal chart without grid and legend
 */
export const Minimal: Story = {
    args: {
        data: monthlyData,
        xAxisKey: 'month',
        series: [
            { type: 'line', dataKey: 'sales', name: 'Sales', color: '#00995a' },
        ],
        showGrid: false,
        showLegend: false,
        height: 300,
    },
};

/**
 * Chart with title and axis labels
 */
export const WithTitles: Story = {
    args: {
        data: monthlyData,
        xAxisKey: 'month',
        series: [
            { type: 'bar', dataKey: 'sales', name: 'Sales', color: '#00995a' },
            { type: 'line', dataKey: 'revenue', name: 'Revenue', color: '#312e4d' },
        ],
        title: 'Monthly Sales Performance',
        xAxisLabel: 'Month',
        yAxisLabel: 'Amount ($)',
        height: 450,
    },
};

/**
 * Dual Y-axis chart with labels on both axes
 */
export const DualYAxisWithLabels: Story = {
    args: {
        data: monthlyData,
        xAxisKey: 'month',
        series: [
            { type: 'bar', dataKey: 'sales', name: 'Sales', color: '#00995a', yAxisId: 'left' },
            { type: 'line', dataKey: 'revenue', name: 'Revenue', color: '#ff305f', yAxisId: 'right' },
        ],
        showRightYAxis: true,
        title: 'Sales vs Revenue Comparison',
        xAxisLabel: 'Month',
        yAxisLabel: 'Sales (units)',
        yAxisRightLabel: 'Revenue ($)',
        height: 450,
    },
};
