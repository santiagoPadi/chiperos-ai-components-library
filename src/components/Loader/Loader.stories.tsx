import type { Meta, StoryObj } from '@storybook/react';
import { Loader } from './index';
import { useState } from 'react';

const meta = {
  title: 'Components/Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['spinner', 'linear'],
      description: 'Type of loader: circular spinner or linear progress bar',
      table: {
        type: { summary: "'spinner' | 'linear'" },
        defaultValue: { summary: "'spinner'" },
      },
    },
    show: {
      control: 'boolean',
      description: 'Controls the visibility of the loader',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    variant: {
      control: 'select',
      options: ['active', 'disabled'],
      description: 'Loader variant (active = green, disabled = grey)',
      table: {
        type: { summary: "'active' | 'disabled'" },
        defaultValue: { summary: "'active'" },
      },
    },
    size: {
      control: 'number',
      description: 'Size of the spinner in pixels (only for type="spinner")',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '48' },
      },
    },
    width: {
      control: 'number',
      description: 'Width of the progress bar in pixels (only for type="linear")',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '230' },
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
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

// Spinner activo (default)
export const SpinnerActive: Story = {
  args: {
    type: 'spinner',
    show: true,
    variant: 'active',
  },
};

// Spinner deshabilitado
export const SpinnerDisabled: Story = {
  args: {
    type: 'spinner',
    show: true,
    variant: 'disabled',
  },
};

// Linear activo
export const LinearActive: Story = {
  args: {
    type: 'linear',
    show: true,
    variant: 'active',
  },
};

// Linear deshabilitado
export const LinearDisabled: Story = {
  args: {
    type: 'linear',
    show: true,
    variant: 'disabled',
  },
};

// Spinner oculto
export const SpinnerHidden: Story = {
  args: {
    type: 'spinner',
    show: false,
    variant: 'active',
  },
  render: (args) => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">El loader está oculto (show=false)</p>
      <Loader {...args} />
      <p className="text-sm text-gray-600">No se renderiza nada cuando show=false</p>
    </div>
  ),
};

// Showcase de todos los tipos
export const AllTypes: Story = {
  args: {
    show: true,
    variant: 'active',
  },
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Spinner</h3>
        <div className="flex gap-8 items-center">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Active</p>
            <Loader type="spinner" variant="active" />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Disabled</p>
            <Loader type="spinner" variant="disabled" />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Linear</h3>
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-600 mb-2">Active</p>
            <Loader type="linear" variant="active" />
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Disabled</p>
            <Loader type="linear" variant="disabled" />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Diferentes tamaños de spinner
export const SpinnerSizes: Story = {
  args: {
    show: true,
    variant: 'active',
  },
  render: () => (
    <div className="flex gap-8 items-center">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">24px</p>
        <Loader type="spinner" size={24} />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">48px (default)</p>
        <Loader type="spinner" size={48} />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">64px</p>
        <Loader type="spinner" size={64} />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">96px</p>
        <Loader type="spinner" size={96} />
      </div>
    </div>
  ),
};

// Diferentes anchos de linear
export const LinearWidths: Story = {
  args: {
    show: true,
    variant: 'active',
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-600 mb-2">150px</p>
        <Loader type="linear" width={150} />
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">230px (default)</p>
        <Loader type="linear" width={230} />
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">300px</p>
        <Loader type="linear" width={300} />
      </div>
      <div>
        <p className="text-sm text-gray-600 mb-2">Full width (400px)</p>
        <Loader type="linear" width={400} />
      </div>
    </div>
  ),
};

// Loader con toggle interactivo
export const Interactive: Story = {
  args: {
    show: true,
    variant: 'active',
  },
  render: function InteractiveLoader() {
    const [show, setShow] = useState(true);
    const [type, setType] = useState<'spinner' | 'linear'>('spinner');

    return (
      <div className="space-y-6">
        <div className="flex gap-4">
          <button
            onClick={() => setShow(!show)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {show ? 'Ocultar' : 'Mostrar'} Loader
          </button>
          
          <button
            onClick={() => setType(type === 'spinner' ? 'linear' : 'spinner')}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Cambiar a {type === 'spinner' ? 'Linear' : 'Spinner'}
          </button>
        </div>

        <div className="p-6 border rounded min-h-[100px] flex items-center justify-center">
          <Loader type={type} show={show} />
        </div>

        <p className="text-sm text-gray-600">
          Estado: {show ? 'Visible' : 'Oculto'} | Tipo: {type}
        </p>
      </div>
    );
  },
};

// En contexto de carga
export const LoadingContext: Story = {
  args: {
    show: true,
    variant: 'active',
  },
  render: function LoadingExample() {
    const [loading, setLoading] = useState(false);

    const handleLoad = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 3000);
    };

    return (
      <div className="space-y-4 max-w-md">
        <div className="bg-white border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Cargar Datos</h2>
          
          <button
            onClick={handleLoad}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Cargando...' : 'Cargar Datos'}
          </button>

          {loading && (
            <div className="mt-4 flex justify-center">
              <Loader type="spinner" show={loading} />
            </div>
          )}
        </div>
      </div>
    );
  },
};

// Overlay con spinner
export const OverlaySpinner: Story = {
  args: {
    show: true,
    variant: 'active',
  },
  render: function OverlayExample() {
    const [loading, setLoading] = useState(false);

    return (
      <div className="space-y-4">
        <button
          onClick={() => setLoading(!loading)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? 'Ocultar' : 'Mostrar'} Overlay
        </button>

        <div className="relative border rounded-lg p-8 min-h-[200px]">
          <h3 className="text-lg font-semibold mb-2">Contenido</h3>
          <p className="text-gray-600">
            Este es el contenido que se bloqueará cuando el loader esté activo.
          </p>

          {loading && (
            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-lg">
              <Loader type="spinner" show={loading} size={64} />
            </div>
          )}
        </div>
      </div>
    );
  },
};

// Progress bar en formulario
export const FormProgress: Story = {
  args: {
    show: true,
    variant: 'active',
  },
  render: function FormProgressExample() {
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setTimeout(() => setLoading(false), 3000);
    };

    return (
      <div className="max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded"
              placeholder="tu@email.com"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Procesando...' : 'Enviar'}
          </button>

          {loading && (
            <Loader type="linear" show={loading} width={400} />
          )}
        </form>
      </div>
    );
  },
};

// Múltiples loaders
export const MultipleLoaders: Story = {
  args: {
    show: true,
    variant: 'active',
  },
  render: () => (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-6">
        <div className="border p-4 rounded text-center">
          <Loader type="spinner" size={32} />
          <p className="mt-2 text-sm text-gray-600">Cargando...</p>
        </div>
        <div className="border p-4 rounded text-center">
          <Loader type="spinner" size={32} />
          <p className="mt-2 text-sm text-gray-600">Cargando...</p>
        </div>
        <div className="border p-4 rounded text-center">
          <Loader type="spinner" size={32} />
          <p className="mt-2 text-sm text-gray-600">Cargando...</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-600 mb-2">Archivo 1</p>
          <Loader type="linear" width={300} />
        </div>
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-600 mb-2">Archivo 2</p>
          <Loader type="linear" width={300} />
        </div>
        <div className="border p-4 rounded">
          <p className="text-sm text-gray-600 mb-2">Archivo 3</p>
          <Loader type="linear" width={300} />
        </div>
      </div>
    </div>
  ),
};

