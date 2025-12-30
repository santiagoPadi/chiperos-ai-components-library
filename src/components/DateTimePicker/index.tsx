import { forwardRef, useState, useMemo, useCallback, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

/**
 * Date selection mode
 */
export type DateTimePickerMode = 'single' | 'range' | 'multi';

/**
 * Calendar view type
 */
export type CalendarViewType = 'single' | 'multi';

/**
 * Date state for calendar cells
 */
export type DateState = 'regular' | 'holiday' | 'today' | 'selected' | 'selected-start' | 'selected-end' | 'selected-middle' | 'empty' | 'hover';

/**
 * Holiday definition
 */
export interface Holiday {
  date: Date;
  label?: string;
}

/**
 * Event day definition (for showing event indicators)
 */
export interface EventDay {
  date: Date;
}

/**
 * Time preset option
 */
export interface TimePreset {
  label: string;
  value: string; // Time value in HH:mm format
  time?: Date; // Optional Date object for the time
}

/**
 * Selected date(s) - can be single date, date range, or multiple dates
 */
export type SelectedDates =
  | Date
  | { start: Date; end: Date }
  | Date[]
  | null
  | undefined;

/**
 * Props for DateTimePicker component
 */
export interface DateTimePickerProps {
  /**
   * Current selected date(s)
   * - For 'single' mode: Date | null
   * - For 'range' mode: { start: Date; end: Date } | null
   * - For 'multi' mode: Date[] | null
   */
  value?: SelectedDates;

  /**
   * Callback fired when date selection changes
   */
  onChange?: (dates: SelectedDates) => void;

  /**
   * Selection mode: single date, date range, or multiple dates
   * @default 'single'
   */
  mode?: DateTimePickerMode;

  /**
   * Calendar view type: single or multi calendar
   * @default 'single'
   */
  calendarView?: CalendarViewType;

  /**
   * Whether to show time presets
   * @default false
   */
  showTimePresets?: boolean;

  /**
   * Time preset options
   * @deprecated Time presets are now fixed. This prop is kept for backward compatibility but has no effect.
   */
  timePresets?: TimePreset[];

  /**
   * Selected time preset value
   * @deprecated This prop is kept for backward compatibility but has no effect.
   */
  selectedTimePreset?: string;

  /**
   * Callback fired when time preset is selected
   * @deprecated This prop is kept for backward compatibility but has no effect.
   */
  onTimePresetChange?: (preset: string) => void;

  /**
   * Whether to show the input field
   * @default true
   */
  showInput?: boolean;

  /**
   * Input label
   */
  label?: string;

  /**
   * Whether to show the label
   * @default true
   */
  showLabel?: boolean;

  /**
   * Whether the label is required (shows asterisk)
   * @default false
   */
  required?: boolean;

  /**
   * Input placeholder
   * @default 'Select'
   */
  placeholder?: string;

  /**
   * Format function for displaying selected date(s) in input
   */
  formatValue?: (dates: SelectedDates) => string;

  /**
   * List of holidays to highlight
   */
  holidays?: Holiday[];

  /**
   * List of event days (shows indicator dot)
   */
  eventDays?: EventDay[];

  /**
   * Minimum selectable date
   */
  minDate?: Date;

  /**
   * Maximum selectable date
   */
  maxDate?: Date;

  /**
   * Initial month to display (defaults to current month)
   */
  initialMonth?: Date;

  /**
   * Whether to show action buttons (Cancel/Save)
   * @default true
   * @deprecated Action buttons are now always visible. This prop is kept for backward compatibility but has no effect.
   */
  showActions?: boolean;

  /**
   * Cancel button label
   * @default 'Cancel'
   */
  cancelLabel?: string;

  /**
   * Save button label
   * @default 'Save'
   */
  saveLabel?: string;

  /**
   * Callback fired when cancel is clicked
   */
  onCancel?: () => void;

  /**
   * Callback fired when save is clicked
   */
  onSave?: (dates: SelectedDates) => void;

  /**
   * Whether the picker is disabled
   * @default false
   */
  disabled?: boolean;

  /**
   * Error message or state
   */
  error?: string | boolean;

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Whether the calendar is open
   */
  open?: boolean;

  /**
   * Callback fired when open state changes
   */
  onOpenChange?: (open: boolean) => void;

  /**
   * Custom locale for date formatting (defaults to browser locale)
   */
  locale?: string;

  /**
   * First day of week (0 = Sunday, 1 = Monday, etc.)
   * @default 0
   */
  firstDayOfWeek?: number;

  /**
   * Custom weekday labels
   */
  weekdayLabels?: string[];

  /**
   * Custom month names
   */
  monthNames?: string[];
}

// Helper functions for date manipulation
const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};


