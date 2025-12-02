import type { Meta, StoryObj } from '@storybook/react';
import { OrderCardCustom } from './OrderCardCustom';
import { AlertCircle, Package, TrendingUp, Clock } from 'lucide-react';

const meta = {
  title: 'Components/OrderCardCustom',
  component: OrderCardCustom,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof OrderCardCustom>;

export default meta;
type Story = StoryObj<typeof meta>;

// Ejemplo básico
export const Basic: Story = {
  args: {
    title: 'Processing',
    count: 42,
    countLabel: 'items',
    infoLine1: 'Total Value: $50,000.00',
    infoLine2: 'Estimated Time: 2 hours',
    icon: <Package size={32} color="#00995a" strokeWidth={2} />,
  },
};

// Con badge urgente
export const WithUrgentBadge: Story = {
  args: {
    title: 'Critical Orders',
    count: 8,
    countLabel: 'orders',
    infoLine1: 'Value: $25,000.00',
    infoLine2: 'Priority: High',
    icon: <AlertCircle size={32} color="#d4002c" strokeWidth={2} />,
    badge: {
      label: 'Urgent',
      variant: 'red',
      onClick: () => alert('View urgent items'),
    },
    button: {
      label: 'Process',
      onClick: () => alert('Processing...'),
    },
  },
};

// Con badge verde
export const WithSuccessBadge: Story = {
  args: {
    title: 'Completed Today',
    count: 156,
    countLabel: 'orders',
    infoLine1: 'Total: $180,000.00',
    infoLine2: 'On Time: 98%',
    icon: <TrendingUp size={32} color="#00995a" strokeWidth={2} />,
    badge: {
      label: 'Excellent',
      variant: 'green',
    },
    button: {
      label: 'Report',
      onClick: () => alert('Generate report'),
    },
  },
};

// Con badge azul
export const WithInfoBadge: Story = {
  args: {
    title: 'In Transit',
    count: 73,
    countLabel: 'shipments',
    infoLine1: 'Est. Delivery: Today',
    infoLine2: 'Tracking: Active',
    icon: <Clock size={32} color="#0066cc" strokeWidth={2} />,
    badge: {
      label: 'On Track',
      variant: 'blue',
    },
  },
};

// Sin badge ni botón
export const SimpleLayout: Story = {
  args: {
    title: 'Warehouse Stock',
    count: 1248,
    countLabel: 'units',
    infoLine1: 'Available: 1,200 units',
    infoLine2: 'Reserved: 48 units',
    icon: <Package size={32} color="#312e4d" strokeWidth={2} />,
  },
};

// Showcase completo
export const AllVariants: Story = {
  args: {
    title: 'Example',
    count: 10,
    countLabel: 'items',
    icon: <Package size={32} color="#00995a" strokeWidth={2} />,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6" style={{ maxWidth: '1000px' }}>
      <OrderCardCustom
        title="Processing"
        count={42}
        countLabel="items"
        infoLine1="Total: $50,000.00"
        infoLine2="Time: 2 hours"
        icon={<Package size={32} color="#00995a" strokeWidth={2} />}
        button={{ label: 'View', onClick: () => console.log('View') }}
      />
      
      <OrderCardCustom
        title="Urgent Orders"
        count={8}
        countLabel="orders"
        infoLine1="Value: $25,000.00"
        infoLine2="Priority: High"
        icon={<AlertCircle size={32} color="#d4002c" strokeWidth={2} />}
        badge={{ label: 'Urgent', variant: 'red' }}
        button={{ label: 'Process', onClick: () => console.log('Process') }}
      />
      
      <OrderCardCustom
        title="Completed"
        count={156}
        countLabel="orders"
        infoLine1="Total: $180,000.00"
        infoLine2="Success Rate: 98%"
        icon={<TrendingUp size={32} color="#00995a" strokeWidth={2} />}
        badge={{ label: 'Excellent', variant: 'green' }}
      />
      
      <OrderCardCustom
        title="In Transit"
        count={73}
        countLabel="shipments"
        infoLine1="Delivery: Today"
        infoLine2="Status: Active"
        icon={<Clock size={32} color="#0066cc" strokeWidth={2} />}
        badge={{ label: 'On Track', variant: 'blue' }}
        button={{ label: 'Track', onClick: () => console.log('Track') }}
      />
    </div>
  ),
};

// Personalización completa
export const FullyCustomized: Story = {
  args: {
    title: 'Custom Workflow',
    count: '2.4K',
    countLabel: 'processed',
    infoLine1: 'Efficiency: 94.5%',
    infoLine2: 'Average Time: 15 min',
    icon: (
      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
        <span className="text-white text-sm">🚀</span>
      </div>
    ),
    badge: {
      label: 'New System',
      variant: 'blue',
    },
    button: {
      label: 'Configure',
      onClick: () => alert('Open configuration'),
    },
    className: 'border-2 border-purple-200',
  },
};

