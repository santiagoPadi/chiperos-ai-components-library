import type { Meta, StoryObj } from '@storybook/react';
import { OrderCard } from './index';

const meta = {
  title: 'Components/OrderCard',
  component: OrderCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    state: {
      control: 'select',
      options: ['received', 'picking', 'dispatched', 'delivered'],
      description: 'Estado de la orden',
    },
    count: {
      control: 'number',
      description: 'Cantidad de órdenes/rutas',
    },
    countLabel: {
      control: 'text',
      description: 'Etiqueta de cantidad',
    },
    grossSales: {
      control: 'number',
      description: 'Ventas brutas',
    },
    netSales: {
      control: 'number',
      description: 'Ventas netas',
    },
    hasDelays: {
      control: 'boolean',
      description: 'Mostrar badge de delays',
    },
    currencySymbol: {
      control: 'text',
      description: 'Símbolo de moneda',
    },
  },
} satisfies Meta<typeof OrderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Estado: Received
export const Received: Story = {
  args: {
    state: 'received',
    count: 24,
    countLabel: 'orders',
    grossSales: 100000.00,
    netSales: 100000.00,
    hasDelays: true,
    onFilterClick: () => console.log('Filter clicked'),
  },
};

// Estado: Picking
export const Picking: Story = {
  args: {
    state: 'picking',
    count: 18,
    countLabel: 'orders',
    grossSales: 85000.00,
    netSales: 75000.00,
    hasDelays: true,
    onFilterClick: () => console.log('Filter clicked'),
  },
};

// Estado: Dispatched
export const Dispatched: Story = {
  args: {
    state: 'dispatched',
    count: 32,
    countLabel: 'routes',
    grossSales: 120000.00,
    netSales: 110000.00,
    hasDelays: true,
    onFilterClick: () => console.log('Filter clicked'),
  },
};

// Estado: Delivered
export const Delivered: Story = {
  args: {
    state: 'delivered',
    count: 45,
    countLabel: 'orders',
    grossSales: 150000.00,
    netSales: 140000.00,
    hasDelays: false,
    onFilterClick: () => console.log('Filter clicked'),
  },
};

// Sin delays
export const WithoutDelays: Story = {
  args: {
    state: 'received',
    count: 10,
    countLabel: 'orders',
    grossSales: 50000.00,
    netSales: 45000.00,
    hasDelays: false,
    onFilterClick: () => console.log('Filter clicked'),
  },
};

// Con contador de delays
export const WithDelayCount: Story = {
  args: {
    state: 'picking',
    count: 15,
    countLabel: 'orders',
    grossSales: 75000.00,
    netSales: 70000.00,
    hasDelays: true,
    delayCount: 5,
    onDelaysClick: () => console.log('Delays clicked'),
    onFilterClick: () => console.log('Filter clicked'),
  },
};

// Sin botón de filtro
export const WithoutFilter: Story = {
  args: {
    state: 'delivered',
    count: 25,
    countLabel: 'orders',
    grossSales: 90000.00,
    netSales: 85000.00,
    hasDelays: false,
  },
};

// Moneda diferente (Euro)
export const EuroCurrency: Story = {
  args: {
    state: 'received',
    count: 20,
    countLabel: 'orders',
    grossSales: 80000.00,
    netSales: 75000.00,
    currencySymbol: '€',
    hasDelays: false,
    onFilterClick: () => console.log('Filter clicked'),
  },
};

// Showcase de todos los estados
export const AllStates: Story = {
  args: {
    state: 'received',
    count: 24,
    grossSales: 100000,
    netSales: 95000,
  },
  render: () => (
    <div className="grid grid-cols-1 gap-4 p-6" style={{ maxWidth: '450px' }}>
      <OrderCard
        state="received"
        count={24}
        countLabel="orders"
        grossSales={100000.00}
        netSales={100000.00}
        hasDelays={true}
        onDelaysClick={() => console.log('Delays')}
        onFilterClick={() => console.log('Filter')}
      />
      
      <OrderCard
        state="picking"
        count={18}
        countLabel="orders"
        grossSales={85000.00}
        netSales={75000.00}
        hasDelays={true}
        onDelaysClick={() => console.log('Delays')}
        onFilterClick={() => console.log('Filter')}
      />
      
      <OrderCard
        state="dispatched"
        count={32}
        countLabel="routes"
        grossSales={120000.00}
        netSales={110000.00}
        hasDelays={true}
        onDelaysClick={() => console.log('Delays')}
        onFilterClick={() => console.log('Filter')}
      />
      
      <OrderCard
        state="delivered"
        count={45}
        countLabel="orders"
        grossSales={150000.00}
        netSales={140000.00}
        hasDelays={false}
        onFilterClick={() => console.log('Filter')}
      />
    </div>
  ),
};

