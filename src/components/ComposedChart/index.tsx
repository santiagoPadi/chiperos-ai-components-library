import * as React from 'react';
import {
    ComposedChart as RechartsComposedChart,
    Bar,
    Line,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

/**
 * Configuration for a single data series in the chart
 */
export interface ComposedChartSeries {
    /**
     * Type of visualization for this series
     */
    type: 'bar' | 'line' | 'area';

    /**
     * Key in the data objects for this series values
     */
    dataKey: string;

    /**
     * Display name for this series (used in legend and tooltip)
     */
    name?: string;

    /**
     * Color for this series
     * @default Auto-assigned from palette
     */
    color?: string;

    /**
     * Stack ID for grouping stacked bars/areas
     */
    stackId?: string;

    /**
     * Y-axis ID to use for this series
     * @default "left"
     */
    yAxisId?: 'left' | 'right';
}

export interface ComposedChartProps {
    /**
     * Array of data objects to display
     */
    data: Record<string, unknown>[];

    /**
     * Configuration for each data series
     */
    series: ComposedChartSeries[];

    /**
     * Key in the data objects for the X-axis values
     */
    xAxisKey: string;

    /**
     * Height of the chart in pixels
     * @default 400
     */
    height?: number;

    /**
     * Whether to show the grid lines
     * @default true
     */
    showGrid?: boolean;

    /**
     * Whether to show the legend
     * @default true
     */
    showLegend?: boolean;

    /**
     * Whether to show tooltips on hover
     * @default true
     */
    showTooltip?: boolean;

    /**
     * Whether to show a secondary Y-axis on the right
     * @default false
     */
    showRightYAxis?: boolean;

    /**
     * Custom margin for the chart
     */
    margin?: {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };

    /**
     * Bar gap in pixels
     * @default 4
     */
    barGap?: number;

    /**
     * Bar size in pixels
     */
    barSize?: number;
}

// Default color palette
const DEFAULT_COLORS = [
    '#00995a', // Primary green
    '#312e4d', // Dark purple
    '#575385', // Medium purple
    '#ff305f', // Red/Pink
    '#f5a623', // Orange
    '#4a90d9', // Blue
];

/**
 * ComposedChart Component
 * 
 * A flexible chart component that can display bars, lines, and areas together.
 * Built on top of recharts library.
 * 
 * @example
 * ```tsx
 * <ComposedChart
 *   data={[
 *     { month: 'Jan', sales: 400, revenue: 2400 },
 *     { month: 'Feb', sales: 300, revenue: 1398 },
 *   ]}
 *   xAxisKey="month"
 *   series={[
 *     { type: 'bar', dataKey: 'sales', name: 'Sales', color: '#00995a' },
 *     { type: 'line', dataKey: 'revenue', name: 'Revenue', color: '#312e4d' },
 *   ]}
 * />
 * ```
 */
export const ComposedChart: React.FC<ComposedChartProps> = ({
    data,
    series,
    xAxisKey,
    height = 400,
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    showRightYAxis = false,
    margin = { top: 20, right: 30, left: 20, bottom: 5 },
    barGap = 4,
    barSize,
}) => {
    const getSeriesColor = (index: number, customColor?: string): string => {
        return customColor || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
    };

    const renderSeries = () => {
        return series.map((s, index) => {
            const color = getSeriesColor(index, s.color);
            const commonProps = {
                key: `${s.type}-${s.dataKey}`,
                dataKey: s.dataKey,
                name: s.name || s.dataKey,
                yAxisId: s.yAxisId || 'left',
            };

            switch (s.type) {
                case 'bar':
                    return (
                        <Bar
                            {...commonProps}
                            fill={color}
                            stackId={s.stackId}
                            radius={[4, 4, 0, 0]}
                        />
                    );
                case 'line':
                    return (
                        <Line
                            {...commonProps}
                            type="monotone"
                            stroke={color}
                            strokeWidth={2}
                            dot={{ fill: color, strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                        />
                    );
                case 'area':
                    return (
                        <Area
                            {...commonProps}
                            type="monotone"
                            stroke={color}
                            fill={color}
                            fillOpacity={0.3}
                            stackId={s.stackId}
                        />
                    );
                default:
                    return null;
            }
        });
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <RechartsComposedChart
                data={data}
                margin={margin}
                barGap={barGap}
                barSize={barSize}
            >
                {showGrid && (
                    <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="#ecebf0"
                        vertical={false}
                    />
                )}

                <XAxis
                    dataKey={xAxisKey}
                    axisLine={{ stroke: '#c6c6c6' }}
                    tickLine={false}
                    tick={{ fill: '#575385', fontSize: 12 }}
                />

                <YAxis
                    yAxisId="left"
                    axisLine={{ stroke: '#c6c6c6' }}
                    tickLine={false}
                    tick={{ fill: '#575385', fontSize: 12 }}
                />

                {showRightYAxis && (
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        axisLine={{ stroke: '#c6c6c6' }}
                        tickLine={false}
                        tick={{ fill: '#575385', fontSize: 12 }}
                    />
                )}

                {showTooltip && (
                    <Tooltip
                        contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #ecebf0',
                            borderRadius: '8px',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        }}
                        labelStyle={{ color: '#312e4d', fontWeight: 600 }}
                        itemStyle={{ color: '#575385' }}
                    />
                )}

                {showLegend && (
                    <Legend
                        wrapperStyle={{ paddingTop: '20px' }}
                        iconType="circle"
                    />
                )}

                {renderSeries()}
            </RechartsComposedChart>
        </ResponsiveContainer>
    );
};

ComposedChart.displayName = 'ComposedChart';
