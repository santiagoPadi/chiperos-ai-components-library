import type { Meta, StoryObj } from '@storybook/react';
import { CardsGrid } from './index';
import { FeatureCard } from '../FeatureCard';
import { ActionCard } from '../ActionCard';
import { OptionCard } from '../OptionCard';
import { Lock, Zap, Users, Package, TrendingUp, AlertCircle, Clock, Bell, Shield } from 'lucide-react';
import { useState } from 'react';

const meta = {
  title: 'Components/CardsGrid',
  component: CardsGrid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CardsGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

// 3 Columnas con FeatureCards
export const ThreeColumnsFeatures: Story = {
  args: {
    columns: 3,
    gap: 6,
    children: null,
  },
  render: (args) => (
    <CardsGrid {...args}>
      <FeatureCard
        icon={<Lock size={32} color="#00995a" strokeWidth={2} />}
        title="Built for Security"
        description="Your data is protected by enterprise-grade, zero-trust architecture."
        iconBackground="#e6f8ef"
      />
      <FeatureCard
        icon={<Zap size={32} color="#ffa500" strokeWidth={2} />}
        title="Lightning Fast"
        description="Optimized performance ensures your team stays productive."
        iconBackground="#fff9e6"
      />
      <FeatureCard
        icon={<Users size={32} color="#0066cc" strokeWidth={2} />}
        title="Team Collaboration"
        description="Work together seamlessly with real-time updates."
        iconBackground="#e8f4fd"
      />
    </CardsGrid>
  ),
};

// 2 Columnas con ActionCards
export const TwoColumnsActions: Story = {
  args: {
    columns: 2,
    gap: 4,
    children: null,
  },
  render: (args) => (
    <CardsGrid {...args}>
      <ActionCard
        icon={<Package size={32} color="#d48620" strokeWidth={2} />}
        title="Low Inventory Alert"
        description="Find SKUs with less than 5 days of inventory remaining."
        action={{
          label: 'Show inventory',
          onClick: () => alert('Navigate to inventory'),
        }}
      />
      <ActionCard
        icon={<TrendingUp size={32} color="#00995a" strokeWidth={2} />}
        title="Top Performers"
        description="Check your best-selling products this month."
        action={{
          label: 'View report',
          onClick: () => alert('Open report'),
        }}
      />
      <ActionCard
        icon={<AlertCircle size={32} color="#d4002c" strokeWidth={2} />}
        title="Critical Alerts"
        description="Multiple items are below minimum stock levels."
        action={{
          label: 'View alerts',
          onClick: () => alert('View alerts'),
        }}
      />
      <ActionCard
        icon={<Clock size={32} color="#d48620" strokeWidth={2} />}
        title="Pending Approvals"
        description="You have 12 orders waiting for approval."
        action={{
          label: 'Review now',
          onClick: () => alert('Review approvals'),
        }}
      />
    </CardsGrid>
  ),
};

// 4 Columnas con FeatureCards
export const FourColumnsFeatures: Story = {
  args: {
    columns: 4,
    gap: 4,
    children: null,
  },
  render: (args) => (
    <CardsGrid {...args}>
      <FeatureCard
        icon={<Lock size={32} color="#00995a" strokeWidth={2} />}
        title="Secure"
        description="Enterprise-grade protection."
        iconBackground="#e6f8ef"
      />
      <FeatureCard
        icon={<Zap size={32} color="#ffa500" strokeWidth={2} />}
        title="Fast"
        description="Optimized performance."
        iconBackground="#fff9e6"
      />
      <FeatureCard
        icon={<Users size={32} color="#0066cc" strokeWidth={2} />}
        title="Collaborative"
        description="Real-time team updates."
        iconBackground="#e8f4fd"
      />
      <FeatureCard
        icon={<Shield size={32} color="#00995a" strokeWidth={2} />}
        title="Protected"
        description="Advanced encryption."
        iconBackground="#e6f8ef"
      />
    </CardsGrid>
  ),
};

// 1 Columna con ActionCards
export const SingleColumnActions: Story = {
  args: {
    columns: 1,
    gap: 3,
    children: null,
  },
  render: (args) => (
    <div style={{ maxWidth: '600px' }}>
      <CardsGrid {...args}>
        <ActionCard
          icon={<Package size={32} color="#d48620" strokeWidth={2} />}
          title="Low Inventory Alert"
          description="Find SKUs with less than 5 days remaining."
          action={{
            label: 'View items',
            onClick: () => console.log('View'),
          }}
        />
        <ActionCard
          icon={<Bell size={32} color="#0066cc" strokeWidth={2} />}
          title="New Messages"
          description="You have 5 unread messages from team members."
          action={{
            label: 'Read messages',
            onClick: () => console.log('Read'),
          }}
        />
      </CardsGrid>
    </div>
  ),
};

// OptionCards en Grid
export const OptionCardsInGrid: Story = {
  args: {
    columns: 3,
    gap: 4,
    children: null,
  },
  render: function OptionCardsExample(args) {
    const [selectedRole, setSelectedRole] = useState('editor');

    return (
      <CardsGrid {...args}>
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
      </CardsGrid>
    );
  },
};

// Responsive Grid
export const ResponsiveGrid: Story = {
  args: {
    columns: 3,
    tabletColumns: 2,
    mobileColumns: 1,
    gap: 6,
    children: null,
  },
  render: (args) => (
    <CardsGrid {...args}>
      <FeatureCard
        icon={<Lock size={32} color="#00995a" strokeWidth={2} />}
        title="Built for Security"
        description="Your data is protected by enterprise-grade security."
        iconBackground="#e6f8ef"
      />
      <FeatureCard
        icon={<Zap size={32} color="#ffa500" strokeWidth={2} />}
        title="Lightning Fast"
        description="Optimized performance for productivity."
        iconBackground="#fff9e6"
      />
      <FeatureCard
        icon={<Users size={32} color="#0066cc" strokeWidth={2} />}
        title="Team Collaboration"
        description="Work together with real-time updates."
        iconBackground="#e8f4fd"
      />
    </CardsGrid>
  ),
};

// Gap Variations
export const GapVariations: Story = {
  args: {
    columns: 3,
    gap: 2,
    children: null,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Gap 2</h3>
        <CardsGrid columns={3} gap={2}>
          <FeatureCard icon={<Lock size={32} color="#00995a" />} title="Feature 1" description="Description" />
          <FeatureCard icon={<Zap size={32} color="#ffa500" />} title="Feature 2" description="Description" />
          <FeatureCard icon={<Users size={32} color="#0066cc" />} title="Feature 3" description="Description" />
        </CardsGrid>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Gap 6</h3>
        <CardsGrid columns={3} gap={6}>
          <FeatureCard icon={<Lock size={32} color="#00995a" />} title="Feature 1" description="Description" />
          <FeatureCard icon={<Zap size={32} color="#ffa500" />} title="Feature 2" description="Description" />
          <FeatureCard icon={<Users size={32} color="#0066cc" />} title="Feature 3" description="Description" />
        </CardsGrid>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Gap Custom (2rem)</h3>
        <CardsGrid columns={3} gap="2rem">
          <FeatureCard icon={<Lock size={32} color="#00995a" />} title="Feature 1" description="Description" />
          <FeatureCard icon={<Zap size={32} color="#ffa500" />} title="Feature 2" description="Description" />
          <FeatureCard icon={<Users size={32} color="#0066cc" />} title="Feature 3" description="Description" />
        </CardsGrid>
      </div>
    </div>
  ),
};

// Mixed Cards
export const MixedCards: Story = {
  args: {
    columns: 2,
    gap: 6,
    children: null,
  },
  render: function MixedExample() {
    const [plan, setPlan] = useState('pro');

    return (
      <CardsGrid columns={2} gap={6}>
        <FeatureCard
          icon={<Lock size={32} color="#00995a" strokeWidth={2} />}
          title="Security First"
          description="Enterprise-grade security for your data."
          iconBackground="#e6f8ef"
        />
        
        <ActionCard
          icon={<Package size={32} color="#d48620" strokeWidth={2} />}
          title="Check Inventory"
          description="Review your stock levels and alerts."
          action={{
            label: 'View inventory',
            onClick: () => console.log('Inventory'),
          }}
        />

        <OptionCard
          title="Pro Plan"
          description="Best for professionals with unlimited features"
          value="pro"
          selected={plan === 'pro'}
          onSelect={setPlan}
        />
        
        <OptionCard
          title="Enterprise"
          description="For large organizations with custom needs"
          value="enterprise"
          selected={plan === 'enterprise'}
          onSelect={setPlan}
        />
      </CardsGrid>
    );
  },
};

// Dashboard Layout
export const DashboardLayout: Story = {
  args: {
    columns: 3,
    gap: 4,
    children: null,
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <CardsGrid columns={3} gap={4}>
          <ActionCard
            icon={<Package size={32} color="#d48620" strokeWidth={2} />}
            title="Low Inventory"
            description="5 items need restocking"
            action={{ label: 'Review', onClick: () => {} }}
          />
          <ActionCard
            icon={<TrendingUp size={32} color="#00995a" strokeWidth={2} />}
            title="Sales Report"
            description="Monthly report is ready"
            action={{ label: 'View', onClick: () => {} }}
          />
          <ActionCard
            icon={<AlertCircle size={32} color="#d4002c" strokeWidth={2} />}
            title="Critical Alerts"
            description="3 urgent items"
            action={{ label: 'Check', onClick: () => {} }}
          />
        </CardsGrid>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Platform Features</h2>
        <CardsGrid columns={4} gap={4}>
          <FeatureCard
            icon={<Lock size={32} color="#00995a" />}
            title="Secure"
            description="Protected data"
            iconBackground="#e6f8ef"
          />
          <FeatureCard
            icon={<Zap size={32} color="#ffa500" />}
            title="Fast"
            description="Optimized speed"
            iconBackground="#fff9e6"
          />
          <FeatureCard
            icon={<Users size={32} color="#0066cc" />}
            title="Collaborative"
            description="Team work"
            iconBackground="#e8f4fd"
          />
          <FeatureCard
            icon={<Shield size={32} color="#00995a" />}
            title="Protected"
            description="Advanced security"
            iconBackground="#e6f8ef"
          />
        </CardsGrid>
      </div>
    </div>
  ),
};

