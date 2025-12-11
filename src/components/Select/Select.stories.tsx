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
      description: 'The currently selected option ID',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no option is selected',
    },
    label: {
      control: 'text',
      description: 'Label shown above the selected value',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary'],
      description: 'Visual variant: default (white) or primary (green button style)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    options: {
      control: 'object',
      description: 'Array of options {id, text}',
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when selection changes',
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
  render: () => {
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
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
  args: { options: [] },
};

export const VariantsComparison: Story = {
  render: () => {
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
              value={primaryValue}
              onChange={setPrimaryValue}
            />
          </div>
        </div>
      </div>
    );
  },
  args: { options: [] },
};

export const PrimaryInHeader: Story = {
  render: () => {
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
            value={actionValue}
            onChange={setActionValue}
          />
          <Select
            variant="primary"
            options={exportOptions}
            placeholder="Export"
            value={exportValue}
            onChange={setExportValue}
          />
        </div>
      </div>
    );
  },
  args: { options: [] },
};

