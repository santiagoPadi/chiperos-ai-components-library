import type { Meta, StoryObj } from '@storybook/react';
import { Select, SelectOption } from './index';
import { useState } from 'react';

const meta = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'Currently selected value (string for single, string[] for multiple)',
      table: {
        type: { summary: 'string | string[]' },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Select an option'" },
      },
    },
    label: {
      control: 'text',
      description: 'Label text shown above the selected value',
      table: {
        type: { summary: 'string' },
      },
    },
    variant: {
      control: 'select',
      options: ['default', 'primary'],
      description: 'Visual variant: default (white background) or primary (green button style)',
      table: {
        type: { summary: "'default' | 'primary'" },
        defaultValue: { summary: "'default'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multiple selection mode (uses checkboxes)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    options: {
      control: 'object',
      description: 'Array of options with id and text',
      table: {
        type: { summary: 'SelectOption[]' },
      },
    },
    search: {
      control: 'boolean',
      description: 'Enable search functionality with debounced input',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    onSearch: {
      action: 'searched',
      description: 'Callback fired when search input changes (with 2s debounce)',
      table: {
        type: { summary: '(searchTerm: string) => void' },
      },
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Placeholder text for the search input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'Search...'" },
      },
    },
    error: {
      control: 'text',
      description: 'Error message or state - shows red border when truthy. When a string is provided it is displayed below the select.',
      table: {
        type: { summary: 'string | boolean' },
        defaultValue: { summary: 'undefined' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when selection changes',
      table: {
        type: { summary: '(value: string) => void | (values: string[]) => void' },
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
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultOptions: SelectOption[] = [
  { id: '1', text: 'Option 1' },
  { id: '2', text: 'Option 2' },
  { id: '3', text: 'Option 3' },
];

const policyOptions: SelectOption[] = [
  { id: 'extension', text: 'Use setting from extension' },
  { id: 'allow', text: 'Allow all cookies' },
  { id: 'block-third', text: 'Block third-party cookies' },
  { id: 'block-all', text: 'Block all cookies' },
];

const countryOptions: SelectOption[] = [
  { id: 'us', text: 'United States' },
  { id: 'co', text: 'Colombia' },
  { id: 'mx', text: 'Mexico' },
  { id: 'ar', text: 'Argentina' },
  { id: 'br', text: 'Brazil' },
  { id: 'es', text: 'Spain' },
];

// Wrapper for controlled component
const SelectWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  
  return (
    <div style={{ width: '300px' }}>
      <Select
        {...args}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
  },
  render: (args) => <SelectWrapper {...args} />,
};

export const WithLabel: Story = {
  args: {
    options: policyOptions,
    label: 'Current Policy',
    placeholder: 'Choose a policy',
  },
  render: (args) => <SelectWrapper {...args} />,
};

export const WithValue: Story = {
  args: {
    options: policyOptions,
    label: 'Current Policy',
    value: 'extension',
  },
  render: (args) => <SelectWrapper {...args} />,
};

export const Disabled: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'This is disabled',
    disabled: true,
  },
  render: (args) => <SelectWrapper {...args} />,
};

export const DisabledWithValue: Story = {
  args: {
    options: defaultOptions,
    value: '2',
    disabled: true,
  },
  render: (args) => <SelectWrapper {...args} />,
};

export const WithError: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
    error: 'This field is required',
  },
  render: (args) => <SelectWrapper {...args} />,
};

export const WithErrorBoolean: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option',
    error: true,
  },
  render: (args) => <SelectWrapper {...args} />,
};

export const WithErrorAndValue: Story = {
  args: {
    options: defaultOptions,
    value: '1',
    error: 'Invalid selection',
  },
  render: (args) => <SelectWrapper {...args} />,
};

export const ManyOptions: Story = {
  args: {
    options: [
      ...Array.from({ length: 20 }, (_, i) => ({
        id: `${i + 1}`,
        text: `Option ${i + 1}`,
      })),
    ],
    placeholder: 'Select from many options',
  },
  render: (args) => <SelectWrapper {...args} />,
};

export const CountrySelector: Story = {
  args: {
    options: countryOptions,
    label: 'Country',
    placeholder: 'Select your country',
  },
  render: (args) => <SelectWrapper {...args} />,
};

export const LongTextOptions: Story = {
  args: {
    options: [
      { id: '1', text: 'This is a very long option text that might overflow' },
      { id: '2', text: 'Another long option with lots of text to display' },
      { id: '3', text: 'Short option' },
    ],
    placeholder: 'Select an option',
  },
  render: (args) => <SelectWrapper {...args} />,
};

