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

/**
 * Currency format configuration
 */
export interface CurrencyFormatConfig {
    /**
     * Whether to format values as currency
     * @default false
     */
    enabled: boolean;

    /**
     * Currency symbol to display (e.g., "$", "€", "MXN")
     * @default "$"
     */
    symbol?: string;

    /**
     * Whether to show decimal places
     * @default false
     */
    showDecimals?: boolean;

    /**
     * Number of decimal places to show (only when showDecimals is true)
     * @default 2
     */
    decimalPlaces?: number;

    /**
     * Position of the currency symbol
     * @default "prefix"
     */
    symbolPosition?: 'prefix' | 'suffix';
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

    /**
     * Main title of the chart
     */
    title?: string;

    /**
     * Label for the X-axis
     */
    xAxisLabel?: string;

    /**
     * Label for the left Y-axis
     */
    yAxisLabel?: string;

    /**
     * Label for the right Y-axis (only shown when showRightYAxis is true)
     */
    yAxisRightLabel?: string;

    /**
     * Currency format configuration for the left Y-axis
     * When enabled, values will be formatted with thousand separators (dots)
     * and optional currency symbol
     */
    currencyFormat?: CurrencyFormatConfig;

    /**
     * Currency format configuration for the right Y-axis
     * When enabled, values will be formatted with thousand separators (dots)
     * and optional currency symbol
     */
    currencyFormatRight?: CurrencyFormatConfig;
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
 * Formats a number as currency with dot as thousand separator
 * @param value - The number to format
 * @param config - Currency format configuration
 * @returns Formatted currency string
 */
const formatCurrency = (value: number, config: CurrencyFormatConfig): string => {
    const {
        symbol = '$',
        showDecimals = false,
        decimalPlaces = 2,
        symbolPosition = 'prefix',
    } = config;

    // Format number with thousand separators (dots) and optional decimals
    let formattedNumber: string;
    
    if (showDecimals) {
        // Format with decimals using comma as decimal separator
        const fixedNumber = value.toFixed(decimalPlaces);
        const [integerPart, decimalPart] = fixedNumber.split('.');
        const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        formattedNumber = `${formattedInteger},${decimalPart}`;
    } else {
        // Format without decimals
        const roundedValue = Math.round(value);
        formattedNumber = roundedValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }

    // Add currency symbol
    if (symbolPosition === 'suffix') {
        return `${formattedNumber} ${symbol}`;
    }
    return `${symbol}${formattedNumber}`;
};

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
 *   title="Monthly Performance"
 *   xAxisLabel="Month"
 *   yAxisLabel="Amount"
 * />
 * ```
 */
export const ComposedChart: React.FC<ComposedChartProps> = ({
    data: dataProp,
    series: seriesProp,
    xAxisKey,
    height = 400,
    showGrid = true,
    showLegend = true,
    showTooltip = true,
    showRightYAxis = false,
    margin,
    barGap = 4,
    barSize,
    title,
    xAxisLabel,
    yAxisLabel,
    yAxisRightLabel,
    currencyFormat,
    currencyFormatRight,
}) => {
    // Create deep copies of data and series to avoid readonly issues in Storybook
    const data = React.useMemo(() => 
        dataProp.map(item => ({ ...item })), 
        [dataProp]
    );
    
    const series = React.useMemo(() => 
        seriesProp.map(s => ({ ...s })), 
        [seriesProp]
    );

    // Adjust margins based on labels (title is now rendered outside the chart)
    const chartMargin = React.useMemo(() => {
        if (margin) {
            return {
                top: margin.top ?? 20,
                right: margin.right ?? 30,
                left: margin.left ?? 20,
                bottom: margin.bottom ?? 5,
            };
        }
        
        // Calculate left margin based on currency format and label
        let leftMargin = 20;
        if (currencyFormat?.enabled) {
            leftMargin = 80; // More space for formatted currency values
        } else if (yAxisLabel) {
            leftMargin = 60;
        }
        
        // Calculate right margin based on currency format and label
        let rightMargin = 30;
        if (showRightYAxis) {
            if (currencyFormatRight?.enabled) {
                rightMargin = 80;
            } else if (yAxisRightLabel) {
                rightMargin = 60;
            }
        }
        
        return {
            top: 20,
            right: rightMargin,
            left: leftMargin,
            bottom: xAxisLabel ? 40 : 5,
        };
    }, [margin, showRightYAxis, yAxisRightLabel, yAxisLabel, xAxisLabel, currencyFormat, currencyFormatRight]);

    const getSeriesColor = (index: number, customColor?: string): string => {
        return customColor || DEFAULT_COLORS[index % DEFAULT_COLORS.length];
    };

    // Create tick formatters for Y axes
    const leftAxisFormatter = React.useCallback((value: number): string => {
        if (currencyFormat?.enabled) {
            return formatCurrency(value, currencyFormat);
        }
        return value.toString();
    }, [currencyFormat]);

    const rightAxisFormatter = React.useCallback((value: number): string => {
        if (currencyFormatRight?.enabled) {
            return formatCurrency(value, currencyFormatRight);
        }
        return value.toString();
    }, [currencyFormatRight]);

    // Custom tooltip formatter
    const tooltipFormatter = React.useCallback((value: number | undefined, name: string | undefined): [string, string] => {
        const displayName = name || '';
        
        if (value === undefined) {
            return ['—', displayName];
        }
        
        // Find the series config for this data key
        const seriesConfig = series.find(s => s.name === name || s.dataKey === name);
        const yAxisId = seriesConfig?.yAxisId || 'left';
        
        let formattedValue: string;
        if (yAxisId === 'right' && currencyFormatRight?.enabled) {
            formattedValue = formatCurrency(value, currencyFormatRight);
        } else if (yAxisId === 'left' && currencyFormat?.enabled) {
            formattedValue = formatCurrency(value, currencyFormat);
        } else {
            formattedValue = value.toString();
        }
        
        return [formattedValue, displayName];
    }, [series, currencyFormat, currencyFormatRight]);

    const renderSeries = () => {
        return series.map((s, index) => {
            const color = getSeriesColor(index, s.color);

            switch (s.type) {
                case 'bar':
                    return (
                        <Bar
                            key={`bar-${s.dataKey}-${index}`}
                            dataKey={s.dataKey}
                            name={s.name || s.dataKey}
                            yAxisId={s.yAxisId || 'left'}
                            fill={color}
                            stackId={s.stackId}
                            radius={[4, 4, 0, 0] as [number, number, number, number]}
                        />
                    );
                case 'line':
                    return (
                        <Line
                            key={`line-${s.dataKey}-${index}`}
                            dataKey={s.dataKey}
                            name={s.name || s.dataKey}
                            yAxisId={s.yAxisId || 'left'}
                            type="monotone"
                            stroke={color}
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 6 }}
                        />
                    );
                case 'area':
                    return (
                        <Area
                            key={`area-${s.dataKey}-${index}`}
                            dataKey={s.dataKey}
                            name={s.name || s.dataKey}
                            yAxisId={s.yAxisId || 'left'}
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
        <div style={{ width: '100%' }}>
            {title && (
                <div
                    style={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontWeight: 600,
                        color: '#312e4d',
                        marginBottom: 8,
                    }}
                >
                    {title}
                </div>
            )}
            <ResponsiveContainer width="100%" height={height}>
                <RechartsComposedChart
                    data={data}
                    margin={chartMargin}
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
                        stroke="#c6c6c6"
                        tickLine={false}
                        tick={{ fill: '#575385', fontSize: 12 }}
                        label={xAxisLabel ? {
                            value: xAxisLabel,
                            position: 'bottom',
                            offset: 0,
                            style: { textAnchor: 'middle', fill: '#575385', fontSize: 12 }
                        } : undefined}
                    />

                    <YAxis
                        yAxisId="left"
                        stroke="#c6c6c6"
                        tickLine={false}
                        tick={{ fill: '#575385', fontSize: 12 }}
                        tickFormatter={currencyFormat?.enabled ? leftAxisFormatter : undefined}
                        label={yAxisLabel ? {
                            value: yAxisLabel,
                            angle: -90,
                            position: 'insideLeft',
                            dx: -15,
                            style: { textAnchor: 'middle', fill: '#575385', fontSize: 12 }
                        } : undefined}
                    />

                    {showRightYAxis && (
                        <YAxis
                            yAxisId="right"
                            orientation="right"
                            stroke="#c6c6c6"
                            tickLine={false}
                            tick={{ fill: '#575385', fontSize: 12 }}
                            tickFormatter={currencyFormatRight?.enabled ? rightAxisFormatter : undefined}
                            label={yAxisRightLabel ? {
                                value: yAxisRightLabel,
                                angle: 90,
                                position: 'insideRight',
                                dx: 15,
                                style: { textAnchor: 'middle', fill: '#575385', fontSize: 12 }
                            } : undefined}
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
                            formatter={(currencyFormat?.enabled || currencyFormatRight?.enabled) ? tooltipFormatter : undefined}
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
        </div>
    );
};

ComposedChart.displayName = 'ComposedChart';
