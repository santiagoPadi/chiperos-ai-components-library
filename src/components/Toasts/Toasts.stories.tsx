import type { Meta, StoryObj } from '@storybook/react';
import { Toasts } from './index';
import { AlertCircle, CheckCircle, Info, Trash2, Upload, Download } from 'lucide-react';
import { useState } from 'react';

const meta = {
  title: 'Components/Toasts',
  component: Toasts,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['light', 'dark'],
      description: 'Tipo de toast (light o dark)',
    },
    text: {
      control: 'text',
      description: 'Texto del toast',
    },
    icon: {
      control: false,
      description: 'Icono personalizado',
    },
    onClose: {
      action: 'closed',
      description: 'Callback para cerrar el toast',
    },
  },
} satisfies Meta<typeof Toasts>;

export default meta;
type Story = StoryObj<typeof meta>;

// Light variant (default)
export const Light: Story = {
  args: {
    type: 'light',
    text: 'Onboarding completed',
    onClose: () => console.log('Toast closed'),
  },
};

// Dark variant
export const Dark: Story = {
  args: {
    type: 'dark',
    text: 'Onboarding completed',
    onClose: () => console.log('Toast closed'),
  },
};

// Sin botón de cerrar
export const WithoutCloseButton: Story = {
  args: {
    type: 'light',
    text: 'Processing your request...',
    // No onClose, por lo que no se muestra el botón
  },
};

// Con icono personalizado
export const CustomIcon: Story = {
  args: {
    type: 'dark',
    text: 'File uploaded successfully',
    icon: <Upload size={16} className="text-white" />,
    onClose: () => console.log('Toast closed'),
  },
};

// Showcase de todas las variantes
export const AllVariants: Story = {
  args: {
    text: '',
    onClose: undefined,
  },
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold mb-2">Light</h3>
        <Toasts
          type="light"
          text="Onboarding completed"
          onClose={() => console.log('Closed')}
        />
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-2">Dark</h3>
        <Toasts
          type="dark"
          text="Onboarding completed"
          onClose={() => console.log('Closed')}
        />
      </div>
    </div>
  ),
};

// Diferentes tipos de notificaciones
export const NotificationTypes: Story = {
  args: {
    text: '',
    onClose: undefined,
  },
  render: () => (
    <div className="space-y-4">
      <Toasts
        type="dark"
        text="Task completed successfully"
        icon={<CheckCircle size={16} className="text-white" />}
        onClose={() => console.log('Closed')}
      />

      <Toasts
        type="light"
        text="New message received"
        icon={<Info size={16} className="text-[#312e4d]" />}
        onClose={() => console.log('Closed')}
      />

      <Toasts
        type="dark"
        text="Error occurred, please try again"
        icon={<AlertCircle size={16} className="text-white" />}
        onClose={() => console.log('Closed')}
      />

      <Toasts
        type="light"
        text="File deleted successfully"
        icon={<Trash2 size={16} className="text-[#312e4d]" />}
        onClose={() => console.log('Closed')}
      />
    </div>
  ),
};

// Diferentes longitudes de texto
export const TextLengths: Story = {
  args: {
    text: '',
    onClose: undefined,
  },
  render: () => (
    <div className="space-y-4">
      <Toasts
        type="light"
        text="Done"
        onClose={() => console.log('Closed')}
      />

      <Toasts
        type="dark"
        text="Onboarding completed"
        onClose={() => console.log('Closed')}
      />

      <Toasts
        type="light"
        text="Your profile has been updated successfully"
        onClose={() => console.log('Closed')}
      />
    </div>
  ),
};

// Toast interactivo con estado
export const Interactive: Story = {
  args: {
    text: '',
    onClose: undefined,
  },
  render: function InteractiveToast() {
    const [showToast, setShowToast] = useState(true);

    return (
      <div className="space-y-4">
        {showToast ? (
          <Toasts
            type="dark"
            text="Click the X to close me"
            onClose={() => setShowToast(false)}
          />
        ) : (
          <button
            onClick={() => setShowToast(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Show Toast Again
          </button>
        )}
      </div>
    );
  },
};

// Múltiples toasts
export const MultipleToasts: Story = {
  args: {
    text: '',
    onClose: undefined,
  },
  render: function MultipleToastsExample() {
    const [toasts, setToasts] = useState([
      { id: 1, text: 'File uploaded', icon: <Upload size={16} className="text-white" /> },
      { id: 2, text: 'Download complete', icon: <Download size={16} className="text-white" /> },
      { id: 3, text: 'Changes saved', icon: <CheckCircle size={16} className="text-white" /> },
    ]);

    const removeToast = (id: number) => {
      setToasts(toasts.filter(t => t.id !== id));
    };

    return (
      <div className="space-y-2">
        {toasts.map(toast => (
          <Toasts
            key={toast.id}
            type="dark"
            text={toast.text}
            icon={toast.icon}
            onClose={() => removeToast(toast.id)}
          />
        ))}
        {toasts.length === 0 && (
          <p className="text-gray-500">All toasts cleared</p>
        )}
      </div>
    );
  },
};

// En diferentes fondos
export const OnDifferentBackgrounds: Story = {
  args: {
    text: '',
    onClose: undefined,
  },
  render: () => (
    <div className="space-y-6">
      <div className="p-6 bg-white rounded">
        <p className="text-sm text-gray-600 mb-3">Light background</p>
        <Toasts
          type="dark"
          text="Use dark toast on light backgrounds"
          onClose={() => console.log('Closed')}
        />
      </div>

      <div className="p-6 bg-gray-900 rounded">
        <p className="text-sm text-gray-300 mb-3">Dark background</p>
        <Toasts
          type="light"
          text="Use light toast on dark backgrounds"
          onClose={() => console.log('Closed')}
        />
      </div>
    </div>
  ),
};

// Toast posicionado (ejemplo de uso típico)
export const PositionedToast: Story = {
  args: {
    text: '',
    onClose: undefined,
  },
  render: function PositionedExample() {
    const [show, setShow] = useState(false);

    return (
      <div className="relative h-64 border-2 border-dashed border-gray-300 rounded p-4">
        <button
          onClick={() => setShow(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Show Toast
        </button>

        {show && (
          <div className="absolute bottom-4 right-4">
            <Toasts
              type="dark"
              text="Action completed"
              onClose={() => setShow(false)}
            />
          </div>
        )}

        <div className="mt-4 text-sm text-gray-600">
          <p>Toasts are typically positioned:</p>
          <ul className="list-disc ml-5 mt-2">
            <li>Top-right corner</li>
            <li>Bottom-right corner</li>
            <li>Top-center</li>
          </ul>
        </div>
      </div>
    );
  },
};

// Auto-dismiss toast
export const AutoDismiss: Story = {
  args: {
    text: '',
    onClose: undefined,
  },
  render: function AutoDismissExample() {
    const [show, setShow] = useState(false);

    const showToast = () => {
      setShow(true);
      setTimeout(() => setShow(false), 3000); // Auto-dismiss después de 3 segundos
    };

    return (
      <div className="space-y-4">
        <button
          onClick={showToast}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Show Auto-Dismiss Toast (3s)
        </button>

        {show && (
          <Toasts
            type="dark"
            text="This will auto-dismiss in 3 seconds"
            onClose={() => setShow(false)}
          />
        )}
      </div>
    );
  },
};

