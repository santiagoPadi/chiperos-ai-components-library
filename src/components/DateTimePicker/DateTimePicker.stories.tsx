import type { Meta, StoryObj } from '@storybook/react';
import { DateTimePicker } from './index';
import { useState } from 'react';

const meta = {
  title: 'Components/DateTimePicker',
  component: DateTimePicker,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: false,
      description: 'Current selected date(s): Date (single), { start, end } (range), or Date[] (multi)',
      table: {
        type: { summary: 'Date | { start: Date; end: Date } | Date[] | null' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when date selection changes',
      table: {
        type: { summary: '(dates: SelectedDates) => void' },
      },
    },
    mode: {
      control: 'select',
      options: ['single', 'range', 'multi'],
      description: 'Selection mode: single date, date range, or multiple dates',
      table: {
        type: { summary: "'single' | 'range' | 'multi'" },
        defaultValue: { summary: "'single'" },
      },
    },
    calendarView: {
      control: 'select',
      options: ['single', 'multi'],
      description: 'Calendar view type: single or multi (side by side)',
      table: {
        type: { summary: "'single' | 'multi'" },
        defaultValue: { summary: "'single'" },
      },
    },
    showTimePresets: {
      control: 'boolean',
      description: 'Whether to show time preset options',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    showInput: {
      control: 'boolean',
      description: 'Whether to show the trigger input field',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    label: {
      control: 'text',
      description: 'Input label text',
      table: {
        type: { summary: 'string' },
      },
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the label',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    required: {
      control: 'boolean',
      description: 'Whether the label shows a required asterisk',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Input placeholder text',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Select'" },
      },
    },
    formatValue: {
      control: false,
      description: 'Custom format function for displaying selected date(s) in input',
      table: {
        type: { summary: '(dates: SelectedDates) => string' },
      },
    },
    holidays: {
      control: false,
      description: 'List of holidays to highlight on the calendar',
      table: {
        type: { summary: 'Holiday[]' },
      },
    },
    eventDays: {
      control: false,
      description: 'List of event days (shows indicator dot)',
      table: {
        type: { summary: 'EventDay[]' },
      },
    },
    minDate: {
      control: false,
      description: 'Minimum selectable date',
      table: {
        type: { summary: 'Date' },
      },
    },
    maxDate: {
      control: false,
      description: 'Maximum selectable date',
      table: {
        type: { summary: 'Date' },
      },
    },
    initialMonth: {
      control: false,
      description: 'Initial month to display (defaults to current month)',
      table: {
        type: { summary: 'Date' },
      },
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show action buttons (Cancel/Save)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    cancelLabel: {
      control: 'text',
      description: 'Cancel button label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Cancel'" },
      },
    },
    saveLabel: {
      control: 'text',
      description: 'Save button label',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Save'" },
      },
    },
    onCancel: {
      action: 'cancelled',
      description: 'Callback fired when cancel is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    onSave: {
      action: 'saved',
      description: 'Callback fired when save is clicked',
      table: {
        type: { summary: '(dates: SelectedDates) => void' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the picker is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message or boolean to show error state',
      table: {
        type: { summary: 'string | boolean' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Whether the calendar popover is open (controlled)',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      action: 'openChanged',
      description: 'Callback fired when open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    locale: {
      control: 'text',
      description: 'Custom locale for date formatting (defaults to browser locale)',
      table: {
        type: { summary: 'string' },
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
} satisfies Meta<typeof DateTimePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for controlled picker
const DateTimePickerWrapper = (args: any) => {
  const [value, setValue] = useState<any>(args.value || null);
  const [open, setOpen] = useState(args.open ?? false);
  
  return (
    <div style={{ width: '400px' }}>
      <DateTimePicker
        {...args}
        value={value}
        open={open}
        onOpenChange={setOpen}
        onChange={(dates) => {
          setValue(dates);
          args.onChange?.(dates);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    label: 'Date Range',
    required: true,
    placeholder: 'Select',
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const SingleDate: Story = {
  args: {
    mode: 'single',
    label: 'Select Date',
    placeholder: 'Select a date',
    showActions: true,
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const DateRange: Story = {
  args: {
    mode: 'range',
    label: 'Date Range',
    required: true,
    placeholder: 'Select date range',
    showActions: true,
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const MultiDate: Story = {
  args: {
    mode: 'multi',
    label: 'Select Dates',
    placeholder: 'Select multiple dates',
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const MultiCalendar: Story = {
  args: {
    mode: 'range',
    calendarView: 'multi',
    label: 'Date Range',
    placeholder: 'Select date range',
    showActions: true,
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const WithTimePresets: Story = {
  args: {
    mode: 'single',
    label: 'Date & Time',
    placeholder: 'Select date and time',
    showTimePresets: true,
    timePresets: [
      { label: 'Today', value: 'today' },
      { label: 'Tomorrow', value: 'tomorrow' },
      { label: 'This Week', value: 'this-week' },
      { label: 'This Month', value: 'this-month' },
    ],
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const WithHolidays: Story = {
  args: {
    mode: 'single',
    label: 'Select Date',
    placeholder: 'Select a date',
    holidays: [
      { date: new Date(2024, 0, 1), label: 'New Year' },
      { date: new Date(2024, 6, 4), label: 'Independence Day' },
      { date: new Date(2024, 11, 25), label: 'Christmas' },
    ],
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const WithEventDays: Story = {
  args: {
    mode: 'single',
    label: 'Select Date',
    placeholder: 'Select a date',
    eventDays: [
      { date: new Date() },
      { date: new Date(Date.now() + 86400000 * 3) },
      { date: new Date(Date.now() + 86400000 * 7) },
    ],
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const WithMinMaxDate: Story = {
  args: {
    mode: 'single',
    label: 'Select Date',
    placeholder: 'Select a date',
    minDate: new Date(),
    maxDate: new Date(Date.now() + 86400000 * 30), // 30 days from now
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const WithValue: Story = {
  args: {
    mode: 'single',
    label: 'Select Date',
    placeholder: 'Select a date',
    value: new Date(),
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const WithRangeValue: Story = {
  args: {
    mode: 'range',
    label: 'Date Range',
    placeholder: 'Select date range',
    value: {
      start: new Date(),
      end: new Date(Date.now() + 86400000 * 7),
    },
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const Disabled: Story = {
  args: {
    mode: 'single',
    label: 'Select Date',
    placeholder: 'Select a date',
    disabled: true,
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const WithError: Story = {
  args: {
    mode: 'single',
    label: 'Select Date',
    placeholder: 'Select a date',
    error: true,
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const WithErrorMessage: Story = {
  args: {
    mode: 'single',
    label: 'Select Date',
    placeholder: 'Select a date',
    error: 'Please select a date',
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const WithoutInput: Story = {
  args: {
    mode: 'single',
    showInput: false,
    showActions: true,
    open: true,
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const WithoutLabel: Story = {
  args: {
    mode: 'single',
    label: 'Hidden Label',
    showLabel: false,
    placeholder: 'Select a date',
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const CustomFormat: Story = {
  args: {
    mode: 'single',
    label: 'Select Date',
    placeholder: 'Select a date',
    formatValue: (dates) => {
      if (!dates || !(dates instanceof Date)) return '';
      return dates.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
  render: (args) => <DateTimePickerWrapper {...args} />,
};

export const AllStates: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Default</h3>
        <DateTimePicker label="Date Range" required placeholder="Select" />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>With Value</h3>
        <DateTimePicker
          mode="single"
          label="Select Date"
          value={new Date()}
          onChange={() => {}}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Date Range</h3>
        <DateTimePicker
          mode="range"
          label="Date Range"
          value={{
            start: new Date(),
            end: new Date(Date.now() + 86400000 * 7),
          }}
          onChange={() => {}}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Error</h3>
        <DateTimePicker
          label="Select Date"
          error={true}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Error with Message</h3>
        <DateTimePicker
          label="Select Date"
          error="This field is required"
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled</h3>
        <DateTimePicker
          label="Select Date"
          disabled
        />
      </div>

      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Without Label</h3>
        <DateTimePicker
          label="Hidden Label"
          showLabel={false}
          placeholder="Select a date"
        />
      </div>
    </div>
  ),
  args: {},
};

export const ComplexExample: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedRange, setSelectedRange] = useState<{ start: Date; end: Date } | null>(null);
    
    const holidays = [
      { date: new Date(2024, 0, 1), label: 'New Year' },
      { date: new Date(2024, 6, 4), label: 'Independence Day' },
      { date: new Date(2024, 11, 25), label: 'Christmas' },
    ];
    
    const eventDays = [
      { date: new Date() },
      { date: new Date(Date.now() + 86400000 * 3) },
      { date: new Date(Date.now() + 86400000 * 7) },
    ];
    
    return (
      <div style={{ width: '600px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        <div>
          <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>
            Single Date Selection
          </h2>
          <DateTimePicker
            mode="single"
            label="Select Date"
            required
            placeholder="Select a date"
            value={selectedDate}
            onChange={(dates) => setSelectedDate(dates as Date | null)}
            holidays={holidays}
            eventDays={eventDays}
            showActions={true}
            onSave={(dates) => {
              console.log('Saved:', dates);
            }}
          />
        </div>
        
        <div>
          <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>
            Date Range Selection
          </h2>
          <DateTimePicker
            mode="range"
            calendarView="multi"
            label="Date Range"
            required
            placeholder="Select date range"
            value={selectedRange}
            onChange={(dates) => setSelectedRange(dates as { start: Date; end: Date } | null)}
            holidays={holidays}
            eventDays={eventDays}
            showActions={true}
            minDate={new Date()}
            maxDate={new Date(Date.now() + 86400000 * 90)}
            onSave={(dates) => {
              console.log('Saved:', dates);
            }}
          />
        </div>
      </div>
    );
  },
  args: {},
};

