# Análisis de KPI Cards - Propuesta de Componentes

## 📊 Resumen del Diseño

El diseño de Figma muestra un sistema de **KPI Cards** (Key Performance Indicator Cards) con diferentes variantes. He identificado **3 componentes principales** que se pueden crear:

---

## 🎯 Componente 1: KPIComparison

### Descripción
Componente simple que muestra una comparación de KPI con tendencia (positiva o negativa) y un ícono de alerta opcional.

### Visual
```
[↗ +1.0% KPI comparison] [⚠️]
```

### Props Propuestos

```typescript
interface KPIComparisonProps {
  // Datos
  percentage: number;                    // Ej: 1.0, -2.5
  label?: string;                         // Ej: "KPI comparison" (default)
  
  // Estado
  trend: 'positive' | 'negative';         // Determina color y flecha
  showWarning?: boolean;                  // Mostrar ícono de alerta
  
  // Personalización
  className?: string;
}
```

### Ejemplo de Uso
```tsx
<KPIComparison 
  percentage={1.0}
  trend="positive"
  label="KPI comparison"
  showWarning={false}
/>

<KPIComparison 
  percentage={-10}
  trend="negative"
  label="KPI comparison"
  showWarning={true}
/>
```

### Características del Diseño
- **Colores**:
  - Positivo: Verde `#00995a` (icon/brand)
  - Negativo: Rojo `#d4002c` (icon/error)
  - Warning: Rojo `#d4002c`
- **Íconos**: 
  - TrendUp (positivo)
  - TrendDown (negativo)
  - WarningCircle (alerta)
- **Tamaño**: 12px para iconos de tendencia, 16px para warning

---

## 🎯 Componente 2: KPICard

### Descripción
Card completa de KPI con ícono, título, valor principal, descripción opcional, tag opcional, y comparación de tendencia.

### Visual
```
┌─────────────────────────────────────┐
│ [⚠] Title goes here    [Tag label]  │
│     3 %    Descriptive text...      │
│     ↗ +1.0% KPI comparison          │
└─────────────────────────────────────┘
```

### Props Propuestos

```typescript
interface KPICardProps {
  // Datos principales
  title: string;                         // Ej: "Conversion Rate"
  value: number;                         // Valor principal (ej: 3)
  unit?: string;                         // Unidad (ej: "%", default: "%")
  description?: string;                  // Texto descriptivo
  
  // Comparación (opcional)
  comparison?: {
    percentage: number;                  // Ej: 1.0
    trend: 'positive' | 'negative';
    label?: string;                      // Ej: "KPI comparison"
  };
  
  // Tag opcional
  tag?: {
    label: string;                       // Ej: "Monthly"
    variant?: 'default' | 'red';         // Estilo del tag
  };
  
  // Ícono
  icon?: React.ReactNode;                // Ícono personalizado
  iconColor?: 'primary' | 'error' | 'brand'; // Color del ícono
  
  // Callbacks opcionales
  onClick?: () => void;
  
  // Personalización
  className?: string;
}
```

### Ejemplo de Uso
```tsx
<KPICard
  title="Active Users"
  value={3}
  unit="%"
  description="Descriptive text goes here"
  icon={<WarningIcon />}
  iconColor="error"
  tag={{
    label: "Monthly",
    variant: "default"
  }}
  comparison={{
    percentage: 1.0,
    trend: "positive",
    label: "vs last month"
  }}
/>
```

### Variantes del Diseño

#### Variante 1: Type=Text (Simple)
- Ícono + Título
- Valor con fracción (3/17)
- Dos líneas de texto descriptivo
- Botón opcional

```typescript
interface KPICardTextProps {
  title: string;
  value: number;
  total?: number;                        // Para mostrar "3/17"
  bodyText1?: string;
  bodyText2?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
  icon?: React.ReactNode;
}
```

#### Variante 2: Type=KPIs (Con comparación)
- Ícono + Título + Tag
- Valor con unidad
- Descripción
- Comparación de tendencia

```typescript
// Ya cubierto por KPICardProps principal
```

---

## 🎯 Componente 3: OrderCard

