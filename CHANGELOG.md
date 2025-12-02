# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.0.1] - 2025-12-01

### Added

#### Cards Components
- **FeatureCard** - Display features with icon, title, and description
- **ActionCard** - Interactive cards with CTA buttons
- **OptionCard** - Selectable option cards with radio buttons
- **CardsGrid** - Responsive grid container for organizing cards

#### KPI Components
- **KPICard** - Key performance indicator cards
- **KPIComparison** - KPI comparison with trend indicators
- **OrderCard** - Order status and metrics display
- Custom variants: KPICardCustom, KPIComparisonCustom, OrderCardCustom

#### UI Components
- **Button (ButtonRadix)** - Versatile button with multiple variants
  - Hierarchies: Primary, Secondary, Alert, Ghost, Plain
  - States: Active, Hovered, Pressed, Disabled
  - Sizes: Small, Medium, Large
- **Loader** - Loading indicators
  - Types: Spinner and Linear
  - Show/hide control
- **Toasts** - Toast notifications
  - Types: Light and Dark
  - Customizable icon and text
  - Close callback
- **Switcher** - Toggle switch component
  - On/Off states
  - Disabled state support
  - Custom callback
- **BannerAlerts** - Alert banners
  - Variants: Warning, Information, Grey
  - Title and description support
- **BrandIcons** - Brand logo icons
  - Multiple sizes
  - Light/Dark modes
  - Gradient options

#### Other Components
- **Header** - Application header component
- **LanguageSwitcher** - Language selection component
- **PaginationLib** - Pagination controls

### Features
- ✅ Full TypeScript support with type definitions
- ✅ Tailwind CSS styling
- ✅ Radix UI primitives for accessibility
- ✅ Lucide React icons integration
- ✅ Responsive design
- ✅ Storybook documentation with 100+ stories
- ✅ Comprehensive test coverage (97+ tests)
- ✅ ESM and CJS bundle support

### Technical
- Built with Vite
- React 18 support
- TypeScript 5.4+
- Tailwind CSS 4
- Radix UI integration
- Vitest for testing

---

## [Unreleased]

### Planned Features
- DataTable component
- Modal/Dialog components
- Form components
- Dropdown menu component
- Tabs component
- Accordion component
- More KPI variants

---

## Migration Guides

### From mi-libreria-react to chiper-components-library

If you were using the library under its previous name `mi-libreria-react`, simply update your imports:

```diff
- import { Button, CardsGrid } from 'mi-libreria-react';
+ import { Button, CardsGrid } from 'chiper-components-library';
```

No other changes are required. All component APIs remain the same.

