# Versiones Custom de KPI Cards

## 📦 Nuevas Variantes Personalizables

Se han creado **3 componentes custom** que permiten personalización completa sin limitaciones de estados predefinidos.

---

## 🎯 Componentes Custom Creados

### 1. **OrderCardCustom**

Card personalizable para cualquier tipo de información (no limitada a estados de órdenes).

#### Archivo:
- `src/components/OrderCard/OrderCardCustom.tsx`
- `src/components/OrderCard/OrderCardCustom.stories.tsx` - 7 stories

#### Props:
```typescript
interface OrderCardCustomProps {
  title: string;                    // Título personalizado
  count: number | string;            // Cantidad (número o texto)
  countLabel?: string;               // Etiqueta (default: "orders")
  infoLine1?: string;                // Línea de info 1
  infoLine2?: string;                // Línea de info 2
  icon: React.ReactNode;             // Cualquier ícono React
  badge?: {
    label: string;
    variant?: 'default' | 'red' | 'green' | 'blue';
    onClick?: () => void;
  };
  button?: {
    label: string;
    onClick?: () => void;
  };
  className?: string;
}
```

#### Ejemplo de Uso:
```tsx
<OrderCardCustom
  title="Processing Queue"
  count={42}
  countLabel="items"
  infoLine1="Total Value: $50,000.00"
  infoLine2="Est. Time: 2 hours"
  icon={<Package size={32} color="#00995a" strokeWidth={2} />}
  badge={{ label: "Urgent", variant: "red", onClick: () => {} }}
  button={{ label: "Process", onClick: () => {} }}
/>
```

#### Casos de Uso:
- ✅ Cualquier tipo de métrica con estructura similar
- ✅ Estados personalizados (no solo received/picking/dispatched/delivered)
- ✅ Íconos y colores completamente personalizables
- ✅ Badges con 4 variantes de color
- ✅ Información flexible (no limitada a ventas)

---

### 2. **KPICardCustom**

Card personalizable con contenido React node (libertad total de layout).

#### Archivo:
- `src/components/KPICard/KPICardCustom.tsx`
- `src/components/KPICard/KPICardCustom.stories.tsx` - 7 stories

#### Props:
```typescript
interface KPICardCustomProps {
  title: string;                     // Título
  content: React.ReactNode;          // Contenido principal (cualquier React)
  description?: React.ReactNode;     // Descripción (cualquier React)
  footer?: React.ReactNode;          // Footer (cualquier React)
  tag?: {
    label: string;
    variant?: 'default' | 'red' | 'green' | 'blue' | 'yellow';
  };
  icon: React.ReactNode;             // Cualquier ícono React
  onClick?: () => void;
  className?: string;
}
```

#### Ejemplo de Uso:
```tsx
<KPICardCustom
  title="User Activity"
  icon={<Users size={32} color="#00995a" strokeWidth={2} />}
  content={
    <div className="space-y-2">
      <div className="text-3xl font-bold">2,458</div>
      <div className="flex gap-4 text-sm">
        <span>Online: 1,234</span>
        <span>Offline: 1,224</span>
      </div>
    </div>
  }
  footer={<KPIComparison percentage={12.5} trend="positive" />}
  tag={{ label: "Live", variant: "green" }}
/>
```

#### Casos de Uso:
- ✅ Layouts complejos con múltiples elementos
- ✅ Gráficos personalizados
- ✅ Listas de datos
- ✅ Botones de acción customizados
- ✅ Cualquier contenido React

---

### 3. **KPIComparisonCustom**

Comparación personalizable sin limitación de tendencias predefinidas.

#### Archivo:
- `src/components/KPIComparison/KPIComparisonCustom.tsx`
- `src/components/KPIComparison/KPIComparisonCustom.stories.tsx` - 7 stories

#### Props:
```typescript
interface KPIComparisonCustomProps {
  icon: React.ReactNode;             // Ícono izquierdo
  primaryText: string;               // Texto principal
  primaryTextColor?: string;         // Color del texto (default: "#312e4d")
  secondaryText?: string;            // Texto secundario
  secondaryTextColor?: string;       // Color secundario (default: "#575385")
  rightIcon?: React.ReactNode;       // Ícono derecho opcional
  className?: string;
}
```

