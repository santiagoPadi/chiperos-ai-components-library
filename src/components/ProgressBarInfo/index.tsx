import * as React from 'react';
import { cn } from '../../lib/utils';

/**
 * A single segment in the progress bar
 */
export interface ProgressBarSegment {
    /**
     * Unique identifier for the segment
     */
    id: string;

    /**
     * Display label for this segment
     */
    label: string;

    /**
     * Percentage value (0-100) for this segment
     */
    percentage: number;

    /**
     * Change indicator (e.g., +5.9%, -2.3%)
     */
    change?: string;

    /**
     * Custom color for this segment (optional - uses palette if not provided)
     */
    color?: string;
}

export interface ProgressBarInfoProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Array of segments to display
     */
    segments: ProgressBarSegment[];

    /**
     * Height of the progress bar in pixels
     * @default 24
     */
    barHeight?: number;

    /**
     * Border radius of the progress bar
     * @default 8
     */
    borderRadius?: number;

    /**
     * Number of columns for the legend grid
     * @default 2
     */
    legendColumns?: number;

    /**
     * Whether to show the legend
     * @default true
     */
    showLegend?: boolean;

    /**
     * Gap between legend items
     * @default 16
     */
    legendGap?: number;
}

// Color palette based on the design system
// Primary: #00995A, followed by secondary colors
const SERIES_COLORS = [
    '#00995A', // Primary green
    '#26C899',
    '#575385',
    '#FF305F',
    '#4087FB',
    '#FFB24B',
    '#D4002C',
    '#D48620',
    '#133FCB',
    '#2B72FB',
    '#64BDC6',
    '#EECA34',
    '#FE6A35',
    '#FA4B42',
    '#EE60E0',
    '#7B47E9',
    '#5D89DF',
    '#6AD1FE',
    '#3FDC7E',
];

/**
 * ProgressBarInfo Component
 * 
 * A stacked horizontal progress bar with a legend showing category breakdown.
 * Width is 100% of its container.
 * 
 * @example
 * ```tsx
 * <ProgressBarInfo
 *   segments={[
 *     { id: '1', label: 'Bebidas no Alcohólicas', percentage: 41.2, change: '+5.9%' },
 *     { id: '2', label: 'Despensa', percentage: 12.3, change: '+1.7%' },
 *     { id: '3', label: 'Pide tu bulto aquí', percentage: 8, change: '+23.2%' },
 *   ]}
 * />
 * ```
 */
export const ProgressBarInfo = React.forwardRef<HTMLDivElement, ProgressBarInfoProps>(
    (
        {
            segments,
            barHeight = 24,
            borderRadius = 8,
            legendColumns = 2,
            showLegend = true,
            legendGap = 16,
            className,
            ...props
        },
        ref
    ) => {
        const getSegmentColor = (index: number, customColor?: string): string => {
            return customColor || SERIES_COLORS[index % SERIES_COLORS.length];
        };

        // Sort segments by percentage (largest first) for better visual
        const sortedSegments = [...segments].sort((a, b) => b.percentage - a.percentage);

        return (
            <div
                ref={ref}
                className={cn('w-full', className)}
                {...props}
            >
                {/* Progress Bar */}
                <div
                    className="w-full flex overflow-hidden"
                    style={{
                        height: barHeight,
                        borderRadius: borderRadius,
                    }}
                >
                    {sortedSegments.map((segment, index) => (
                        <div
                            key={segment.id}
                            className="h-full transition-all duration-300"
                            style={{
                                width: `${segment.percentage}%`,
                                backgroundColor: getSegmentColor(index, segment.color),
                            }}
                            title={`${segment.label}: ${segment.percentage}%`}
                        />
                    ))}
                </div>

                {/* Legend */}
                {showLegend && (
                    <div
                        className="mt-4"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: `repeat(${legendColumns}, 1fr)`,
                            gap: legendGap,
                        }}
                    >
                        {sortedSegments.map((segment, index) => (
                            <div
                                key={segment.id}
                                className="flex items-center justify-between"
                            >
                                {/* Left side: dot + label */}
                                <div className="flex items-center gap-2 min-w-0">
                                    <div
                                        className="w-3 h-3 rounded-full shrink-0"
                                        style={{
                                            backgroundColor: getSegmentColor(index, segment.color),
                                        }}
                                    />
                                    <span
                                        className="text-sm text-[#312e4d] truncate"
                                        style={{ fontFamily: 'Causten Round, sans-serif' }}
                                    >
                                        {segment.label}
                                    </span>
                                </div>

                                {/* Right side: percentage + change */}
                                <div className="flex items-center gap-2 shrink-0 ml-2">
                                    <span
                                        className="text-sm font-semibold text-[#312e4d]"
                                        style={{ fontFamily: 'Causten Round, sans-serif' }}
                                    >
                                        {segment.percentage}%
                                    </span>
                                    {segment.change && (
                                        <span
                                            className={cn(
                                                'text-sm',
                                                segment.change.startsWith('+') ? 'text-[#00995a]' : 'text-[#d4002c]'
                                            )}
                                            style={{ fontFamily: 'Causten Round, sans-serif' }}
                                        >
                                            {segment.change}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);

ProgressBarInfo.displayName = 'ProgressBarInfo';
