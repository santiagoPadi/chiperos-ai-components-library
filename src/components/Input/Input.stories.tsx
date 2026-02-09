import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './index';
import { useState } from 'react';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'The current value of the input',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "''" },
      },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
      table: {
        type: { summary: 'string' },
      },
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url'],
      description: 'Input type',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'text'" },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    error: {
      control: 'text',
      description: 'Error message or boolean to show error state. External error overrides validation errors.',
      table: {
        type: { summary: 'string | boolean' },
      },
    },
    showPasswordToggle: {
      control: 'boolean',
      description: 'Show password visibility toggle (only for password type)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    validation: {
      control: 'object',
      description: 'Validation rules (email, number, phone, minLength, maxLength, regex, required)',
      table: {
        type: { summary: 'InputValidation' },
      },
    },
    validateOnChange: {
      control: 'boolean',
      description: 'Whether to validate on every change',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    validateOnBlur: {
      control: 'boolean',
      description: 'Whether to validate on blur',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
      table: {
        type: { summary: 'string' },
      },
    },
    onChange: {
      action: 'changed',
      description: 'Callback fired when the value changes (receives the text string)',
      table: {
        type: { summary: '(text: string) => void' },
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper component for controlled inputs
const InputWrapper = (args: any) => {
  const [value, setValue] = useState(args.value || '');
  
  return (
    <div style={{ width: '400px' }}>
      <Input
        {...args}
        value={value}
        onChange={(text) => {
          setValue(text);
          args.onChange?.(text);
        }}
      />
    </div>
  );
};

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter text...',
    value: 'Hello World',
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Disabled: Story = {
  args: {
    placeholder: 'This input is disabled',
    disabled: true,
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithError: Story = {
  args: {
    placeholder: 'Enter your email',
    error: true,
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithErrorMessage: Story = {
  args: {
    placeholder: 'Enter your email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
  render: (args) => <InputWrapper {...args} />,
};

export const PasswordInput: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter your password',
    showPasswordToggle: true,
  },
  render: (args) => <InputWrapper {...args} />,
};

export const EmailInput: Story = {
  args: {
    type: 'email',
    placeholder: 'example@email.com',
  },
  render: (args) => <InputWrapper {...args} />,
};

export const NumberInput: Story = {
  args: {
    type: 'number',
    placeholder: 'Enter a number',
  },
  render: (args) => <InputWrapper {...args} />,
};

export const Required: Story = {
  args: {
    placeholder: 'Name*',
    required: true,
  },
  render: (args) => <InputWrapper {...args} />,
};

export const WithAutoComplete: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email',
    autoComplete: 'email',
  },
  render: (args) => <InputWrapper {...args} />,
};

export const LongValue: Story = {
  args: {
    value: 'This is a very long text that might overflow the input field but should be handled properly with text truncation',
    placeholder: 'Enter text...',
  },
  render: (args) => <InputWrapper {...args} />,
};

export const AllStates: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Default</h3>
        <Input placeholder="Enter text..." />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>With Value</h3>
        <Input value="Some text here" onChange={() => {}} />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Error</h3>
        <Input placeholder="Enter text..." error={true} />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Error with Message</h3>
        <Input 
          placeholder="Enter text..." 
          error="This field is required" 
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Disabled</h3>
        <Input placeholder="Disabled input" disabled />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Password with Toggle</h3>
        <Input 
          type="password" 
          placeholder="Enter password" 
          showPasswordToggle 
        />
      </div>
    </div>
  ),
  args: {},
};

export const ResponsiveWidth: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ width: '200px' }}>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Width: 200px</p>
        <Input placeholder="Small container" />
      </div>
      
      <div style={{ width: '400px' }}>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Width: 400px</p>
        <Input placeholder="Medium container" />
      </div>
      
      <div style={{ width: '600px' }}>
        <p style={{ marginBottom: '8px', fontSize: '12px', color: '#666' }}>Width: 600px</p>
        <Input placeholder="Large container" />
      </div>
    </div>
  ),
  args: {},
};

export const ValidationEmail: Story = {
  args: {
    placeholder: 'Email address*',
    validation: { email: true },
  },
  render: (args) => <InputWrapper {...args} />,
};

export const ValidationNumber: Story = {
  args: {
    placeholder: 'Enter a number',
    validation: { number: true },
  },
  render: (args) => <InputWrapper {...args} />,
};