#### Ejemplo de Uso:
```tsx
<KPIComparisonCustom
  icon={<Star size={12} color="#ffa500" />}
  primaryText="4.8/5"
  primaryTextColor="#ffa500"
  secondaryText="avg rating"
/>

<KPIComparisonCustom
  icon={<Heart size={12} color="#ff1493" />}
  primaryText="1.2K"
  primaryTextColor="#ff1493"
  secondaryText="likes"
  rightIcon={<Info size={16} color="#ff1493" />}
/>
```

#### Casos de Uso:
- ✅ Cualquier tipo de métrica comparativa
- ✅ Ratings (estrellas)
- ✅ Contadores (likes, views)
- ✅ Estados (Active, Critical)
- ✅ Cualquier ícono y color

---

## 🎨 Variantes de Badges y Tags

### OrderCardCustom - Badge Variants:
```typescript
'default' // Gris - #f4f4f4 / #c6c6c6 / #6e6f6e
'red'     // Rojo - #ffecf0 / #ff8ea7 / #ff305f
'green'   // Verde - #e6f7f0 / #8ed9b8 / #00995a
'blue'    // Azul - #e8f4fd / #8ec9ed / #0066cc
```

### KPICardCustom - Tag Variants:
```typescript
'default' // Gris - #f4f4f4 / #c6c6c6 / #6e6f6e
'red'     // Rojo - #ffecf0 / #ff8ea7 / #ff305f
'green'   // Verde - #e6f7f0 / #8ed9b8 / #00995a
'blue'    // Azul - #e8f4fd / #8ec9ed / #0066cc
'yellow'  // Amarillo - #fff9e6 / #ffd966 / #cc8800
```

---

## 📊 Comparación: Original vs Custom

### OrderCard vs OrderCardCustom

| Característica | OrderCard | OrderCardCustom |
|----------------|-----------|-----------------|
| Estados | 4 predefinidos (received, picking, dispatched, delivered) | Cualquier título |
| Íconos | 4 predefinidos | Cualquier React node |
| Información | Gross Sales, Net Sales | 2 líneas personalizables |
| Formato | Moneda automática | Texto libre |
| **Uso** | Estados de órdenes específicos | Cualquier métrica similar |

**Cuándo usar cada uno:**
- **OrderCard**: Estados estándar de órdenes (received, picking, dispatched, delivered)
- **OrderCardCustom**: Estados personalizados, métricas diferentes, cualquier título

---

### KPICard vs KPICardCustom

| Característica | KPICard | KPICardCustom |
|----------------|---------|---------------|
| Valor | Número con unidad | Cualquier React node |
| Estructura | Predefinida (valor, descripción, comparación) | Completamente libre |
| Comparación | Integrada con KPIComparison | Cualquier contenido en footer |
| Layout | Fijo | Flexible |
| **Uso** | KPIs numéricos estándar | Layouts complejos, gráficos, listas |

**Cuándo usar cada uno:**
- **KPICard**: Métricas numéricas simples con formato estándar
- **KPICardCustom**: Layouts complejos, gráficos, contenido personalizado

---

### KPIComparison vs KPIComparisonCustom

| Característica | KPIComparison | KPIComparisonCustom |
|----------------|---------------|---------------------|
| Tendencia | positive/negative predefinidas | Cualquier ícono |
| Porcentaje | Formato automático | Texto libre |
| Colores | Verde/Rojo predefinidos | Cualquier color |
| **Uso** | Comparaciones de porcentajes | Cualquier métrica comparativa |

**Cuándo usar cada uno:**
- **KPIComparison**: Comparaciones de porcentajes con tendencias
- **KPIComparisonCustom**: Ratings, contadores, estados personalizados

---

## 📚 Stories de Storybook

### Total: **21 nuevas stories**

#### OrderCardCustom: 7 stories
- Basic
- WithUrgentBadge
- WithSuccessBadge
- WithInfoBadge
- SimpleLayout
- AllVariants
- FullyCustomized

#### KPICardCustom: 7 stories
- Basic
- ComplexContent
- WithChart
- WithList
- WithActions
- AllVariants
- FullyCustom

