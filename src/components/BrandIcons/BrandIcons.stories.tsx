import type { Meta, StoryObj } from '@storybook/react';
import { BrandIcons } from './index';

const meta = {
  title: 'Components/BrandIcons',
  component: BrandIcons,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'small'],
      description: 'Tamaño del logo',
    },
    mode: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'Modo de color del logo',
    },
    gradient: {
      control: 'boolean',
      description: 'Si el logo tiene gradiente',
    },
  },
} satisfies Meta<typeof BrandIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

// Logo grande oscuro (default)
export const LargeDark: Story = {
  args: {
    size: 'large',
    mode: 'dark',
    gradient: false,
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

// Logo grande claro
export const LargeLight: Story = {
  args: {
    size: 'large',
    mode: 'light',
    gradient: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Logo grande con gradiente
export const LargeGradient: Story = {
  args: {
    size: 'large',
    mode: 'dark',
    gradient: true,
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

// Logo pequeño oscuro
export const SmallDark: Story = {
  args: {
    size: 'small',
    mode: 'dark',
    gradient: false,
  },
  parameters: {
    backgrounds: { default: 'light' },
  },
};

// Logo pequeño claro
export const SmallLight: Story = {
  args: {
    size: 'small',
    mode: 'light',
    gradient: false,
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Showcase de todas las variantes
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-12 p-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Logos</h3>
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Dark (Default)</p>
            <BrandIcons size="large" mode="dark" />
          </div>
          
          <div className="p-6 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">Light</p>
            <BrandIcons size="large" mode="light" />
          </div>
          
          <div className="p-6 bg-white rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Dark with Gradient</p>
            <BrandIcons size="large" mode="dark" gradient />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Small Logos</h3>
        <div className="space-y-6">
          <div className="p-6 bg-white rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Dark</p>
            <BrandIcons size="small" mode="dark" />
          </div>
          
          <div className="p-6 bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-300 mb-2">Light</p>
            <BrandIcons size="small" mode="light" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Comparación de tamaños
export const SizeComparison: Story = {
  render: () => (
    <div className="space-y-8 p-8 bg-white">
      <div>
        <p className="text-sm text-gray-600 mb-4">Large (143x32px)</p>
        <BrandIcons size="large" mode="dark" />
      </div>
      
      <div>
        <p className="text-sm text-gray-600 mb-4">Small (40x32px)</p>
        <BrandIcons size="small" mode="dark" />
      </div>
    </div>
  ),
  parameters: {
    backgrounds: { default: 'light' },
  },
};

// Ejemplo en navegación
export const InNavigation: Story = {
  render: () => (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      <BrandIcons size="large" mode="dark" />
      
      <div className="flex gap-6">
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Inicio
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Productos
        </a>
        <a href="#" className="text-gray-700 hover:text-gray-900">
          Contacto
        </a>
      </div>
    </nav>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Ejemplo en footer
export const InFooter: Story = {
  render: () => (
    <footer className="bg-gray-900 text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <BrandIcons size="large" mode="light" />
          
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              Instagram
            </a>
          </div>
        </div>
        
        <p className="text-gray-500 text-sm">
          © 2024 Chiperos. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

// Logo responsive
export const ResponsiveLogo: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <p className="text-sm text-gray-600 mb-4">
        Desktop: Logo grande | Mobile: Logo pequeño
      </p>
      
      <div className="flex items-center gap-4">
        <div className="block lg:hidden">
          <BrandIcons size="small" mode="dark" />
        </div>
        <div className="hidden lg:block">
          <BrandIcons size="large" mode="dark" />
        </div>
      </div>
    </div>
  ),
};

