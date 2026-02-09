import type { Meta, StoryObj } from '@storybook/react';
import { ComposedChart } from './index';

const meta: Meta<typeof ComposedChart> = {
    title: 'Components/ComposedChart',
    component: ComposedChart,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        data: {
            control: 'object',
            description: 'Array of data objects to display',
            table: {
                type: { summary: 'Record<string, unknown>[]' },
            },
        },
        series: {
            control: 'object',
            description: 'Configuration for each data series (type, dataKey, name, color, stackId, yAxisId)',
            table: {
                type: { summary: 'ComposedChartSeries[]' },
            },
        },
        xAxisKey: {
            control: 'text',
            description: 'Key in the data objects for the X-axis values',
            table: {
                type: { summary: 'string' },
            },
        },
        height: {
            control: 'number',
            description: 'Height of the chart in pixels',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '400' },
            },
        },
        showGrid: {
            control: 'boolean',
            description: 'Whether to show grid lines',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
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
        showTooltip: {
            control: 'boolean',
            description: 'Whether to show tooltips on hover',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'true' },
            },
        },
        showRightYAxis: {
            control: 'boolean',
            description: 'Whether to show a secondary Y-axis on the right',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
            },
        },
        margin: {
            control: 'object',
            description: 'Custom margin for the chart',
            table: {
                type: { summary: '{ top?: number; right?: number; bottom?: number; left?: number }' },
            },
        },
        barGap: {
            control: 'number',
            description: 'Gap between bars in pixels',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '4' },
            },
        },
        barSize: {
            control: 'number',
            description: 'Bar size in pixels',
            table: {
                type: { summary: 'number' },
            },
        },
        title: {
            control: 'text',
            description: 'Main title of the chart',
            table: {
                type: { summary: 'string' },
            },
        },
        xAxisLabel: {
            control: 'text',
            description: 'Label for the X-axis',
            table: {
                type: { summary: 'string' },
            },
        },
        yAxisLabel: {
            control: 'text',
            description: 'Label for the left Y-axis',
            table: {
                type: { summary: 'string' },
            },
        },
        yAxisRightLabel: {
            control: 'text',
            description: 'Label for the right Y-axis (only when showRightYAxis is true)',
            table: {
                type: { summary: 'string' },
            },
        },
        currencyFormat: {
            control: 'object',
            description: 'Currency format config for the left Y-axis',
            table: {
                type: { summary: 'CurrencyFormatConfig' },
            },
        },
        currencyFormatRight: {
            control: 'object',
            description: 'Currency format config for the right Y-axis',
            table: {
                type: { summary: 'CurrencyFormatConfig' },
            },
        },
    },
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

// Sample data with larger numbers for currency formatting demo
const currencyData = [
    { month: 'Jan', sales: 45000, revenue: 124500, profit: 32000 },
    { month: 'Feb', sales: 38500, revenue: 98750, profit: 28500 },
    { month: 'Mar', sales: 52000, revenue: 156200, profit: 45600 },
    { month: 'Apr', sales: 41200, revenue: 108900, profit: 31200 },
    { month: 'May', sales: 67800, revenue: 189000, profit: 58400 },
    { month: 'Jun', sales: 58300, revenue: 172500, profit: 49200 },
];

/**
 * Chart with currency formatting (without decimals)
 * Values are formatted with thousand separators (dots) and currency symbol
 */
export const CurrencyFormat: Story = {
    args: {
        data: currencyData,
        xAxisKey: 'month',
        series: [
            { type: 'bar', dataKey: 'sales', name: 'Ventas', color: '#00995a' },
            { type: 'line', dataKey: 'revenue', name: 'Ingresos', color: '#312e4d' },
        ],
        title: 'Ventas Mensuales',
        xAxisLabel: 'Mes',
        yAxisLabel: 'Monto',
        currencyFormat: {
            enabled: true,
            symbol: '$',
            showDecimals: false,
        },
        height: 450,
    },
};

/**
 * Chart with currency formatting including decimals
 */
export const CurrencyFormatWithDecimals: Story = {
    args: {
        data: currencyData,
        xAxisKey: 'month',
        series: [
            { type: 'bar', dataKey: 'sales', name: 'Ventas', color: '#00995a' },
            { type: 'line', dataKey: 'profit', name: 'Ganancia', color: '#ff305f' },
        ],
        title: 'Análisis Financiero',
        xAxisLabel: 'Mes',
        yAxisLabel: 'Monto (MXN)',
        currencyFormat: {
            enabled: true,
            symbol: 'MXN ',
            showDecimals: true,
            decimalPlaces: 2,
        },
        height: 450,
    },
};

/**
 * Dual Y-axis with different currency formats
 * Left axis: USD without decimals, Right axis: EUR with decimals
 */
export const DualAxisCurrencyFormat: Story = {
    args: {
        data: currencyData,
        xAxisKey: 'month',
        series: [
            { type: 'bar', dataKey: 'sales', name: 'Ventas (USD)', color: '#00995a', yAxisId: 'left' },
            { type: 'line', dataKey: 'revenue', name: 'Ingresos (EUR)', color: '#ff305f', yAxisId: 'right' },
        ],
        showRightYAxis: true,
        title: 'Comparación de Monedas',
        xAxisLabel: 'Mes',
        yAxisLabel: 'USD',
        yAxisRightLabel: 'EUR',
        currencyFormat: {
            enabled: true,
            symbol: '$',
            showDecimals: false,
        },
        currencyFormatRight: {
            enabled: true,
            symbol: '€',
            showDecimals: true,
            decimalPlaces: 2,
        },
        height: 450,
    },
};

/**
 * Currency format with symbol as suffix
 */
export const CurrencyFormatSuffix: Story = {
    args: {
        data: currencyData,
        xAxisKey: 'month',
        series: [
            { type: 'area', dataKey: 'profit', name: 'Ganancia', color: '#4a90d9' },
            { type: 'bar', dataKey: 'sales', name: 'Ventas', color: '#00995a' },
        ],
        title: 'Reporte en Pesos',
        xAxisLabel: 'Mes',
        yAxisLabel: 'Monto',
        currencyFormat: {
            enabled: true,
            symbol: 'MXN',
            showDecimals: false,
            symbolPosition: 'suffix',
        },
        height: 450,
    },
};
