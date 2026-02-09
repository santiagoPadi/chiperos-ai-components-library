import type { Meta, StoryObj } from '@storybook/react';
import { BannerAlerts } from './index';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

const meta = {
  title: 'Components/BannerAlerts',
  component: BannerAlerts,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['warning', 'information', 'grey'],
      description: 'Visual variant of the banner alert',
      table: {
        type: { summary: "'warning' | 'information' | 'grey'" },
        defaultValue: { summary: "'information'" },
      },
    },
    title: {
      control: 'text',
      description: 'Title of the alert banner',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Description text of the alert banner',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'Custom icon element (overrides the default variant icon)',
      table: {
        type: { summary: 'ReactNode' },
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
} satisfies Meta<typeof BannerAlerts>;

export default meta;
type Story = StoryObj<typeof meta>;

// Warning variant
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Low credits',
    description: 'You have less than 20% of your monthly credits left',
  },
};

// Information variant
export const Information: Story = {
  args: {
    variant: 'information',
    title: 'System update available',
    description: 'A new version of the system is available. Update now to get the latest features.',
  },
};

// Grey variant
export const Grey: Story = {
  args: {
    variant: 'grey',
    title: 'Maintenance scheduled',
    description: 'System maintenance will occur on Sunday at 2:00 AM. Expected downtime: 2 hours.',
  },
};

// Con icono personalizado
export const CustomIcon: Story = {
  args: {
    variant: 'information',
    title: 'Task completed successfully',
    description: 'Your task has been completed and all files have been processed.',
    icon: <CheckCircle size={24} className="text-[#4087fb]" />,
  },
};

// Showcase de todas las variantes
export const AllVariants: Story = {
  args: {
    title: '',
    description: '',
  },
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-3">Warning</h3>
        <BannerAlerts
          variant="warning"
          title="Low credits"
          description="You have less than 20% of your monthly credits left"
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Information</h3>
        <BannerAlerts
          variant="information"
          title="System update available"
          description="A new version of the system is available. Update now to get the latest features."
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Grey</h3>
        <BannerAlerts
          variant="grey"
          title="Maintenance scheduled"
          description="System maintenance will occur on Sunday at 2:00 AM. Expected downtime: 2 hours."
        />
      </div>
    </div>
  ),
};

// Diferentes longitudes de texto
export const DifferentLengths: Story = {
  args: {
    title: '',
    description: '',
  },
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <BannerAlerts
        variant="warning"
        title="Short"
        description="Brief message."
      />

      <BannerAlerts
        variant="information"
        title="Medium length title here"
        description="This is a medium-length description that provides more context about the situation."
      />

      <BannerAlerts
        variant="grey"
        title="Very long title that might wrap to multiple lines on smaller screens"
        description="This is a very long description that contains a lot of information and will definitely wrap to multiple lines. It's important to test how the component handles longer text content to ensure proper layout and readability across different screen sizes and devices."
      />
    </div>
  ),
};

// Casos de uso comunes
export const CommonUseCases: Story = {
  args: {
    title: '',
    description: '',
  },
  render: () => (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-3">Error / Crítico</h3>
        <BannerAlerts
          variant="warning"
          title="Payment failed"
          description="Your payment could not be processed. Please check your payment method and try again."
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Información</h3>
        <BannerAlerts
          variant="information"
          title="New features available"
          description="We've added new features to help you work more efficiently. Check them out in the dashboard."
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Notificación general</h3>
        <BannerAlerts
          variant="grey"
          title="Profile updated"
          description="Your profile information has been successfully updated."
        />
      </div>
    </div>
  ),
};

// Con iconos personalizados
export const CustomIcons: Story = {
  args: {
    title: '',
    description: '',
  },
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <BannerAlerts
        variant="warning"
        title="Action required"
        description="Please complete your profile to continue."
        icon={<AlertCircle size={24} className="text-[#d48620]" />}
      />

      <BannerAlerts
        variant="information"
        title="Success"
        description="Your changes have been saved successfully."
        icon={<CheckCircle size={24} className="text-[#4087fb]" />}
      />

      <BannerAlerts
        variant="grey"
        title="Error occurred"
        description="An unexpected error has occurred. Please try again."
        icon={<XCircle size={24} className="text-[#202020]" />}
      />
    </div>
  ),
};

// En formularios
export const InForms: Story = {
  args: {
    title: '',
    description: '',
  },
  render: () => (
    <div className="max-w-md space-y-4">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>
      
      <BannerAlerts
        variant="information"
        title="Almost there!"
        description="Just a few more steps to complete your registration."
      />

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="••••••••"
          />
        </div>

        <BannerAlerts
          variant="warning"
          title="Password requirements"
          description="Password must be at least 8 characters and include numbers and symbols."
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Create Account
        </button>
      </div>
    </div>
  ),
};

// En dashboard
export const InDashboard: Story = {
  args: {
    title: '',
    description: '',
  },
  render: () => (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        
        <div className="space-y-3 mb-6">
          <BannerAlerts
            variant="warning"
            title="Subscription expiring soon"
            description="Your subscription will expire in 5 days. Renew now to avoid service interruption."
          />
          
          <BannerAlerts
            variant="information"
            title="New updates available"
            description="Version 2.0 is now available with improved performance and new features."
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="border p-4 rounded">
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-2xl font-bold">1,234</p>
          </div>
          <div className="border p-4 rounded">
            <p className="text-gray-600 text-sm">Active</p>
            <p className="text-2xl font-bold">987</p>
          </div>
          <div className="border p-4 rounded">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-2xl font-bold">247</p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Responsive
export const Responsive: Story = {
  args: {
    title: '',
    description: '',
  },
  render: () => (
    <div className="space-y-4">
      <div className="max-w-sm">
        <p className="text-sm text-gray-600 mb-2">Mobile (max-w-sm)</p>
        <BannerAlerts
          variant="information"
          title="Responsive test"
          description="This banner adapts to different screen sizes automatically."
        />
      </div>

      <div className="max-w-md">
        <p className="text-sm text-gray-600 mb-2">Tablet (max-w-md)</p>
        <BannerAlerts
          variant="warning"
          title="Responsive test"
          description="The layout adjusts to fit the available space while maintaining readability."
        />
      </div>

      <div className="max-w-2xl">
        <p className="text-sm text-gray-600 mb-2">Desktop (max-w-2xl)</p>
        <BannerAlerts
          variant="grey"
          title="Responsive test"
          description="On larger screens, the banner has more space to display content comfortably."
        />
      </div>
    </div>
  ),
};

