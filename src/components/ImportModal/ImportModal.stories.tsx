import type { Meta, StoryObj } from '@storybook/react';
import { ImportModal } from './index';
import { Button } from '../ButtonRadix';
import React, { useState } from 'react';

const meta = {
  title: 'Components/ImportModal',
  component: ImportModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    children: React.createElement('button', null, 'Open Modal'),
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Modal title',
      table: {
        type: { summary: 'string' },
      },
    },
    description: {
      control: 'text',
      description: 'Modal description text',
      table: {
        type: { summary: 'string' },
      },
    },
    blackDescription: {
      control: 'text',
      description: 'Bold description text (rendered in semibold dark color)',
      table: {
        type: { summary: 'string' },
      },
    },
    template: {
      control: 'text',
      description: 'URL for the template file download',
      table: {
        type: { summary: 'string' },
      },
    },
    validExtensions: {
      control: 'object',
      description: 'Array of valid file extensions',
      table: {
        type: { summary: 'string[]' },
      },
    },
    handle: {
      action: 'handle',
      description:
        'Callback fired when Upload/Validate is clicked. Receives file and onlyValidate state.',
      table: {
        type: { summary: '(file: File, onlyValidate: boolean) => void' },
      },
    },
    handleCtaCopy: {
      action: 'handleCtaCopy',
      description: 'Callback fired when the CTA Copy button is clicked',
      table: {
        type: { summary: '() => void' },
      },
    },
    uploadLabel: {
      control: 'text',
      description: 'Label for the upload button when validate toggle is off',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Upload' },
      },
    },
    validateLabel: {
      control: 'text',
      description: 'Label for the validate button when validate toggle is on',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Validate' },
      },
    },
    ctaCopyLabel: {
      control: 'text',
      description: 'Label for the CTA copy button',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'CTA Copy' },
      },
    },
    children: {
      control: false,
      description: 'Trigger element that opens the modal (any button)',
      table: {
        type: { summary: 'React.ReactNode' },
      },
    },
    open: {
      control: 'boolean',
      description: 'Controlled open state',
      table: {
        type: { summary: 'boolean' },
      },
    },
    onOpenChange: {
      action: 'onOpenChange',
      description: 'Callback for controlled open state changes',
      table: {
        type: { summary: '(open: boolean) => void' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for the modal content container',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof ImportModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: Omit<React.ComponentProps<typeof ImportModal>, 'children'> = {
  title: 'Reference Updates Import',
  description:
    'Update reference information, keep in mind that the only required fields are EAN and Internal ID. The results will be sent to',
  blackDescription: '[email@emaildomain.com].',
  template: 'https://example.com/template.xlsx',
  validExtensions: ['XLSX', 'CSV'],
  handle: (file: File, onlyValidate: boolean) =>
    console.log('Handle:', file.name, 'onlyValidate:', onlyValidate),
  handleCtaCopy: () => console.log('CTA Copy clicked'),
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => (
    <ImportModal {...args}>
      <Button variant="primary" size="medium">
        Import References
      </Button>
    </ImportModal>
  ),
};

export const WithImageExtensions: Story = {
  args: {
    ...defaultArgs,
    title: 'Upload Product Images',
    description:
      'Upload product images for the catalog. Accepted formats are listed below. Results will be sent to',
    blackDescription: '[admin@company.com].',
    validExtensions: ['JPG', 'PNG'],
  },
  render: (args) => (
    <ImportModal {...args}>
      <Button variant="primary" size="medium">
        Upload Images
      </Button>
    </ImportModal>
  ),
};

export const CustomLabels: Story = {
  args: {
    ...defaultArgs,
    uploadLabel: 'Subir archivo',
    validateLabel: 'Solo validar',
    ctaCopyLabel: 'Copiar enlace',
  },
  render: (args) => (
    <ImportModal {...args}>
      <Button variant="secondary" size="medium">
        Importar con labels personalizados
      </Button>
    </ImportModal>
  ),
};

export const Controlled: Story = {
  args: {
    ...defaultArgs,
  },
  render: function ControlledExample(args) {
    const [open, setOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Button variant="primary" size="medium" onClick={() => setOpen(true)}>
            Open Controlled Modal
          </Button>
          <span className="text-sm text-gray-600">
            Modal is {open ? 'open' : 'closed'}
          </span>
        </div>
        <ImportModal
          {...args}
          open={open}
          onOpenChange={setOpen}
        >
          <Button variant="ghost" size="medium">
            Trigger (also opens)
          </Button>
        </ImportModal>
      </div>
    );
  },
};

export const WithDifferentTriggers: Story = {
  args: {
    ...defaultArgs,
  },
  render: (args) => (
    <div className="flex gap-4 flex-wrap">
      <ImportModal {...args}>
        <Button variant="primary" size="large">
          Primary Large
        </Button>
      </ImportModal>

      <ImportModal {...args}>
        <Button variant="secondary" size="medium">
          Secondary Medium
        </Button>
      </ImportModal>

      <ImportModal {...args}>
        <Button variant="ghost" size="small">
          Ghost Small
        </Button>
      </ImportModal>

      <ImportModal {...args}>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer">
          Custom HTML Button
        </button>
      </ImportModal>
    </div>
  ),
};

export const InteractivePlayground: Story = {
  args: {
    ...defaultArgs,
  },
  render: function PlaygroundExample(args) {
    const [log, setLog] = useState<string[]>([]);

    const handleUpload = (file: File, onlyValidate: boolean) => {
      const message = `[${new Date().toLocaleTimeString()}] ${onlyValidate ? 'Validated' : 'Uploaded'}: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      setLog((prev) => [message, ...prev].slice(0, 10));
    };

    const handleCta = () => {
      const message = `[${new Date().toLocaleTimeString()}] CTA Copy clicked`;
      setLog((prev) => [message, ...prev].slice(0, 10));
    };

    return (
      <div className="space-y-4">
        <ImportModal
          {...args}
          handle={handleUpload}
          handleCtaCopy={handleCta}
        >
          <Button variant="primary" size="medium">
            Open Import Modal
          </Button>
        </ImportModal>

        <div className="border rounded-lg p-4 bg-gray-50 w-[400px]">
          <h4 className="text-sm font-semibold mb-2">Event Log:</h4>
          {log.length === 0 ? (
            <p className="text-xs text-gray-500">
              No events yet. Open the modal and interact with it.
            </p>
          ) : (
            <ul className="space-y-1">
              {log.map((entry, i) => (
                <li key={i} className="text-xs text-gray-700 font-mono">
                  {entry}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  },
};
