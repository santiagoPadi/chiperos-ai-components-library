import type { Meta, StoryObj } from '@storybook/react';
import { ActionCard } from './index';
import { Package, TrendingUp, AlertCircle, Info, Clock, Bell } from 'lucide-react';

const meta = {
  title: 'Components/ActionCard',
  component: ActionCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the action card',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Description text below the title',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'Icon element rendered on the left side',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    action: {
      control: false,
      description: 'Optional CTA button with label and onClick handler',
      table: {
        type: { summary: '{ label: string; onClick: () => void }' },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when the entire card is clicked',
      table: {
        type: { summary: '() => void' },
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
} satisfies Meta<typeof ActionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Low Inventory
export const LowInventory: Story = {
  args: {
    icon: <Package size={32} color="#d48620" strokeWidth={2} />,
    title: 'Identify Low Inventory Items',
    description: 'Find SKUs with less than 5 days of inventory remaining to prevent stockouts.',
    action: {
      label: 'Show low inventory',
      onClick: () => alert('Navigate to low inventory'),
    },
  },
};

// Top Performers
export const TopPerformers: Story = {
  args: {
    icon: <TrendingUp size={32} color="#00995a" strokeWidth={2} />,
    title: 'Review Top Performers',
    description: 'Check your best-selling products this month and identify growth opportunities.',
    action: {
      label: 'View report',
      onClick: () => alert('Open report'),
    },
  },
};

// Alert Action
export const AlertAction: Story = {
  args: {
    icon: <AlertCircle size={32} color="#d4002c" strokeWidth={2} />,
    title: 'Critical Stock Alert',
    description: 'Multiple items are below minimum stock levels and require immediate attention.',
    action: {
      label: 'View alerts',
      onClick: () => alert('View alerts'),
    },
  },
};

// Info Action
export const InfoAction: Story = {
  args: {
    icon: <Info size={32} color="#0066cc" strokeWidth={2} />,
    title: 'System Update Available',
    description: 'A new version is available with improved performance and new features.',
    action: {
      label: 'Learn more',
      onClick: () => alert('Learn more'),
    },
  },
};

// Pending Tasks
export const PendingTasks: Story = {
  args: {
    icon: <Clock size={32} color="#d48620" strokeWidth={2} />,
    title: 'Pending Approvals',
    description: 'You have 12 orders waiting for approval. Review them to keep operations flowing.',
    action: {
      label: 'Review now',
      onClick: () => alert('Review approvals'),
    },
  },
};

// Notification
export const Notification: Story = {
  args: {
    icon: <Bell size={32} color="#0066cc" strokeWidth={2} />,
    title: 'New Messages',
    description: 'You have 5 unread messages from team members regarding recent orders.',
    action: {
      label: 'Read messages',
      onClick: () => alert('Open messages'),
    },
  },
};

// Without Action
export const WithoutAction: Story = {
  args: {
    icon: <Info size={32} color="#0066cc" strokeWidth={2} />,
    title: 'Maintenance Scheduled',
    description: 'System maintenance is scheduled for this weekend. No action required.',
  },
};

// Clickable Card
export const ClickableCard: Story = {
  args: {
    icon: <Package size={32} color="#00995a" strokeWidth={2} />,
    title: 'Inventory Report Ready',
    description: 'Your monthly inventory report has been generated and is ready to download.',
    onClick: () => alert('Card clicked!'),
  },
};

// Dashboard Grid
export const DashboardGrid: Story = {
  args: {
    icon: <Package size={32} color="#d48620" strokeWidth={2} />,
    title: 'Example',
    description: 'Description',
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
      <ActionCard
        icon={<Package size={32} color="#d48620" strokeWidth={2} />}
        title="Low Inventory"
        description="Find SKUs with less than 5 days remaining."
        action={{ label: 'View', onClick: () => console.log('View') }}
      />
      
      <ActionCard
        icon={<TrendingUp size={32} color="#00995a" strokeWidth={2} />}
        title="Top Performers"
        description="Check best-selling products this month."
        action={{ label: 'View report', onClick: () => console.log('Report') }}
      />
      
      <ActionCard
        icon={<AlertCircle size={32} color="#d4002c" strokeWidth={2} />}
        title="Critical Alerts"
        description="Items below minimum stock levels."
        action={{ label: 'View alerts', onClick: () => console.log('Alerts') }}
      />
      
      <ActionCard
        icon={<Clock size={32} color="#d48620" strokeWidth={2} />}
        title="Pending Tasks"
        description="12 orders waiting for approval."
        action={{ label: 'Review', onClick: () => console.log('Review') }}
      />
      
      <ActionCard
        icon={<Bell size={32} color="#0066cc" strokeWidth={2} />}
        title="New Messages"
        description="5 unread messages from team."
        action={{ label: 'Read', onClick: () => console.log('Messages') }}
      />
      
      <ActionCard
        icon={<Info size={32} color="#0066cc" strokeWidth={2} />}
        title="Update Available"
        description="New version with improvements."
        action={{ label: 'Learn more', onClick: () => console.log('Learn') }}
      />
    </div>
  ),
};

// Long Description
export const LongDescription: Story = {
  args: {
    icon: <Package size={32} color="#d48620" strokeWidth={2} />,
    title: 'Detailed Analysis Available',
    description: 'Your comprehensive quarterly analysis report covering inventory trends, sales performance, stock turnover rates, and supplier efficiency metrics is now ready for review and distribution.',
    action: {
      label: 'Download report',
      onClick: () => alert('Downloading...'),
    },
  },
};
