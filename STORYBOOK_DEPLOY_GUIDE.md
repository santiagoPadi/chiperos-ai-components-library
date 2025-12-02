# Guía para Desplegar Storybook en Render

Esta guía te ayudará a desplegar tu Storybook de **Chiperos AI Components Library** en Render de forma gratuita.

---

## 📋 Requisitos Previos

1. ✅ Cuenta en [Render.com](https://render.com/) (gratuita)
2. ✅ Repositorio en GitHub con tu proyecto
3. ✅ Storybook configurado en tu proyecto

---

## 🚀 Método 1: Despliegue Automático con Render (Recomendado)

### Paso 1: Preparar el Proyecto

#### 1.1 Agregar script de build de Storybook

Tu `package.json` ya tiene el script necesario:
```json
{
  "scripts": {
    "build-storybook": "storybook build"
  }
}
```

#### 1.2 Crear archivo de configuración de Render

Crea un archivo `render.yaml` en la raíz del proyecto:

```yaml
services:
  - type: web
    name: chiperos-ai-storybook
    env: static
    buildCommand: npm install && npm run build-storybook
    staticPublishPath: ./storybook-static
    headers:
      - path: /*
        name: Cache-Control
        value: public, max-age=31536000, immutable
```

### Paso 2: Subir a GitHub

Si aún no has subido tu proyecto a GitHub:

```bash
# Inicializar git (si no está inicializado)
git init

# Agregar todos los archivos
git add .

# Hacer commit
git commit -m "Initial commit with Storybook"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/chiperos-ai/chiperos-ai-components-library.git

# Subir
git branch -M main
git push -u origin main
```

### Paso 3: Configurar Render

1. **Ir a Render Dashboard**
   - Accede a [dashboard.render.com](https://dashboard.render.com/)
   - Haz login o crea una cuenta

2. **Crear Nuevo Static Site**
   - Click en "New +" en la esquina superior derecha
   - Selecciona "Static Site"

3. **Conectar Repositorio**
   - Conecta tu cuenta de GitHub
   - Selecciona el repositorio `chiperos-ai-components-library`
   - Click en "Connect"

4. **Configurar el Deploy**
   ```
   Name: chiperos-ai-storybook
   Branch: main
   Build Command: npm install && npm run build-storybook
   Publish Directory: storybook-static
   ```

5. **Variables de Entorno (Opcional)**
   - Por ahora no necesitas ninguna

6. **Click en "Create Static Site"**

### Paso 4: Esperar el Deploy

Render automáticamente:
1. ✅ Clonará tu repositorio
2. ✅ Ejecutará `npm install`
3. ✅ Ejecutará `npm run build-storybook`
4. ✅ Publicará el contenido de `storybook-static/`
5. ✅ Te dará una URL pública

**Tu Storybook estará disponible en:**
```
https://chiperos-ai-storybook.onrender.com
```

---

## 🔄 Método 2: Deploy Manual (Alternativo)

### Paso 1: Build Local

```bash
# Hacer build de Storybook
npm run build-storybook

# Esto genera la carpeta storybook-static/
```

### Paso 2: Subir a Render Manualmente

1. Ve a Render Dashboard
2. Click en "New +" → "Static Site"
3. En lugar de GitHub, selecciona "Deploy an existing static site"
4. Sube la carpeta `storybook-static/` mediante drag & drop

---

## 🎨 Configuración Avanzada

### Custom Domain

Si quieres usar un dominio personalizado:

1. Ve a tu Static Site en Render
2. Click en "Settings"
3. En "Custom Domain", agrega tu dominio:
   ```
   storybook.chiperos.ai
   ```
4. Configura los DNS según las instrucciones de Render

### Variables de Entorno

Si necesitas variables de entorno en build time:

```yaml
# En render.yaml
services:
  - type: web
    name: chiperos-ai-storybook
    env: static
    buildCommand: npm install && npm run build-storybook
    staticPublishPath: ./storybook-static
    envVars:
      - key: NODE_ENV
        value: production
      - key: STORYBOOK_API_URL
        value: https://api.chiperos.ai
```

### Headers de Cache

Para mejor performance, configura headers de cache:

```yaml
services:
  - type: web
    name: chiperos-ai-storybook
    env: static
    buildCommand: npm install && npm run build-storybook
    staticPublishPath: ./storybook-static
    headers:
      - path: /static/*
        name: Cache-Control
        value: public, max-age=31536000, immutable
      - path: /*
        name: Cache-Control
        value: public, max-age=3600
```

---

## 🔐 Storybook con Autenticación (Opcional)

Si quieres proteger tu Storybook con contraseña:

### Opción 1: HTTP Basic Auth con Nginx

Crea `nginx.conf`:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        auth_basic "Restricted Access";
        auth_basic_user_file /etc/nginx/.htpasswd;
        try_files $uri $uri/ /index.html;
    }
}
```

### Opción 2: Usar Render Private Services (De pago)

Render ofrece servicios privados que requieren autenticación.

---

## 📝 Archivo render.yaml Completo

Crea `render.yaml` en la raíz de tu proyecto:

```yaml
services:
  - type: web
    name: chiperos-ai-storybook
    env: static
    buildCommand: |
      npm ci
      npm run build-storybook
    staticPublishPath: ./storybook-static
    headers:
      # Cache para assets estáticos (JS, CSS, imágenes)
      - path: /static/*
        name: Cache-Control
        value: public, max-age=31536000, immutable
      # Cache para otras páginas (1 hora)
      - path: /*
        name: Cache-Control
        value: public, max-age=3600
      # Security headers
      - path: /*
        name: X-Frame-Options
        value: SAMEORIGIN
      - path: /*
        name: X-Content-Type-Options
        value: nosniff
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
```

---

## 🔄 Auto-Deploy en cada Push

Con Render, cada vez que hagas push a la rama `main`, Storybook se desplegará automáticamente.

```bash
# Hacer cambios en tus componentes
git add .
git commit -m "Update Button component"
git push origin main

# Render detectará el push y re-desplegará automáticamente
```

---

## 🌐 Alternativas a Render

### Vercel (Recomendado también)

```bash
# Instalar Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**vercel.json**:
```json
{
  "buildCommand": "npm run build-storybook",
  "outputDirectory": "storybook-static",
  "framework": null
}
```

### Netlify

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=storybook-static
```

**netlify.toml**:
```toml
[build]
  command = "npm run build-storybook"
  publish = "storybook-static"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### GitHub Pages

```bash
# Instalar gh-pages
npm install -D gh-pages

# Agregar scripts a package.json
{
  "scripts": {
    "deploy-storybook": "npm run build-storybook && gh-pages -d storybook-static"
  }
}

# Deploy
npm run deploy-storybook
```

---

## 📊 Comparación de Plataformas

| Plataforma | Gratuito | Auto-Deploy | Custom Domain | Build Time |
|------------|----------|-------------|---------------|------------|
| **Render** | ✅ | ✅ | ✅ | ~2-3 min |
| **Vercel** | ✅ | ✅ | ✅ | ~1-2 min |
| **Netlify** | ✅ | ✅ | ✅ | ~1-2 min |
| **GitHub Pages** | ✅ | ❌ Manual | ✅ | ~1 min |

**Recomendación**: Para Storybook, **Vercel** o **Render** son las mejores opciones.

---

## 🐛 Troubleshooting

### Error: "Build failed"

**Solución**:
```bash
# Limpiar y reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Probar build localmente
npm run build-storybook
```

### Error: "Module not found"

**Solución**: Asegúrate de que todas las dependencias estén en `dependencies` o `devDependencies`:
```bash
npm install --save-dev @storybook/react-vite
```

### Error: "Out of memory"

**Solución**: Aumentar memoria en Render (puede requerir plan de pago) o optimizar build:
```json
{
  "scripts": {
    "build-storybook": "NODE_OPTIONS='--max-old-space-size=4096' storybook build"
  }
}
```

### Storybook está en blanco

**Solución**: Verifica que `storybook-static/` tenga contenido:
```bash
ls -la storybook-static/
```

---

## ✅ Checklist Pre-Deploy

- [ ] ✅ Storybook funciona localmente (`npm run storybook`)
- [ ] ✅ Build de Storybook funciona (`npm run build-storybook`)
- [ ] ✅ Carpeta `storybook-static/` generada
- [ ] ✅ Proyecto subido a GitHub
- [ ] ✅ Cuenta de Render creada
- [ ] ✅ `render.yaml` configurado (opcional pero recomendado)
- [ ] ✅ Rama `main` actualizada

---

## 🎯 Pasos Rápidos (Resumen)

```bash
# 1. Crear render.yaml (copiar contenido de arriba)
touch render.yaml

# 2. Subir a GitHub
git add .
git commit -m "Add Render config for Storybook"
git push origin main

# 3. Ir a Render.com
# - New + → Static Site
# - Connect repository
# - Configurar build command y publish directory
# - Deploy!

# 4. Tu Storybook estará en:
# https://chiperos-ai-storybook.onrender.com
```

---

## 📚 Recursos Adicionales

- [Render Static Sites Docs](https://render.com/docs/static-sites)
- [Storybook Deployment Docs](https://storybook.js.org/docs/react/sharing/publish-storybook)
- [Render YAML Configuration](https://render.com/docs/yaml-spec)

---

## 🎉 Resultado Final

Una vez desplegado, tu Storybook estará disponible públicamente en:

```
https://chiperos-ai-storybook.onrender.com
```

Y podrás compartirlo con tu equipo, clientes, o incluirlo en tu README:

```markdown
## 📖 Documentation

View our live Storybook: [https://chiperos-ai-storybook.onrender.com](https://chiperos-ai-storybook.onrender.com)
```

---

**¡Listo para desplegar tu Storybook!** 🚀