// Dashboard de órdenes
export const OrdersDashboard: Story = {
  args: {
    state: 'received',
    count: 24,
    grossSales: 100000,
    netSales: 95000,
  },
  render: () => (
    <div className="max-w-6xl space-y-6 p-6 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#312e4d]">Orders Dashboard</h2>
        <div className="text-sm text-[#575385]">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <OrderCard
          state="received"
          count={24}
          countLabel="orders"
          grossSales={100000.00}
          netSales={95000.00}
          hasDelays={true}
          delayCount={3}
          onDelaysClick={() => alert('View delays for Received orders')}
          onFilterClick={() => alert('Filter Received orders')}
        />
        
        <OrderCard
          state="picking"
          count={18}
          countLabel="orders"
          grossSales={85000.00}
          netSales={80000.00}
          hasDelays={true}
          delayCount={2}
          onDelaysClick={() => alert('View delays for Picking orders')}
          onFilterClick={() => alert('Filter Picking orders')}
        />
        
        <OrderCard
          state="dispatched"
          count={32}
          countLabel="routes"
          grossSales={120000.00}
          netSales={115000.00}
          hasDelays={true}
          delayCount={1}
          onDelaysClick={() => alert('View delays for Dispatched')}
          onFilterClick={() => alert('Filter Dispatched')}
        />
        
        <OrderCard
          state="delivered"
          count={45}
          countLabel="orders"
          grossSales={150000.00}
          netSales={145000.00}
          hasDelays={false}
          onFilterClick={() => alert('Filter Delivered orders')}
        />
      </div>

      <div className="bg-white border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#312e4d]">Total Orders</h3>
            <p className="text-3xl font-bold text-[#00995a] mt-2">119</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#312e4d]">Total Sales</h3>
            <p className="text-3xl font-bold text-[#00995a] mt-2">$455,000.00</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#312e4d]">Active Delays</h3>
            <p className="text-3xl font-bold text-[#d4002c] mt-2">6</p>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Valores pequeños
export const SmallValues: Story = {
  args: {
    state: 'received',
    count: 1,
    countLabel: 'order',
    grossSales: 150.00,
    netSales: 145.00,
    hasDelays: false,
    onFilterClick: () => console.log('Filter'),
  },
};

// Valores grandes
export const LargeValues: Story = {
  args: {
    state: 'delivered',
    count: 9999,
    countLabel: 'orders',
    grossSales: 9999999.99,
    netSales: 9500000.00,
    hasDelays: false,
    onFilterClick: () => console.log('Filter'),
  },
};

// Con callbacks interactivos
export const InteractiveCallbacks: Story = {
  args: {
    state: 'picking',
    count: 15,
    countLabel: 'orders',
    grossSales: 75000.00,
    netSales: 70000.00,
    hasDelays: true,
    delayCount: 3,
    onDelaysClick: () => alert('Opening delays details...'),
    onFilterClick: () => alert('Opening filter modal...'),
  },
};

// Comparación de ventas
export const SalesComparison: Story = {
  args: {
    state: 'received',
    count: 24,
    grossSales: 100000,
    netSales: 95000,
  },
  render: () => (
    <div className="space-y-4 p-6 max-w-md">
      <h3 className="text-lg font-semibold">Sales Comparison</h3>
      
      <div className="space-y-2">
        <div className="text-sm text-gray-600">High Gross Sales</div>
        <OrderCard
          state="delivered"
          count={50}
          countLabel="orders"
          grossSales={200000.00}
          netSales={180000.00}
          hasDelays={false}
        />
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-gray-600">Medium Gross Sales</div>
        <OrderCard
          state="dispatched"
          count={30}
          countLabel="orders"
          grossSales={100000.00}
          netSales={90000.00}
          hasDelays={false}
        />
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-gray-600">Low Gross Sales</div>
        <OrderCard
          state="received"
          count={10}
          countLabel="orders"
          grossSales={25000.00}
          netSales={22000.00}
          hasDelays={true}
        />
      </div>
    </div>
  ),
};

// Con diferentes etiquetas de contador
export const DifferentCountLabels: Story = {
  args: {
    state: 'received',
    count: 24,
    grossSales: 100000,
    netSales: 95000,
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6" style={{ maxWidth: '900px' }}>
      <OrderCard
        state="received"
        count={24}
        countLabel="orders"
        grossSales={100000.00}
        netSales={95000.00}
      />
      
      <OrderCard
        state="dispatched"
        count={15}
        countLabel="routes"
        grossSales={75000.00}
        netSales={70000.00}
      />
      
      <OrderCard
        state="picking"
        count={8}
        countLabel="batches"
        grossSales={50000.00}
        netSales={48000.00}
      />
      
      <OrderCard
        state="delivered"
        count={100}
        countLabel="shipments"
        grossSales={150000.00}
        netSales={145000.00}
      />
    </div>
  ),
};

// Con ícono personalizado
export const CustomIcon: Story = {
  args: {
    state: 'received',
    count: 20,
    countLabel: 'orders',
    grossSales: 80000.00,
    netSales: 75000.00,
    icon: (
      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
        <span className="text-white text-lg">📦</span>
      </div>
    ),
    hasDelays: false,
    onFilterClick: () => console.log('Filter'),
  },
};

