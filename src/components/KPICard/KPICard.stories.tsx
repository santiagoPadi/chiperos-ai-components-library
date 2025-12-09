import type { Meta, StoryObj } from '@storybook/react';
import { KPICard } from './index';

const meta = {
  title: 'Components/KPICard',
  component: KPICard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Título de la card',
    },
    value: {
      control: 'text',
      description: 'Valor principal',
    },
    unit: {
      control: 'text',
      description: 'Unidad del valor',
    },
    description: {
      control: 'text',
      description: 'Texto descriptivo',
    },
    iconColor: {
      control: 'select',
      options: ['primary', 'error', 'brand'],
      description: 'Color del ícono',
    },
  },
} satisfies Meta<typeof KPICard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Variante básica con porcentaje
export const Basic: Story = {
  args: {
    title: 'Conversion Rate',
    value: 3,
    unit: '%',
    iconColor: 'error',
  },
};

// Con comparación positiva
export const WithPositiveComparison: Story = {
  args: {
    title: 'Active Users',
    value: 3,
    unit: '%',
    description: 'Descriptive text goes here',
    comparison: {
      percentage: 1.0,
      trend: 'positive',
      label: 'KPI comparison',
    },
    iconColor: 'error',
  },
};

// Con comparación negativa y warning
export const WithNegativeComparison: Story = {
  args: {
    title: 'Churn Rate',
    value: 5,
    unit: '%',
    description: 'Higher than expected',
    comparison: {
      percentage: -10.0,
      trend: 'negative',
      label: 'vs last month',
      showWarning: true,
    },
    iconColor: 'error',
  },
};

// Con tag
export const WithTag: Story = {
  args: {
    title: 'Revenue',
    value: 3,
    unit: '%',
    description: 'Monthly performance',
    tag: {
      label: 'Tag label',
      variant: 'default',
    },
    comparison: {
      percentage: 1.0,
      trend: 'positive',
      label: 'vs last period',
    },
    iconColor: 'error',
  },
};

// Con tag rojo
export const WithRedTag: Story = {
  args: {
    title: 'Critical Metric',
    value: 12,
    unit: '%',
    description: 'Needs attention',
    tag: {
      label: 'Alert',
      variant: 'red',
    },
    comparison: {
      percentage: -15.0,
      trend: 'negative',
      showWarning: true,
    },
    iconColor: 'error',
  },
};

// Variante con fracción (Type=Text)
export const WithFraction: Story = {
  args: {
    title: 'Title goes here',
    value: 3,
    total: 17,
    bodyText: 'Body goes here',
    iconColor: 'primary',
  },
};

// Con botón
export const WithButton: Story = {
  args: {
    title: 'Tasks Completed',
    value: 3,
    total: 17,
    bodyText: 'You have 14 tasks remaining',
    button: {
      label: 'View All',
      onClick: () => alert('Button clicked!'),
    },
    iconColor: 'primary',
  },
};

// Ícono de marca (verde)
export const BrandIcon: Story = {
  args: {
    title: 'Sales Growth',
    value: 25,
    unit: '%',
    description: 'Above target',
    comparison: {
      percentage: 12.5,
      trend: 'positive',
      label: 'vs last quarter',
    },
    iconColor: 'brand',
  },
};

// Showcase de todas las variantes
export const AllVariants: Story = {
  args: {
    title: 'Example',
    value: 3,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6" style={{ maxWidth: '900px' }}>
      <KPICard
        title="Basic KPI"
        value={3}
        unit="%"
        iconColor="error"
      />
      
      <KPICard
        title="With Positive Trend"
        value={12}
        unit="%"
        description="Performing well"
        comparison={{
          percentage: 8.5,
          trend: 'positive',
          label: 'vs last month',
        }}
        iconColor="brand"
      />
      
      <KPICard
        title="With Negative Trend"
        value={5}
        unit="%"
        description="Below target"
        comparison={{
          percentage: -3.2,
          trend: 'negative',
          label: 'vs last month',
          showWarning: true,
        }}
        iconColor="error"
      />
      
      <KPICard
        title="With Tag"
        value={18}
        unit="%"
        tag={{
          label: 'Monthly',
          variant: 'default',
        }}
        comparison={{
          percentage: 5.0,
          trend: 'positive',
        }}
        iconColor="primary"
      />
      
      <KPICard
        title="With Fraction"
        value={7}
        total={20}
        bodyText="Progress tracking"
        iconColor="primary"
      />
      
      <KPICard
        title="With Button"
        value={15}
        unit=" tasks"
        button={{
          label: 'View Details',
          onClick: () => console.log('Clicked'),
        }}
        iconColor="brand"
      />
    </div>
  ),
};

