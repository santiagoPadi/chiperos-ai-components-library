# Análisis de Cards - Propuesta de Componentes

## 📊 Resumen del Diseño

El diseño de Figma muestra **3 tipos de Cards diferentes**, cada una con propósitos y estructuras distintas:

1. **OptionCard** - Card seleccionable con radio button
2. **ActionCard** - Card con ícono, descripción y CTA
3. **FeatureCard** - Card centrada para destacar características

---

## 🎯 Componente 1: OptionCard (Cards/Options)

### Descripción
Card seleccionable con radio button para elegir entre múltiples opciones (similar a un radio group).

### Visual
```
┌─────────────────────────────────────────┐
│ ○ Admin                                 │
│   Full access to all features and...   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│ ● Admin                          [✓]    │
│   Full access to all features and...   │
└─────────────────────────────────────────┘
```

### Estados Visuales
- **Default (Unfocused)**: 
  - Border gris `#ecebf0`
  - Radio button sin seleccionar (borde gris `#a29fba`)
  
- **Selected (Focused)**:
  - Border verde `#00b56b`
  - Radio button seleccionado (verde `#00995a` con punto central)

### Props Propuestos

```typescript
interface OptionCardProps {
  /**
   * Título/Nombre de la opción
   */
  title: string;
  
  /**
   * Descripción de la opción
   */
  description: string;
  
  /**
   * Si está seleccionada
   * @default false
   */
  selected?: boolean;
  
  /**
   * Si está deshabilitada
   * @default false
   */
  disabled?: boolean;
  
  /**
   * Callback cuando se selecciona
   */
  onSelect?: () => void;
  
  /**
   * Valor asociado (útil para radio groups)
   */
  value?: string;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}
```

### Ejemplo de Uso

```tsx
// Uso individual
<OptionCard
  title="Admin"
  description="Full access to all features and administrative settings"
  selected={true}
  onSelect={() => console.log('Admin selected')}
/>

// En un grupo de opciones
const [selectedRole, setSelectedRole] = useState('admin');

<div className="space-y-3">
  <OptionCard
    title="Admin"
    description="Full access to all features and administrative settings"
    value="admin"
    selected={selectedRole === 'admin'}
    onSelect={() => setSelectedRole('admin')}
  />
  
  <OptionCard
    title="Editor"
    description="Can edit content but cannot access settings"
    value="editor"
    selected={selectedRole === 'editor'}
    onSelect={() => setSelectedRole('editor')}
  />
  
  <OptionCard
    title="Viewer"
    description="Read-only access to content"
    value="viewer"
    selected={selectedRole === 'viewer'}
    onSelect={() => setSelectedRole('viewer')}
  />
</div>
```

### Características del Diseño
- **Padding**: 16px
- **Gap**: 4px entre título y descripción
- **Border radius**: 12px
- **Radio button**: 24px
- **Border width**: 1px
- **Transition**: Suave al cambiar entre estados

### Casos de Uso
- ✅ Selección de roles/permisos
- ✅ Planes de suscripción
- ✅ Configuración de opciones
- ✅ Formularios con múltiples opciones
- ✅ Wizards/onboarding

---

## 🎯 Componente 2: ActionCard (Cards/Quick Actions)

### Descripción
Card con ícono, título, descripción y call-to-action opcional para acciones rápidas.

### Visual
```
┌─────────────────────────────────────┐
│ [📦] Identify Low Inventory Items   │
│      Find SKUs with less than 5...  │
│      [Show low inventory]           │
└─────────────────────────────────────┘
```

### Props Propuestos

```typescript
interface ActionCardProps {
  /**
   * Título de la acción
   */
  title: string;
  
  /**
   * Descripción de la acción
   */
  description: string;
  
  /**
   * Ícono de la acción
   */
  icon: React.ReactNode;
  
  /**
   * Color del ícono
   * @default "#d48620" (warning)
   */
  iconColor?: string;
  
  /**
   * Botón de acción (CTA)
   */
  action?: {
    label: string;
    onClick: () => void;
  };
  
  /**
   * Callback al hacer clic en toda la card
   */
  onClick?: () => void;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}
```

### Ejemplo de Uso

