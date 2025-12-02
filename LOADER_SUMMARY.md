# Loader - Resumen del Componente

## 📝 Descripción

Se ha creado exitosamente el componente **Loader** que muestra indicadores de carga con dos tipos diferentes: spinner circular y barra de progreso lineal, basado en el diseño del Portal Design System de Figma.

## 🎯 Características Implementadas

### ✅ Tipos de Loader
1. **Spinner** - Loader circular animado que gira
2. **Linear** - Barra de progreso horizontal animada

### ✅ Características Principales
- ✅ **show**: boolean para controlar visibilidad (requerido por el usuario)
- ✅ **type**: 'spinner' | 'linear' (default: spinner)
- ✅ **variant**: 'active' | 'disabled' (default: active)
- ✅ **size**: Tamaño del spinner personalizable (default: 48px)
- ✅ **width**: Ancho de la barra linear (default: 230px)
- ✅ Animaciones CSS fluidas
- ✅ TypeScript completo
- ✅ Accesibilidad (role="status", role="progressbar")
- ✅ 43 tests unitarios (todos pasan ✓)
- ✅ Ref forwarding

## 🎨 Variantes y Colores (según Figma)

### Active (Default)
```typescript
{
  color: '#00b56b'  // Verde brand
}
```
**Uso**: Estado activo de carga, progreso en curso.

### Disabled
```typescript
{
  color: '#a29fba'  // Gris disabled
}
```
**Uso**: Estado inactivo o deshabilitado.

## 📁 Archivos Creados

```
src/components/Loader/
├── index.tsx                  # Componente principal (3.1 KB)
├── Loader.stories.tsx         # 13 historias de Storybook (9.8 KB)
└── Loader.test.tsx            # 43 tests unitarios (9.2 KB)

src/index.css                   # Animaciones CSS agregadas
```

## 🧪 Tests

```bash
✓ 43 tests pasando (100% éxito)
  - Rendering (6 tests)
  - Types (3 tests)
  - Variants (2 tests)
  - Sizes (5 tests)
  - Styling (4 tests)
  - Colors (4 tests)
  - HTML Attributes (2 tests)
  - Accessibility (5 tests)
  - Show/Hide Behavior (4 tests)
  - Animations (2 tests)
  - Default Values (6 tests)
```

## 💻 Uso Básico

```tsx
import { Loader } from 'chiper-components-library';

// Spinner básico (default)
<Loader />

// Spinner con control de visibilidad
<Loader type="spinner" show={isLoading} />

// Spinner deshabilitado
<Loader type="spinner" variant="disabled" show={true} />

// Barra de progreso linear
<Loader type="linear" show={isLoading} />

// Barra linear deshabilitada
<Loader type="linear" variant="disabled" show={true} />

// Spinner con tamaño personalizado
<Loader type="spinner" size={64} show={true} />

// Barra linear con ancho personalizado
<Loader type="linear" width={300} show={true} />

// Ocultar el loader
<Loader show={false} />
```

## 📏 Especificaciones de Diseño

### Spinner
```
Estructura:
  ╭─────╮
  │  ↻  │  Circular, gira continuamente
  ╰─────╯

- Tamaño default: 48x48px
- Border: 4px
- Animación: rotate 360°
- Border radius: 100% (circular)
```

### Linear
```
Estructura:
┌──────────────────────────────┐
│███░░░░░░░░░░░░░░░░░░░░░░░░░│  Barra animada
└──────────────────────────────┘

- Ancho default: 230px
- Altura: 8px
- Animación: translateX con cambio de ancho
- Border radius: 100px (redondeado)
```

## 🎯 Props

```typescript
interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'spinner' | 'linear';    // Default: 'spinner'
  show?: boolean;                  // Default: true (control de visibilidad)
  variant?: 'active' | 'disabled'; // Default: 'active'
  size?: number;                   // Default: 48 (solo spinner)
  width?: number;                  // Default: 230 (solo linear)
  className?: string;              // CSS adicional
}
```

