import type { Meta, StoryObj } from '@storybook/react';
import { KPIComparisonCustom } from './KPIComparisonCustom';
import { TrendingUp, TrendingDown, AlertCircle, Info, Star, Heart } from 'lucide-react';

const meta = {
  title: 'Components/KPIComparisonCustom',
  component: KPIComparisonCustom,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof KPIComparisonCustom>;

export default meta;
type Story = StoryObj<typeof meta>;

// Con ícono de tendencia positiva
export const PositiveTrend: Story = {
  args: {
    icon: <TrendingUp size={12} color="#00995a" />,
    primaryText: '+12.5%',
    primaryTextColor: '#00995a',
    secondaryText: 'vs last month',
  },
};

// Con ícono de tendencia negativa
export const NegativeTrend: Story = {
  args: {
    icon: <TrendingDown size={12} color="#d4002c" />,
    primaryText: '-5.2%',
    primaryTextColor: '#d4002c',
    secondaryText: 'vs last month',
  },
};

// Con ícono de alerta
export const WithAlert: Story = {
  args: {
    icon: <AlertCircle size={12} color="#d4002c" />,
    primaryText: 'Critical',
    primaryTextColor: '#d4002c',
    secondaryText: 'action required',
    rightIcon: <Info size={16} color="#d4002c" />,
  },
};

// Con valores personalizados
export const CustomValues: Story = {
  args: {
    icon: <Star size={12} color="#ffa500" />,
    primaryText: '4.8/5',
    primaryTextColor: '#ffa500',
    secondaryText: 'rating',
  },
};

// Con contador
export const WithCounter: Story = {
  args: {
    icon: <Heart size={12} color="#ff1493" />,
    primaryText: '1.2K',
    primaryTextColor: '#ff1493',
    secondaryText: 'likes',
  },
};

// Solo ícono y texto
export const MinimalLayout: Story = {
  args: {
    icon: <Info size={12} color="#0066cc" />,
    primaryText: 'Active',
    primaryTextColor: '#0066cc',
  },
};

// Showcase de todas las variantes
export const AllVariants: Story = {
  args: {
    icon: <TrendingUp size={12} color="#00995a" />,
    primaryText: '+10%',
  },
  render: () => (
    <div className="space-y-4 p-6 max-w-md border rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Custom KPI Comparisons</h3>
      
      <div className="space-y-3">
        <KPIComparisonCustom
          icon={<TrendingUp size={12} color="#00995a" />}
          primaryText="+12.5%"
          primaryTextColor="#00995a"
          secondaryText="vs last month"
        />
        
        <KPIComparisonCustom
          icon={<TrendingDown size={12} color="#d4002c" />}
          primaryText="-5.2%"
          primaryTextColor="#d4002c"
          secondaryText="vs last week"
        />
        
        <KPIComparisonCustom
          icon={<Star size={12} color="#ffa500" />}
          primaryText="4.8/5"
          primaryTextColor="#ffa500"
          secondaryText="avg rating"
        />
        
        <KPIComparisonCustom
          icon={<Heart size={12} color="#ff1493" />}
          primaryText="1.2K"
          primaryTextColor="#ff1493"
          secondaryText="likes"
        />
        
        <KPIComparisonCustom
          icon={<AlertCircle size={12} color="#d4002c" />}
          primaryText="Critical"
          primaryTextColor="#d4002c"
          secondaryText="action required"
          rightIcon={<Info size={16} color="#d4002c" />}
        />
      </div>
    </div>
  ),
};

// Uso en contexto de card
export const InCardContext: Story = {
  args: {
    icon: <TrendingUp size={12} color="#00995a" />,
    primaryText: '+10%',
  },
  render: () => (
    <div className="max-w-md border border-[#ecebf0] rounded-xl p-5 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
          📊
        </div>
        <h3 className="text-base font-medium text-[#575385]">Sales Performance</h3>
      </div>
      
      <div className="mb-2">
        <span className="text-2xl font-semibold text-[#312e4d]">$125,000</span>
      </div>
      
      <div className="space-y-2">
        <KPIComparisonCustom
          icon={<TrendingUp size={12} color="#00995a" />}
          primaryText="+12.5%"
          primaryTextColor="#00995a"
          secondaryText="vs last month"
        />
        
        <KPIComparisonCustom
          icon={<Star size={12} color="#ffa500" />}
          primaryText="4.8/5"
          primaryTextColor="#ffa500"
          secondaryText="customer satisfaction"
        />
      </div>
    </div>
  ),
};

// Múltiples métricas
export const MultipleMetrics: Story = {
  args: {
    icon: <TrendingUp size={12} color="#00995a" />,
    primaryText: '+10%',
  },
  render: () => (
    <div className="max-w-lg border border-[#ecebf0] rounded-xl p-5 bg-white space-y-4">
      <h3 className="text-lg font-semibold text-[#312e4d]">Dashboard Metrics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-[#575385] mb-1">Revenue</p>
          <KPIComparisonCustom
            icon={<TrendingUp size={12} color="#00995a" />}
            primaryText="+18.2%"
            primaryTextColor="#00995a"
            secondaryText="growth"
          />
        </div>
        
        <div>
          <p className="text-sm text-[#575385] mb-1">Conversions</p>
          <KPIComparisonCustom
            icon={<TrendingUp size={12} color="#00995a" />}
            primaryText="+5.8%"
            primaryTextColor="#00995a"
            secondaryText="increase"
          />
        </div>
        
        <div>
          <p className="text-sm text-[#575385] mb-1">Churn Rate</p>
          <KPIComparisonCustom
            icon={<TrendingDown size={12} color="#d4002c" />}
            primaryText="-2.1%"
            primaryTextColor="#d4002c"
            secondaryText="improved"
          />
        </div>
        
        <div>
          <p className="text-sm text-[#575385] mb-1">Satisfaction</p>
          <KPIComparisonCustom
            icon={<Star size={12} color="#ffa500" />}
            primaryText="4.9/5"
            primaryTextColor="#ffa500"
            secondaryText="rating"
          />
        </div>
      </div>
    </div>
  ),
};

