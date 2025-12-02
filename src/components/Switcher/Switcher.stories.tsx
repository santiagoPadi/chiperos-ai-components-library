import type { Meta, StoryObj } from '@storybook/react';
import { Switcher } from './index';
import { useState } from 'react';

const meta = {
  title: 'Components/Switcher',
  component: Switcher,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'boolean',
      description: 'Estado del switch (on/off)',
    },
    disabled: {
      control: 'boolean',
      description: 'Si el switch está deshabilitado',
    },
    onChange: {
      action: 'changed',
      description: 'Callback que recibe el nuevo estado',
    },
  },
} satisfies Meta<typeof Switcher>;

export default meta;
type Story = StoryObj<typeof meta>;

// Switch Off (default)
export const Off: Story = {
  args: {
    status: false,
    disabled: false,
    onChange: (status) => console.log('Switch changed to:', status),
  },
};

// Switch On
export const On: Story = {
  args: {
    status: true,
    disabled: false,
    onChange: (status) => console.log('Switch changed to:', status),
  },
};

// Switch Disabled Off
export const DisabledOff: Story = {
  args: {
    status: false,
    disabled: true,
  },
};

// Switch Disabled On
export const DisabledOn: Story = {
  args: {
    status: true,
    disabled: true,
  },
};

// Showcase de todos los estados
export const AllStates: Story = {
  args: {
    status: false,
    disabled: false,
  },
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Estados Normales</h3>
        <div className="flex gap-6 items-center">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Off</p>
            <Switcher status={false} onChange={(s) => console.log(s)} />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">On</p>
            <Switcher status={true} onChange={(s) => console.log(s)} />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Estados Deshabilitados</h3>
        <div className="flex gap-6 items-center">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Off Disabled</p>
            <Switcher status={false} disabled={true} />
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">On Disabled</p>
            <Switcher status={true} disabled={true} />
          </div>
        </div>
      </div>
    </div>
  ),
};

// Switch interactivo controlado
export const Controlled: Story = {
  args: {
    status: false,
    disabled: false,
  },
  render: function ControlledSwitch() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Switcher 
            status={checked} 
            onChange={setChecked}
          />
          <span className="text-sm font-medium">
            Estado: {checked ? 'On' : 'Off'}
          </span>
        </div>

        <button
          onClick={() => setChecked(!checked)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Toggle Programáticamente
        </button>
      </div>
    );
  },
};

// Con etiquetas
export const WithLabels: Story = {
  args: {
    status: false,
    disabled: false,
  },
  render: function WithLabelsExample() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Switcher status={checked} onChange={setChecked} />
          <label className="text-sm font-medium cursor-pointer">
            Activar notificaciones
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Switcher status={!checked} onChange={(s) => setChecked(!s)} />
          <label className="text-sm font-medium cursor-pointer">
            Modo oscuro
          </label>
        </div>
      </div>
    );
  },
};