const isToday = (date: Date): boolean => {
  return isSameDay(date, new Date());
};

const isHoliday = (date: Date, holidays?: Holiday[]): boolean => {
  if (!holidays) return false;
  return holidays.some(holiday => isSameDay(date, holiday.date));
};

const hasEvent = (date: Date, eventDays?: EventDay[]): boolean => {
  if (!eventDays) return false;
  return eventDays.some(event => isSameDay(date, event.date));
};

const isInRange = (date: Date, start: Date, end: Date): boolean => {
  return date >= start && date <= end;
};

const getDateState = (
  date: Date,
  selectedDates: SelectedDates,
  mode: DateTimePickerMode,
  holidays?: Holiday[]
): DateState => {
  // Check selection first (selection has priority over today/holiday states)
  if (selectedDates) {
    if (mode === 'single') {
      if (selectedDates instanceof Date && isSameDay(date, selectedDates)) {
        return 'selected';
      }
    }

    if (mode === 'range') {
      if (typeof selectedDates === 'object' && 'start' in selectedDates) {
        const { start, end } = selectedDates;
        const isStart = isSameDay(date, start);
        const isEnd = isSameDay(date, end);
        // If start and end are the same day, show as 'selected'
        if (isStart && isEnd) {
          return 'selected';
        }
        if (isStart) {
          return 'selected-start';
        }
        if (isEnd) {
          return 'selected-end';
        }
        if (isInRange(date, start, end)) {
          return 'selected-middle';
        }
      }
    }

    if (mode === 'multi') {
      if (Array.isArray(selectedDates) && selectedDates.some(d => isSameDay(date, d))) {
        return 'selected';
      }
    }
  }

  // Then check holiday and today states
  if (isHoliday(date, holidays)) {
    return 'holiday';
  }

  if (isToday(date)) {
    return 'today';
  }

  return 'regular';
};

const getDaysInMonth = (date: Date): number => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date, firstDayOfWeek: number = 0): number => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  return (firstDay - firstDayOfWeek + 7) % 7;
};