### Descripción
Card específica para mostrar estados de órdenes con métricas de ventas, badges de delays, y filtros.

### Visual
```
┌─────────────────────────────────────┐
│ [📄] Received              [Delays] │
│      24 orders                      │
│      Gross Sales: $100,000.00       │
│      Net Sales: $100,000.00         │
│                            [Filter] │
└─────────────────────────────────────┘
```

### Props Propuestos

```typescript
interface OrderCardProps {
  // Estado de la orden
  state: 'received' | 'picking' | 'dispatched' | 'delivered';
  
  // Datos de órdenes
  count: number;                         // Ej: 24
  countLabel?: string;                   // "orders" o "routes" (default: "orders")
  
  // Ventas
  grossSales: number;                    // Ej: 100000.00
  netSales: number;                      // Ej: 100000.00
  
  // Delays (opcional)
  hasDelays?: boolean;                   // Mostrar badge de "Delays"
  delayCount?: number;                   // Número de delays (opcional)
  
  // Callbacks
  onDelaysClick?: () => void;            // Al hacer clic en badge de Delays
  onFilterClick?: () => void;            // Al hacer clic en botón Filter
  
  // Ícono personalizado (opcional)
  icon?: React.ReactNode;
  
  // Personalización
  className?: string;
  
  // Formato de moneda
  currency?: string;                     // Ej: "USD", "EUR" (default: "USD")
  currencySymbol?: string;               // Ej: "$", "€" (default: "$")
}
```

### Ejemplo de Uso
```tsx
<OrderCard
  state="received"
  count={24}
  countLabel="orders"
  grossSales={100000.00}
  netSales={100000.00}
  hasDelays={true}
  onDelaysClick={() => console.log('View delays')}
  onFilterClick={() => console.log('Open filter')}
/>

<OrderCard
  state="picking"
  count={18}
  countLabel="orders"
  grossSales={85000.00}
  netSales={75000.00}
  hasDelays={true}
/>

<OrderCard
  state="dispatched"
  count={32}
  countLabel="routes"
  grossSales={120000.00}
  netSales={110000.00}
  hasDelays={false}
/>

<OrderCard
  state="delivered"
  count={45}
  countLabel="orders"
  grossSales={150000.00}
  netSales={140000.00}
  hasDelays={false}
/>
```

### Estados y sus Íconos
- **Received**: ícono de recibo (Receipt) - Verde `#00995a`
- **Picking**: ícono de caja/paquete (Package) - Verde `#00995a`
- **Dispatched**: ícono de envío/truck - Verde `#00995a`
- **Delivered**: ícono de check/completado - Verde `#00995a`

---

## 🎨 Variables de Diseño del Portal Design System

### Colores
```typescript
const colors = {
  // Iconos
  iconBrand: '#00995a',      // Verde - íconos principales
  iconError: '#d4002c',      // Rojo - íconos de error/warning
  iconDark: '#312e4d',       // Oscuro - íconos neutros
  
  // Textos
  textBrand: '#00995a',      // Verde - textos de marca
  textError: '#d4002c',      // Rojo - textos de error
  textPrimary: '#312e4d',    // Oscuro - texto principal
  textSecondary: '#575385',  // Gris - texto secundario
  
  // Backgrounds
  backgroundPrimary: '#ffffff',  // Blanco - fondo de cards
  
  // Borders
  borderPrimary: '#ecebf0',  // Gris claro - bordes de cards
  
  // Tags
  tagsBackgroundRed: '#ffecf0',
  tagsTextRed: '#ff305f',
  tagsBorderRed: '#ff8ea7',
  tagsBackgroundBlack: '#f4f4f4',
  tagsTextBlack: '#6e6f6e',
  tagsBorderBlack: '#c6c6c6',
};
```

### Tipografía
```typescript
const typography = {
  fontFamilyBody: 'Causten Round',
  fontFamilyTitle: 'Causten Round',
  
  // Weights
  regular: 400,
  medium: 500,
  semiBold: 600,
  extraBold: 800,
  
  // Sizes
  size12: '12px',
  size14: '14px',
  size16: '16px',
  size18: '18px',
  size20: '20px',
};
```

