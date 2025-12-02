# Guía para Publicar chiper-components-library en NPM

## 📋 Requisitos Previos

### 1. Crear una Cuenta en NPM
Si no tienes cuenta en npm:
1. Ve a [npmjs.com](https://www.npmjs.com/)
2. Click en "Sign Up"
3. Completa el registro
4. Verifica tu email

### 2. Instalar npm (si no lo tienes)
npm viene con Node.js. Verifica tu versión:
```bash
npm --version
node --version
```

---

## 🚀 Pasos para Publicar

### Paso 1: Login en NPM
Abre tu terminal y ejecuta:
```bash
npm login
```

Te pedirá:
- **Username**: Tu nombre de usuario de npm
- **Password**: Tu contraseña
- **Email**: Tu email (público)
- **OTP** (opcional): Si tienes autenticación de dos factores

Verifica que estás logueado:
```bash
npm whoami
```

### Paso 2: Verificar el Nombre del Paquete

Verifica que el nombre `chiper-components-library` esté disponible en npm:
```bash
npm search chiper-components-library
```

O búscalo en: https://www.npmjs.com/package/chiper-components-library

**Importante**: Si el nombre ya está tomado, tendrás que:
- Cambiar el nombre en `package.json`
- O usar un scope: `@tu-username/chiper-components-library`

### Paso 3: Preparar el package.json

Asegúrate de que tu `package.json` tenga estos campos:

```json
{
  "name": "chiper-components-library",
  "version": "0.0.1",
  "description": "Chiper Components Library - A modern React component library built with Vite, TypeScript and Tailwind CSS.",
  "main": "./dist/chiper-components-library.cjs",
  "module": "./dist/chiper-components-library.js",
  "types": "./dist/index.d.ts",
  "files": [
    "dist"
  ],
  "keywords": [
    "react",
    "typescript",
    "vite",
    "storybook",
    "tailwind",
    "component-library",
    "chiper",
    "ui-components"
  ],
  "author": "Chiper Team",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/tu-usuario/chiper-components-library.git"
  },
  "homepage": "https://github.com/tu-usuario/chiper-components-library#readme",
  "bugs": {
    "url": "https://github.com/tu-usuario/chiper-components-library/issues"
  }
}
```

### Paso 4: Crear .npmignore

Crea un archivo `.npmignore` para excluir archivos innecesarios:

```
# Source files
src/
.storybook/

# Config files
vite.config.ts
tsconfig.json
tsconfig.node.json
tailwind.config.js

# Tests
*.test.tsx
*.test.ts
*.spec.tsx
*.spec.ts
__tests__/
coverage/

# Documentation
*.md
!README.md

# Development
node_modules/
.env
.env.local

# IDE
.vscode/
.idea/
*.swp
*.swo
.DS_Store

# Git
.git/
.gitignore
.gitattributes

# CI/CD
.github/
```

**Nota**: El campo `"files": ["dist"]` en package.json ya especifica que solo se publique la carpeta `dist`, pero `.npmignore` es bueno tenerlo como backup.

### Paso 5: Crear README.md (Importante!)

Crea un archivo `README.md` atractivo en la raíz del proyecto:

```markdown
# Chiper Components Library

A modern, fully-typed React component library built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Installation

```bash
npm install chiper-components-library
# or
yarn add chiper-components-library
```

## 📦 Components

- **Cards**: FeatureCard, ActionCard, OptionCard, CardsGrid
- **KPI**: KPICard, KPIComparison, OrderCard
- **UI**: Button, Loader, Toasts, Switcher, BannerAlerts
- And more...

## 💡 Quick Start

```tsx
import { CardsGrid, FeatureCard } from 'chiper-components-library';
import { Lock } from 'lucide-react';

function App() {
  return (
    <CardsGrid columns={3} gap={6}>
      <FeatureCard
        icon={<Lock size={32} color="#00995a" />}
        title="Secure"
        description="Enterprise-grade security"
        iconBackground="#e6f8ef"
      />
    </CardsGrid>
  );
}
```

## 📖 Documentation

Visit our [Storybook](https://your-storybook-url.com) for full documentation and examples.

## 🛠️ Tech Stack

- React 18
- TypeScript
- Tailwind CSS
- Radix UI
- Vite

## 📄 License

MIT © Chiper Team
```

### Paso 6: Limpiar y Hacer Build

Antes de publicar, asegúrate de hacer un build limpio:

```bash
# Limpiar la carpeta dist
rm -rf dist

# Hacer build
npm run build

# Verificar que el build fue exitoso
ls -la dist/
```

### Paso 7: Probar Localmente (Opcional pero Recomendado)

Prueba tu librería localmente antes de publicar:

```bash
# En la carpeta de tu librería
npm pack
```

Esto crea un archivo `.tgz` que puedes instalar en otro proyecto:

```bash
# En otro proyecto de prueba
npm install /path/to/chiper-components-library-0.0.1.tgz
```

### Paso 8: Verificar el Contenido del Paquete

Antes de publicar, verifica qué archivos se incluirán:

```bash
npm pack --dry-run
```

Esto muestra los archivos que se publicarán sin crear el archivo .tgz.

### Paso 9: Publicar en NPM 🎉

Si todo está bien, publica:

```bash
npm publish
```

**Primera vez publicando un paquete?** Usa:
```bash
npm publish --access public
```

Si el nombre está scoped (ej: `@username/package`):
```bash
npm publish --access public
```

### Paso 10: Verificar la Publicación

1. Ve a: https://www.npmjs.com/package/chiper-components-library
2. Verifica que todos los archivos estén correctos
3. Prueba instalarlo en un proyecto nuevo:

```bash
npx create-react-app test-app
cd test-app
npm install chiper-components-library
```

---

## 🔄 Publicar Actualizaciones

Para publicar nuevas versiones:

### 1. Actualizar la Versión

Usa semantic versioning (semver):

```bash
# Patch (0.0.1 → 0.0.2) - Bug fixes
npm version patch

# Minor (0.0.1 → 0.1.0) - New features, backward compatible
npm version minor

# Major (0.0.1 → 1.0.0) - Breaking changes
npm version major
```

### 2. Hacer Build y Publicar

```bash
npm run build
npm publish
```

### 3. Crear Git Tag (Opcional pero Recomendado)

```bash
git push origin main
git push origin --tags
```

---

## 📝 Checklist Pre-Publicación

- [ ] ✅ Cuenta de npm creada y verificada
- [ ] ✅ `npm login` ejecutado exitosamente
- [ ] ✅ Nombre del paquete disponible en npm
- [ ] ✅ `package.json` completo con todos los campos
- [ ] ✅ `README.md` creado y atractivo
- [ ] ✅ `.npmignore` creado
- [ ] ✅ `npm run build` exitoso
- [ ] ✅ `npm pack --dry-run` revisado
- [ ] ✅ Tests pasando (`npm test`)
- [ ] ✅ Sin errores de TypeScript
- [ ] ✅ Versión correcta en `package.json`
- [ ] ✅ Licencia especificada (MIT)

---

## 🚨 Errores Comunes y Soluciones

### Error: "You must be logged in to publish packages"
**Solución**: Ejecuta `npm login` primero.

### Error: "Package name too similar to existing package"
**Solución**: Cambia el nombre o usa un scope:
```json
{
  "name": "@tu-usuario/chiper-components-library"
}
```

### Error: "You do not have permission to publish"
**Solución**: 
1. Verifica que el nombre esté disponible
2. Si usas scope, agrega `--access public`

### Error: "402 Payment Required"
**Solución**: Si usas un scope privado sin una cuenta de pago, usa `--access public`.

### El paquete se publicó pero no funciona
**Solución**: 
1. Verifica que `"files": ["dist"]` esté en package.json
2. Verifica que `dist/` tenga todos los archivos necesarios
3. Revisa que `main`, `module`, y `types` apunten correctamente

---

## 📊 Después de Publicar

### 1. Añade un Badge al README

```markdown
[![npm version](https://badge.fury.io/js/chiper-components-library.svg)](https://www.npmjs.com/package/chiper-components-library)
[![npm downloads](https://img.shields.io/npm/dm/chiper-components-library.svg)](https://www.npmjs.com/package/chiper-components-library)
```

### 2. Monitorea Descargas

- Ve a: https://www.npmjs.com/package/chiper-components-library
- Revisa las estadísticas de descargas

### 3. Responde Issues

Si usuarios reportan problemas:
1. Responde en GitHub Issues
2. Publica parches cuando sea necesario
3. Mantén el CHANGELOG.md actualizado

---

## 🎯 Buenas Prácticas

### Versionado Semántico (SemVer)

- **0.0.x**: Primeras versiones, desarrollo
- **0.x.x**: Beta, funcionalidad básica
- **1.0.0**: Primera versión estable
- **1.x.x**: Nuevas características compatibles
- **2.0.0**: Cambios que rompen compatibilidad

### CHANGELOG.md

Mantén un registro de cambios:

```markdown
# Changelog

## [0.0.2] - 2025-12-02
### Added
- New Component: DataTable

### Fixed
- Bug in CardsGrid spacing

## [0.0.1] - 2025-12-01
### Added
- Initial release
- 17+ components
```

### Deprecation Warnings

Si vas a eliminar algo en una versión futura:

```typescript
/**
 * @deprecated Use NewComponent instead. Will be removed in v2.0.0
 */
export const OldComponent = () => { ... }
```

---

## 🔐 Seguridad

### 1. Habilita 2FA en NPM

```bash
npm profile enable-2fa auth-and-writes
```

### 2. Usa .npmrc para CI/CD

Si usas GitHub Actions o similar, añade el token de npm como secreto.

### 3. No Publiques Secretos

Revisa que `.env` y archivos sensibles estén en `.npmignore`.

---

## 📚 Recursos Adicionales

- [npm Docs - Publishing](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [npm Best Practices](https://docs.npmjs.com/packages-and-modules/best-practices)

---

## ✨ Resumen de Comandos

```bash
# 1. Login
npm login

# 2. Verificar nombre disponible
npm search chiper-components-library

# 3. Build
npm run build

# 4. Verificar contenido
npm pack --dry-run

# 5. Publicar
npm publish --access public

# 6. Verificar
npm view chiper-components-library

# 7. Instalar en otro proyecto
npm install chiper-components-library
```

---

**¡Listo para publicar tu librería!** 🚀

Si tienes dudas o problemas durante el proceso, no dudes en preguntar.