const formatDate = (date: Date, locale: string = 'en-US'): string => {
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const formatDateRange = (
  start: Date,
  end: Date,
  locale: string = 'en-US'
): string => {
  return `${formatDate(start, locale)} - ${formatDate(end, locale)}`;
};

const formatDates = (
  dates: SelectedDates,
  mode: DateTimePickerMode,
  locale: string = 'en-US',
  customFormat?: (dates: SelectedDates) => string
): string => {
  if (customFormat) {
    return customFormat(dates);
  }

  if (!dates) {
    return '';
  }

  if (mode === 'single' && dates instanceof Date) {
    return formatDate(dates, locale);
  }

  if (mode === 'range' && typeof dates === 'object' && 'start' in dates) {
    return formatDateRange(dates.start, dates.end, locale);
  }

  if (mode === 'multi' && Array.isArray(dates)) {
    if (dates.length === 0) return '';
    if (dates.length === 1) return formatDate(dates[0], locale);
    return `${dates.length} dates selected`;
  }

  return '';
};

const defaultWeekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const defaultMonthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const DateTimePicker = forwardRef<HTMLDivElement, DateTimePickerProps>(
  (
    {
      value,
      onChange,
      mode = 'single',
      calendarView = 'single',
      showTimePresets = false,
      timePresets: _timePresets = [], // Deprecated, kept for backward compatibility
      selectedTimePreset: _selectedTimePreset, // Deprecated, kept for backward compatibility
      onTimePresetChange: _onTimePresetChange, // Deprecated, kept for backward compatibility
      showInput = true,
      label,
      showLabel = true,
      required = false,
      placeholder = 'Select',
      formatValue,
      holidays = [],
      eventDays = [],
      minDate,
      maxDate,
      initialMonth,
      showActions = true, // Always show actions, kept for backward compatibility
      cancelLabel = 'Cancel',
      saveLabel = 'Save',
      onCancel,
      onSave,
      disabled = false,
      error,
      className,
      open: controlledOpen,
      onOpenChange,
      locale = 'en-US',
      firstDayOfWeek = 0,
      weekdayLabels = defaultWeekdayLabels,
      monthNames = defaultMonthNames,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState<Date>(
      initialMonth || new Date()
    );
    const [secondMonth, setSecondMonth] = useState<Date>(() => {
      const nextMonth = new Date(currentMonth);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    });
    // Temporary value for selection before saving
    const [tempValue, setTempValue] = useState<SelectedDates>(value);
    // Track which preset is currently selected
    const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

    const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

    // Reset tempValue and selectedPreset when popup opens or value changes externally
    useEffect(() => {
      if (isOpen) {
        setTempValue(value);
        setSelectedPreset(null);
      }
    }, [isOpen, value]);

    const handleOpenChange = useCallback((newOpen: boolean) => {
      if (onOpenChange) {
        onOpenChange(newOpen);
      } else {
        setInternalOpen(newOpen);
      }
      // Reset temp value and preset when closing
      if (!newOpen) {
        setTempValue(value);
        setSelectedPreset(null);
      }
    }, [onOpenChange, value]);

    const handleDateClick = useCallback((date: Date) => {
      if (disabled) return;

      // Clear preset when manually selecting a date
      setSelectedPreset(null);

      if (mode === 'single') {
        setTempValue(date);
      } else if (mode === 'range') {
        if (!tempValue || typeof tempValue !== 'object' || !('start' in tempValue)) {
          setTempValue({ start: date, end: date });
        } else {
          const { start } = tempValue;
          if (!start || isSameDay(date, start)) {
            setTempValue({ start: date, end: date });
          } else if (date < start) {
            setTempValue({ start: date, end: start });
          } else {
            setTempValue({ start, end: date });
          }
        }
      } else if (mode === 'multi') {
        const currentDates = Array.isArray(tempValue) ? tempValue : [];
        const dateIndex = currentDates.findIndex(d => isSameDay(d, date));

        if (dateIndex >= 0) {
          // Remove date if already selected
          const newDates = currentDates.filter((_, i) => i !== dateIndex);
          setTempValue(newDates.length > 0 ? newDates : null);
        } else {
          // Add date
          setTempValue([...currentDates, date]);
        }
      }
    }, [mode, tempValue, disabled]);

    const handleSave = useCallback(() => {
      onChange?.(tempValue);
      onSave?.(tempValue);
      handleOpenChange(false);
    }, [tempValue, onChange, onSave, handleOpenChange]);

    const handleCancel = useCallback(() => {
      setTempValue(value);
      onCancel?.();
      handleOpenChange(false);
    }, [value, onCancel, handleOpenChange]);

    const handlePrevMonth = useCallback(() => {
      setCurrentMonth(prev => {
        const newMonth = new Date(prev);
        newMonth.setMonth(newMonth.getMonth() - 1);
        return newMonth;
      });

      if (calendarView === 'multi') {
        setSecondMonth(prev => {
          const newMonth = new Date(prev);
          newMonth.setMonth(newMonth.getMonth() - 1);
          return newMonth;
        });
      }
    }, [calendarView]);

    const handleNextMonth = useCallback(() => {
      setCurrentMonth(prev => {
        const newMonth = new Date(prev);
        newMonth.setMonth(newMonth.getMonth() + 1);
        return newMonth;
      });

      if (calendarView === 'multi') {
        setSecondMonth(prev => {
          const newMonth = new Date(prev);
          newMonth.setMonth(newMonth.getMonth() + 1);
          return newMonth;
        });
      }
    }, [calendarView]);

    const isDateDisabled = useCallback((date: Date): boolean => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    }, [minDate, maxDate]);

    const renderCalendar = useCallback((month: Date) => {
      const daysInMonth = getDaysInMonth(month);
      const firstDay = getFirstDayOfMonth(month, firstDayOfWeek);
      const days: (Date | null)[] = [];

      // Add empty cells for days before the first day of the month
      for (let i = 0; i < firstDay; i++) {
        days.push(null);
      }

      // Add all days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(month.getFullYear(), month.getMonth(), day));
      }

      // Group days into weeks and ensure each week has exactly 7 days
      const weeks: (Date | null)[][] = [];
      for (let i = 0; i < days.length; i += 7) {
        const week = days.slice(i, i + 7);
        // Pad the last week with null values if it doesn't have 7 days
        while (week.length < 7) {
          week.push(null);
        }
        weeks.push(week);
      }

      return (
        <div className="flex flex-col gap-1 w-full">
          {/* Weekday headers */}
          <div className="flex items-start w-full">
            {weekdayLabels.map((label, index) => {
              const dayIndex = (index + firstDayOfWeek) % 7;
              const isHolidayDay = dayIndex === 0 || dayIndex === 6; // Sunday or Saturday
              return (
                <div
                  key={index}
                  className="flex flex-1 items-center justify-center min-h-0 min-w-0 px-0.5 py-2"
                >
                  <p
                    className={cn(
                      'text-xs text-center w-7 whitespace-pre-wrap',
                      isHolidayDay ? 'text-[#d4002c]' : 'text-[#312e4d]'
                    )}
                  >
                    {label}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Calendar days */}
          <div className="flex flex-col gap-1 w-full">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex items-start w-full">
                {week.map((date, dayIndex) => {
                  if (!date) {
                    return (
                      <div
                        key={`empty-${weekIndex}-${dayIndex}`}
                        className="flex flex-1 gap-0 h-8 items-center justify-center min-h-0 min-w-0 px-2 py-4 shrink-0"
                      />
                    );
                  }

                  const dateState = getDateState(date, tempValue, mode, holidays);
                  const hasEventDay = hasEvent(date, eventDays);
                  const isDisabled = isDateDisabled(date);

                  return (
                    <button
                      key={date.toISOString()}
                      type="button"
                      onClick={() => !isDisabled && handleDateClick(date)}
                      disabled={isDisabled || disabled}
                      className={cn(
                        'flex flex-1 gap-2 bg-white h-8 items-center justify-center min-h-0 min-w-0 p-2 relative shrink-0',
                        'transition-colors',
                        !isDisabled && !disabled && 'hover:bg-[#f4f4f4] cursor-pointer',
                        isDisabled && 'opacity-50 cursor-not-allowed',
                        dateState === 'selected' && 'bg-[#00b56b] rounded',
                        dateState === 'selected-start' && 'bg-[#00b56b] rounded-l',
                        dateState === 'selected-end' && 'bg-[#00b56b] rounded-r',
                        dateState === 'selected-middle' && 'bg-[#e6f8ef]',
                        dateState === 'today' && 'rounded-[136px]'
                      )}
                    >
                      {dateState === 'selected' && (
                        <p className="text-xs text-center text-white">
                          {date.getDate()}
                        </p>
                      )}
                      {dateState !== 'selected' && (
                        <p
                          className={cn(
                            'text-xs text-center',
                            dateState === 'holiday' && 'text-[#d4002c]',
                            dateState === 'today' && 'text-[#00995a] font-semibold',
                            dateState === 'regular' && 'text-[#312e4d]',
                            dateState === 'selected-start' && 'text-white',
                            dateState === 'selected-end' && 'text-white',
                            dateState === 'selected-middle' && 'text-[#312e4d]'
                          )}
                        >
                          {date.getDate()}
                        </p>
                      )}

                      {/* Event day indicator */}
                      {hasEventDay && (dateState === 'regular' || dateState === 'holiday' || dateState === 'today') && (
                        <div className="absolute right-1 top-1 size-1">
                          <div className="absolute inset-0 bg-[#00995a] rounded-full" />
                        </div>
                      )}
                      {hasEventDay && dateState === 'selected' && (
                        <div className="absolute right-1 top-1 size-1">
                          <div className="absolute inset-[-25%] bg-white border border-white rounded-full" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      );
    }, [
      firstDayOfWeek,
      weekdayLabels,
      tempValue,
      mode,
      holidays,
      eventDays,
      isDateDisabled,
      disabled,
      handleDateClick,
    ]);

    const displayValue = useMemo(() => {
      return formatDates(value, mode, locale, formatValue);
    }, [value, mode, locale, formatValue]);

    // Fixed time presets
    const fixedTimePresets = useMemo(() => {
      return [
        { label: 'Today', value: 'today' },
        { label: 'Tomorrow', value: 'tomorrow' },
        { label: 'This Week', value: 'this-week' },
        { label: 'This Month', value: 'this-month' },
      ];
    }, []);

    // Handle time preset click
    const handleTimePresetClick = useCallback((presetValue: string) => {
      if (disabled) return;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      let selectedDate: SelectedDates = null;
      let targetMonth: Date | null = null;

      switch (presetValue) {
        case 'today': {
          if (mode === 'single') {
            selectedDate = new Date(today);
          } else if (mode === 'range') {
            selectedDate = { start: new Date(today), end: new Date(today) };
          } else if (mode === 'multi') {
            selectedDate = [new Date(today)];
          }
          targetMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          break;
        }
        case 'tomorrow': {
          const tomorrow = new Date(today);
          tomorrow.setDate(tomorrow.getDate() + 1);
          if (mode === 'single') {
            selectedDate = tomorrow;
          } else if (mode === 'range') {
            selectedDate = { start: tomorrow, end: tomorrow };
          } else if (mode === 'multi') {
            selectedDate = [tomorrow];
          }
          targetMonth = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), 1);
          break;
        }
        case 'this-week': {
          const startOfWeek = new Date(today);
          const dayOfWeek = startOfWeek.getDay();
          const diff = startOfWeek.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Monday
          startOfWeek.setDate(diff);
          startOfWeek.setHours(0, 0, 0, 0);

          if (mode === 'single') {
            selectedDate = new Date(today);
          } else if (mode === 'range') {
            selectedDate = { start: startOfWeek, end: new Date(today) };
          } else if (mode === 'multi') {
            const dates: Date[] = [];
            const currentDate = new Date(startOfWeek);
            while (currentDate <= today) {
              dates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
            selectedDate = dates;
          }
          targetMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          break;
        }
        case 'this-month': {
          const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          startOfMonth.setHours(0, 0, 0, 0);

          if (mode === 'single') {
            selectedDate = new Date(today);
          } else if (mode === 'range') {
            selectedDate = { start: startOfMonth, end: new Date(today) };
          } else if (mode === 'multi') {
            const dates: Date[] = [];
            const currentDate = new Date(startOfMonth);
            while (currentDate <= today) {
              dates.push(new Date(currentDate));
              currentDate.setDate(currentDate.getDate() + 1);
            }
            selectedDate = dates;
          }
          targetMonth = new Date(today.getFullYear(), today.getMonth(), 1);
          break;
        }
      }

      if (selectedDate) {
        setTempValue(selectedDate);
        setSelectedPreset(presetValue);
      }

      if (targetMonth) {
        setCurrentMonth(targetMonth);
        if (calendarView === 'multi') {
          const nextMonth = new Date(targetMonth);
          nextMonth.setMonth(nextMonth.getMonth() + 1);
          setSecondMonth(nextMonth);
        }
      }
    }, [mode, disabled, calendarView]);

    return (
      <div ref={ref} className={cn('relative w-full', className)} {...props}>
        {/* Input Field */}
        {showInput && (
          <div className="flex flex-col gap-1 isolate items-start justify-center w-full">
            {showLabel && label && (
              <div className="flex gap-0.5 isolate items-center leading-0 p-0 text-xs font-medium text-[#575385] whitespace-nowrap z-[3]">
                <div className="capitalize flex flex-col justify-center z-[3]">
                  <p className="leading-normal">{label}</p>
                </div>
                {required && (
                  <div className="flex flex-col justify-center z-[2]">
                    <p className="leading-normal">*</p>
                  </div>
                )}
              </div>
            )}
            <button
              type="button"
              onClick={() => !disabled && handleOpenChange(!isOpen)}
              disabled={disabled}
              className={cn(
                'bg-white border border-[#ecebf0] cursor-pointer flex gap-2 items-center px-4 py-3 relative rounded shrink-0 w-full z-[2]',
                'transition-colors',
                'hover:border-[#a29fba]',
                error && 'border-[#ff305f]',
                !error && isOpen && 'border-[#a29fba]',
                disabled && 'bg-[#f4f4f4] cursor-not-allowed opacity-50'
              )}
            >
              <div className="flex flex-1 flex-col gap-0 items-start min-h-0 min-w-0 shrink-0">
                <p
                  className={cn(
                    'text-sm leading-4 text-left w-full whitespace-pre-wrap',
                    displayValue ? 'text-[#312e4d]' : 'text-[#312e4d]',
                    disabled && 'text-[#a29fba]'
                  )}
                >
                  {displayValue || placeholder}
                </p>
              </div>
              <Calendar size={16} className="shrink-0 text-[#312e4d]" />
            </button>
            {error && typeof error === 'string' && (
              <p className="mt-1 text-sm text-[#ff305f]" role="alert">
                {error}
              </p>
            )}
          </div>
        )}

        {/* Calendar Popup */}
        {isOpen && (
          <div className={cn(
            'bg-white flex items-start p-5 absolute rounded-lg shadow-lg border border-[#ecebf0] z-50 mt-2',
            calendarView === 'single' && showTimePresets && fixedTimePresets.length > 0 && 'w-auto gap-6',
            calendarView === 'single' && (!showTimePresets || fixedTimePresets.length === 0) && 'w-[264px] gap-3',
            calendarView === 'multi' && 'w-[660px] gap-6',
            !showTimePresets || fixedTimePresets.length === 0 ? 'flex-col' : 'flex-row'
          )}>
            {/* Time Presets - Always on the left */}
            {showTimePresets && fixedTimePresets.length > 0 && (
              <div className="flex flex-col gap-2 items-start shrink-0">
                {fixedTimePresets.map((preset) => {
                  const isSelected = selectedPreset === preset.value;

                  return (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => handleTimePresetClick(preset.value)}
                      disabled={disabled}
                      className={cn(
                        'px-4 py-1.5 rounded text-sm font-light font-(family-name:--typography/font/family/body,\'Causten_Round:Light\',sans-serif) transition-colors cursor-pointer',
                        isSelected
                          ? 'bg-[#00b56b] text-white'
                          : 'bg-transparent text-[#312e4d] hover:bg-[#f4f4f4]',
                        disabled && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      {preset.label}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Calendar Container with buttons below */}
            <div className={cn(
              'flex flex-col',
              showTimePresets && fixedTimePresets.length > 0 && 'flex-1'
            )}>
              {/* Calendar(s) */}
              <div className={cn(
                'flex items-start',
                calendarView === 'single' && 'flex-col gap-3',
                calendarView === 'multi' && 'flex-row gap-6'
              )}>
                {/* First Calendar */}
                <div className={cn(
                  'flex flex-col gap-3 items-start shrink-0',
                  calendarView === 'single' && 'w-full',
                  calendarView === 'multi' && 'flex-1 min-w-0'
                )}>
                  {/* Date Header */}
                  <div className="flex items-center justify-between shrink-0 w-full">
                    <div className="flex gap-1 items-start">
                      <div className="flex gap-1 items-end">
                        <p className="text-sm leading-[18px] text-[#312e4d] font-medium">
                          {monthNames[currentMonth.getMonth()]}
                        </p>
                      </div>
                      <div className="flex gap-1 items-end">
                        <p className="text-sm leading-[18px] text-[#312e4d] font-medium">
                          {currentMonth.getFullYear()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 items-start">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        disabled={disabled}
                        className="overflow-clip relative shrink-0 size-5 hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Previous month"
                      >
                        <ChevronLeft className="size-5 text-[#312e4d]" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        disabled={disabled}
                        className="overflow-clip relative shrink-0 size-5 hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        aria-label="Next month"
                      >
                        <ChevronRight className="size-5 text-[#312e4d]" />
                      </button>
                    </div>
                  </div>

                  {/* Calendar Grid */}
                  {renderCalendar(currentMonth)}
                </div>

                {/* Second Calendar (for multi view) */}
                {calendarView === 'multi' && (
                  <div className="flex flex-1 flex-col gap-3 items-start min-w-0 shrink-0">
                    {/* Date Header */}
                    <div className="flex items-center justify-between shrink-0 w-full">
                      <div className="flex gap-1 items-start">
                        <div className="flex gap-1 items-end">
                          <p className="text-sm leading-[18px] text-[#312e4d] font-medium">
                            {monthNames[secondMonth.getMonth()]}
                          </p>
                        </div>
                        <div className="flex gap-1 items-end">
                          <p className="text-sm leading-[18px] text-[#312e4d] font-medium">
                            {secondMonth.getFullYear()}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 items-start">
                        <button
                          type="button"
                          onClick={() => {
                            setSecondMonth(prev => {
                              const newMonth = new Date(prev);
                              newMonth.setMonth(newMonth.getMonth() - 1);
                              return newMonth;
                            });
                          }}
                          disabled={disabled}
                          className="overflow-clip relative shrink-0 size-5 hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Previous month"
                        >
                          <ChevronLeft className="size-5 text-[#312e4d]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSecondMonth(prev => {
                              const newMonth = new Date(prev);
                              newMonth.setMonth(newMonth.getMonth() + 1);
                              return newMonth;
                            });
                          }}
                          disabled={disabled}
                          className="overflow-clip relative shrink-0 size-5 hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Next month"
                        >
                          <ChevronRight className="size-5 text-[#312e4d]" />
                        </button>
                      </div>
                    </div>

                    {/* Calendar Grid */}
                    {renderCalendar(secondMonth)}
                  </div>
                )}
              </div>

              {/* Action Buttons - Always below calendar */}
              <div className="flex items-center justify-end gap-2 w-full mt-3">
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={disabled}
                  className="px-4 py-2.5 rounded text-sm font-semibold text-[#00995a] hover:opacity-70 transition-opacity cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cancelLabel}
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={disabled || !tempValue}
                  className={cn(
                    'px-4 py-2.5 rounded text-sm font-semibold text-white transition-colors',
                    tempValue ? 'bg-[#00b56b] hover:opacity-90 cursor-pointer' : 'bg-[#e0e0e0] border border-[#ecebf0] cursor-not-allowed',
                    disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {saveLabel}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
);

DateTimePicker.displayName = 'DateTimePicker';

export default DateTimePicker;

