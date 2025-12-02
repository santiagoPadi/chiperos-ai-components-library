# Checklist de Deploy - Chiperos AI Components Library

## ✅ Preparación Completada

- [x] ✅ Nombre del proyecto actualizado a `chiperos-ai-components-library`
- [x] ✅ `package.json` configurado correctamente
- [x] ✅ `vite.config.ts` actualizado
- [x] ✅ `render.yaml` creado para auto-deploy
- [x] ✅ `.npmignore` configurado
- [x] ✅ `README.md` actualizado
- [x] ✅ `CHANGELOG.md` creado
- [x] ✅ Build de Storybook probado y funcionando
- [x] ✅ Build de librería probado y funcionando

---

## 🚀 Pasos para Desplegar Storybook en Render

### 1. Subir Código a GitHub

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Commit
git commit -m "Ready for deploy: Chiperos AI Components Library"

# Crear repositorio en GitHub y conectar
# Ve a github.com y crea un nuevo repositorio: chiperos-ai-components-library
git remote add origin https://github.com/TU-USUARIO/chiperos-ai-components-library.git

# Subir
git branch -M main
git push -u origin main
```

### 2. Configurar Render

1. **Acceder a Render**
   - Ve a [dashboard.render.com](https://dashboard.render.com/)
   - Crea cuenta o inicia sesión

2. **Crear Static Site**
   - Click en "New +" → "Static Site"
   - Connect GitHub repository
   - Selecciona tu repositorio `chiperos-ai-components-library`

3. **Configuración Automática** (Render detectará `render.yaml`):
   ```
   Name: chiperos-ai-storybook
   Branch: main
   Build Command: npm ci && npm run build-storybook
   Publish Directory: storybook-static
   ```

4. **Deploy**
   - Click "Create Static Site"
   - Espera 3-5 minutos

### 3. Tu Storybook estará en:
```
https://chiperos-ai-storybook.onrender.com
```

---

## 📦 Pasos para Publicar en NPM

### 1. Login en NPM

```bash
npm login
# Username: tu-usuario
# Password: tu-contraseña
# Email: tu-email
```

### 2. Verificar Nombre Disponible

```bash
npm search chiperos-ai-components-library
# Si no hay resultados, el nombre está disponible
```

### 3. Build Final

```bash
# Limpiar
rm -rf dist

# Build
npm run build

# Verificar
ls -la dist/
```

### 4. Probar Localmente (Opcional)

```bash
npm pack
# Esto crea chiperos-ai-components-library-0.0.1.tgz

# En otro proyecto:
npm install /path/to/chiperos-ai-components-library-0.0.1.tgz
```

### 5. Publicar

```bash
npm publish --access public
```

### 6. Verificar

```bash
# Ver en npm
npm view chiperos-ai-components-library

# Instalar en proyecto de prueba
npx create-react-app test-app
cd test-app
npm install chiperos-ai-components-library
```

---

## 🔄 Workflow para Actualizaciones

### Actualizar Storybook

```bash
# 1. Hacer cambios en componentes
git add .
git commit -m "Update components"
git push origin main

# 2. Render auto-deploya automáticamente
```

### Publicar Nueva Versión en NPM

```bash
# 1. Actualizar versión
npm version patch  # 0.0.1 → 0.0.2
# o
npm version minor  # 0.0.1 → 0.1.0

# 2. Build y publicar
npm run build
npm publish

# 3. Push del tag
git push origin main --tags
```

---

## 📝 URLs Importantes

- **NPM Package**: https://www.npmjs.com/package/chiperos-ai-components-library
- **Storybook**: https://chiperos-ai-storybook.onrender.com
- **GitHub Repo**: https://github.com/TU-USUARIO/chiperos-ai-components-library

---

## 🐛 Si Algo Sale Mal

### Storybook no se despliega

```bash
# Probar build localmente
npm run build-storybook
ls -la storybook-static/

# Verificar render.yaml
cat render.yaml

# Ver logs en Render Dashboard
```

### NPM publish falla

```bash
# Verificar login
npm whoami

# Verificar nombre disponible
npm search chiperos-ai-components-library

# Si está taken, usar scope
# Cambiar en package.json: "@tu-usuario/chiperos-ai-components-library"
npm publish --access public
```

---

## 📚 Archivos Creados

- ✅ `render.yaml` - Configuración de Render
- ✅ `.npmignore` - Archivos excluidos de npm
- ✅ `README.md` - Documentación principal
- ✅ `CHANGELOG.md` - Historial de cambios
- ✅ `NPM_PUBLISH_GUIDE.md` - Guía detallada de publicación en npm
- ✅ `STORYBOOK_DEPLOY_GUIDE.md` - Guía detallada de deploy de Storybook
- ✅ `DEPLOY_CHECKLIST.md` - Este archivo

---

## 🎯 Siguiente Paso

**Tu siguiente acción debe ser:**

```bash
# 1. Sube el código a GitHub
git add .
git commit -m "Ready for production"
git push origin main

# 2. Ve a render.com y conecta tu repositorio

# 3. Una vez el Storybook esté desplegado, publica en npm
npm publish --access public
```

---

**¡Todo listo para el deploy!** 🚀