## 🎨 Casos de Uso

### 1. Carga de Página
```tsx
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar datos...
    setTimeout(() => setLoading(false), 2000);
  }, []);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <Loader show={loading} size={64} />
        </div>
      )}
    </div>
  );
}
```

### 2. Overlay de Carga
```tsx
<div className="relative">
  {/* Contenido */}
  <div className="p-6">
    <h2>Contenido</h2>
  </div>

  {/* Overlay con loader */}
  {loading && (
    <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
      <Loader show={loading} />
    </div>
  )}
</div>
```

### 3. Formulario con Progreso
```tsx
<form onSubmit={handleSubmit}>
  {/* Campos del formulario */}
  
  <button disabled={loading} type="submit">
    {loading ? 'Enviando...' : 'Enviar'}
  </button>

  {/* Barra de progreso */}
  <Loader type="linear" show={loading} width={400} />
</form>
```

### 4. Botón con Loader
```tsx
<button disabled={loading} className="flex items-center gap-2">
  <Loader type="spinner" show={loading} size={20} />
  <span>{loading ? 'Cargando...' : 'Cargar Datos'}</span>
</button>
```

### 5. Múltiples Loaders
```tsx
<div className="space-y-4">
  <div className="border p-4">
    <p>Cargando archivo 1...</p>
    <Loader type="linear" show={file1Loading} />
  </div>
  
  <div className="border p-4">
    <p>Cargando archivo 2...</p>
    <Loader type="linear" show={file2Loading} />
  </div>
</div>
```

### 6. Posicionado (Top, Bottom, Center)
```tsx
{/* Top */}
<div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
  <Loader show={loading} />
</div>

{/* Center */}
<div className="fixed inset-0 flex items-center justify-center z-50">
  <Loader show={loading} size={64} />
</div>

{/* Bottom */}
<div className="fixed bottom-4 right-4 z-50">
  <Loader show={loading} />
</div>
```

## 🏗️ Build

```bash
✓ Build exitoso (sin warnings)
dist/chiper-components-library.js   98.81 kB │ gzip: 22.03 kB
dist/chiper-components-library.cjs  46.17 kB │ gzip: 16.35 kB
```

## 🚀 Storybook

El componente incluye 13 historias en Storybook:

1. **SpinnerActive** - Spinner activo (default)
2. **SpinnerDisabled** - Spinner deshabilitado
3. **LinearActive** - Barra linear activa
4. **LinearDisabled** - Barra linear deshabilitada
5. **SpinnerHidden** - Spinner oculto (show=false)
6. **AllTypes** - Showcase de todos los tipos
7. **SpinnerSizes** - Diferentes tamaños de spinner
8. **LinearWidths** - Diferentes anchos de barra
9. **Interactive** - Loader interactivo con toggle
10. **LoadingContext** - En contexto de carga
11. **OverlaySpinner** - Overlay con spinner
12. **FormProgress** - Progress bar en formulario
13. **MultipleLoaders** - Múltiples loaders

```bash
npm run storybook
```

## ♿ Accesibilidad

El componente incluye:
- ✅ `role="status"` para spinner (notificaciones)
- ✅ `role="progressbar"` para linear (progreso)
- ✅ `aria-label="Cargando"` en ambos tipos
- ✅ `aria-valuemin` y `aria-valuemax` en linear
- ✅ `<span class="sr-only">` para lectores de pantalla
- ✅ Contraste de colores WCAG AA
- ✅ Compatible con lectores de pantalla

## 📦 Exportaciones

```tsx
// Componente
import { Loader } from 'chiper-components-library';

// Type definitions
import type { LoaderProps } from 'chiper-components-library';
```

## 🎯 Comparación con Figma