```tsx
<ActionCard
  icon={<Package size={32} color="#d48620" strokeWidth={2} />}
  title="Identify Low Inventory Items"
  description="Find SKUs with less than 5 days of inventory remaining to prevent stockouts."
  action={{
    label: "Show low inventory",
    onClick: () => navigate('/inventory/low')
  }}
/>

<ActionCard
  icon={<TrendingUp size={32} color="#00995a" strokeWidth={2} />}
  title="Review Top Performers"
  description="Check your best-selling products this month."
  action={{
    label: "View report",
    onClick: () => navigate('/reports/top-performers')
  }}
/>

// Sin botón (solo informativa)
<ActionCard
  icon={<Info size={32} color="#0066cc" strokeWidth={2} />}
  title="System Update"
  description="A new version is available with improved performance."
/>
```

### Características del Diseño
- **Width**: 350px (fijo)
- **Padding**: 20px
- **Gap**: 8px entre elementos
- **Border radius**: 12px
- **Ícono**: 32px
- **Título**: 16px semibold
- **Descripción**: 14px regular
- **CTA**: Opcional, link style

### Casos de Uso
- ✅ Dashboard de acciones rápidas
- ✅ Sugerencias/recomendaciones
- ✅ Notificaciones importantes
- ✅ Shortcuts a funcionalidades
- ✅ Onboarding steps

---

## 🎯 Componente 3: FeatureCard (Cards/Welcome Page)

### Descripción
Card centrada para destacar características o features, típicamente usada en páginas de bienvenida o landing.

### Visual
```
┌──────────────────────────────┐
│                              │
│          [🔒]                │
│                              │
│    Built for Security        │
│                              │
│   Your data is protected     │
│   by enterprise-grade...     │
│                              │
└──────────────────────────────┘
```

### Props Propuestos

```typescript
interface FeatureCardProps {
  /**
   * Título de la característica
   */
  title: string;
  
  /**
   * Descripción de la característica
   */
  description: string;
  
  /**
   * Ícono de la característica
   */
  icon: React.ReactNode;
  
  /**
   * Background del ícono
   * @default "#e6f8ef" (verde claro)
   */
  iconBackground?: string;
  
  /**
   * Color del ícono
   * @default "#00995a" (verde)
   */
  iconColor?: string;
  
  /**
   * Callback al hacer clic
   */
  onClick?: () => void;
  
  /**
   * Clases CSS adicionales
   */
  className?: string;
}
```

### Ejemplo de Uso

```tsx
<FeatureCard
  icon={<Lock size={32} color="#00995a" strokeWidth={2} />}
  title="Built for Security"
  description="Your data is protected by enterprise-grade, zero-trust architecture."
/>

<FeatureCard
  icon={<Zap size={32} color="#ffa500" strokeWidth={2} />}
  title="Lightning Fast"
  description="Optimized performance ensures your team stays productive."
  iconBackground="#fff9e6"
  iconColor="#ffa500"
/>

<FeatureCard
  icon={<Users size={32} color="#0066cc" strokeWidth={2} />}
  title="Team Collaboration"
  description="Work together seamlessly with real-time updates and shared workspaces."
  iconBackground="#e8f4fd"
  iconColor="#0066cc"
/>
```

### Características del Diseño
- **Width**: 384px (fijo)
- **Padding**: 32px
- **Gap**: 32px entre ícono y texto
- **Border radius**: 8px
- **Ícono contenedor**: 56px × 56px con background verde claro
- **Ícono**: 32px
- **Título**: 24px medium
- **Descripción**: 16px regular
- **Text align**: center
- **Content width**: 300px (texto centrado)

### Casos de Uso
- ✅ Páginas de bienvenida
- ✅ Landing pages
- ✅ Feature showcases
- ✅ Marketing content
- ✅ Onboarding flows
- ✅ About sections

---

## 🎨 Variables de Diseño del Portal Design System

### Colores
```typescript
const colors = {
  // Borders
  borderPrimary: '#ecebf0',     // Border default
  borderBrand: '#00b56b',       // Border selected/focused
  borderDark: '#a29fba',        // Radio button default
  
  // Text
  textPrimary: '#312e4d',       // Títulos
  textSecondary: '#575385',     // Descripciones
  textBrand: '#00995a',         // Links/CTAs
  
  // Icons
  iconBrand: '#00995a',         // Verde
  iconWarning: '#d48620',       // Naranja/amarillo
  
  // Backgrounds
  backgroundPrimary: '#ffffff', // Fondo de cards
  tagsBackgroundGreen: '#e6f8ef', // Background de íconos
};
```

### Tipografía
```typescript
const typography = {
  fontFamilyTitle: 'Causten Round',
  fontFamilyBody: 'Causten Round',
  
  // Sizes
  size12: '12px',
  size14: '14px',
  size16: '16px',
  size18: '18px',
  size20: '20px',
  size24: '24px',
  size32: '32px',
  
  // Weights
  regular: 400,
  medium: 500,
  semiBold: 600,
};
```

