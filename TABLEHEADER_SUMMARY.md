# TableHeader Component Summary

## 📋 Overview

The `TableHeader` component is a flexible and comprehensive header for data tables, designed from the Figma Portal Design System. It includes search functionality, dynamic filters, action buttons, and optional KPI cards.

## 🎨 Design Source

**Figma Link:** [Portal Design System - Table Header](https://www.figma.com/design/FlGiUejOxsH4oS8frSjDUv/Portal-Design-System?node-id=580-41142)

## ✨ Features

- **Search Field**: Built-in search with callback
- **Dynamic Filters**: Support for N filters with dropdowns
- **Action Buttons**: Configurable buttons (regular and dropdown)
- **KPI Cards**: Optional display of summary cards
- **Fully Controlled**: All elements have callbacks
- **Show/Hide**: Individual control for each section
- **Reuses Components**: Uses Input, Select, Button from the library
- **Fully Typed**: Complete TypeScript support
- **Responsive**: Adapts to container width

## 🔧 Component API

### Main Props

```typescript
interface TableHeaderProps {
  title?: string;                        // Title shown at the top
  showTitle?: boolean;                   // Show title (default: false)
  searchPlaceholder?: string;            // Search placeholder
  searchValue?: string;                  // Controlled search value
  onSearchChange?: (value: string) => void; // Search callback
  filters?: TableHeaderFilter[];         // Array of filters
  showFilters?: boolean;                 // Show filters (default: true)
  buttons?: TableHeaderButton[];         // Array of buttons
  showButtons?: boolean;                 // Show buttons (default: true)
  cards?: TableHeaderCard[];             // Array of KPI cards
  showCards?: boolean;                   // Show cards (default: false)
  className?: string;                    // Additional CSS classes
}
```

### Filter Configuration

```typescript
interface TableHeaderFilter {
  key: string;                           // Unique key for the filter
  label: string;                         // Label for the filter
  placeholder?: string;                  // Placeholder text (default name shown)
  options?: SelectOption[];              // Options for dropdown
  value?: string;                        // Selected value
  onChange?: (value: string) => void;    // Callback when filter changes
}
```

### Button Configuration

```typescript
interface TableHeaderButton {
  label: string;                         // Button label
  variant?: 'primary' | 'outline';       // Button variant
  isDropdown?: boolean;                  // Is this a dropdown?
  dropdownOptions?: SelectOption[];      // Dropdown options
  dropdownValue?: string;                // Selected dropdown value
  onClick?: () => void;                  // Click handler
  onDropdownChange?: (value: string) => void; // Dropdown change handler
}
```

### Card Configuration

```typescript
interface TableHeaderCard {
  label: string;                         // Card label
  value: string | number;                // Card value
  icon?: React.ReactNode;                // Icon element
}
```

## 📦 Usage Examples

### Basic Header (Search Only)

```tsx
import { TableHeader } from 'chiperos-ai-components-library';

function MyTable() {
  return (
    <TableHeader
      searchPlaceholder="Search products..."
      showFilters={false}
      showButtons={false}
    />
  );
}
```

### With Title

```tsx
<TableHeader
  title="Users Management"
  showTitle
  searchPlaceholder="Search users..."
/>
```

### With Filters

```tsx
import { TableHeader, TableHeaderFilter } from 'chiperos-ai-components-library';
import { useState } from 'react';

function MyTable() {
  const [filters, setFilters] = useState({
    status: '',
    role: '',
    company: '',
  });
  
  const filterConfigs: TableHeaderFilter[] = [
    {
      key: 'status',
      label: 'Status',
      placeholder: 'Status',  // Default name shown when no selection
      options: [
        { id: 'active', text: 'Active' },
        { id: 'inactive', text: 'Inactive' },
      ],
      value: filters.status,
      onChange: (value) => setFilters({ ...filters, status: value }),
    },
    {
      key: 'role',
      label: 'Role',
      placeholder: 'Role',  // Default name shown when no selection
      options: [
        { id: 'admin', text: 'Admin' },
        { id: 'user', text: 'User' },
        { id: 'editor', text: 'Editor' },
      ],
      value: filters.role,
      onChange: (value) => setFilters({ ...filters, role: value }),
    },
    {
      key: 'company',
      label: 'Company Filter',
      placeholder: 'Company',  // Shows "Company" in the dropdown
      options: [
        { id: 'company-a', text: 'Company A' },
        { id: 'company-b', text: 'Company B' },
        { id: 'company-c', text: 'Company C' },
      ],
      value: filters.company,
      onChange: (value) => setFilters({ ...filters, company: value }),
    },
  ];
  
  return (
    <TableHeader
      searchPlaceholder="Search users..."
      filters={filterConfigs}
      showFilters
    />
  );
}
```

**Note:** The `placeholder` parameter is optional. If not provided, the `label` will be used as the placeholder text.

### With Buttons

```tsx
import { TableHeader, TableHeaderButton } from 'chiperos-ai-components-library';

function MyTable() {
  const buttons: TableHeaderButton[] = [
    {
      label: 'Bulk',
      variant: 'outline',
      isDropdown: true,
      dropdownOptions: [
        { id: 'delete', text: 'Delete Selected' },
        { id: 'export', text: 'Export Selected' },
        { id: 'archive', text: 'Archive Selected' },
      ],
      onDropdownChange: (value) => handleBulkAction(value),
    },
    {
      label: 'New SKU',
      variant: 'primary',
      onClick: () => handleCreateSKU(),
    },
  ];
  
  return (
    <TableHeader
      searchPlaceholder="Search SKUs..."
      buttons={buttons}
      showButtons
    />
  );
}
```

### With KPI Cards

```tsx
import { TableHeader, TableHeaderCard } from 'chiperos-ai-components-library';
import { UserRoundCheck, UserRoundX, UsersRound } from 'lucide-react';

function MyTable() {
  const cards: TableHeaderCard[] = [
    {
      label: 'Active',
      value: 45,
      icon: <UserRoundCheck size={24} color="#00995a" />,
    },
    {
      label: 'Inactive',
      value: 12,
      icon: <UserRoundX size={24} color="#00995a" />,
    },
    {
      label: 'Total',
      value: 57,
      icon: <UsersRound size={24} color="#00995a" />,
    },
  ];
  
  return (
    <TableHeader
      searchPlaceholder="Search users..."
      cards={cards}
      showCards
    />
  );
}
```

### Complete Example

```tsx
import { TableHeader, TableHeaderFilter, TableHeaderButton, TableHeaderCard } from 'chiperos-ai-components-library';
import { UserRoundCheck, UserRoundX, UsersRound } from 'lucide-react';
import { useState } from 'react';

function MyTable() {
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    role: '',
    department: '',
  });
  
  const filterConfigs: TableHeaderFilter[] = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { id: 'active', text: 'Active' },
        { id: 'inactive', text: 'Inactive' },
      ],
      value: filters.status,
      onChange: (value) => setFilters({ ...filters, status: value }),
    },
    {
      key: 'role',
      label: 'Role',
      options: [
        { id: 'admin', text: 'Admin' },
        { id: 'user', text: 'User' },
        { id: 'editor', text: 'Editor' },
      ],
      value: filters.role,
      onChange: (value) => setFilters({ ...filters, role: value }),
    },
    {
      key: 'department',
      label: 'Department',
      options: [
        { id: 'engineering', text: 'Engineering' },
        { id: 'marketing', text: 'Marketing' },
        { id: 'sales', text: 'Sales' },
      ],
      value: filters.department,
      onChange: (value) => setFilters({ ...filters, department: value }),
    },
  ];
  
  const buttons: TableHeaderButton[] = [
    {
      label: 'Bulk',
      variant: 'outline',
      isDropdown: true,
      dropdownOptions: [
        { id: 'delete', text: 'Delete Selected' },
        { id: 'export', text: 'Export Selected' },
      ],
      onDropdownChange: (value) => handleBulkAction(value),
    },
    {
      label: 'Upload Clients',
      variant: 'primary',
      onClick: () => handleUpload(),
    },
  ];
  
  const cards: TableHeaderCard[] = [
    {
      label: 'Active',
      value: 45,
      icon: <UserRoundCheck size={24} color="#00995a" />,
    },
    {
      label: 'Inactive',
      value: 12,
      icon: <UserRoundX size={24} color="#00995a" />,
    },
    {
      label: 'Total',
      value: 57,
      icon: <UsersRound size={24} color="#00995a" />,
    },
  ];
  
  return (
    <TableHeader
      title="Users Management"
      showTitle
      searchPlaceholder="Search users..."
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      filters={filterConfigs}
      showFilters
      buttons={buttons}
      showButtons
      cards={cards}
      showCards
    />
  );
}
```

### With Table Component

```tsx
import { TableHeader, Table, TableColumn } from 'chiperos-ai-components-library';
import { useState, useMemo } from 'react';

function UsersTable() {
  const [searchValue, setSearchValue] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [data, setData] = useState([/* ... user data ... */]);
  
  // Filter data based on search and filters
  const filteredData = useMemo(() => {
    return data.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchValue.toLowerCase());
      const matchesStatus = !statusFilter || user.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [data, searchValue, statusFilter]);
  
  const filterConfigs: TableHeaderFilter[] = [
    {
      key: 'status',
      label: 'Status',
      options: [
        { id: 'active', text: 'Active' },
        { id: 'inactive', text: 'Inactive' },
      ],
      value: statusFilter,
      onChange: setStatusFilter,
    },
  ];
  
  const columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
  ];
  
  return (
    <div>
      <TableHeader
        searchPlaceholder="Search users..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={filterConfigs}
        showFilters
      />
      
      <Table
        columns={columns}
        data={filteredData}
        rowsPerPage={10}
      />
    </div>
  );
}
```

## 🎯 Key Design Decisions

### 1. **Modular Design**
- Each section (search, filters, buttons, cards) can be shown/hidden independently
- No section is required, allowing for flexible compositions

### 2. **Reuses Existing Components**
- Search uses native input styled to match design
- Filters use Select component
- Buttons use Button component
- Cards use simple div structure (could integrate with KPICard)

### 3. **Controlled Components**
- All filters, search, and dropdowns are controlled
- Parent component manages state
- Callbacks for all interactions

### 4. **Flexible Filters**
- Support for N filters
- Each filter can have its own options
- "Filter by" label automatically shown

### 5. **Button Variants**
- Regular buttons with onClick
- Dropdown buttons using Select
- Primary (green) and Outline (white with border) variants

### 6. **Card Display**
- Optional KPI cards at the top
- Support for custom icons
- Flexible grid layout

## 🧪 Testing

The component includes comprehensive tests covering:

- ✅ Basic rendering
- ✅ Title show/hide
- ✅ Search functionality
- ✅ Filter rendering and callbacks
- ✅ Button rendering (regular and dropdown)
- ✅ Card rendering with icons
- ✅ Show/hide sections
- ✅ Custom className
- ✅ Edge cases (empty arrays)
- ✅ Complete integration

Run tests:
```bash
npm test -- TableHeader.test.tsx
```

## 📖 Storybook

The component includes multiple stories:

- **Default** - Basic header with search only
- **WithTitle** - Header with title
- **WithFilters** - Interactive filters example
- **WithButtons** - Buttons with actions
- **WithCards** - KPI cards display
- **Complete** - All features together with state display
- **OnlySearch** - Minimal configuration
- **SearchAndButtons** - Common pattern
- **ManyFilters** - 5 filters example
- **CustomCards** - Cards without icons

View in Storybook:
```bash
npm run storybook
```

## ♿ Accessibility

- **Semantic HTML**: Uses proper semantic elements
- **Data Attributes**: Testable with data-testid
- **Keyboard Navigation**: Inherits from Button and Select components
- **Focus Management**: Proper focus indicators

## 🎨 Customization

### Custom Styling

```tsx
<TableHeader
  className="shadow-lg max-w-6xl mx-auto"
  searchPlaceholder="Search..."
/>
```

### Dynamic Filters

```tsx
// Add/remove filters dynamically
const [activeFilters, setActiveFilters] = useState<TableHeaderFilter[]>([]);

<TableHeader
  filters={activeFilters}
  showFilters={activeFilters.length > 0}
/>
```

### Conditional Buttons

```tsx
const buttons: TableHeaderButton[] = [
  ...(hasSelection ? [{
    label: 'Bulk',
    variant: 'outline' as const,
    isDropdown: true,
    dropdownOptions: bulkOptions,
    onDropdownChange: handleBulk,
  }] : []),
  {
    label: 'Create',
    variant: 'primary' as const,
    onClick: handleCreate,
  },
];
```

## 📏 Design Tokens

```css
/* Container */
--header-bg: #ffffff;
--header-padding: 32px;
--header-border-radius: 12px;
--header-gap: 16px;

/* Search */
--search-height: 44px;
--search-padding: 12px 16px;
--search-border: #ecebf0;
--search-placeholder: #a29fba;

/* Filters */
--filter-height: 44px;
--filter-padding: 12px 16px;
--filter-border: #ecebf0;
--filter-gap: 16px;

/* Buttons */
--button-height: 44px;
--button-padding: 12px 20px;
--button-primary-bg: #00b56b;
--button-outline-border: #00b56b;

/* Cards */
--card-padding: 16px;
--card-gap: 8px;
--card-border: #ecebf0;
--card-label-color: #575385;
--card-value-color: #312e4d;
```

## 🔗 Related Components

- **Table** - Works seamlessly with TableHeader
- **Input** - Could be used for custom search implementations
- **Select** - Used internally for filters and dropdown buttons
- **Button** - Used internally for action buttons
- **KPICard** - Could replace card rendering

## 📝 Notes

- Search is always shown (can be hidden with custom CSS if needed)
- "Filter by" label appears only when filters are present
- Buttons are right-aligned automatically
- Cards support max 5 per row (per Figma annotation)
- All callbacks are optional
- Empty filter/button/card arrays hide their sections
- **Filter placeholder**: Use the `placeholder` parameter to set the default text shown in the dropdown (e.g., "Company", "Status"). If not provided, the `label` is used as fallback.

## 🚀 Future Enhancements

Potential future additions:
- Export button with CSV/Excel formats
- Date range picker filter type
- Multi-select filters
- Filter chips showing active filters
- Clear all filters button
- Search with debounce option
- Advanced search modal
- Saved filter presets
- Custom card components
- Mobile responsive stacking

## 💡 Common Patterns

### Server-side Filtering

```tsx
function MyTable() {
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    setLoading(true);
    fetchData(filters).then((result) => {
      setData(result);
      setLoading(false);
    });
  }, [filters]);
  
  return (
    <>
      <TableHeader
        filters={filterConfigs}
        onSearchChange={(value) => setFilters({ ...filters, search: value })}
      />
      <Table data={data} loading={loading} />
    </>
  );
}
```

### Bulk Actions

```tsx
function MyTable() {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  const bulkOptions = [
    { id: 'delete', text: 'Delete' },
    { id: 'export', text: 'Export' },
    { id: 'archive', text: 'Archive' },
  ];
  
  const handleBulkAction = (action: string) => {
    switch (action) {
      case 'delete':
        deleteRows(selectedRows);
        break;
      case 'export':
        exportRows(selectedRows);
        break;
      // ...
    }
  };
  
  const buttons: TableHeaderButton[] = [
    ...(selectedRows.length > 0 ? [{
      label: `Bulk (${selectedRows.length})`,
      variant: 'outline' as const,
      isDropdown: true,
      dropdownOptions: bulkOptions,
      onDropdownChange: handleBulkAction,
    }] : []),
  ];
  
  return <TableHeader buttons={buttons} />;
}
```

---

**Component Status:** ✅ Production Ready

**Files:**
- `src/components/TableHeader/index.tsx` - Main component
- `src/components/TableHeader/TableHeader.test.tsx` - Unit tests
- `src/components/TableHeader/TableHeader.stories.tsx` - Storybook stories

**Figma:** [View Design](https://www.figma.com/design/FlGiUejOxsH4oS8frSjDUv/Portal-Design-System?node-id=580-41142)

**Dependencies:**
- `Input` - For search (using native input styled)
- `Select` - For filter dropdowns and dropdown buttons
- `Button` - For action buttons
- `lucide-react` - For icons (Search, ListFilter, ChevronDown)