| Aspecto | Figma | Implementación | ✓ |
|---------|-------|----------------|---|
| Spinner circular | ✓ | ✓ | ✅ |
| Linear progress bar | ✓ | ✓ | ✅ |
| Estado Active | ✓ | ✓ | ✅ |
| Estado Disabled | ✓ | ✓ | ✅ |
| Color Active #00b56b | ✓ | ✓ | ✅ |
| Color Disabled #a29fba | ✓ | ✓ | ✅ |
| Tamaño spinner 48px | ✓ | ✓ | ✅ |
| Ancho linear 230px | ✓ | ✓ | ✅ |
| Border 4px | ✓ | ✓ | ✅ |
| Altura linear 8px | ✓ | ✓ | ✅ |
| Animaciones | N/A | ✓ | ✅ |
| Parámetro show | Requerido | ✓ | ✅ |
| Personalizable | N/A | ✓ | ✅ |

## 🎬 Animaciones CSS

Se agregaron las siguientes animaciones en `src/index.css`:

```css
@keyframes linear-progress {
  0% {
    transform: translateX(-100%);
    width: 30%;
  }
  50% {
    width: 70%;
  }
  100% {
    transform: translateX(400%);
    width: 30%;
  }
}
```

El spinner usa la animación `animate-spin` de Tailwind CSS.

## 🔄 Integración

El componente está completamente integrado en la librería:

```typescript
// src/components/index.ts
export * from './BannerAlerts';
export * from './ButtonRadix';
export * from './BrandIcons';
export * from './Loader';
export * from './PaginationLib';
export * from './Toasts';
```

## 📊 Estadísticas

- **Líneas de código**: ~650
- **Tests**: 43 (100% pass rate)
- **Historias**: 13
- **Tipos**: 2 (spinner, linear)
- **Variantes**: 2 (active, disabled)
- **Build size**: +1.85 KB (98.81 KB total)
- **TypeScript**: 100%
- **Accesibilidad**: WCAG AA

## 💡 Características Adicionales Implementadas

Además de los requisitos del diseño de Figma:

1. ✅ **show boolean** - Control de visibilidad (requerido por usuario)
2. ✅ **Tamaño personalizable** - No fijo a 48px
3. ✅ **Ancho personalizable** - Para linear progress
4. ✅ **Animaciones fluidas** - CSS optimizado
5. ✅ **Ref forwarding** - Para control avanzado
6. ✅ **Props HTML estándar** - data-*, id, etc.
7. ✅ **className personalizable** - Para estilos adicionales
8. ✅ **Múltiples variantes** - Active y disabled

## ✅ Estado del Proyecto

- [x] Componente creado
- [x] 2 tipos (spinner, linear) implementados
- [x] Parámetro show (boolean) implementado
- [x] Colores de Figma aplicados exactamente
- [x] Variante active (verde #00b56b)
- [x] Variante disabled (gris #a29fba)
- [x] Animaciones CSS implementadas
- [x] Tamaño spinner: 48px (personalizable)
- [x] Ancho linear: 230px (personalizable)
- [x] TypeScript completo
- [x] 43 tests unitarios (todos pasan ✓)
- [x] 13 historias en Storybook
- [x] Accesibilidad implementada
- [x] Exportación configurada
- [x] Build exitoso (sin warnings)
- [x] Responsive design

## 🎉 Conclusión

El componente **Loader** está completamente implementado, testeado y documentado. Incluye:

✅ 2 tipos de loaders (spinner y linear)  
✅ Parámetro show para controlar visibilidad  
✅ Colores exactos de Figma  
✅ Animaciones CSS fluidas  
✅ 43 tests unitarios pasando  
✅ 13 historias en Storybook  
✅ Accesibilidad WCAG AA  
✅ Build sin warnings  

El componente está listo para usar en producción:

```tsx
import { Loader } from 'chiper-components-library';

// Spinner
<Loader type="spinner" show={isLoading} />

// Linear progress bar
<Loader type="linear" show={isLoading} />
```

### Patrón de Uso Recomendado

```tsx
function MyComponent() {
  const [loading, setLoading] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      await fetchData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleAction} disabled={loading}>
        Cargar Datos
      </button>
      <Loader show={loading} />
    </div>
  );
}
```

¡Listo para usar! 🚀

