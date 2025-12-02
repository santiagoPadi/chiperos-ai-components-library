import type { Meta, StoryObj } from '@storybook/react';
import { OptionCard } from './index';
import { useState } from 'react';

const meta = {
  title: 'Components/OptionCard',
  component: OptionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OptionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Unselected
export const Unselected: Story = {
  args: {
    title: 'Admin',
    description: 'Full access to all features and administrative settings',
    value: 'admin',
    selected: false,
    onSelect: (value) => console.log('Selected:', value),
  },
};

// Selected
export const Selected: Story = {
  args: {
    title: 'Admin',
    description: 'Full access to all features and administrative settings',
    value: 'admin',
    selected: true,
    onSelect: (value) => console.log('Selected:', value),
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    title: 'Admin',
    description: 'Full access to all features and administrative settings',
    value: 'admin',
    selected: false,
    disabled: true,
  },
};

// Role Selection Group
export const RoleSelection: Story = {
  args: {
    title: 'Admin',
    description: 'Full access',
    value: 'admin',
  },
  render: function RoleSelectionExample() {
    const [selectedRole, setSelectedRole] = useState('editor');

    return (
      <div className="space-y-3" style={{ width: '600px' }}>
        <h3 className="text-lg font-semibold mb-4">Select User Role</h3>
        
        <OptionCard
          title="Admin"
          description="Full access to all features and administrative settings"
          value="admin"
          selected={selectedRole === 'admin'}
          onSelect={setSelectedRole}
        />
        
        <OptionCard
          title="Editor"
          description="Can create and edit content but cannot access administrative settings"
          value="editor"
          selected={selectedRole === 'editor'}
          onSelect={setSelectedRole}
        />
        
        <OptionCard
          title="Viewer"
          description="Read-only access to content without editing capabilities"
          value="viewer"
          selected={selectedRole === 'viewer'}
          onSelect={setSelectedRole}
        />
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm">
            <strong>Selected Role:</strong> {selectedRole}
          </p>
        </div>
      </div>
    );
  },
};

// Subscription Plans
export const SubscriptionPlans: Story = {
  args: {
    title: 'Plan',
    description: 'Description',
    value: 'plan',
  },
  render: function SubscriptionExample() {
    const [selectedPlan, setSelectedPlan] = useState('pro');

    return (
      <div className="space-y-3" style={{ width: '600px' }}>
        <h3 className="text-lg font-semibold mb-4">Choose Your Plan</h3>
        
        <OptionCard
          title="Free"
          description="Perfect for personal use. Basic features with limited storage and support."
          value="free"
          selected={selectedPlan === 'free'}
          onSelect={setSelectedPlan}
        />
        
        <OptionCard
          title="Pro"
          description="Best for professionals. Unlimited storage, priority support, and advanced features."
          value="pro"
          selected={selectedPlan === 'pro'}
          onSelect={setSelectedPlan}
        />
        
        <OptionCard
          title="Enterprise"
          description="For large organizations. Custom solutions, dedicated support, and SLA guarantees."
          value="enterprise"
          selected={selectedPlan === 'enterprise'}
          onSelect={setSelectedPlan}
        />
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm">
            <strong>Selected Plan:</strong> {selectedPlan.toUpperCase()}
          </p>
        </div>
      </div>
    );
  },
};

// With Disabled Options
export const WithDisabledOptions: Story = {
  args: {
    title: 'Option',
    description: 'Description',
    value: 'option',
  },
  render: function DisabledExample() {
    const [selected, setSelected] = useState('option2');

    return (
      <div className="space-y-3" style={{ width: '600px' }}>
        <OptionCard
          title="Available Option"
          description="This option is available for selection"
          value="option1"
          selected={selected === 'option1'}
          onSelect={setSelected}
        />
        
        <OptionCard
          title="Selected Option"
          description="This option is currently selected"
          value="option2"
          selected={selected === 'option2'}
          onSelect={setSelected}
        />
        
        <OptionCard
          title="Disabled Option"
          description="This option is disabled and cannot be selected"
          value="option3"
          selected={false}
          disabled={true}
        />
      </div>
    );
  },
};

// Settings Configuration
export const SettingsConfiguration: Story = {
  args: {
    title: 'Setting',
    description: 'Description',
    value: 'setting',
  },
  render: function SettingsExample() {
    const [theme, setTheme] = useState('light');

    return (
      <div className="space-y-3" style={{ width: '600px' }}>
        <h3 className="text-lg font-semibold mb-4">Theme Settings</h3>
        
        <OptionCard
          title="Light Mode"
          description="Use light theme across the application for better visibility in bright environments"
          value="light"
          selected={theme === 'light'}
          onSelect={setTheme}
        />
        
        <OptionCard
          title="Dark Mode"
          description="Use dark theme to reduce eye strain in low-light environments"
          value="dark"
          selected={theme === 'dark'}
          onSelect={setTheme}
        />
        
        <OptionCard
          title="Auto"
          description="Automatically switch between light and dark based on system preferences"
          value="auto"
          selected={theme === 'auto'}
          onSelect={setTheme}
        />
      </div>
    );
  },
};

// All States
export const AllStates: Story = {
  args: {
    title: 'Option',
    description: 'Description',
    value: 'option',
  },
  render: () => (
    <div className="space-y-6 p-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Unselected</h4>
        <OptionCard
          title="Option"
          description="This option is not selected"
          value="unselected"
          selected={false}
        />
      </div>
      
      <div>
        <h4 className="text-sm font-semibold mb-3">Selected</h4>
        <OptionCard
          title="Option"
          description="This option is selected"
          value="selected"
          selected={true}
        />
      </div>
      
      <div>
        <h4 className="text-sm font-semibold mb-3">Disabled</h4>
        <OptionCard
          title="Option"
          description="This option is disabled"
          value="disabled"
          selected={false}
          disabled={true}
        />
      </div>
    </div>
  ),
};
