# Chiperos AI Components Library

A modern, fully-typed React component library built with Vite, TypeScript, and Tailwind CSS.

[![npm version](https://badge.fury.io/js/chiperos-ai-components-library.svg)](https://www.npmjs.com/package/chiperos-ai-components-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Installation

```bash
npm install chiperos-ai-components-library
# or
yarn add chiperos-ai-components-library
# or
pnpm add chiperos-ai-components-library
```

## 📖 Live Documentation

View our **interactive Storybook** with all components, examples, and API documentation:

🔗 **[https://chiperos-ai-storybook.onrender.com](https://chiperos-ai-storybook.onrender.com)**

## 📦 Components

### Cards
- **FeatureCard** - Showcase features with icon, title, and description
- **ActionCard** - Interactive cards with call-to-action buttons
- **OptionCard** - Selectable option cards with radio buttons
- **CardsGrid** - Responsive grid container for cards

### KPI Components
- **KPICard** - Display key performance indicators
- **KPIComparison** - Show KPI comparisons with trends
- **OrderCard** - Display order status and metrics
- Custom variants available for all KPI cards

### UI Components
- **Button** - Versatile button with multiple variants and sizes
- **Loader** - Loading indicators (spinner and linear)
- **Toasts** - Toast notifications (light and dark)
- **Switcher** - Toggle switch component
- **BannerAlerts** - Alert banners (warning, information, grey)
- **BrandIcons** - Brand logo icons with customization

### Other
- **Header** - Application header component
- **LanguageSwitcher** - Language selection component
- **PaginationLib** - Pagination controls

## 💡 Quick Start

```tsx
import { CardsGrid, FeatureCard, ActionCard } from 'chiperos-ai-components-library';
import { Lock, Package } from 'lucide-react';

function App() {
  return (
    <CardsGrid columns={3} gap={6}>
      <FeatureCard
        icon={<Lock size={32} color="#00995a" />}
        title="Secure"
        description="Enterprise-grade security for your data"
        iconBackground="#e6f8ef"
      />
      
      <ActionCard
        icon={<Package size={32} color="#d48620" />}
        title="Inventory Management"
        description="Track and manage your inventory efficiently"
        action={{
          label: "View Inventory",
          onClick: () => console.log('Navigate to inventory')
        }}
      />
    </CardsGrid>
  );
}

export default App;
```

## 📖 Examples

### Cards with Grid

```tsx
import { CardsGrid, FeatureCard } from 'chiperos-ai-components-library';

<CardsGrid 
  columns={4}           // Desktop: 4 columns
  tabletColumns={2}     // Tablet: 2 columns
  mobileColumns={1}     // Mobile: 1 column
  gap={6}
>
  <FeatureCard {...props} />
  <FeatureCard {...props} />
  <FeatureCard {...props} />
  <FeatureCard {...props} />
</CardsGrid>
```

### KPI Dashboard

```tsx
import { KPICard } from 'chiperos-ai-components-library';
import { TrendingUp } from 'lucide-react';

<KPICard
  title="Total Sales"
  value={15420}
  unit="USD"
  description="Monthly revenue"
  comparison={{
    percentage: 12.5,
    trend: 'positive',
    label: 'vs last month'
  }}
  icon={<TrendingUp size={32} color="#00995a" />}
  iconColor="brand"
/>
```

### Interactive Components

```tsx
import { Switcher, Loader, Toasts } from 'chiperos-ai-components-library';
import { useState } from 'react';

function Settings() {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Switcher
        status={enabled}
        onChange={setEnabled}
        disabled={false}
      />
      
      <Loader type="spinner" show={loading} />
      
      <Toasts
        type="light"
        text="Settings updated successfully"
        icon={<CheckCircle />}
        onClose={() => console.log('Toast closed')}
      />
    </>
  );
}
```

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Vite** - Fast build tool

## 🎨 Styling

This library uses **Tailwind CSS**. Make sure you have Tailwind CSS configured in your project.

### Setup Tailwind (if not already installed)

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update your `tailwind.config.js`:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/chiperos-ai-components-library/dist/**/*.{js,mjs}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

## 📚 Documentation

For detailed documentation and interactive examples, visit our **[Live Storybook](https://chiperos-ai-storybook.onrender.com)**.

The Storybook includes:
- 📦 All 17+ components with live demos
- 🎨 Interactive controls to test props
- 📖 Complete API documentation
- 💡 Usage examples and best practices
- 🎯 100+ stories showcasing different use cases

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT © Chiper Team

## 🐛 Issues

Found a bug or have a feature request? Please open an issue on [GitHub](https://github.com/chiperos-ai/chiperos-ai-components-library/issues).

## 📦 Package Info

- **Bundle Size**: ~137 KB (ESM), ~69 KB (CJS)
- **Dependencies**: React 18+, React DOM 18+
- **Peer Dependencies**: React, React DOM
- **TypeScript**: Full type definitions included

## 🔗 Links

- 📚 [Live Storybook](https://chiperos-ai-storybook.onrender.com)
- 📦 [npm Package](https://www.npmjs.com/package/chiperos-ai-components-library)
- 🐙 [GitHub Repository](https://github.com/chiperos-ai/chiperos-ai-components-library)
- 🐛 [Issues](https://github.com/chiperos-ai/chiperos-ai-components-library/issues)
- 📝 [Changelog](./CHANGELOG.md)

---

Made with ❤️ by the Chiperos AI Team