// Dashboard completo
export const Dashboard: Story = {
  args: {
    title: 'Example',
    value: 3,
  },
  render: () => (
    <div className="max-w-6xl space-y-6 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-2xl font-bold text-[#312e4d]">KPI Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          title="Revenue"
          value={125}
          unit="K"
          description="Total revenue"
          comparison={{
            percentage: 12.5,
            trend: 'positive',
            label: 'vs last month',
          }}
          tag={{
            label: 'Target Met',
            variant: 'default',
          }}
          iconColor="brand"
        />
        
        <KPICard
          title="Conversion Rate"
          value={3.5}
          unit="%"
          description="Website conversions"
          comparison={{
            percentage: 1.2,
            trend: 'positive',
            label: 'vs last week',
          }}
          iconColor="brand"
        />
        
        <KPICard
          title="Customer Satisfaction"
          value={4.8}
          unit="/5"
          description="Average rating"
          comparison={{
            percentage: 0.5,
            trend: 'positive',
            label: 'vs last quarter',
          }}
          iconColor="brand"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <KPICard
          title="Active Users"
          value={2.4}
          unit="K"
          description="Daily active users"
          comparison={{
            percentage: 5.8,
            trend: 'positive',
            label: 'vs yesterday',
          }}
          iconColor="primary"
        />
        
        <KPICard
          title="Churn Rate"
          value={2.1}
          unit="%"
          description="Customer churn"
          comparison={{
            percentage: -1.5,
            trend: 'negative',
            label: 'vs last month',
            showWarning: true,
          }}
          tag={{
            label: 'Alert',
            variant: 'red',
          }}
          iconColor="error"
        />
      </div>
    </div>
  ),
};

// Con ícono personalizado
export const CustomIcon: Story = {
  args: {
    title: 'Custom Metric',
    value: 42,
    unit: '%',
    description: 'With custom icon',
    icon: (
      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
        <span className="text-white text-lg">🚀</span>
      </div>
    ),
    comparison: {
      percentage: 10.0,
      trend: 'positive',
    },
  },
};

// Clickable card
export const Clickable: Story = {
  args: {
    title: 'Click Me',
    value: 99,
    unit: '%',
    description: 'This card is clickable',
    onClick: () => alert('Card clicked!'),
    comparison: {
      percentage: 5.0,
      trend: 'positive',
    },
    iconColor: 'brand',
  },
};

// Valores grandes
export const LargeValues: Story = {
  args: {
    title: 'Total Sales',
    value: '1.2M',
    unit: '$',
    description: 'Year to date',
    comparison: {
      percentage: 125.5,
      trend: 'positive',
      label: 'vs last year',
    },
    iconColor: 'brand',
  },
};

// Sin comparación
export const WithoutComparison: Story = {
  args: {
    title: 'Static Metric',
    value: 50,
    unit: '%',
    description: 'No trend data available',
    iconColor: 'primary',
  },
};

// Con descripción larga
export const LongDescription: Story = {
  args: {
    title: 'Complex Metric',
    value: 75,
    unit: '%',
    description: 'This is a very long descriptive text that should be truncated with ellipsis when it exceeds the available space',
    comparison: {
      percentage: 3.0,
      trend: 'positive',
    },
    iconColor: 'primary',
  },
};

// Modo compacto (sin extras)
export const Compact: Story = {
  args: {
    title: 'Simple',
    value: 10,
    unit: '%',
    iconColor: 'primary',
  },
};

// Con todos los elementos
export const Complete: Story = {
  args: {
    title: 'Complete KPI Card',
    value: 87,
    unit: '%',
    description: 'All features enabled',
    tag: {
      label: 'Premium',
      variant: 'default',
    },
    comparison: {
      percentage: 15.2,
      trend: 'positive',
      label: 'vs last period',
    },
    button: {
      label: 'View Details',
      onClick: () => console.log('Details clicked'),
    },
    onClick: () => console.log('Card clicked'),
    iconColor: 'brand',
  },
};


