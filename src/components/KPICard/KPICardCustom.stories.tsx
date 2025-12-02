import type { Meta, StoryObj } from '@storybook/react';
import { KPICardCustom } from './KPICardCustom';
import { TrendingUp, Users, DollarSign, Activity } from 'lucide-react';
import { KPIComparison } from '../KPIComparison';

const meta = {
  title: 'Components/KPICardCustom',
  component: KPICardCustom,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KPICardCustom>;

export default meta;
type Story = StoryObj<typeof meta>;

// Ejemplo básico
export const Basic: Story = {
  args: {
    title: 'Custom Metric',
    icon: <Activity size={32} color="#00995a" strokeWidth={2} />,
    content: (
      <div className="text-2xl font-bold text-[#312e4d]">
        42
      </div>
    ),
    description: (
      <p className="text-sm text-[#575385]">
        This is a custom description
      </p>
    ),
  },
};

// Con contenido complejo
export const ComplexContent: Story = {
  args: {
    title: 'User Activity',
    icon: <Users size={32} color="#00995a" strokeWidth={2} />,
    content: (
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#312e4d]">2,458</span>
          <span className="text-sm text-[#575385]">active users</span>
        </div>
        <div className="flex gap-4 text-xs text-[#575385]">
          <span>Online: 1,234</span>
          <span>Offline: 1,224</span>
        </div>
      </div>
    ),
    footer: <KPIComparison percentage={12.5} trend="positive" label="vs yesterday" />,
    tag: { label: 'Live', variant: 'green' },
  },
};

// Con gráfico personalizado
export const WithChart: Story = {
  args: {
    title: 'Revenue Trend',
    icon: <DollarSign size={32} color="#00995a" strokeWidth={2} />,
    content: (
      <div className="space-y-2">
        <div className="text-3xl font-bold text-[#312e4d]">$125K</div>
        <div className="h-12 flex items-end gap-1">
          {[40, 65, 45, 80, 70, 90, 100].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-[#00995a] rounded-t"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    ),
    description: (
      <p className="text-sm text-[#575385]">Last 7 days performance</p>
    ),
    tag: { label: 'Growing', variant: 'green' },
  },
};

// Con lista personalizada
export const WithList: Story = {
  args: {
    title: 'Top Products',
    icon: <TrendingUp size={32} color="#00995a" strokeWidth={2} />,
    content: (
      <div className="space-y-2">
        {[
          { name: 'Product A', value: '$12,500' },
          { name: 'Product B', value: '$10,200' },
          { name: 'Product C', value: '$8,900' },
        ].map((item, i) => (
          <div key={i} className="flex justify-between items-center text-sm">
            <span className="text-[#575385]">{item.name}</span>
            <span className="font-semibold text-[#312e4d]">{item.value}</span>
          </div>
        ))}
      </div>
    ),
    footer: (
      <button className="text-sm text-[#00995a] hover:underline">
        View all products →
      </button>
    ),
  },
};

// Con botones de acción
export const WithActions: Story = {
  args: {
    title: 'Campaign Performance',
    icon: <Activity size={32} color="#0066cc" strokeWidth={2} />,
    content: (
      <div className="space-y-2">
        <div className="text-2xl font-bold text-[#312e4d]">87.5%</div>
        <p className="text-sm text-[#575385]">Conversion rate</p>
      </div>
    ),
    footer: (
      <div className="flex gap-2">
        <button className="px-3 py-1 text-sm bg-[#00995a] text-white rounded hover:opacity-80">
          Optimize
        </button>
        <button className="px-3 py-1 text-sm border border-[#ecebf0] rounded hover:bg-gray-50">
          Report
        </button>
      </div>
    ),
    tag: { label: 'Active', variant: 'blue' },
  },
};

// Showcase de todas las variantes
export const AllVariants: Story = {
  args: {
    title: 'Example',
    icon: <Activity size={32} color="#00995a" strokeWidth={2} />,
    content: <div>Content</div>,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6" style={{ maxWidth: '1000px' }}>
      <KPICardCustom
        title="Simple Metric"
        icon={<Activity size={32} color="#00995a" strokeWidth={2} />}
        content={<div className="text-3xl font-bold text-[#312e4d]">42</div>}
        description={<p className="text-sm text-[#575385]">Simple description</p>}
      />
      
      <KPICardCustom
        title="With Tag"
        icon={<Users size={32} color="#00995a" strokeWidth={2} />}
        content={<div className="text-3xl font-bold text-[#312e4d]">2,458</div>}
        tag={{ label: 'Live', variant: 'green' }}
        footer={<KPIComparison percentage={12} trend="positive" />}
      />
      
      <KPICardCustom
        title="Revenue"
        icon={<DollarSign size={32} color="#00995a" strokeWidth={2} />}
        content={
          <div className="space-y-2">
            <div className="text-3xl font-bold text-[#312e4d]">$125K</div>
            <div className="h-8 flex items-end gap-1">
              {[40, 65, 80, 70, 90].map((h, i) => (
                <div key={i} className="flex-1 bg-[#00995a] rounded-t" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        }
        tag={{ label: 'Up', variant: 'green' }}
      />
      
      <KPICardCustom
        title="Campaign"
        icon={<TrendingUp size={32} color="#0066cc" strokeWidth={2} />}
        content={<div className="text-3xl font-bold text-[#312e4d]">87.5%</div>}
        footer={
          <div className="flex gap-2">
            <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded">Action</button>
            <button className="px-2 py-1 text-xs border rounded">Report</button>
          </div>
        }
        tag={{ label: 'Active', variant: 'blue' }}
      />
    </div>
  ),
};

// Layout completamente personalizado
export const FullyCustom: Story = {
  args: {
    title: 'System Status',
    icon: (
      <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white text-lg">✓</span>
      </div>
    ),
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#575385]">CPU</span>
          <span className="text-sm font-semibold text-[#312e4d]">23%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#575385]">Memory</span>
          <span className="text-sm font-semibold text-[#312e4d]">58%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#575385]">Disk</span>
          <span className="text-sm font-semibold text-[#312e4d]">42%</span>
        </div>
      </div>
    ),
    footer: (
      <p className="text-xs text-[#00995a]">All systems operational</p>
    ),
    tag: { label: 'Healthy', variant: 'green' },
    onClick: () => alert('View system details'),
  },
};