export const ValidationPhone: Story = {
  args: {
    placeholder: 'Phone number (US)',
    validation: { phone: { country: 'US' } },
  },
  render: (args) => <InputWrapper {...args} />,
};

export const ValidationMinLength: Story = {
  args: {
    placeholder: 'Username (min 5 chars)',
    validation: { minLength: { value: 5 } },
  },
  render: (args) => <InputWrapper {...args} />,
};

export const ValidationMaxLength: Story = {
  args: {
    placeholder: 'Bio (max 50 chars)',
    validation: { maxLength: { value: 50 } },
  },
  render: (args) => <InputWrapper {...args} />,
};

export const ValidationRequired: Story = {
  args: {
    placeholder: 'Required field*',
    validation: { required: true },
  },
  render: (args) => <InputWrapper {...args} />,
};

export const ValidationCustomRegex: Story = {
  args: {
    placeholder: 'Username (alphanumeric only)',
    validation: {
      regex: {
        pattern: /^[a-zA-Z0-9]+$/,
        message: 'Only letters and numbers allowed',
      },
    },
  },
  render: (args) => <InputWrapper {...args} />,
};

export const ValidationMultiple: Story = {
  args: {
    placeholder: 'Username*',
    validation: {
      required: true,
      minLength: { value: 3, message: 'Username must be at least 3 characters' },
      maxLength: { value: 20, message: 'Username must be at most 20 characters' },
      regex: {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: 'Only letters, numbers and underscores allowed',
      },
    },
  },
  render: (args) => <InputWrapper {...args} />,
};

export const AllValidations: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Email Validation</h3>
        <Input 
          placeholder="Enter your email" 
          validation={{ email: true }}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Number Validation</h3>
        <Input 
          placeholder="Enter a number" 
          validation={{ number: true }}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Phone Validation (US)</h3>
        <Input 
          placeholder="+1 (555) 123-4567" 
          validation={{ phone: { country: 'US' } }}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Phone Validation (Colombia)</h3>
        <Input 
          placeholder="+57 300 123 4567" 
          validation={{ phone: { country: 'CO' } }}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Min Length (5 chars)</h3>
        <Input 
          placeholder="Enter at least 5 characters" 
          validation={{ minLength: { value: 5 } }}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Max Length (10 chars)</h3>
        <Input 
          placeholder="Enter at most 10 characters" 
          validation={{ maxLength: { value: 10 } }}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Required Field</h3>
        <Input 
          placeholder="This field is required*" 
          validation={{ required: true }}
        />
      </div>
      
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '14px', fontWeight: 'bold' }}>Custom Regex (Alphanumeric)</h3>
        <Input 
          placeholder="Letters and numbers only" 
          validation={{ 
            regex: { 
              pattern: /^[a-zA-Z0-9]+$/,
              message: 'Only letters and numbers allowed'
            } 
          }}
        />
      </div>
    </div>
  ),
  args: {},
};

export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    
    const [confirmError, setConfirmError] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      if (formData.password !== formData.confirmPassword) {
        setConfirmError('Passwords do not match');
        return;
      }
      
      setConfirmError('');
      alert('Form submitted successfully!');
    };
    
    return (
      <form 
        onSubmit={handleSubmit}
        style={{ 
          width: '400px', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px' 
        }}
      >
        <Input
          placeholder="Full Name*"
          value={formData.name}
          onChange={(text) => setFormData({ ...formData, name: text })}
          validation={{ 
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          }}
        />
        
        <Input
          type="email"
          placeholder="Email Address*"
          value={formData.email}
          onChange={(text) => setFormData({ ...formData, email: text })}
          validation={{ 
            required: 'Email is required',
            email: 'Please enter a valid email address'
          }}
          autoComplete="email"
        />
        
        <Input
          type="password"
          placeholder="Password*"
          value={formData.password}
          onChange={(text) => setFormData({ ...formData, password: text })}
          validation={{ 
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' }
          }}
          showPasswordToggle
        />
        
        <Input
          type="password"
          placeholder="Confirm Password*"
          value={formData.confirmPassword}
          onChange={(text) => {
            setFormData({ ...formData, confirmPassword: text });
            if (formData.password && text !== formData.password) {
              setConfirmError('Passwords do not match');
            } else {
              setConfirmError('');
            }
          }}
          error={confirmError}
          validation={{ required: 'Please confirm your password' }}
          showPasswordToggle
        />
        
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
          Submit
        </button>
      </form>
    );
  },
  args: {},
};