### Espaciado
```typescript
const spacing = {
  padding0: '0px',
  padding4: '4px',
  padding8: '8px',
  padding12: '12px',
  padding16: '16px',
  padding20: '20px',
  
  borderRadius: '12px',      // Border radius de cards
  borderRadiusRegular: '4px',
  borderRadiusTag: '16px',
};
```

---

## 📦 Resumen de Componentes Propuestos

### 1. **KPIComparison** (Simple)
- Comparación rápida de KPI
- Tendencia positiva/negativa
- Warning opcional
- **Complejidad**: Baja ⭐

### 2. **KPICard** (Media)
- Card completa de KPI
- Dos variantes: Text y KPIs
- Ícono, título, valor, descripción
- Tag y comparación opcionales
- **Complejidad**: Media ⭐⭐

### 3. **OrderCard** (Específica)
- Card para estados de órdenes
- 4 estados: Received, Picking, Dispatched, Delivered
- Métricas de ventas
- Badge de delays y filtro
- **Complejidad**: Media-Alta ⭐⭐⭐

---

## 🚀 Sugerencias de Implementación

### Orden Recomendado
1. **Primero**: `KPIComparison` (más simple, se reutiliza en otros)
2. **Segundo**: `KPICard` (usa `KPIComparison` internamente)
3. **Tercero**: `OrderCard` (más específico, menos reutilizable)

### Dependencias entre Componentes
```
KPICard
  └─> KPIComparison (para la sección de comparación)
  
OrderCard
  └─> (independiente, no reutiliza otros)
```

### Librerías Necesarias
- **React**: Ya instalado
- **Tailwind CSS**: Ya instalado
- **Lucide React** o similar: Para íconos (TrendUp, TrendDown, Warning, Receipt, Package, Truck, Check)
- **Intl.NumberFormat**: Para formatear monedas (nativo de JavaScript)

### Alternativa: Componente Unificado

Si prefieres un solo componente flexible:

```typescript
interface UnifiedKPICardProps {
  // Tipo de card
  variant: 'comparison' | 'kpi' | 'text' | 'order';
  
  // Props comunes
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  
  // Props específicos según variant
  comparisonProps?: KPIComparisonProps;
  kpiProps?: KPICardProps;
  textProps?: KPICardTextProps;
  orderProps?: OrderCardProps;
}
```

---

## 📋 Checklist de Parámetros

### Parámetros Obligatorios por Componente

#### KPIComparison ✅
- [x] `percentage: number`
- [x] `trend: 'positive' | 'negative'`

#### KPICard ✅
- [x] `title: string`
- [x] `value: number`

#### OrderCard ✅
- [x] `state: 'received' | 'picking' | 'dispatched' | 'delivered'`
- [x] `count: number`
- [x] `grossSales: number`
- [x] `netSales: number`

### Parámetros Opcionales Comunes
- [ ] `className?: string` (todos)
- [ ] `onClick?: () => void` (todos)
- [ ] `icon?: React.ReactNode` (KPICard, OrderCard)

---

## 🎯 Recomendación Final

### Opción 1: Componentes Separados (RECOMENDADO)
**Ventajas**:
- Más específicos y fáciles de mantener
- Mejor tree-shaking (bundle más pequeño)
- TypeScript types más claros
- Documentación más simple

**Desventajas**:
- Más archivos
- Posible duplicación de código

### Opción 2: Componente Unificado
**Ventajas**:
- Un solo componente para importar
- Menos archivos

**Desventajas**:
- Props complejas
- Bundle más grande
- Más difícil de mantener

---

## 💡 Propuesta de Siguiente Paso

**Recomiendo empezar con los 3 componentes separados:**

1. **KPIComparison**: 
   - Más simple
   - Se puede reutilizar en KPICard
   - ~50 líneas de código

2. **KPICard**:
   - Componente principal
   - Versátil y reutilizable
   - ~150 líneas de código

3. **OrderCard**:
   - Caso específico de uso
   - Bien definido
   - ~200 líneas de código

**¿Quieres que empiece con alguno de estos componentes?**

