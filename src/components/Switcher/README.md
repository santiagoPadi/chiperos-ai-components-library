# Switcher

Componente Switch Toggle basado en Radix UI que sigue el diseño del Portal Design System.

## Características

- 🎨 Diseño fiel al Portal Design System
- ♿ Totalmente accesible (con Radix UI)
- ⌨️ Navegación por teclado (Space, Enter)
- 🎯 Estados: On/Off, Disabled
- 🔄 Callback personalizable con el nuevo estado
- 🎭 Animaciones suaves y transiciones
- 📱 Responsive y touch-friendly
- 🧪 Completamente testeado (44 tests)

## Instalación

```bash
npm install @radix-ui/react-switch
```

## Uso Básico

```tsx
import { Switcher } from 'chiper-components-library';
import { useState } from 'react';

function App() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <Switcher 
        status={enabled} 
        onChange={setEnabled}
      />
      <label>Activar notificaciones</label>
    </div>
  );
}
```

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `status` | `boolean` | `false` | Estado del switch (on/off) |
| `disabled` | `boolean` | `false` | Si el switch está deshabilitado |
| `onChange` | `(status: boolean) => void` | - | Callback que recibe el nuevo estado cuando cambia |
| `className` | `string` | - | Clases CSS adicionales |

Además, acepta todas las props estándar de `@radix-ui/react-switch` excepto `checked` y `onCheckedChange`.

## Ejemplos

### Estados

```tsx
// Switch off
<Switcher status={false} onChange={(s) => console.log(s)} />

// Switch on
<Switcher status={true} onChange={(s) => console.log(s)} />

// Switch disabled off
<Switcher status={false} disabled={true} />

// Switch disabled on
<Switcher status={true} disabled={true} />
```

### En Formulario de Configuración

```tsx
function SettingsForm() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailAlerts: false,
    darkMode: false,
  });

  const updateSetting = (key: keyof typeof settings) => (value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <label className="font-medium">Notificaciones push</label>
          <p className="text-sm text-gray-600">
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
          <label className="font-medium">Alertas por email</label>
          <p className="text-sm text-gray-600">
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
          <label className="font-medium">Modo oscuro</label>
          <p className="text-sm text-gray-600">
            Activa el tema oscuro
          </p>
        </div>
        <Switcher
          status={settings.darkMode}
          onChange={updateSetting('darkMode')}
        />
      </div>
    </div>
  );
}
```

### Con Callback Detallado

```tsx
function CallbackExample() {
  const [checked, setChecked] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  const handleChange = (newStatus: boolean) => {
    setChecked(newStatus);
    const message = `Estado cambiado: ${newStatus ? 'ON' : 'OFF'} (${new Date().toLocaleTimeString()})`;
    setLog([message, ...log].slice(0, 5));
  };

  return (
    <div>
      <Switcher status={checked} onChange={handleChange} />
      
      <div className="mt-4">
        <h4>Log de cambios:</h4>
        <ul>
          {log.map((entry, i) => (
            <li key={i}>{entry}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### En Tabla de Permisos

```tsx
function PermissionsTable() {
  const [permissions, setPermissions] = useState({
    user1: { read: true, write: false, delete: false },
    user2: { read: true, write: true, delete: false },
  });

  const updatePermission = (user: string, permission: string) => 
    (value: boolean) => {
      setPermissions({
        ...permissions,
        [user]: {
          ...permissions[user as keyof typeof permissions],
          [permission]: value,
        },
      });
    };

  return (
    <table>
      <thead>
        <tr>
          <th>Usuario</th>
          <th>Leer</th>
          <th>Escribir</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Usuario 1</td>
          <td>
            <Switcher
              status={permissions.user1.read}
              onChange={updatePermission('user1', 'read')}
            />
          </td>
          <td>
            <Switcher
              status={permissions.user1.write}
              onChange={updatePermission('user1', 'write')}
            />
          </td>
          <td>
            <Switcher
              status={permissions.user1.delete}
              onChange={updatePermission('user1', 'delete')}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}
```

### Toggle Programático

```tsx
function ControlledSwitch() {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Switcher status={checked} onChange={setChecked} />
      
      <button onClick={() => setChecked(!checked)}>
        Toggle Programáticamente
      </button>
      
      <p>Estado: {checked ? 'On' : 'Off'}</p>
    </div>
  );
}
```

## Diseño

### Colores (Portal Design System)

- **Off**: `#e0e0e0` (gris)
- **On**: `#00995a` (verde)
- **Handle**: Blanco con sombra

### Dimensiones

- **Tamaño del switch**: 40px × 20px
- **Handle**: 16px × 16px
- **Padding**: 2px
- **Border radius**: 100px (completamente redondeado)

### Estados

1. **Off (Default)**
   - Fondo gris claro (#e0e0e0)
   - Handle en la posición izquierda
   - Cursor pointer

2. **On**
   - Fondo verde (#00995a)
   - Handle en la posición derecha
   - Cursor pointer

3. **Disabled**
   - Opacidad reducida (50%)
   - Cursor not-allowed
   - No interactivo

4. **Focus**
   - Ring de 2px en color verde (#00995a)
   - Ring offset de 2px
   - Solo visible con navegación por teclado

### Animaciones

- Transición de color de fondo: 200ms ease-in-out
- Transición de posición del handle: 200ms ease-in-out

## Accesibilidad

El componente incluye características de accesibilidad:

- **Role**: `switch` (ARIA)
- **aria-checked**: `true` o `false`
- **data-state**: `checked` o `unchecked`
- **Teclado**: Space y Enter para toggle
- **Focus visible**: Ring visual para navegación por teclado
- **Disabled**: No interactivo cuando está deshabilitado

## Navegación por Teclado

| Tecla | Acción |
|-------|--------|
| `Space` | Toggle on/off |
| `Enter` | Toggle on/off |
| `Tab` | Focus/Unfocus |

## Personalización

Puedes personalizar el componente usando la prop `className`:

```tsx
<Switcher 
  className="custom-switcher" 
  status={enabled}
  onChange={setEnabled}
/>
```

## Testing

El componente incluye 44 tests que cubren:

- ✅ Renderizado básico
- ✅ Estados on/off
- ✅ Estado disabled
- ✅ Callback onChange
- ✅ Estilos y clases CSS
- ✅ Posición del handle
- ✅ Atributos HTML
- ✅ Interacción por teclado
- ✅ Accesibilidad
- ✅ Colores
- ✅ Valores por defecto

## Storybook

Consulta las historias de Storybook para ver ejemplos interactivos:

- Estados básicos (Off, On, Disabled)
- Switch controlado
- Con etiquetas
- En formulario de configuración
- En tabla de permisos
- Con callback detallado
- Múltiples switches
- En card de configuración

## Notas Técnicas

- Basado en `@radix-ui/react-switch`
- Compatible con React 18+
- Requiere Tailwind CSS para estilos
- TypeScript types incluidos
- Ref forwarding soportado
- SSR compatible

## Licencia

MIT

