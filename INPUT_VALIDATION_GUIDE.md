# Input Component - Validation System

## 📚 Overview

El componente `Input` ahora incluye un sistema de validación completo y robusto, basado en **Zod** para validación de esquemas y **libphonenumber-js** para validación de teléfonos por país.

## 🎯 Validadores Disponibles

### 1. Email Validation

Valida que el input sea un email válido.

```tsx
// Básico
<Input
  placeholder="Email*"
  validation={{ email: true }}
/>

// Con mensaje personalizado
<Input
  placeholder="Email*"
  validation={{ email: 'Por favor ingresa un email válido' }}
/>
```

**Ejemplos:**
- ✅ `user@example.com`
- ✅ `name.lastname@company.co`
- ❌ `invalid-email`
- ❌ `@example.com`

---

### 2. Number Validation

Valida que el input sea un número válido (enteros, decimales, negativos).

```tsx
// Básico
<Input
  placeholder="Edad"
  validation={{ number: true }}
/>

// Con mensaje personalizado
<Input
  placeholder="Monto"
  validation={{ number: 'Solo números son permitidos' }}
/>
```

**Ejemplos:**
- ✅ `123`
- ✅ `123.45`
- ✅ `-456`
- ✅ `0.5`
- ❌ `abc`
- ❌ `12a3`

---

### 3. Phone Validation

Valida números de teléfono según el país especificado.

```tsx
// Estados Unidos
<Input
  placeholder="+1 (555) 123-4567"
  validation={{ phone: { country: 'US' } }}
/>

// Colombia
<Input
  placeholder="+57 300 123 4567"
  validation={{ phone: { country: 'CO' } }}
/>

// Con mensaje personalizado
<Input
  placeholder="Teléfono"
  validation={{ 
    phone: { 
      country: 'MX',
      message: 'Ingresa un número de teléfono mexicano válido'
    } 
  }}
/>
```

**Países soportados:**
- `'US'` - Estados Unidos
- `'CO'` - Colombia
- `'MX'` - México
- `'AR'` - Argentina
- `'BR'` - Brasil
- `'ES'` - España
- `'GB'` - Reino Unido
- `'PE'` - Perú
- `'CL'` - Chile
- Y muchos más...

**Ejemplos (US):**
- ✅ `+1 (555) 123-4567`
- ✅ `555-123-4567`
- ✅ `(555) 123-4567`
- ❌ `123`
- ❌ `555-12-34`

---

### 4. Min Length Validation

Valida que el input tenga al menos X caracteres.

```tsx
// Básico
<Input
  placeholder="Username"
  validation={{ minLength: { value: 5 } }}
/>

// Con mensaje personalizado
<Input
  placeholder="Contraseña"
  type="password"
  validation={{ 
    minLength: { 
      value: 8, 
      message: 'La contraseña debe tener al menos 8 caracteres' 
    } 
  }}
/>
```

**Ejemplo (min: 5):**
- ✅ `12345`
- ✅ `abcdefg`
- ❌ `abc`
- ❌ `1234`

---

### 5. Max Length Validation

Valida que el input no exceda X caracteres.

```tsx
// Básico
<Input
  placeholder="Bio"
  validation={{ maxLength: { value: 50 } }}
/>

// Con mensaje personalizado
<Input
  placeholder="Código postal"
  validation={{ 
    maxLength: { 
      value: 5, 
      message: 'El código postal debe tener máximo 5 dígitos' 
    } 
  }}
/>
```

**Ejemplo (max: 10):**
- ✅ `short`
- ✅ `1234567890`
- ❌ `this is way too long`

---

### 6. Required Validation

Valida que el campo no esté vacío.

```tsx
// Básico
<Input
  placeholder="Nombre*"
  validation={{ required: true }}
/>

// Con mensaje personalizado
<Input
  placeholder="Email*"
  validation={{ required: 'El email es requerido' }}
/>
```

**Comportamiento:**
- Se valida al hacer blur (por defecto)
- Muestra error si el campo está vacío
- Se ejecuta antes que otras validaciones

---

### 7. Custom Regex Validation

Valida usando una expresión regular personalizada.

