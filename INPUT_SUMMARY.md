# Input Component Summary

## 📋 Overview

The `Input` component is a versatile text input field built from the Figma Portal Design System. It supports multiple states, types, password visibility toggle, and comprehensive error handling.

## 🎨 Design Source

**Figma Link:** [Portal Design System - Input Component](https://www.figma.com/design/FlGiUejOxsH4oS8frSjDUv/Portal-Design-System?node-id=53-48981)

## ✨ Features

- **Responsive Width**: Always fills 100% of parent container
- **Fixed Height**: 48px (h-12) as per design specifications
- **Multiple States**: Default, Focused, Filled, Error, Disabled
- **Password Toggle**: Optional eye icon for password visibility
- **Error Handling**: Boolean or string error messages
- **Built-in Validators**: Email, number, phone, length, required, custom regex
- **Validation Library**: Powered by Zod for robust type-safe validation
- **Phone Validation**: Country-specific phone validation with libphonenumber-js
- **Accessibility**: Full ARIA attributes and keyboard navigation
- **TypeScript**: Fully typed with comprehensive interfaces

## 🔧 Component API

### Props

```typescript
interface InputValidation {
  email?: boolean | string;          // Validate as email
  number?: boolean | string;         // Validate as number
  phone?: {                          // Validate as phone for country
    country?: CountryCode;           // e.g., 'US', 'CO', 'MX', 'AR'
    message?: string;
  };
  minLength?: {                      // Minimum length validation
    value: number;
    message?: string;
  };
  maxLength?: {                      // Maximum length validation
    value: number;
    message?: string;
  };
  regex?: {                          // Custom regex validation
    pattern: RegExp;
    message?: string;
  };
  required?: boolean | string;       // Required field validation
}

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  // Core Props
  value?: string;                    // Current input value
  onChange?: (text: string) => void; // Callback with new text value
  disabled?: boolean;                // Disable the input
  error?: string | boolean;          // External error (overrides validation)
  
  // Display Props
  placeholder?: string;              // Placeholder text
  type?: string;                     // Input type (text, password, email, etc.)
  className?: string;                // Additional CSS classes
  
  // Features
  showPasswordToggle?: boolean;      // Show password visibility toggle
  validation?: InputValidation;      // Validation rules
  validateOnChange?: boolean;        // Validate on change (default: true)
  validateOnBlur?: boolean;          // Validate on blur (default: true)
}
```

### States and Styling

#### Default State
- Border: `#ecebf0` (light grey)
- Background: `#ffffff` (white)
- Text: `#312e4d` (dark)
- Placeholder: `#7d79a0` (grey)

#### Focused State
- Border: `#a29fba` (darker grey)
- Focus ring: Visible on keyboard navigation
- Cursor: Text cursor

#### Filled State
- Same as default, but with value present
- Text color: `#312e4d`

#### Error State
- Border: `#ff305f` (red)
- Error message: `#ff305f` below input
- Accessible via `role="alert"`

#### Disabled State
- Background: `#f4f4f4` (light grey)
- Border: `#ecebf0`
- Text: `#a29fba` (muted)
- Cursor: `not-allowed`

## 📦 Usage Examples

### Basic Input

```tsx
import { Input } from 'chiperos-ai-components-library';
import { useState } from 'react';

function MyComponent() {
  const [text, setText] = useState('');
  
  return (
    <Input
      placeholder="Enter your name*"
      value={text}
      onChange={setText}
    />
  );
}
```

### Email Input with Validation

```tsx
import { Input } from 'chiperos-ai-components-library';
import { useState } from 'react';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  
  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      setError('Please enter a valid email address');
    } else {
      setError('');
    }
  };
  
  return (
    <Input
      type="email"
      placeholder="Email address*"
      value={email}
      onChange={(text) => {
        setEmail(text);
        validateEmail(text);
      }}
      error={error}
      autoComplete="email"
    />
  );
}
```

### Password Input with Toggle

```tsx
import { Input } from 'chiperos-ai-components-library';
import { useState } from 'react';

function PasswordField() {
  const [password, setPassword] = useState('');
  
  return (
    <Input
      type="password"
      placeholder="Enter your password*"
      value={password}
      onChange={setPassword}
      showPasswordToggle
      autoComplete="current-password"
    />
  );
}
```

### Disabled Input

```tsx
<Input
  placeholder="This field is disabled"
  value="Cannot edit this"
  disabled
/>
```

### Validation Examples

#### Email Validation

```tsx
<Input
  placeholder="Email address*"
  validation={{ email: true }}
/>

// Custom error message
<Input
  placeholder="Email address*"
  validation={{ email: 'Please provide a valid email' }}
/>
```

#### Number Validation

```tsx
<Input
  placeholder="Enter your age"
  validation={{ number: true }}
/>

// Custom error message
<Input
  placeholder="Amount"
  validation={{ number: 'Only numbers are allowed' }}
/>
```

#### Phone Validation

```tsx
// US Phone
<Input
  placeholder="+1 (555) 123-4567"
  validation={{ phone: { country: 'US' } }}
/>

// Colombia Phone
<Input
  placeholder="+57 300 123 4567"
  validation={{ phone: { country: 'CO' } }}
/>

// With custom message
<Input
  placeholder="Phone number"
  validation={{ 
    phone: { 
      country: 'US',
      message: 'Please enter a valid US phone number'
    } 
  }}
/>
```

#### Length Validation

```tsx
// Minimum length
<Input
  placeholder="Username (min 5 chars)"
  validation={{ minLength: { value: 5 } }}
/>

// Maximum length
<Input
  placeholder="Bio (max 50 chars)"
  validation={{ maxLength: { value: 50 } }}
/>

// Both with custom messages
<Input
  placeholder="Password*"
  type="password"
  validation={{
    minLength: { 
      value: 8, 
      message: 'Password must be at least 8 characters' 
    },
    maxLength: { 
      value: 128, 
      message: 'Password is too long' 
    }
  }}
  showPasswordToggle
/>
```

#### Required Field

```tsx
<Input
  placeholder="Name*"
  validation={{ required: true }}
/>

// Custom error message
<Input
  placeholder="Name*"
  validation={{ required: 'Please enter your name' }}
/>
```

#### Custom Regex Validation

```tsx
// Alphanumeric only
<Input
  placeholder="Username"
  validation={{
    regex: {
      pattern: /^[a-zA-Z0-9]+$/,
      message: 'Only letters and numbers allowed'
    }
  }}
/>

// Hexadecimal color
<Input
  placeholder="#FFFFFF"
  validation={{
    regex: {
      pattern: /^#[0-9A-Fa-f]{6}$/,
      message: 'Please enter a valid hex color'
    }
  }}
/>
```

#### Multiple Validations

```tsx
<Input
  placeholder="Username*"
  validation={{
    required: true,
    minLength: { value: 3, message: 'Username must be at least 3 characters' },
    maxLength: { value: 20, message: 'Username must be at most 20 characters' },
    regex: {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: 'Only letters, numbers and underscores allowed'
    }
  }}
/>
```

#### Validation Control

```tsx
// Validate only on blur
<Input
  placeholder="Email"
  validation={{ email: true }}
  validateOnChange={false}
  validateOnBlur={true}
/>

// Validate only on change
<Input
  placeholder="Username"
  validation={{ minLength: { value: 5 } }}
  validateOnChange={true}
  validateOnBlur={false}
/>

// Disable all automatic validation (manual control)
<Input
  placeholder="Custom"
  validation={{ email: true }}
  validateOnChange={false}
  validateOnBlur={false}
/>
```

### Form Example with Built-in Validation

```tsx
import { Input } from 'chiperos-ai-components-library';
import { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  
  const [confirmError, setConfirmError] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setConfirmError('Passwords do not match');
      return;
    }
    
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit} style={{ width: '400px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Full Name*"
          value={formData.name}
          onChange={(text) => setFormData({ ...formData, name: text })}
          validation={{ 
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' }
          }}
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <Input
          type="email"
          placeholder="Email Address*"
          value={formData.email}
          onChange={(text) => setFormData({ ...formData, email: text })}
          validation={{ 
            required: 'Email is required',
            email: 'Please enter a valid email address'
          }}
          autoComplete="email"
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <Input
          placeholder="Phone Number*"
          value={formData.phone}
          onChange={(text) => setFormData({ ...formData, phone: text })}
          validation={{ 
            required: 'Phone is required',
            phone: { country: 'US', message: 'Please enter a valid US phone number' }
          }}
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <Input
          type="password"
          placeholder="Password*"
          value={formData.password}
          onChange={(text) => setFormData({ ...formData, password: text })}
          validation={{ 
            required: 'Password is required',
            minLength: { value: 8, message: 'Password must be at least 8 characters' }
          }}
          showPasswordToggle
        />
      </div>
      
      <div style={{ marginBottom: '24px' }}>
        <Input
          type="password"
          placeholder="Confirm Password*"
          value={formData.confirmPassword}
          onChange={(text) => {
            setFormData({ ...formData, confirmPassword: text });
            if (formData.password && text !== formData.password) {
              setConfirmError('Passwords do not match');
            } else {
              setConfirmError('');
            }
          }}
          error={confirmError}
          validation={{ required: 'Please confirm your password' }}
          showPasswordToggle
        />
      </div>
      
      <button type="submit">Register</button>
    </form>
  );
}
```

### Responsive Layout

```tsx
// The Input always takes 100% width of its container
<div style={{ width: '300px' }}>
  <Input placeholder="Small container" />
</div>

<div style={{ width: '600px' }}>
  <Input placeholder="Large container" />
</div>
```

## 🎯 Key Design Decisions

### 1. **Width Strategy**
- Input always fills 100% of parent container
- Height is fixed at 48px as per design spec
- Allows flexible layouts without breaking design

### 2. **onChange Signature**
- Changed from native `onChange(event)` to `onChange(text: string)`
- Simpler API for consumers
- Matches common React patterns (like useState setters)

### 3. **Error Handling**
- Boolean `error` for styling only
- String `error` for styling + message display
- Error message has `role="alert"` for accessibility

### 4. **Password Toggle**
- Opt-in via `showPasswordToggle` prop
- Uses Lucide React icons (Eye/EyeOff)
- Only shown for `type="password"`
- Disabled state properly handled

### 5. **State Management**
- Internal focus state for border color
- Controlled component pattern (value + onChange)
- Forwards all native input props

## 🧪 Testing

The component includes comprehensive tests covering:

- ✅ Rendering with different props
- ✅ All states (default, focused, error, disabled)
- ✅ onChange callback functionality
- ✅ Password toggle interaction
- ✅ Error message display
- ✅ Accessibility attributes
- ✅ Ref forwarding
- ✅ HTML attribute pass-through
- ✅ Styling and layout

Run tests:
```bash
npm test -- Input.test.tsx
```

## 📖 Storybook

The component includes multiple stories:

- **Default** - Basic input
- **WithValue** - Pre-filled input
- **Disabled** - Disabled state
- **WithError** - Error state without message
- **WithErrorMessage** - Error state with message
- **PasswordInput** - Password with toggle
- **EmailInput** - Email type
- **NumberInput** - Number type
- **Required** - Required field indicator
- **AllStates** - Side-by-side comparison
- **ResponsiveWidth** - Different container widths
- **FormExample** - Complete form with validation

View in Storybook:
```bash
npm run storybook
```

## ♿ Accessibility

- **ARIA Attributes**: `aria-invalid`, `aria-disabled`
- **Semantic HTML**: Proper `<input>` element
- **Keyboard Navigation**: Full keyboard support
- **Focus Management**: Visible focus states
- **Error Announcements**: `role="alert"` for screen readers
- **Labels**: Use with `<label>` elements (via `id` prop)

## 🎨 Customization

### Custom Styling

```tsx
<Input
  className="my-custom-class"
  placeholder="Custom styled input"
/>
```

### Custom Types

```tsx
// Any valid HTML input type
<Input type="tel" placeholder="Phone number" />
<Input type="url" placeholder="Website" />
<Input type="number" placeholder="Age" />
<Input type="date" />
```

### With Form Libraries

Works seamlessly with form libraries:

```tsx
// React Hook Form
<Input
  {...register('email')}
  error={errors.email?.message}
/>

// Formik
<Input
  value={values.email}
  onChange={(text) => setFieldValue('email', text)}
  error={touched.email && errors.email}
/>
```

## 📏 Design Tokens

```css
/* Heights */
--input-height: 48px;

/* Spacing */
--input-padding-x: 16px;
--input-padding-y: 8px;
--input-gap: 8px;

/* Colors */
--input-border-default: #ecebf0;
--input-border-focus: #a29fba;
--input-border-error: #ff305f;
--input-bg-default: #ffffff;
--input-bg-disabled: #f4f4f4;
--input-text-primary: #312e4d;
--input-text-placeholder: #7d79a0;
--input-text-disabled: #a29fba;
--input-text-error: #ff305f;

/* Typography */
--input-font-size: 16px;
--input-line-height: 18px;
```

## 🔗 Related Components

- **Button** - Use with forms
- **BannerAlerts** - For form-level errors
- **Loader** - For async form submission

## 📝 Notes

- Component is fully controlled - always provide `value` and `onChange`
- Error message displays below input with 4px margin
- Password toggle button has `tabIndex={-1}` to keep tab order clean
- All native input attributes are forwarded
- Ref is forwarded to the underlying `<input>` element

## 🔍 Validation System

The Input component includes a powerful built-in validation system powered by Zod and libphonenumber-js.

### Available Validators

| Validator | Type | Description | Example |
|-----------|------|-------------|---------|
| `email` | `boolean \| string` | Validates email format | `{ email: true }` |
| `number` | `boolean \| string` | Validates numeric input | `{ number: true }` |
| `phone` | `{ country?, message? }` | Validates phone by country | `{ phone: { country: 'US' } }` |
| `minLength` | `{ value, message? }` | Minimum character length | `{ minLength: { value: 5 } }` |
| `maxLength` | `{ value, message? }` | Maximum character length | `{ maxLength: { value: 10 } }` |
| `required` | `boolean \| string` | Required field | `{ required: true }` |
| `regex` | `{ pattern, message? }` | Custom regex pattern | `{ regex: { pattern: /^[a-z]+$/ } }` |

### Validation Behavior

- **Default**: Validates on change AND blur
- **On Change**: Shows error as user types (default: enabled)
- **On Blur**: Shows error when field loses focus (default: enabled)
- **Multiple Rules**: Validates in order (required → specific validations)
- **Error Priority**: External `error` prop overrides validation errors

### Supported Phone Countries

Common country codes:
- `'US'` - United States
- `'CO'` - Colombia
- `'MX'` - Mexico
- `'AR'` - Argentina
- `'BR'` - Brazil
- `'ES'` - Spain
- `'GB'` - United Kingdom
- And many more ([see full list](https://github.com/catamphetamine/libphonenumber-js))

### Custom Error Messages

All validators support custom error messages:

```tsx
<Input
  validation={{
    email: 'Oops! That email looks invalid',
    minLength: { value: 8, message: 'Make it at least 8 characters!' },
    required: 'Hey, don\'t forget this field!'
  }}
/>
```

### Validation Order

When multiple validations are present, they are checked in this order:

1. **Required** - Checked first if field is empty
2. **Email/Number/Phone** - Type-specific validation
3. **MinLength** - Minimum length requirement
4. **MaxLength** - Maximum length requirement
5. **Regex** - Custom pattern validation

First validation that fails will display its error message.

## 🔧 Dependencies

The validation system uses these libraries:
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[libphonenumber-js](https://github.com/catamphetamine/libphonenumber-js)** - Phone number validation

Both are included as dependencies when you install the component library.

## 🚀 Future Enhancements

Potential future additions:
- Prefix/suffix support (icons, text)
- Character counter
- Loading state
- Clear button
- Autocomplete suggestions
- Input masking
- Multi-line support (textarea variant)
- Async validation support
- Credit card validation
- URL validation
- Date/time validation

---

**Component Status:** ✅ Production Ready

**Files:**
- `src/components/Input/index.tsx` - Main component
- `src/components/Input/Input.test.tsx` - Unit tests
- `src/components/Input/Input.stories.tsx` - Storybook stories

**Figma:** [View Design](https://www.figma.com/design/FlGiUejOxsH4oS8frSjDUv/Portal-Design-System?node-id=53-48981)

