import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './index';
import { ChevronRight, Download, Plus, Settings } from 'lucide-react';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'alert', 'ghost', 'plain'],
      description: 'El estilo visual del botón',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: 'El tamaño del botón',
    },
    iconOnly: {
      control: 'boolean',
      description: 'Si el botón solo contiene un icono',
    },
    disabled: {
      control: 'boolean',
      description: 'Deshabilitar el botón',
    },
    asChild: {
      control: 'boolean',
      description: 'Usar como componente hijo (Radix Slot)',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary variants
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const PrimaryWithLeftIcon: Story = {
  args: {
    variant: 'primary',
    leftIcon: <Plus size={16} />,
    children: 'Create',
  },
};

export const PrimaryWithRightIcon: Story = {
  args: {
    variant: 'primary',
    rightIcon: <ChevronRight size={16} />,
    children: 'Next',
  },
};

export const PrimaryIconOnly: Story = {
  args: {
    variant: 'primary',
    iconOnly: true,
    leftIcon: <Plus size={20} />,
  },
};

// Secondary variants
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Button',
  },
};

export const SecondaryWithLeftIcon: Story = {
  args: {
    variant: 'secondary',
    leftIcon: <Download size={16} />,
    children: 'Download',
  },
};

export const SecondaryIconOnly: Story = {
  args: {
    variant: 'secondary',
    iconOnly: true,
    leftIcon: <Settings size={20} />,
  },
};

// Alert variants
export const Alert: Story = {
  args: {
    variant: 'alert',
    children: 'Delete',
  },
};

export const AlertWithIcon: Story = {
  args: {
    variant: 'alert',
    leftIcon: <Plus size={16} />,
    children: 'Remove',
  },
};

// Ghost variants
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Button',
  },
};

export const GhostWithIcon: Story = {
  args: {
    variant: 'ghost',
    leftIcon: <Settings size={16} />,
    children: 'Settings',
  },
};

// Plain variants
export const Plain: Story = {
  args: {
    variant: 'plain',
    children: 'Button',
  },
};

// Size variants
export const SmallSize: Story = {
  args: {
    variant: 'primary',
    size: 'small',
    children: 'Small Button',
  },
};

export const MediumSize: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Medium Button',
  },
};

export const LargeSize: Story = {
  args: {
    variant: 'primary',
    size: 'large',
    children: 'Large Button',
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    variant: 'primary',
    disabled: true,
    children: 'Disabled Button',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Primary</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Default</Button>
          <Button variant="primary" className="hover:bg-[#00995a]">
            Hover
          </Button>
          <Button variant="primary" className="active:bg-[#007a48]">
            Pressed
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Secondary</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="secondary">Default</Button>
          <Button variant="secondary" className="hover:bg-[#e6f8ef]">
            Hover
          </Button>
          <Button variant="secondary" className="active:bg-[#00b56b]/10">
            Pressed
          </Button>
          <Button variant="secondary" disabled>
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Alert</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="alert">Default</Button>
          <Button variant="alert" className="hover:bg-[#d4002c]">
            Hover
          </Button>
          <Button variant="alert" className="active:bg-[#a80023]">
            Pressed
          </Button>
          <Button variant="alert" disabled>
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Ghost</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="ghost">Default</Button>
          <Button variant="ghost" className="hover:bg-[#e6f8ef]">
            Hover
          </Button>
          <Button variant="ghost" className="active:bg-[#00b56b]/10">
            Pressed
          </Button>
          <Button variant="ghost" disabled>
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Plain</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="plain">Default</Button>
          <Button variant="plain" className="hover:underline">
            Hover
          </Button>
          <Button variant="plain" className="active:text-[#007a48]">
            Pressed
          </Button>
          <Button variant="plain" disabled>
            Disabled
          </Button>
        </div>
      </div>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Icon + Text Buttons</h3>
        <div className="flex gap-4 items-end flex-wrap">
          <Button variant="primary" size="small" leftIcon={<Plus size={14} />}>
            Small
          </Button>
          <Button variant="primary" size="medium" leftIcon={<Plus size={16} />}>
            Medium
          </Button>
          <Button variant="primary" size="large" leftIcon={<Plus size={18} />}>
            Large
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Icon Only Buttons</h3>
        <div className="flex gap-4 items-end flex-wrap">
          <Button variant="primary" size="small" iconOnly leftIcon={<Plus size={14} />} />
          <Button variant="primary" size="medium" iconOnly leftIcon={<Plus size={16} />} />
          <Button variant="primary" size="large" iconOnly leftIcon={<Plus size={20} />} />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Secondary Sizes</h3>
        <div className="flex gap-4 items-end flex-wrap">
          <Button variant="secondary" size="small" leftIcon={<Settings size={14} />}>
            Small
          </Button>
          <Button variant="secondary" size="medium" leftIcon={<Settings size={16} />}>
            Medium
          </Button>
          <Button variant="secondary" size="large" leftIcon={<Settings size={18} />}>
            Large
          </Button>
        </div>
      </div>
    </div>
  ),
};

// CTA Group example (similar to Figma design)
export const CTAGroup: Story = {
  render: () => (
    <div className="flex gap-3 flex-wrap">
      <Button variant="secondary" size="medium">
        Previous step
      </Button>
      <Button variant="primary" size="medium">
        Create user & send invite
      </Button>
    </div>
  ),
};