```tsx
// Solo alfanumérico
<Input
  placeholder="Username"
  validation={{
    regex: {
      pattern: /^[a-zA-Z0-9]+$/,
      message: 'Solo letras y números permitidos'
    }
  }}
/>

// Color hexadecimal
<Input
  placeholder="#FFFFFF"
  validation={{
    regex: {
      pattern: /^#[0-9A-Fa-f]{6}$/,
      message: 'Ingresa un color hexadecimal válido'
    }
  }}
/>

// Solo letras minúsculas
<Input
  placeholder="username"
  validation={{
    regex: {
      pattern: /^[a-z]+$/,
      message: 'Solo letras minúsculas permitidas'
    }
  }}
/>

// Formato específico (ej: ABC-1234)
<Input
  placeholder="Código (ABC-1234)"
  validation={{
    regex: {
      pattern: /^[A-Z]{3}-\d{4}$/,
      message: 'Formato: ABC-1234'
    }
  }}
/>
```

**Casos de uso comunes:**
- Usernames con formato específico
- Códigos postales
- Números de identificación
- Formatos personalizados de tu negocio

---

## 🔄 Validaciones Múltiples

Puedes combinar múltiples validaciones. Se ejecutan en orden:

1. Required
2. Email/Number/Phone
3. MinLength
4. MaxLength
5. Regex

```tsx
<Input
  placeholder="Username*"
  validation={{
    required: true,
    minLength: { value: 3, message: 'Mínimo 3 caracteres' },
    maxLength: { value: 20, message: 'Máximo 20 caracteres' },
    regex: {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: 'Solo letras, números y guión bajo'
    }
  }}
/>
```

**Ejemplo de validación:**
1. Usuario escribe "" → Error: "This field is required"
2. Usuario escribe "ab" → Error: "Mínimo 3 caracteres"
3. Usuario escribe "ab@" → Error: "Solo letras, números y guión bajo"
4. Usuario escribe "abc" → ✅ Válido
5. Usuario escribe "a very long username here" → Error: "Máximo 20 caracteres"

---

## ⚙️ Control de Validación

### Validar en onChange vs onBlur

```tsx
// Solo validar al escribir (on change)
<Input
  validation={{ email: true }}
  validateOnChange={true}
  validateOnBlur={false}
/>

// Solo validar al salir del campo (on blur)
<Input
  validation={{ email: true }}
  validateOnChange={false}
  validateOnBlur={true}
/>

// Validar en ambos (default)
<Input
  validation={{ email: true }}
  validateOnChange={true}
  validateOnBlur={true}
/>

// Desactivar validación automática
<Input
  validation={{ email: true }}
  validateOnChange={false}
  validateOnBlur={false}
/>
```

### Error Externo vs Validación

El prop `error` externo tiene prioridad sobre los errores de validación:

```tsx
const [customError, setCustomError] = useState('');

<Input
  validation={{ email: true }}
  error={customError}  // Este error se muestra en lugar del error de validación
/>
```

---

## 📝 Ejemplos Completos

### Formulario de Registro

```tsx
import { Input } from 'chiperos-ai-components-library';
import { useState } from 'react';

function RegistrationForm() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  
  const [confirmError, setConfirmError] = useState('');
  
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Username */}
      <Input
        placeholder="Username*"
        value={form.username}
        onChange={(text) => setForm({ ...form, username: text })}
        validation={{
          required: 'El username es requerido',
          minLength: { value: 3, message: 'Mínimo 3 caracteres' },
          maxLength: { value: 20, message: 'Máximo 20 caracteres' },
          regex: {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: 'Solo letras, números y guión bajo (_)'
          }
        }}
      />
      
      {/* Email */}
      <Input
        type="email"
        placeholder="Email*"
        value={form.email}
        onChange={(text) => setForm({ ...form, email: text })}
        validation={{
          required: 'El email es requerido',
          email: 'Ingresa un email válido'
        }}
      />
      
      {/* Phone */}
      <Input
        placeholder="Teléfono (Colombia)*"
        value={form.phone}
        onChange={(text) => setForm({ ...form, phone: text })}
        validation={{
          required: 'El teléfono es requerido',
          phone: { 
            country: 'CO',
            message: 'Ingresa un número colombiano válido'
          }
        }}
      />
      
      {/* Password */}
      <Input
        type="password"
        placeholder="Contraseña*"
        value={form.password}
        onChange={(text) => setForm({ ...form, password: text })}
        validation={{
          required: 'La contraseña es requerida',
          minLength: { 
            value: 8, 
            message: 'Mínimo 8 caracteres'
          }
        }}
        showPasswordToggle
      />
      
      {/* Confirm Password */}
      <Input
        type="password"
        placeholder="Confirmar Contraseña*"
        value={form.confirmPassword}
        onChange={(text) => {
          setForm({ ...form, confirmPassword: text });
          if (text !== form.password) {
            setConfirmError('Las contraseñas no coinciden');
          } else {
            setConfirmError('');
          }
        }}
        error={confirmError}
        validation={{
          required: 'Confirma tu contraseña'
        }}
        showPasswordToggle
      />
      
      <button type="submit">Registrarse</button>
    </form>
  );
}
```