#### KPIComparisonCustom: 7 stories
- PositiveTrend
- NegativeTrend
- WithAlert
- CustomValues
- WithCounter
- MinimalLayout
- AllVariants
- InCardContext
- MultipleMetrics

---

## 🚀 Casos de Uso Prácticos

### 1. Sistema de Monitoreo
```tsx
<OrderCardCustom
  title="CPU Usage"
  count="23%"
  countLabel="current"
  infoLine1="Average: 45%"
  infoLine2="Peak: 78%"
  icon={<Activity size={32} color="#00995a" />}
  badge={{ label: "Normal", variant: "green" }}
/>
```

### 2. Dashboard de Ventas con Gráfico
```tsx
<KPICardCustom
  title="Revenue Trend"
  icon={<DollarSign size={32} color="#00995a" />}
  content={
    <div className="space-y-2">
      <div className="text-3xl font-bold">$125K</div>
      <div className="h-12 flex items-end gap-1">
        {data.map((h, i) => (
          <div key={i} className="flex-1 bg-green-500 rounded-t" 
               style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  }
  tag={{ label: "Growing", variant: "green" }}
/>
```

### 3. Rating System
```tsx
<KPIComparisonCustom
  icon={<Star size={12} color="#ffa500" />}
  primaryText="4.8/5"
  primaryTextColor="#ffa500"
  secondaryText="based on 1,234 reviews"
/>
```

### 4. Social Media Metrics
```tsx
<KPIComparisonCustom
  icon={<Heart size={12} color="#ff1493" />}
  primaryText="1.2K"
  primaryTextColor="#ff1493"
  secondaryText="likes today"
  rightIcon={<TrendingUp size={12} color="#00995a" />}
/>
```

---

## 📦 Exportación

Todos los componentes custom están exportados:

```typescript
// Importar componentes custom
import { 
  OrderCardCustom, 
  KPICardCustom, 
  KPIComparisonCustom 
} from 'chiper-components-library';

// O importar tipos
import type { 
  OrderCardCustomProps,
  KPICardCustomProps,
  KPIComparisonCustomProps
} from 'chiper-components-library';
```

---

## ✅ Build y Tests

```
✅ Build exitoso
✅ 117/117 tests pasando (componentes originales)
✅ Bundle: 131.41 kB (gzip: 28.47 kB)
✅ 21 nuevas stories de Storybook
✅ Sin errores de TypeScript
```

---

## 🎯 Ventajas de las Versiones Custom

1. **Flexibilidad Total**: No limitado a estructuras predefinidas
2. **Reutilización**: Misma apariencia, diferente contenido
3. **Consistencia**: Mantiene el diseño del Portal Design System
4. **Extensibilidad**: Fácil agregar nuevas variantes de badges/tags
5. **Type Safety**: TypeScript completo con autocompletado
6. **Documentación**: Stories detalladas con ejemplos

---

## 🔄 Diferencias Clave

### Componentes Originales (Con Estados)
- ✅ Perfectos para casos de uso estándar
- ✅ Menos props, más fácil de usar
- ✅ Comportamiento predecible
- ✅ Formatos automáticos

### Componentes Custom (Personalizables)
- ✅ Máxima flexibilidad
- ✅ Cualquier contenido React
- ✅ Layouts complejos posibles
- ✅ Control total de estilos

---

## 💡 Recomendaciones de Uso

### Usa los componentes **originales** cuando:
- Necesites estados estándar de órdenes
- Quieras métricas KPI simples con porcentajes
- Busques comparaciones de tendencias rápidas
- Prefieras formatos automáticos

### Usa los componentes **custom** cuando:
- Necesites estados o títulos personalizados
- Quieras layouts complejos con gráficos
- Necesites métricas que no sean porcentajes
- Requieras control total del contenido

---

**Fecha de creación**: 1 de Diciembre, 2025  
**Versión de la librería**: 0.0.1  
**Estado**: ✅ Completado y documentado

¡Ahora tienes 6 componentes de KPI Cards (3 originales + 3 custom) para cubrir cualquier necesidad! 🎉

