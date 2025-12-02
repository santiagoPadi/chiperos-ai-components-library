# Resumen de Cards Components

Este documento describe los tres nuevos componentes de cards añadidos a la librería.

## 📁 Componentes Creados

### 1. FeatureCard
**Ruta**: `src/components/FeatureCard/`

Card centrada para destacar características o features, típicamente usada en páginas de bienvenida o landing pages.

#### Props
- `title: string` - Título de la característica
- `description: string` - Descripción de la característica
- `icon: React.ReactNode` - Ícono de la característica
- `iconBackground?: string` - Background del contenedor del ícono (default: "#e6f8ef")
- `onClick?: () => void` - Callback al hacer clic en la card
- `className?: string` - Clases CSS adicionales
- Soporta todas las props de `HTMLDivElement`

#### Ejemplo de uso
```tsx
<FeatureCard
  icon={<Lock size={32} color="#00995a" strokeWidth={2} />}
  title="Built for Security"
  description="Your data is protected by enterprise-grade, zero-trust architecture."
  iconBackground="#e6f8ef"
/>
```

#### Características
- Ancho fijo de 384px (w-96)
- Contenido centrado
- Border gris claro (#ecebf0)
- Padding de 32px (p-8)
- Gap de 32px entre elementos (gap-8)
- Hover shadow cuando es clickable
- Ícono en contenedor circular de 56x56px
- Responsive y accesible

#### Tests
28 tests cubriendo:
- Rendering básico
- Icon background personalizable
- onClick handler
- Estilos y layout
- Icon container
- Contenido de texto
- HTML attributes
- Ref forwarding
- Colores de tipografía

---

### 2. ActionCard
**Ruta**: `src/components/ActionCard/`

Card compacta con ícono, título, descripción y call-to-action opcional para acciones rápidas en dashboards.

#### Props
- `title: string` - Título de la acción
- `description: string` - Descripción de la acción
- `icon: React.ReactNode` - Ícono de la acción
- `action?: { label: string; onClick: () => void }` - Botón de acción opcional
- `onClick?: () => void` - Callback al hacer clic en toda la card
- `className?: string` - Clases CSS adicionales
- Soporta todas las props de `HTMLDivElement`

#### Ejemplo de uso
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
```

#### Características
- Ancho fijo de 350px
- Layout horizontal (ícono a la izquierda)
- Border gris claro (#ecebf0)
- Padding de 20px (p-5)
- Gap de 8px entre elementos (gap-2)
- Hover shadow cuando es clickable
- Botón CTA en color verde (#00995a) con hover:underline
- Stop propagation en botón CTA
- Responsive y accesible

#### Tests
26 tests cubriendo:
- Rendering básico
- Action button opcional
- Card onClick vs Action onClick
- Estilos y layout
- Text styling
- HTML attributes
- Ref forwarding
- Colores de tipografía
- Stop propagation

---

### 3. OptionCard
**Ruta**: `src/components/OptionCard/`

Card seleccionable con radio button para elegir entre múltiples opciones. Ideal para selección de roles, planes, configuraciones, etc.

#### Props
- `title: string` - Título/Nombre de la opción
- `description: string` - Descripción de la opción
- `selected?: boolean` - Si está seleccionada (default: false)
- `disabled?: boolean` - Si está deshabilitada (default: false)
- `onSelect?: () => void` - Callback cuando se selecciona
- `value?: string` - Valor asociado (útil para radio groups)
- `name?: string` - Name del radio group (default: "option")
- `className?: string` - Clases CSS adicionales
- Soporta todas las props de `HTMLDivElement`

#### Ejemplo de uso
```tsx
const [role, setRole] = useState('admin');

<OptionCard
  title="Admin"
  description="Full access to all features and administrative settings"
  value="admin"
  selected={role === 'admin'}
  onSelect={() => setRole('admin')}
/>
```

#### Características
- Ancho flexible (no fijo)
- Radio button personalizado
- Estados:
  - **Default**: Border gris (#ecebf0), radio sin seleccionar
  - **Selected**: Border verde 2px (#00b56b), radio con dot verde (#00995a)
  - **Disabled**: Opacidad 50%, cursor not-allowed
- Padding de 16px (p-4)
- Gap de 4px entre elementos (gap-1)
- Hover shadow cuando no está disabled
- Keyboard accessible (Enter/Space)
- Transiciones suaves
- ARIA attributes (role="radio", aria-checked, aria-disabled)

#### Tests
31 tests cubriendo:
- Rendering básico
- Selection state
- Radio button visual
- Disabled state
- onSelect handler
- Keyboard accessibility
- Estilos y layout
- ARIA attributes
- HTML attributes
- Ref forwarding
- Colores de tipografía

---

## 📊 Estadísticas

### Componentes
- **Total**: 3 componentes
- **FeatureCard**: Card centrada para features
- **ActionCard**: Card con CTA para dashboards
- **OptionCard**: Card seleccionable con radio button

### Testing
- **Total de tests**: 85
- **FeatureCard**: 28 tests ✅
- **ActionCard**: 26 tests ✅
- **OptionCard**: 31 tests ✅
- **Estado**: Todos pasando

### Archivos Creados
```
src/components/
├── FeatureCard/
│   ├── index.tsx                  (Componente)
│   ├── FeatureCard.stories.tsx    (Storybook - 11 stories)
│   └── FeatureCard.test.tsx       (Tests - 28 tests)
├── ActionCard/
│   ├── index.tsx                  (Componente)
│   ├── ActionCard.stories.tsx     (Storybook - 11 stories)
│   └── ActionCard.test.tsx        (Tests - 26 tests)
└── OptionCard/
    ├── index.tsx                  (Componente)
    ├── OptionCard.stories.tsx     (Storybook - 13 stories)
    └── OptionCard.test.tsx        (Tests - 31 tests)
```

### Exportaciones
Todos los componentes están correctamente exportados en `src/components/index.ts`:
```typescript
export * from './ActionCard';
export * from './FeatureCard';
export * from './OptionCard';
```

---

## 🎨 Diseño y Accesibilidad

### Colores Utilizados
- **Texto primario**: #312e4d
- **Texto secundario**: #575385
- **Border default**: #ecebf0
- **Border selected**: #00b56b
- **Accent/Brand**: #00995a
- **Radio unselected**: #a29fba

### Fuentes
Todos los componentes usan `Causten Round` como fuente principal con fallback a `sans-serif`.

### Accesibilidad
- ✅ Semantic HTML (h3, p, button)
- ✅ ARIA attributes (OptionCard)
- ✅ Keyboard navigation (OptionCard)
- ✅ Focus states
- ✅ Screen reader friendly
- ✅ Ref forwarding
- ✅ HTML attributes pass-through

### Responsiveness
- FeatureCard: Ancho fijo 384px (considera usar grids en contenedores)
- ActionCard: Ancho fijo 350px (perfecto para grids 2-3 columnas)
- OptionCard: Ancho flexible (se adapta al contenedor)

---

## 🚀 Casos de Uso

### FeatureCard
- Landing pages
- Páginas de "About Us"
- Secciones de beneficios
- Onboarding screens
- Feature showcases

### ActionCard
- Dashboards operativos
- Quick actions panels
- Notification centers
- Admin panels
- Task management

### OptionCard
- Role selection
- Plan selection (pricing)
- Settings/preferences
- Onboarding wizards
- Multi-step forms
- Configuration screens

---

## 📦 Build Status
✅ Build completo sin errores  
✅ TypeScript compilation exitosa  
✅ Tests pasando (85/85)  
✅ Componentes exportados correctamente

---

## 🔄 Próximos Pasos Sugeridos

1. ✅ Crear README individual para cada componente
2. ✅ Documentar en Storybook con múltiples ejemplos
3. ✅ Implementar tests comprehensivos
4. ⚪ Considerar agregar variantes de tamaño (sm, md, lg) a FeatureCard y ActionCard
5. ⚪ Agregar dark mode support
6. ⚪ Considerar hacer FeatureCard responsive con breakpoints
7. ⚪ Agregar animaciones de entrada (opcional)

---

## 📝 Notas de Implementación

### Patrones Utilizados
- **Compound components**: No aplicable para estos componentes
- **Controlled components**: OptionCard usa controlled selection
- **Uncontrolled components**: FeatureCard y ActionCard no tienen estado
- **Composition**: Todos aceptan React.ReactNode para íconos
- **Forwarding refs**: Implementado en todos
- **TypeScript**: Fully typed con interfaces exportadas

### Librerías Utilizadas
- **React**: Core library
- **lucide-react**: Para íconos en stories
- **Tailwind CSS**: Para estilos
- **clsx/cn utility**: Para class merging
- **Vitest**: Para tests
- **Storybook**: Para documentación

### Decisiones de Diseño
1. **Ancho fijo vs flexible**: FeatureCard y ActionCard tienen ancho fijo para mantener consistencia visual, OptionCard es flexible para adaptarse mejor a formularios
2. **Radio button personalizado**: En lugar de usar input[type="radio"] nativo, se implementó uno custom para mejor control visual
3. **Stop propagation**: ActionCard detiene propagación en el botón CTA para evitar conflictos con onClick de la card
4. **Keyboard support**: OptionCard soporta Enter y Space para selección, mejorando accesibilidad

---

Generado el: 1 de diciembre, 2025