export const CustomWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '200px' }}>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Width: 200px</p>
        <Select options={defaultOptions} placeholder="Small" />
      </div>
      
      <div style={{ width: '400px' }}>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Width: 400px</p>
        <Select options={defaultOptions} placeholder="Medium" />
      </div>
      
      <div style={{ width: '600px' }}>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Width: 600px</p>
        <Select options={defaultOptions} placeholder="Large" />
      </div>
    </div>
  ),
  args: { options: [] },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Default (No Selection)</h3>
        <Select
          options={policyOptions}
          placeholder="Select a policy"
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>With Label</h3>
        <Select
          options={policyOptions}
          label="Current Policy"
          placeholder="Choose policy"
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Selected</h3>
        <Select
          options={policyOptions}
          label="Current Policy"
          value="extension"
          onChange={() => {}}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled</h3>
        <Select
          options={policyOptions}
          placeholder="Disabled select"
          disabled
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled with Value</h3>
        <Select
          options={policyOptions}
          label="Current Policy"
          value="allow"
          disabled
          onChange={() => {}}
        />
      </div>
    </div>
  ),
  args: { options: [] },
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      country: '',
      language: '',
      timezone: '',
    });
    
    const languageOptions = [
      { id: 'en', text: 'English' },
      { id: 'es', text: 'Español' },
      { id: 'pt', text: 'Português' },
      { id: 'fr', text: 'Français' },
    ];
    
    const timezoneOptions = [
      { id: 'utc-5', text: 'UTC-5 (Colombia, Peru)' },
      { id: 'utc-3', text: 'UTC-3 (Argentina, Brazil)' },
      { id: 'utc-6', text: 'UTC-6 (Mexico City)' },
      { id: 'utc+1', text: 'UTC+1 (Spain)' },
    ];
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Form submitted:\n${JSON.stringify(formData, null, 2)}`);
    };
    
    return (
      <form
        onSubmit={handleSubmit}
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
            Country
          </label>
          <Select
            options={countryOptions}
            value={formData.country}
            onChange={(value) => setFormData({ ...formData, country: value })}
            label="Country"
            placeholder="Select your country"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
            Language
          </label>
          <Select
            options={languageOptions}
            value={formData.language}
            onChange={(value) => setFormData({ ...formData, language: value })}
            label="Language"
            placeholder="Select your language"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
            Timezone
          </label>
          <Select
            options={timezoneOptions}
            value={formData.timezone}
            onChange={(value) => setFormData({ ...formData, timezone: value })}
            label="Timezone"
            placeholder="Select your timezone"
          />
        </div>
        
        <button
          type="submit"
          style={{
            marginTop: '8px',
            padding: '12px 24px',
            backgroundColor: '#00995a',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 500,
          }}
        >
          Save Settings
        </button>
      </form>
    );
  },
  args: { options: [] },
};

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState('extension');
    const [disabled, setDisabled] = useState(false);
    
    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            Disable select
          </label>
        </div>
        
        <Select
          options={policyOptions}
          label="Current Policy"
          value={value}
          onChange={setValue}
          disabled={disabled}
        />
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            <strong>Selected Value:</strong> {value || 'None'}
          </p>
        </div>
      </div>
    );
  },
  args: { options: [] },
};

// ==================== PRIMARY VARIANT ====================

const exportOptions: SelectOption[] = [
  { id: 'csv', text: 'Export as CSV' },
  { id: 'excel', text: 'Export as Excel (.xlsx)' },
  { id: 'pdf', text: 'Export as PDF document' },
  { id: 'json', text: 'Export as JSON data' },
];

const actionOptions: SelectOption[] = [
  { id: 'approve', text: 'Approve selected' },
  { id: 'reject', text: 'Reject selected' },
  { id: 'archive', text: 'Archive selected' },
  { id: 'delete', text: 'Delete permanently' },
];

// Wrapper for primary variant with controlled state that respects args
const PrimarySelectWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  
  return (
    <Select
      {...args}
      value={value}
      onChange={(newValue) => {
        setValue(newValue);
        args.onChange?.(newValue);
      }}
    />
  );
};

export const PrimaryVariant: Story = {
  args: {
    variant: 'primary',
    options: exportOptions,
    placeholder: 'Export',
    label: '',
  },
  render: (args) => <PrimarySelectWrapper {...args} />,
};

export const PrimaryWithValue: Story = {
  args: {
    variant: 'primary',
    options: exportOptions,
    placeholder: 'Export',
    value: 'csv',
  },
  render: (args) => <PrimarySelectWrapper {...args} />,
};

export const PrimaryWithLabel: Story = {
  args: {
    variant: 'primary',
    options: exportOptions,
    label: 'Format',
    placeholder: 'Export',
    value: 'csv',
  },
  render: (args) => <PrimarySelectWrapper {...args} />,
};

export const PrimaryDisabled: Story = {
  args: {
    variant: 'primary',
    options: exportOptions,
    placeholder: 'Export',
    disabled: true,
  },
};

export const PrimaryLongOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState('');

    const longOptions: SelectOption[] = [
      { id: '1', text: 'Download all data as comprehensive Excel report' },
      { id: '2', text: 'Export filtered results to CSV format' },
      { id: '3', text: 'Generate PDF summary for stakeholders' },
      { id: '4', text: 'Send data directly to connected integrations' },
    ];

    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '400px' }}>
        <Select
          variant="primary"
          options={longOptions}
          placeholder="Actions"
          label={args.label}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
  args: { 
    options: [],
    label: '',
  },
};

export const VariantsComparison: Story = {
  render: (args) => {
    const [defaultValue, setDefaultValue] = useState('');
    const [primaryValue, setPrimaryValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Default Variant</h3>
          <Select
            variant="default"
            options={exportOptions}
            placeholder="Select an option"
            label={args.label}
            value={defaultValue}
            onChange={setDefaultValue}
          />
        </div>

        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Primary Variant (Button Style)</h3>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Select
              variant="primary"
              options={exportOptions}
              placeholder="Export"
              label={args.label}
              value={primaryValue}
              onChange={setPrimaryValue}
            />
          </div>
        </div>
      </div>
    );
  },
  args: { 
    options: [],
    label: '',
  },
};

export const PrimaryInHeader: Story = {
  render: (args) => {
    const [exportValue, setExportValue] = useState('');
    const [actionValue, setActionValue] = useState('');

    return (
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        width: '600px',
      }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Users List</h2>

        <div style={{ display: 'flex', gap: '12px' }}>
          <Select
            variant="primary"
            options={actionOptions}
            placeholder="Bulk Actions"
            label={args.label}
            value={actionValue}
            onChange={setActionValue}
          />
          <Select
            variant="primary"
            options={exportOptions}
            placeholder="Export"
            label={args.label}
            value={exportValue}
            onChange={setExportValue}
          />
        </div>
      </div>
    );
  },
  args: { 
    options: [],
    label: '',
  },
};

// ==================== MULTIPLE SELECT ====================

const categoryOptions: SelectOption[] = [
  { id: 'electronics', text: 'Electronics' },
  { id: 'clothing', text: 'Clothing' },
  { id: 'food', text: 'Food & Beverages' },
  { id: 'home', text: 'Home & Garden' },
  { id: 'sports', text: 'Sports & Outdoors' },
  { id: 'toys', text: 'Toys & Games' },
];

const statusOptions: SelectOption[] = [
  { id: 'active', text: 'Active' },
  { id: 'pending', text: 'Pending' },
  { id: 'completed', text: 'Completed' },
  { id: 'cancelled', text: 'Cancelled' },
  { id: 'refunded', text: 'Refunded' },
];

// Wrapper for multiple select
const MultiSelectWrapper = (args: any) => {
  const [value, setValue] = useState<string[]>(args.value || []);
  
  return (
    <div style={{ width: '300px' }}>
      <Select
        {...args}
        multiple
        value={value}
        onChange={(newValue: string[]) => {
          setValue(newValue);
          args.onChange?.(newValue);
        }}
      />
    </div>
  );
};

export const MultipleSelect: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Select categories',
    multiple: true,
  },
  render: (args) => <MultiSelectWrapper {...args} />,
};

export const MultipleWithLabel: Story = {
  args: {
    options: statusOptions,
    label: 'Filter by Status',
    placeholder: 'Select statuses',
    multiple: true,
  },
  render: (args) => <MultiSelectWrapper {...args} />,
};

export const MultipleWithPreselected: Story = {
  args: {
    options: categoryOptions,
    label: 'Categories',
    placeholder: 'Select categories',
    multiple: true,
    value: ['electronics', 'clothing'],
  },
  render: (args) => <MultiSelectWrapper {...args} />,
};

export const MultipleDisabled: Story = {
  args: {
    options: categoryOptions,
    placeholder: 'Select categories',
    multiple: true,
    disabled: true,
  },
  render: (args) => <MultiSelectWrapper {...args} />,
};

export const MultiplePrimaryVariant: Story = {
  args: {
    options: statusOptions,
    placeholder: 'Filter Status',
    variant: 'primary',
    multiple: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([]);
    
    return (
      <Select
        {...args}
        multiple
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const MultipleManyOptions: Story = {
  args: {
    options: [
      ...Array.from({ length: 15 }, (_, i) => ({
        id: `${i + 1}`,
        text: `Option ${i + 1}`,
      })),
    ],
    placeholder: 'Select from many options',
    multiple: true,
  },
  render: (args) => <MultiSelectWrapper {...args} />,
};

export const MultipleInteractive: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['electronics', 'food']);
    const [disabled, setDisabled] = useState(false);
    
    return (
      <div style={{ width: '400px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
            />
            Disable select
          </label>
        </div>
        
        <Select
          multiple
          options={categoryOptions}
          label="Categories"
          placeholder="Select categories"
          value={value}
          onChange={setValue}
          disabled={disabled}
        />
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
          <p style={{ margin: 0, fontSize: '14px' }}>
            <strong>Selected Values:</strong> {value.length > 0 ? value.join(', ') : 'None'}
          </p>
        </div>
      </div>
    );
  },
  args: { options: [] },
};

export const SingleVsMultiple: Story = {
  render: () => {
    const [singleValue, setSingleValue] = useState('');
    const [multipleValue, setMultipleValue] = useState<string[]>([]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '400px' }}>
        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Single Select</h3>
          <Select
            options={categoryOptions}
            placeholder="Select one category"
            value={singleValue}
            onChange={setSingleValue}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            Selected: {singleValue || 'None'}
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Multiple Select</h3>
          <Select
            multiple
            options={categoryOptions}
            placeholder="Select multiple categories"
            value={multipleValue}
            onChange={setMultipleValue}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
            Selected: {multipleValue.length > 0 ? multipleValue.join(', ') : 'None'}
          </p>
        </div>
      </div>
    );
  },
  args: { options: [] },
};

export const MultipleFilterExample: Story = {
  render: () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [statuses, setStatuses] = useState<string[]>([]);

    return (
      <div style={{
        padding: '24px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        width: '600px',
      }}>
        <h2 style={{ margin: '0 0 16px', fontSize: '18px', fontWeight: 600 }}>Filter Products</h2>
        
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
              Categories
            </label>
            <Select
              multiple
              options={categoryOptions}
              placeholder="All categories"
              value={categories}
              onChange={setCategories}
            />
          </div>
          
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
              Status
            </label>
            <Select
              multiple
              options={statusOptions}
              placeholder="All statuses"
              value={statuses}
              onChange={setStatuses}
            />
          </div>
        </div>

        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: 'white', borderRadius: '4px', fontSize: '14px' }}>
          <strong>Active Filters:</strong>
          <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
            <li>Categories: {categories.length > 0 ? categories.join(', ') : 'All'}</li>
            <li>Statuses: {statuses.length > 0 ? statuses.join(', ') : 'All'}</li>
          </ul>
        </div>
      </div>
    );
  },
  args: { options: [] },
};

// ==================== SEARCHABLE SELECT ====================

export const WithSearch: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [searchLog, setSearchLog] = useState<string[]>([]);

    const handleSearch = (term: string) => {
      const timestamp = new Date().toLocaleTimeString();
      setSearchLog((prev) => [...prev, `[${timestamp}] Search: "${term}"`]);
    };

    return (
      <div style={{ width: '350px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
            Country (searchable select)
          </label>
          <Select
            search
            options={countryOptions}
            placeholder="Select a country"
            searchPlaceholder="Type to search..."
            value={value}
            onChange={setValue}
            onSearch={handleSearch}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#888' }}>
            💡 <strong>1st click</strong> opens the dropdown → <strong>then</strong> you can type to search.
          </p>
        </div>
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '14px' }}>
            <strong>Selected:</strong> {value || 'None'}
          </p>
          <div>
            <strong style={{ fontSize: '14px' }}>onSearch calls (2s debounce):</strong>
            <div style={{ maxHeight: '100px', overflowY: 'auto', marginTop: '4px' }}>
              {searchLog.length === 0 ? (
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Type something and wait 2 seconds...</p>
              ) : (
                searchLog.map((log, i) => (
                  <p key={i} style={{ margin: '2px 0', fontSize: '12px', color: '#666' }}>{log}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  args: { options: [] },
};

export const MultipleWithSearch: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>([]);
    const [searchLog, setSearchLog] = useState<string[]>([]);

    const handleSearch = (term: string) => {
      const timestamp = new Date().toLocaleTimeString();
      setSearchLog((prev) => [...prev, `[${timestamp}] "${term}"`]);
    };

    return (
      <div style={{ width: '350px' }}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
            Categories (multi-select with search)
          </label>
          <Select
            multiple
            search
            options={categoryOptions}
            placeholder="Select categories"
            searchPlaceholder="Type to filter..."
            value={value}
            onChange={setValue}
            onSearch={handleSearch}
          />
          <p style={{ marginTop: '8px', fontSize: '12px', color: '#888' }}>
            💡 Click to open → then type to search. Select multiple with checkboxes.
          </p>
        </div>
        
        <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f4f4f4', borderRadius: '4px' }}>
          <p style={{ margin: '0 0 8px', fontSize: '14px' }}>
            <strong>Selected:</strong> {value.length > 0 ? value.join(', ') : 'None'}
          </p>
          <div>
            <strong style={{ fontSize: '14px' }}>onSearch calls:</strong>
            <div style={{ maxHeight: '80px', overflowY: 'auto', marginTop: '4px' }}>
              {searchLog.length === 0 ? (
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Waiting for 2s debounce...</p>
              ) : (
                searchLog.map((log, i) => (
                  <p key={i} style={{ margin: '2px 0', fontSize: '12px', color: '#666' }}>{log}</p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  },
  args: { options: [] },
};

export const SearchWithManyOptions: Story = {
  render: () => {
    const [value, setValue] = useState('');
    
    const manyOptions: SelectOption[] = Array.from({ length: 50 }, (_, i) => ({
      id: `${i + 1}`,
      text: `Option ${i + 1} - ${['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'][i % 5]}`,
    }));

    const handleSearch = (term: string) => {
      console.log('Search term (after 2s debounce):', term);
    };

    return (
      <div style={{ width: '350px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
          Search through 50 options
        </label>
        <Select
          search
          options={manyOptions}
          placeholder="Type to filter options..."
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
        />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          Selected: {value || 'None'} (Check console for search callbacks)
        </p>
      </div>
    );
  },
  args: { options: [] },
};

export const SearchWithAsyncSimulation: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [options, setOptions] = useState<SelectOption[]>(countryOptions);

    // Simulate async search - in real usage, this would call an API
    const handleSearch = (term: string) => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        if (term) {
          // Simulate filtering on server
          const filtered = countryOptions.filter((opt) =>
            opt.text.toLowerCase().includes(term.toLowerCase())
          );
          setOptions(filtered);
        } else {
          setOptions(countryOptions);
        }
        setLoading(false);
      }, 500);
    };

    return (
      <div style={{ width: '350px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
          Async Search Simulation
        </label>
        <Select
          search
          options={options}
          placeholder="Type to search countries..."
          value={value}
          onChange={setValue}
          onSearch={handleSearch}
        />
        <p style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          {loading ? '⏳ Loading...' : `${options.length} options available`}
        </p>
        <p style={{ marginTop: '4px', fontSize: '12px', color: '#888' }}>
          This simulates an async API call triggered after the 2s debounce.
          The onSearch callback can be used to fetch filtered data from an API.
        </p>
      </div>
    );
  },
  args: { options: [] },
};

export const SearchPrimaryVariant: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <div style={{ width: '300px' }}>
        <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>
          Primary variant with search
        </label>
        <Select
          search
          variant="primary"
          options={exportOptions}
          placeholder="Search export format..."
          value={value}
          onChange={setValue}
          onSearch={(term) => console.log('Search:', term)}
        />
      </div>
    );
  },
  args: { options: [] },
};

export const SearchVsNormalComparison: Story = {
  render: () => {
    const [normalValue, setNormalValue] = useState('');
    const [searchValue, setSearchValue] = useState('');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '350px' }}>
        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Normal Select</h3>
          <Select
            options={countryOptions}
            placeholder="Click to select"
            value={normalValue}
            onChange={setNormalValue}
          />
          <p style={{ marginTop: '4px', fontSize: '12px', color: '#888' }}>
            Click → opens dropdown → click option to select
          </p>
        </div>

        <div>
          <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Searchable Select</h3>
          <Select
            search
            options={countryOptions}
            placeholder="Select a country"
            searchPlaceholder="Type to search..."
            value={searchValue}
            onChange={setSearchValue}
            onSearch={(term) => console.log('Searching:', term)}
          />
          <p style={{ marginTop: '4px', fontSize: '12px', color: '#888' }}>
            Click → opens dropdown → <strong>now you can type</strong> to search → onSearch fires after 2s debounce
          </p>
        </div>
      </div>
    );
  },
  args: { options: [] },
};

