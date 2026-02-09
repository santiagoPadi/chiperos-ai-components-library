import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCard } from './index';
import { Lock, Zap, Users, Shield, Cloud, Sparkles } from 'lucide-react';

const meta = {
  title: 'Components/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the feature',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Description of the feature',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'Icon element rendered in the feature card',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    iconBackground: {
      control: 'color',
      description: 'Background color for the icon container',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: "'#e6f8ef'" },
      },
    },
    onClick: {
      action: 'clicked',
      description: 'Callback when the card is clicked',
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
} satisfies Meta<typeof FeatureCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Security Feature
export const Security: Story = {
  args: {
    icon: <Lock size={32} color="#00995a" strokeWidth={2} />,
    title: 'Built for Security',
    description: 'Your data is protected by enterprise-grade, zero-trust architecture.',
    iconBackground: '#e6f8ef',
  },
};

// Performance Feature
export const Performance: Story = {
  args: {
    icon: <Zap size={32} color="#ffa500" strokeWidth={2} />,
    title: 'Lightning Fast',
    description: 'Optimized performance ensures your team stays productive.',
    iconBackground: '#fff9e6',
  },
};

// Collaboration Feature
export const Collaboration: Story = {
  args: {
    icon: <Users size={32} color="#0066cc" strokeWidth={2} />,
    title: 'Team Collaboration',
    description: 'Work together seamlessly with real-time updates and shared workspaces.',
    iconBackground: '#e8f4fd',
  },
};

// Protection Feature
export const Protection: Story = {
  args: {
    icon: <Shield size={32} color="#00995a" strokeWidth={2} />,
    title: 'Protected & Secure',
    description: 'Advanced encryption keeps your sensitive information safe.',
    iconBackground: '#e6f8ef',
  },
};

// Cloud Feature
export const CloudBased: Story = {
  args: {
    icon: <Cloud size={32} color="#0066cc" strokeWidth={2} />,
    title: 'Cloud-Based',
    description: 'Access your data from anywhere, on any device, at any time.',
    iconBackground: '#e8f4fd',
  },
};

// AI Feature
export const AIFeature: Story = {
  args: {
    icon: <Sparkles size={32} color="#9333ea" strokeWidth={2} />,
    title: 'AI-Powered',
    description: 'Intelligent automation helps you work smarter, not harder.',
    iconBackground: '#f3e8ff',
  },
};

// Clickable Feature
export const Clickable: Story = {
  args: {
    icon: <Lock size={32} color="#00995a" strokeWidth={2} />,
    title: 'Interactive Feature',
    description: 'Click me to see the interaction!',
    iconBackground: '#e6f8ef',
    onClick: () => alert('Feature card clicked!'),
  },
};

// Grid of Features
export const FeaturesGrid: Story = {
  args: {
    icon: <Lock size={32} color="#00995a" strokeWidth={2} />,
    title: 'Feature',
    description: 'Description',
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      <FeatureCard
        icon={<Lock size={32} color="#00995a" strokeWidth={2} />}
        title="Built for Security"
        description="Enterprise-grade, zero-trust architecture."
        iconBackground="#e6f8ef"
      />
      
      <FeatureCard
        icon={<Zap size={32} color="#ffa500" strokeWidth={2} />}
        title="Lightning Fast"
        description="Optimized for peak performance."
        iconBackground="#fff9e6"
      />
      
      <FeatureCard
        icon={<Users size={32} color="#0066cc" strokeWidth={2} />}
        title="Team Collaboration"
        description="Real-time updates and sharing."
        iconBackground="#e8f4fd"
      />
      
      <FeatureCard
        icon={<Shield size={32} color="#00995a" strokeWidth={2} />}
        title="Protected"
        description="Advanced encryption technology."
        iconBackground="#e6f8ef"
      />
      
      <FeatureCard
        icon={<Cloud size={32} color="#0066cc" strokeWidth={2} />}
        title="Cloud-Based"
        description="Access from anywhere, anytime."
        iconBackground="#e8f4fd"
      />
      
      <FeatureCard
        icon={<Sparkles size={32} color="#9333ea" strokeWidth={2} />}
        title="AI-Powered"
        description="Smart automation features."
        iconBackground="#f3e8ff"
      />
    </div>
  ),
};

// Different colors
export const ColorVariants: Story = {
  args: {
    icon: <Lock size={32} color="#00995a" strokeWidth={2} />,
    title: 'Feature',
    description: 'Description',
  },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      <FeatureCard
        icon={<Lock size={32} color="#00995a" strokeWidth={2} />}
        title="Green Theme"
        description="Success and growth oriented features."
        iconBackground="#e6f8ef"
      />
      
      <FeatureCard
        icon={<Zap size={32} color="#ffa500" strokeWidth={2} />}
        title="Orange Theme"
        description="Energy and performance features."
        iconBackground="#fff9e6"
      />
      
      <FeatureCard
        icon={<Users size={32} color="#0066cc" strokeWidth={2} />}
        title="Blue Theme"
        description="Trust and reliability features."
        iconBackground="#e8f4fd"
      />
      
      <FeatureCard
        icon={<Sparkles size={32} color="#9333ea" strokeWidth={2} />}
        title="Purple Theme"
        description="Innovation and creativity features."
        iconBackground="#f3e8ff"
      />
    </div>
  ),
};

// With custom styles
export const CustomStyling: Story = {
  args: {
    icon: <Lock size={32} color="#00995a" strokeWidth={2} />,
    title: 'Custom Styled',
    description: 'This card has custom border and shadow.',
    iconBackground: '#e6f8ef',
    className: 'border-2 border-[#00995a] shadow-lg',
  },
};

// Long description
export const LongDescription: Story = {
  args: {
    icon: <Shield size={32} color="#00995a" strokeWidth={2} />,
    title: 'Advanced Security Features',
    description: 'Your data is protected by enterprise-grade, zero-trust architecture with end-to-end encryption, multi-factor authentication, and real-time threat detection.',
    iconBackground: '#e6f8ef',
  },
};

// Minimal
export const Minimal: Story = {
  args: {
    icon: <Lock size={32} color="#00995a" strokeWidth={2} />,
    title: 'Secure',
    description: 'Protected data',
    iconBackground: '#e6f8ef',
  },
};