### Validación de Tarjeta de Crédito

```tsx
<Input
  placeholder="Número de tarjeta"
  validation={{
    required: true,
    regex: {
      pattern: /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/,
      message: 'Formato: 1234 5678 9012 3456'
    }
  }}
/>

<Input
  placeholder="CVV"
  validation={{
    required: true,
    regex: {
      pattern: /^\d{3,4}$/,
      message: 'CVV de 3 o 4 dígitos'
    },
    maxLength: { value: 4 }
  }}
/>
```

### Validación de Código Postal

```tsx
// USA
<Input
  placeholder="ZIP Code"
  validation={{
    required: true,
    regex: {
      pattern: /^\d{5}(-\d{4})?$/,
      message: 'Formato: 12345 o 12345-6789'
    }
  }}
/>

// Colombia
<Input
  placeholder="Código Postal"
  validation={{
    required: true,
    regex: {
      pattern: /^\d{6}$/,
      message: 'Debe ser un código de 6 dígitos'
    }
  }}
/>
```

### Validación de URL

```tsx
<Input
  placeholder="Sitio web"
  validation={{
    regex: {
      pattern: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      message: 'Ingresa una URL válida'
    }
  }}
/>
```

---

## 🎨 Mejores Prácticas

### 1. Mensajes Claros y Específicos

```tsx
// ❌ Malo
<Input validation={{ minLength: { value: 8 } }} />

// ✅ Bueno
<Input validation={{ 
  minLength: { 
    value: 8, 
    message: 'La contraseña debe tener al menos 8 caracteres' 
  } 
}} />
```

### 2. Validar Solo lo Necesario

```tsx
// ❌ Malo - demasiadas validaciones
<Input validation={{
  required: true,
  minLength: { value: 1 },
  maxLength: { value: 100 },
  email: true,
  number: true,
  regex: { pattern: /.*/ }
}} />

// ✅ Bueno - solo lo necesario
<Input validation={{
  required: true,
  email: true
}} />
```

### 3. UX Apropiada

```tsx
// Para campos importantes: validar solo al blur
<Input
  validation={{ email: true }}
  validateOnChange={false}
  validateOnBlur={true}
/>

// Para campos simples: validar en tiempo real
<Input
  validation={{ minLength: { value: 3 } }}
  validateOnChange={true}
  validateOnBlur={true}
/>
```

### 4. Combinar con Validación Externa

```tsx
const [serverError, setServerError] = useState('');

const handleSubmit = async () => {
  try {
    await api.register(formData);
  } catch (error) {
    setServerError('Este email ya está registrado');
  }
};

<Input
  validation={{ email: true }}
  error={serverError}  // Error del servidor tiene prioridad
/>
```

---

## 🔧 Troubleshooting

### El error no aparece

1. Verifica que `validateOnChange` o `validateOnBlur` estén habilitados
2. Asegúrate de pasar `value` y `onChange` al componente
3. Verifica que la validación esté bien formada

### El error no desaparece

1. Asegúrate de que el valor cumple TODAS las validaciones
2. Verifica que no haya un `error` externo bloqueando
3. Revisa el orden de las validaciones

### La validación de teléfono falla

1. Incluye el código de país en el número: `+57 300 123 4567`
2. Verifica que el país sea correcto
3. Usa formatos estándar del país

---

## 📚 Referencias

- **Zod**: [https://zod.dev/](https://zod.dev/)
- **libphonenumber-js**: [https://github.com/catamphetamine/libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js)
- **Regex101** (para testing regex): [https://regex101.com/](https://regex101.com/)

---

¡Ahora tu componente Input tiene validación completa y lista para usar! 🎉