### Espaciado
```typescript
const spacing = {
  padding16: '16px',  // OptionCard
  padding20: '20px',  // ActionCard
  padding32: '32px',  // FeatureCard
  
  gap4: '4px',        // OptionCard elementos
  gap8: '8px',        // ActionCard, FeatureCard
  gap12: '12px',      // Radio button spacing
  gap32: '32px',      // FeatureCard icon-text
  
  borderRadius8: '8px',   // FeatureCard
  borderRadius12: '12px', // OptionCard, ActionCard
};
```

---

## 📦 Resumen de Componentes Propuestos

| Componente | Complejidad | Casos de Uso Principales |
|------------|-------------|--------------------------|
| **OptionCard** | ⭐⭐ Media | Selección de opciones, radio groups, configuración |
| **ActionCard** | ⭐⭐ Media | Acciones rápidas, dashboard, notificaciones |
| **FeatureCard** | ⭐ Baja | Landing pages, feature showcase, onboarding |

---

## 🔄 Dependencias entre Componentes

Estos 3 componentes son **independientes** entre sí. No reutilizan componentes entre ellos, pero podrían:

### Posible Optimización:
- **OptionCard** podría usar el componente **Switcher** existente o un nuevo **RadioButton** reutilizable
- **ActionCard** y **FeatureCard** comparten estructura similar (podrían heredar de un `BaseCard`)

---

## 🚀 Sugerencias de Implementación

### Opción 1: Componentes Independientes (RECOMENDADO)
- 3 componentes separados: `OptionCard`, `ActionCard`, `FeatureCard`
- **Ventajas**: Específicos, fáciles de mantener, types claros
- **Desventajas**: Posible código duplicado

### Opción 2: Componente Unificado con Variants
```typescript
interface CardProps {
  variant: 'option' | 'action' | 'feature';
  // Props específicas según variant
}
```
- **Ventajas**: Un solo import
- **Desventajas**: Props complejas, types confusos

### Opción 3: Componente Base + Específicos
```typescript
<BaseCard>
  <OptionCardContent {...props} />
</BaseCard>
```
- **Ventajas**: Reutilización de estilos base
- **Desventajas**: Más complejo de implementar

---

## 💡 Recomendación Final

**Crear 3 componentes independientes:**

1. **OptionCard**
   - Props: title, description, selected, onSelect, value
   - Con radio button integrado
   - Estados: default, selected, disabled

2. **ActionCard**
   - Props: title, description, icon, action, onClick
   - CTA opcional
   - Width fijo de 350px

3. **FeatureCard**
   - Props: title, description, icon, iconBackground, onClick
   - Centrado, ideal para marketing
   - Width fijo de 384px

### Orden de Implementación Sugerido:
1. **FeatureCard** (más simple, solo display)
2. **ActionCard** (añade CTA)
3. **OptionCard** (más compleja, necesita radio button)

---

## 📊 Comparación con Componentes Existentes

| Nuevo | Similar a | Diferencia |
|-------|-----------|------------|
| **OptionCard** | - | Nuevo, seleccionable con radio |
| **ActionCard** | **OrderCard** | Similar estructura pero diferente propósito |
| **FeatureCard** | **KPICard** | Similar layout pero centrado y más grande |

---

## 🎯 Integración con Librería Existente

Estos componentes complementan perfectamente los ya existentes:

- **KPI Cards**: Para métricas y datos numéricos
- **Order Cards**: Para estados de órdenes
- **Nuevas Cards**: Para UI general, navegación y selección

---

## ✅ Checklist de Features por Componente

### OptionCard ✅
- [ ] Radio button integrado
- [ ] Estados selected/unselected
- [ ] Estado disabled
- [ ] Border change on selection
- [ ] Keyboard navigation
- [ ] Accesibilidad (role="radio")

### ActionCard ✅
- [ ] Ícono personalizable
- [ ] Título y descripción
- [ ] CTA opcional
- [ ] Width fijo 350px
- [ ] Hover states
- [ ] Click handlers

### FeatureCard ✅
- [ ] Ícono con background circular
- [ ] Contenido centrado
- [ ] Título grande (24px)
- [ ] Width fijo 384px
- [ ] Backgrounds personalizables
- [ ] Hover states

---

**¿Quieres que implemente alguno de estos componentes?**

Puedo empezar con el más simple (**FeatureCard**) o el que prefieras. 🚀