// En formulario de configuración
export const InSettingsForm: Story = {
  args: {
    status: false,
    disabled: false,
  },
  render: function SettingsForm() {
    const [settings, setSettings] = useState({
      notifications: true,
      emailAlerts: false,
      darkMode: false,
      autoSave: true,
    });

    const updateSetting = (key: keyof typeof settings) => (value: boolean) => {
      setSettings({ ...settings, [key]: value });
    };

    return (
      <div className="max-w-md space-y-6 border rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Configuración</h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium block">
                Notificaciones push
              </label>
              <p className="text-xs text-gray-600">
                Recibe notificaciones en tiempo real
              </p>
            </div>
            <Switcher
              status={settings.notifications}
              onChange={updateSetting('notifications')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium block">
                Alertas por email
              </label>
              <p className="text-xs text-gray-600">
                Recibe emails con actualizaciones
              </p>
            </div>
            <Switcher
              status={settings.emailAlerts}
              onChange={updateSetting('emailAlerts')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium block">
                Modo oscuro
              </label>
              <p className="text-xs text-gray-600">
                Activa el tema oscuro
              </p>
            </div>
            <Switcher
              status={settings.darkMode}
              onChange={updateSetting('darkMode')}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <label className="text-sm font-medium block">
                Guardado automático
              </label>
              <p className="text-xs text-gray-600">
                Guarda cambios automáticamente
              </p>
            </div>
            <Switcher
              status={settings.autoSave}
              onChange={updateSetting('autoSave')}
            />
          </div>
        </div>

        <div className="pt-4 border-t">
          <pre className="text-xs bg-gray-100 p-3 rounded">
            {JSON.stringify(settings, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

// En tabla de permisos
export const InPermissionsTable: Story = {
  args: {
    status: false,
    disabled: false,
  },
  render: function PermissionsTable() {
    const [permissions, setPermissions] = useState({
      user1: { read: true, write: false, delete: false },
      user2: { read: true, write: true, delete: false },
      user3: { read: false, write: false, delete: false },
    });

    const updatePermission = (user: string, permission: string) => (value: boolean) => {
      setPermissions({
        ...permissions,
        [user]: {
          ...permissions[user as keyof typeof permissions],
          [permission]: value,
        },
      });
    };

    return (
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Usuario
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Leer
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Escribir
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">
                Eliminar
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                Usuario 1
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Switcher
                  status={permissions.user1.read}
                  onChange={updatePermission('user1', 'read')}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Switcher
                  status={permissions.user1.write}
                  onChange={updatePermission('user1', 'write')}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Switcher
                  status={permissions.user1.delete}
                  onChange={updatePermission('user1', 'delete')}
                />
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                Usuario 2
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Switcher
                  status={permissions.user2.read}
                  onChange={updatePermission('user2', 'read')}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Switcher
                  status={permissions.user2.write}
                  onChange={updatePermission('user2', 'write')}
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Switcher
                  status={permissions.user2.delete}
                  onChange={updatePermission('user2', 'delete')}
                />
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                Usuario 3 (Admin)
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Switcher status={true} disabled={true} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Switcher status={true} disabled={true} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <Switcher status={true} disabled={true} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
};

// Con callback detallado
export const WithDetailedCallback: Story = {
  args: {
    status: false,
    disabled: false,
  },
  render: function CallbackExample() {
    const [checked, setChecked] = useState(false);
    const [log, setLog] = useState<string[]>([]);

    const handleChange = (newStatus: boolean) => {
      setChecked(newStatus);
      const message = `Estado cambiado: ${newStatus ? 'ON' : 'OFF'} (${new Date().toLocaleTimeString()})`;
      setLog([message, ...log].slice(0, 5));
    };

    return (
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Switcher status={checked} onChange={handleChange} />
          <span className="text-sm font-medium">
            Estado actual: <strong>{checked ? 'ON' : 'OFF'}</strong>
          </span>
        </div>

        <div className="border rounded p-4 bg-gray-50">
          <h4 className="text-sm font-semibold mb-2">Log de cambios:</h4>
          {log.length === 0 ? (
            <p className="text-xs text-gray-500">
              No hay cambios aún. Haz clic en el switch.
            </p>
          ) : (
            <ul className="space-y-1">
              {log.map((entry, i) => (
                <li key={i} className="text-xs text-gray-700">
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

// Múltiples switches
export const MultipleSwitches: Story = {
  args: {
    status: false,
    disabled: false,
  },
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Switcher status={false} onChange={(s) => console.log('Switch 1:', s)} />
        <span className="text-sm">Opción 1</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Switcher status={true} onChange={(s) => console.log('Switch 2:', s)} />
        <span className="text-sm">Opción 2</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Switcher status={false} disabled={true} />
        <span className="text-sm text-gray-400">Opción 3 (deshabilitada)</span>
      </div>
      
      <div className="flex items-center gap-3">
        <Switcher status={true} disabled={true} />
        <span className="text-sm text-gray-400">Opción 4 (deshabilitada)</span>
      </div>
    </div>
  ),
};

// En card de configuración
export const InConfigCard: Story = {
  args: {
    status: false,
    disabled: false,
  },
  render: function ConfigCard() {
    const [privacySettings, setPrivacySettings] = useState({
      profileVisible: true,
      showEmail: false,
      allowMessages: true,
    });

    return (
      <div className="max-w-md border rounded-lg shadow-sm">
        <div className="p-6 border-b bg-gray-50">
          <h3 className="text-lg font-bold">Configuración de Privacidad</h3>
          <p className="text-sm text-gray-600">
            Controla quién puede ver tu información
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-sm font-medium">Perfil público</label>
              <p className="text-xs text-gray-600">
                Tu perfil será visible para todos
              </p>
            </div>
            <Switcher
              status={privacySettings.profileVisible}
              onChange={(s) =>
                setPrivacySettings({ ...privacySettings, profileVisible: s })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-sm font-medium">Mostrar email</label>
              <p className="text-xs text-gray-600">
                Tu email será visible en tu perfil
              </p>
            </div>
            <Switcher
              status={privacySettings.showEmail}
              onChange={(s) =>
                setPrivacySettings({ ...privacySettings, showEmail: s })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <label className="text-sm font-medium">Permitir mensajes</label>
              <p className="text-xs text-gray-600">
                Otros usuarios pueden enviarte mensajes
              </p>
            </div>
            <Switcher
              status={privacySettings.allowMessages}
              onChange={(s) =>
                setPrivacySettings({ ...privacySettings, allowMessages: s })
              }
            />
          </div>
        </div>
      </div>
    );
  },
};

