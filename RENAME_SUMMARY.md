# Cambio de Nombre del Proyecto

## 📋 Resumen

El proyecto ha sido renombrado de **`mi-libreria-react`** a **`chiper-components-library`**.

---

## 🔄 Cambios Realizados

### 1. **package.json**
- ✅ `name`: `"mi-libreria-react"` → `"chiper-components-library"`
- ✅ `description`: Actualizada a inglés y con el nuevo nombre
- ✅ `main`: `"./dist/mi-libreria-react.cjs"` → `"./dist/chiper-components-library.cjs"`
- ✅ `module`: `"./dist/mi-libreria-react.js"` → `"./dist/chiper-components-library.js"`
- ✅ `exports`: Actualizados los paths de import/require

### 2. **vite.config.ts**
- ✅ `lib.name`: `"MiLibreriaReact"` → `"ChiperComponentsLibrary"`
- ✅ `lib.fileName`: `"mi-libreria-react"` → `"chiper-components-library"`

### 3. **Archivos de Distribución (dist/)**
Los siguientes archivos fueron regenerados con el nuevo nombre:
- ✅ `chiper-components-library.js` (ESM)
- ✅ `chiper-components-library.cjs` (CommonJS)
- ✅ `chiper-components-library.js.map`
- ✅ `chiper-components-library.cjs.map`

### 4. **Documentación**
Todos los archivos de documentación fueron actualizados:
- ✅ `CARDS_GRID_SUMMARY.md`
- ✅ `CARDS_SUMMARY.md`
- ✅ `KPI_CUSTOM_VARIANTS_SUMMARY.md`
- ✅ `KPI_COMPONENTS_SUMMARY.md`
- ✅ `SWITCHER_SUMMARY.md`
- ✅ `LOADER_SUMMARY.md`
- ✅ `TOASTS_SUMMARY.md`
- ✅ `BANNERALERTS_SUMMARY.md`
- ✅ `BRANDICONS_SUMMARY.md`
- ✅ `BUTTONRADIX_SUMMARY.md`
- ✅ `src/components/Switcher/README.md`

---

## ✅ Verificación

### Build
```bash
npm run build
```
✅ **Exitoso** - Archivos generados con el nuevo nombre

### Tests
```bash
npm test
```
✅ **Pasando** - Todos los tests funcionan correctamente

---

## 📦 Nueva Forma de Uso

### Instalación
```bash
npm install chiper-components-library
# o
yarn add chiper-components-library
```

### Importación
```typescript
// Antes
import { Button, FeatureCard, CardsGrid } from 'mi-libreria-react';

// Ahora
import { Button, FeatureCard, CardsGrid } from 'chiper-components-library';
```

### Ejemplo Completo
```typescript
import { CardsGrid, FeatureCard, ActionCard } from 'chiper-components-library';
import { Lock, Zap, Package } from 'lucide-react';

function Dashboard() {
  return (
    <div className="p-6">
      <CardsGrid columns={3} gap={6}>
        <FeatureCard
          icon={<Lock size={32} color="#00995a" />}
          title="Secure"
          description="Enterprise-grade security"
          iconBackground="#e6f8ef"
        />
        <ActionCard
          icon={<Package size={32} color="#d48620" />}
          title="Inventory"
          description="Check your stock"
          action={{ label: 'View', onClick: () => {} }}
        />
      </CardsGrid>
    </div>
  );
}
```

---

## 📝 Notas Importantes

1. **NPM Package Name**: El nombre en npm será `chiper-components-library`
2. **Global UMD Name**: El nombre global para builds UMD es `ChiperComponentsLibrary`
3. **Repository Name**: El nombre del repositorio sigue siendo `mi-libreria-react`, solo el paquete cambió
4. **Backward Compatibility**: Este es un cambio de nombre, no afecta la funcionalidad de los componentes

---

## 🎯 Componentes Disponibles

La librería **chiper-components-library** incluye:

### Cards
- `FeatureCard` - Destacar características
- `ActionCard` - Acciones y notificaciones
- `OptionCard` - Opciones seleccionables
- `CardsGrid` - Contenedor grid para cards

### KPI Components
- `KPICard` - Tarjetas de métricas
- `KPIComparison` - Comparación de KPIs
- `OrderCard` - Tarjetas de órdenes
- `KPICardCustom`, `KPIComparisonCustom`, `OrderCardCustom` - Versiones personalizables

### UI Components
- `Button` (ButtonRadix) - Botones con Radix UI
- `BannerAlerts` - Banners de alerta
- `BrandIcons` - Iconos de marca
- `Toasts` - Notificaciones toast
- `Loader` - Indicadores de carga (spinner y linear)
- `Switcher` - Switch toggles

### Other
- `Header` - Componente de encabezado
- `LanguageSwitcher` - Selector de idioma
- `PaginationLib` - Componente de paginación

**Total**: 17+ componentes

---

## 📅 Información

**Fecha del Cambio**: Diciembre 1, 2025  
**Versión**: 0.0.1  
**Autor**: Chiper Team

---

## 🚀 Próximos Pasos

Si estás migrando de `mi-libreria-react` a `chiper-components-library`:

1. Actualiza tu `package.json`:
   ```json
   {
     "dependencies": {
       "chiper-components-library": "^0.0.1"
     }
   }
   ```

2. Reemplaza todos los imports:
   ```bash
   # Buscar y reemplazar en tu proyecto
   find . -type f -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/mi-libreria-react/chiper-components-library/g'
   ```

3. Ejecuta `npm install` o `yarn install`

4. Verifica que todo funcione correctamente:
   ```bash
   npm test
   npm run build
   ```

---

**¡El cambio de nombre se completó exitosamente!** 🎉

