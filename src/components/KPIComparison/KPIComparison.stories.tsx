import type { Meta, StoryObj } from '@storybook/react';
import { KPIComparison } from './index';

const meta = {
  title: 'Components/KPIComparison',
  component: KPIComparison,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    percentage: {
      control: 'number',
      description: 'Porcentaje de cambio',
    },
    trend: {
      control: 'select',
      options: ['positive', 'negative'],
      description: 'Tendencia del KPI',
    },
    label: {
      control: 'text',
      description: 'Texto descriptivo',
    },
    showWarning: {
      control: 'boolean',
      description: 'Mostrar ícono de advertencia',
    },
  },
} satisfies Meta<typeof KPIComparison>;

export default meta;
type Story = StoryObj<typeof meta>;

// Tendencia positiva
export const Positive: Story = {
  args: {
    percentage: 1.0,
    trend: 'positive',
    label: 'KPI comparison',
    showWarning: false,
  },
};

// Tendencia negativa
export const Negative: Story = {
  args: {
    percentage: -10,
    trend: 'negative',
    label: 'KPI comparison',
    showWarning: false,
  },
};

// Positivo con warning
export const PositiveWithWarning: Story = {
  args: {
    percentage: 1.0,
    trend: 'positive',
    label: 'KPI comparison',
    showWarning: true,
  },
};

// Negativo con warning
export const NegativeWithWarning: Story = {
  args: {
    percentage: -10.5,
    trend: 'negative',
    label: 'KPI comparison',
    showWarning: true,
  },
};

// Con etiqueta personalizada
export const CustomLabel: Story = {
  args: {
    percentage: 5.2,
    trend: 'positive',
    label: 'vs last month',
    showWarning: false,
  },
};

// Valor pequeño
export const SmallValue: Story = {
  args: {
    percentage: 0.5,
    trend: 'positive',
    label: 'vs yesterday',
    showWarning: false,
  },
};

// Valor grande
export const LargeValue: Story = {
  args: {
    percentage: 125.8,
    trend: 'positive',
    label: 'vs last year',
    showWarning: false,
  },
};

// Showcase de todos los estados
export const AllStates: Story = {
  args: {
    percentage: 1.0,
    trend: 'positive',
  },
  render: () => (
    <div className="space-y-6 p-6 border rounded-lg">
      <div>
        <h3 className="text-sm font-semibold mb-4">Tendencias Positivas</h3>
        <div className="space-y-3">
          <KPIComparison percentage={1.0} trend="positive" label="KPI comparison" />
          <KPIComparison percentage={5.2} trend="positive" label="vs last month" />
          <KPIComparison percentage={15.7} trend="positive" label="vs last quarter" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Tendencias Negativas</h3>
        <div className="space-y-3">
          <KPIComparison percentage={-2.5} trend="negative" label="KPI comparison" />
          <KPIComparison percentage={-10.0} trend="negative" label="vs last month" />
          <KPIComparison percentage={-25.3} trend="negative" label="vs last quarter" />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-4">Con Advertencias</h3>
        <div className="space-y-3">
          <KPIComparison percentage={1.0} trend="positive" label="KPI comparison" showWarning={true} />
          <KPIComparison percentage={-10.0} trend="negative" label="KPI comparison" showWarning={true} />
        </div>
      </div>
    </div>
  ),
};

// En contexto de card
export const InCardContext: Story = {
  args: {
    percentage: 1.0,
    trend: 'positive',
  },
  render: () => (
    <div className="max-w-md border border-[#ecebf0] rounded-xl p-5 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
          📊
        </div>
        <h3 className="text-base font-medium text-[#575385]">Active Users</h3>
      </div>
      
      <div className="mb-2">
        <span className="text-2xl font-semibold text-[#312e4d]">1,234</span>
      </div>
      
      <KPIComparison percentage={12.5} trend="positive" label="vs last week" />
    </div>
  ),
};

// Múltiples comparaciones
export const MultipleComparisons: Story = {
  args: {
    percentage: 1.0,
    trend: 'positive',
  },
  render: () => (
    <div className="max-w-lg border border-[#ecebf0] rounded-xl p-5 bg-white space-y-4">
      <h3 className="text-lg font-semibold text-[#312e4d]">Performance Metrics</h3>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm text-[#575385] mb-1">Revenue</p>
          <KPIComparison percentage={8.2} trend="positive" label="vs last month" />
        </div>
        
        <div>
          <p className="text-sm text-[#575385] mb-1">Conversion Rate</p>
          <KPIComparison percentage={-3.5} trend="negative" label="vs last month" showWarning={true} />
        </div>
        
        <div>
          <p className="text-sm text-[#575385] mb-1">Customer Satisfaction</p>
          <KPIComparison percentage={15.0} trend="positive" label="vs last month" />
        </div>
        
        <div>
          <p className="text-sm text-[#575385] mb-1">Churn Rate</p>
          <KPIComparison percentage={-2.1} trend="negative" label="vs last month" />
        </div>
      </div>
    </div>
  ),
};

// Con diferentes labels
export const DifferentLabels: Story = {
  args: {
    percentage: 1.0,
    trend: 'positive',
  },
  render: () => (
    <div className="space-y-3 p-6 border rounded-lg">
      <KPIComparison percentage={5.0} trend="positive" label="vs yesterday" />
      <KPIComparison percentage={10.5} trend="positive" label="vs last week" />
      <KPIComparison percentage={15.2} trend="positive" label="vs last month" />
      <KPIComparison percentage={25.8} trend="positive" label="vs last quarter" />
      <KPIComparison percentage={120.0} trend="positive" label="vs last year" />
    </div>
  ),
};

// Valor cero
export const ZeroValue: Story = {
  args: {
    percentage: 0,
    trend: 'positive',
    label: 'No change',
    showWarning: false,
  },
};

// Decimales precisos
export const PreciseDecimals: Story = {
  args: {
    percentage: 1.0,
    trend: 'positive',
  },
  render: () => (
    <div className="space-y-3 p-6 border rounded-lg">
      <KPIComparison percentage={0.1} trend="positive" label="Small increase" />
      <KPIComparison percentage={1.23} trend="positive" label="Medium increase" />
      <KPIComparison percentage={12.456} trend="positive" label="Large increase" />
      <KPIComparison percentage={-0.05} trend="negative" label="Small decrease" />
      <KPIComparison percentage={-5.789} trend="negative" label="Medium decrease" />
    </div>
  ),
};

