# Select Component Summary

## 📋 Overview

The `Select` component is a customizable dropdown/select component built from the Figma Portal Design System. It uses Radix UI for accessibility and provides a clean, modern interface for selecting from a list of options.

## 🎨 Design Source

**Figma Link:** [Portal Design System - Dropdown Component](https://www.figma.com/design/FlGiUejOxsH4oS8frSjDUv/Portal-Design-System?node-id=11-5247)

## ✨ Features

- **Responsive Width**: Always fills 100% of parent container
- **Dropdown Width Match**: Dropdown options have the same width as the select trigger
- **Multiple States**: Default, Active/Open, Disabled
- **Accessible**: Built with Radix UI primitives for full accessibility
- **Keyboard Navigation**: Full support for keyboard interactions
- **Custom Styling**: Follows Figma design system colors and typography
- **Label Display**: Shows label above selected value when active
- **TypeScript**: Fully typed with comprehensive interfaces

## 🔧 Component API

### Props

```typescript
interface SelectOption {
  id: string;    // Unique identifier for the option
  text: string;  // Display text for the option
}

interface SelectProps {
  value?: string;                  // Currently selected option ID
  onChange?: (text: string) => void; // Callback when selection changes
  disabled?: boolean;              // Whether the select is disabled
  options: SelectOption[];         // Array of options to display
  placeholder?: string;            // Placeholder text when no selection
  label?: string;                  // Label shown above selected value
  className?: string;              // Additional CSS classes
}
```

### States and Styling

#### Default State
- Border: `#ecebf0` (light grey)
- Background: `#ffffff` (white)
- Text: `#312e4d` (dark)
- Placeholder size: `16px`

#### Active/Open State
- Border: `#a29fba` (darker grey)
- Shows label above selected value
- Label text: `#575385` (grey), `12px`
- Value text: `#312e4d` (dark), `14px`

#### Disabled State
- Opacity: `50%`
- Background: `#f4f4f4` (light grey)
- Cursor: `not-allowed`
- Cannot be opened

#### Dropdown/Options
- Background: `#ffffff`
- Border: `#ecebf0`
- Shadow: `lg`
- Hover: `#f4f4f4` background
- Selected: `#ecebf0` background

## 📦 Usage Examples

### Basic Select

```tsx
import { Select } from 'chiperos-ai-components-library';
import { useState } from 'react';

function MyComponent() {
  const [value, setValue] = useState('');
  
  const options = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];
  
  return (
    <Select
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Select an option"
    />
  );
}
```

### Select with Label

```tsx
<Select
  options={policyOptions}
  value={policy}
  onChange={setPolicy}
  label="Current Policy"
  placeholder="Choose a policy"
/>
```

### Disabled Select

```tsx
<Select
  options={options}
  value="current-value"
  disabled
  placeholder="This is disabled"
/>
```

### Country Selector

```tsx
import { Select } from 'chiperos-ai-components-library';
import { useState } from 'react';

function CountrySelector() {
  const [country, setCountry] = useState('');
  
  const countries = [
    { id: 'us', text: 'United States' },
    { id: 'co', text: 'Colombia' },
    { id: 'mx', text: 'Mexico' },
    { id: 'ar', text: 'Argentina' },
    { id: 'br', text: 'Brazil' },
  ];
  
  return (
    <Select
      options={countries}
      value={country}
      onChange={setCountry}
      label="Country"
      placeholder="Select your country"
    />
  );
}
```

### Form Example

```tsx
import { Select } from 'chiperos-ai-components-library';
import { useState } from 'react';

function SettingsForm() {
  const [formData, setFormData] = useState({
    country: '',
    language: '',
    timezone: '',
  });
  
  const countryOptions = [
    { id: 'us', text: 'United States' },
    { id: 'co', text: 'Colombia' },
    { id: 'mx', text: 'Mexico' },
  ];
  
  const languageOptions = [
    { id: 'en', text: 'English' },
    { id: 'es', text: 'Español' },
    { id: 'pt', text: 'Português' },
  ];
  
  const timezoneOptions = [
    { id: 'utc-5', text: 'UTC-5 (Colombia, Peru)' },
    { id: 'utc-3', text: 'UTC-3 (Argentina, Brazil)' },
    { id: 'utc-6', text: 'UTC-6 (Mexico City)' },
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ marginBottom: '16px' }}>
        <label>Country</label>
        <Select
          options={countryOptions}
          value={formData.country}
          onChange={(value) => setFormData({ ...formData, country: value })}
          label="Country"
          placeholder="Select your country"
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <label>Language</label>
        <Select
          options={languageOptions}
          value={formData.language}
          onChange={(value) => setFormData({ ...formData, language: value })}
          label="Language"
          placeholder="Select your language"
        />
      </div>
      
      <div style={{ marginBottom: '16px' }}>
        <label>Timezone</label>
        <Select
          options={timezoneOptions}
          value={formData.timezone}
          onChange={(value) => setFormData({ ...formData, timezone: value })}
          label="Timezone"
          placeholder="Select your timezone"
        />
      </div>
      
      <button type="submit">Save Settings</button>
    </form>
  );
}
```

### Responsive Width

```tsx
// Select always takes 100% width of its container
<div style={{ width: '200px' }}>
  <Select options={options} placeholder="Small container" />
</div>

<div style={{ width: '600px' }}>
  <Select options={options} placeholder="Large container" />
</div>
```

## 🎯 Key Design Decisions

### 1. **Width Strategy**
- Select always fills 100% of parent container
- Dropdown options automatically match the trigger width
- Uses Radix UI's `--radix-select-trigger-width` CSS variable
- Allows flexible layouts without breaking design

### 2. **onChange Signature**
- Returns the option `id` (string) instead of the full option object
- Simpler API and matches common React patterns

### 3. **Label Behavior**
- Label is shown when:
  - An option is selected
  - Label prop is explicitly provided
- When no selection and no label, shows larger placeholder text

### 4. **Options Structure**
- Simple `{id, text}` structure
- `id` is used for value tracking
- `text` is displayed to the user

### 5. **Accessibility**
- Uses Radix UI Select primitive
- Full keyboard navigation support
- Proper ARIA attributes
- Screen reader compatible

## 🧪 Testing

The component includes comprehensive tests covering:

- ✅ Rendering with different props
- ✅ All states (default, open, disabled)
- ✅ onChange callback functionality
- ✅ Option selection
- ✅ Label display logic
- ✅ Keyboard navigation
- ✅ Accessibility attributes
- ✅ Ref forwarding
- ✅ Edge cases (invalid values, empty options)

Run tests:
```bash
npm test -- Select.test.tsx
```

## 📖 Storybook

The component includes multiple stories:

- **Default** - Basic select
- **WithLabel** - Select with label
- **WithValue** - Pre-selected value
- **Disabled** - Disabled state
- **DisabledWithValue** - Disabled with value
- **ManyOptions** - Select with many options
- **CountrySelector** - Country selection example
- **LongTextOptions** - Options with long text
- **CustomWidth** - Different container widths
- **AllStates** - Side-by-side comparison
- **FormExample** - Complete form with multiple selects
- **Interactive** - Interactive demo with controls

View in Storybook:
```bash
npm run storybook
```

## ♿ Accessibility

- **Keyboard Navigation**: 
  - `Tab` to focus
  - `Enter/Space` to open
  - `Arrow Up/Down` to navigate options
  - `Enter` to select
  - `Escape` to close
- **ARIA Attributes**: Proper roles and labels
- **Screen Reader**: Full screen reader support
- **Focus Management**: Visible focus states

## 🎨 Customization

### Custom Styling

```tsx
<Select
  className="my-custom-class"
  options={options}
  placeholder="Custom styled select"
/>
```

### Dynamic Options

```tsx
const [options, setOptions] = useState([]);

// Load options from API
useEffect(() => {
  fetch('/api/countries')
    .then(res => res.json())
    .then(data => setOptions(data));
}, []);

<Select options={options} />
```

### With Form Libraries

Works seamlessly with form libraries:

```tsx
// React Hook Form
<Select
  {...register('country')}
  options={countryOptions}
/>

// Formik
<Select
  options={countryOptions}
  value={values.country}
  onChange={(value) => setFieldValue('country', value)}
/>
```

## 📏 Design Tokens

```css
/* Layout */
--select-padding-x: 16px;
--select-padding-y: 12px;
--select-gap: 8px;

/* Colors */
--select-border-default: #ecebf0;
--select-border-active: #a29fba;
--select-bg: #ffffff;
--select-bg-disabled: #f4f4f4;
--select-text-primary: #312e4d;
--select-text-label: #575385;

/* Typography */
--select-font-size-placeholder: 16px;
--select-font-size-label: 12px;
--select-font-size-value: 14px;
--select-line-height-placeholder: 20px;
--select-line-height-value: 16px;

/* Dropdown */
--dropdown-bg: #ffffff;
--dropdown-border: #ecebf0;
--dropdown-hover-bg: #f4f4f4;
--dropdown-selected-bg: #ecebf0;
```

## 🔗 Related Components

- **Input** - Use for text input
- **Switcher** - Use for boolean toggles
- **Button** - Use with forms

## 📝 Notes

- Component is fully controlled - always provide `value` and `onChange`
- Options array is required (cannot be undefined)
- Value should match one of the option IDs
- If value doesn't match any option, placeholder is shown
- Label is automatically shown when a value is selected
- Ref is forwarded to the trigger button

## 🚀 Future Enhancements

Potential future additions:
- Multi-select support
- Searchable/filterable options
- Grouped options
- Custom option rendering
- Async options loading
- Option icons/avatars
- Clear button
- Loading state

---

**Component Status:** ✅ Production Ready

**Files:**
- `src/components/Select/index.tsx` - Main component
- `src/components/Select/Select.test.tsx` - Unit tests
- `src/components/Select/Select.stories.tsx` - Storybook stories

**Figma:** [View Design](https://www.figma.com/design/FlGiUejOxsH4oS8frSjDUv/Portal-Design-System?node-id=11-5247)

**Dependencies:**
- `@radix-ui/react-select` - Accessible select primitive
- `lucide-react` - ChevronDown icon

