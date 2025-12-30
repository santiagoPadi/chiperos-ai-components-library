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
    mode: {
      control: 'select',
      options: ['single', 'range', 'multi'],
      description: 'Selection mode: single date, date range, or multiple dates',
    },
    calendarView: {
      control: 'select',
      options: ['single', 'multi'],
      description: 'Calendar view type: single or multi calendar',
    },
    showTimePresets: {
      control: 'boolean',
      description: 'Whether to show time presets',
    },
    showInput: {
      control: 'boolean',
      description: 'Whether to show the input field',
    },
    showLabel: {
      control: 'boolean',
      description: 'Whether to show the label',
    },
    showActions: {
      control: 'boolean',
      description: 'Whether to show action buttons (Cancel/Save)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the picker is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the label is required (shows asterisk)',
    },
    error: {
      control: 'text',
      description: 'Error message or boolean to show error state',
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

