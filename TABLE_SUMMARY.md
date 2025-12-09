# Table Component Summary

## 📋 Overview

The `Table` component is a flexible and powerful data table built from the Figma Portal Design System. It supports custom column rendering, pagination, loading states, and fully responsive design.

## 🎨 Design Source

**Figma Link:** [Portal Design System - Table Section](https://www.figma.com/design/FlGiUejOxsH4oS8frSjDUv/Portal-Design-System?node-id=11-2643)

## ✨ Features

- **Flexible Columns**: Define N columns with custom rendering
- **Dynamic Data**: Support for N rows with automatic pagination
- **Built-in Pagination**: Uses PaginationLib component
- **Custom Rendering**: Custom render functions for each column
- **Two-line Cells**: Support for primary and secondary text
- **Loading State**: Built-in loading indicator
- **Empty State**: Customizable empty message
- **Controlled/Uncontrolled**: Supports both pagination modes
- **Fully Typed**: Complete TypeScript support
- **Responsive**: Adapts to container width

## 🔧 Component API

### Props

```typescript
interface TableColumn<T = any> {
  key: string;                      // Unique key for the column
  label: string;                    // Header label
  render?: (row: T, rowIndex: number) => React.ReactNode; // Custom renderer
  className?: string;               // Column CSS classes
}

interface TableProps<T = any> {
  columns: TableColumn<T>[];        // Array of column definitions
  data: T[];                        // Array of data rows
  rowsPerPage?: number;             // Rows per page (default: 10)
  showPagination?: boolean;         // Show pagination (default: true)
  className?: string;               // Container CSS classes
  rowClassName?: string | ((row: T, rowIndex: number) => string); // Row classes
  onPageChange?: (page: number) => void; // Page change callback
  currentPage?: number;             // Controlled page number
  loading?: boolean;                // Loading state
  emptyMessage?: string;            // Empty state message
}
```

## 📦 Usage Examples

### Basic Table

```tsx
import { Table, TableColumn } from 'chiperos-ai-components-library';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const columns: TableColumn<User>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
];

const data: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
];

function MyTable() {
  return (
    <Table
      columns={columns}
      data={data}
      showPagination={false}
    />
  );
}
```

### With Pagination

```tsx
const largeData = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: 'User',
}));

<Table
  columns={columns}
  data={largeData}
  rowsPerPage={10}
  showPagination={true}
/>
```

### Custom Cell Rendering

```tsx
const columns: TableColumn<User>[] = [
  { key: 'id', label: 'ID' },
  {
    key: 'name',
    label: 'Name',
    render: (row) => <strong style={{ color: '#00995a' }}>{row.name}</strong>,
  },
  { key: 'email', label: 'Email' },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <span
        style={{
          padding: '2px 8px',
          borderRadius: '4px',
          backgroundColor: row.status === 'Active' ? '#e6f4ed' : '#f4f4f4',
          color: row.status === 'Active' ? '#00995a' : '#a29fba',
        }}
      >
        {row.status}
      </span>
    ),
  },
];
```

### Two-line Cells

```tsx
// Data with primary and secondary text
const data = [
  {
    id: 1,
    userInfo: {
      primary: 'John Doe',
      secondary: 'john@example.com',
    },
    role: 'Admin',
  },
];

const columns: TableColumn[] = [
  { key: 'id', label: 'ID' },
  { key: 'userInfo', label: 'User Info' }, // Automatically renders two lines
  { key: 'role', label: 'Role' },
];

<Table columns={columns} data={data} />
```

### Controlled Pagination

```tsx
import { useState } from 'react';

function MyTable() {
  const [currentPage, setCurrentPage] = useState(1);
  
  return (
    <Table
      columns={columns}
      data={largeData}
      rowsPerPage={10}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}
```

### Loading State

```tsx
function MyTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);
  
  return (
    <Table
      columns={columns}
      data={data}
      loading={loading}
    />
  );
}
```

### Empty State

```tsx
<Table
  columns={columns}
  data={[]}
  emptyMessage="No users found. Try adding some!"
/>
```

### Conditional Row Styling

```tsx
<Table
  columns={columns}
  data={data}
  rowClassName={(row) =>
    row.status === 'Active' ? '' : 'opacity-50'
  }
/>
```

### With Actions Column

```tsx
const columns: TableColumn<User>[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  {
    key: 'actions',
    label: 'Actions',
    render: (row) => (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={() => handleEdit(row)}>Edit</button>
        <button onClick={() => handleDelete(row)}>Delete</button>
      </div>
    ),
  },
];
```

### Dynamic Columns

```tsx
function MyTable() {
  const [visibleColumns, setVisibleColumns] = useState(['id', 'name', 'email']);
  
  const allColumns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ];
  
  const filteredColumns = allColumns.filter((col) =>
    visibleColumns.includes(col.key)
  );
  
  return <Table columns={filteredColumns} data={data} />;
}
```

## 🎯 Key Design Decisions

### 1. **Column Configuration**
- Columns defined via simple array of objects
- `key` accesses data property by default
- Custom `render` function for complex cells

### 2. **Automatic Cell Rendering**
- Simple values: rendered as text
- Objects with `{primary, secondary}`: rendered as two-line cells
- Null/undefined: rendered as dash (-)

### 3. **Pagination Integration**
- Uses existing `PaginationLib` component
- Positioned bottom-right as per design
- Automatic page calculation

### 4. **Responsive Design**
- Table fills container width
- Columns use `flex-1` for equal distribution
- Can override with custom column className

### 5. **TypeScript Generics**
- Table is generic `<T>` for type safety
- Columns are typed with data structure
- Custom render functions are fully typed

## 🧪 Testing

The component includes comprehensive tests covering:

- ✅ Basic rendering with columns and data
- ✅ Custom render functions
- ✅ Two-line cell rendering
- ✅ Pagination functionality
- ✅ Controlled vs uncontrolled pagination
- ✅ Loading state
- ✅ Empty state with custom message
- ✅ Row and column styling
- ✅ Large datasets
- ✅ Edge cases (empty columns, single row, many columns)

Run tests:
```bash
npm test -- Table.test.tsx
```

## 📖 Storybook

The component includes multiple stories:

- **Default** - Basic table
- **WithPagination** - Table with 25 rows
- **CustomRowsPerPage** - Different page sizes
- **Loading** - Loading state
- **Empty** - Empty state
- **CustomEmptyMessage** - Custom empty message
- **WithCustomRender** - Custom cell rendering
- **WithTwoLineCell** - Two-line cells
- **ManyColumns** - 7+ columns
- **RowHighlighting** - Conditional row styling
- **Interactive** - Dynamic page size control
- **ClickableRows** - Actions in cells
- **SortableExample** - Sortable columns

View in Storybook:
```bash
npm run storybook
```

## ♿ Accessibility

- **Semantic HTML**: Uses proper div structure
- **Data Attributes**: Testable with data-testid
- **ARIA**: Compatible with screen readers
- **Keyboard Navigation**: Works with PaginationLib keyboard support

## 🎨 Customization

### Custom Column Width

```tsx
const columns: TableColumn[] = [
  { key: 'id', label: 'ID', className: 'w-20' },
  { key: 'name', label: 'Name', className: 'flex-[2]' }, // 2x width
  { key: 'email', label: 'Email' },
];
```

### Custom Table Styling

```tsx
<Table
  className="shadow-lg max-w-6xl"
  columns={columns}
  data={data}
/>
```

### Custom Row Styling

```tsx
// String className
<Table
  rowClassName="hover:bg-gray-50"
  columns={columns}
  data={data}
/>

// Function className
<Table
  rowClassName={(row, index) =>
    index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
  }
  columns={columns}
  data={data}
/>
```

## 📏 Design Tokens

```css
/* Container */
--table-bg: #ffffff;
--table-padding: 32px;
--table-border-radius: 12px;
--table-gap: 16px;

/* Header */
--header-font-weight: 600;
--header-font-size: 14px;
--header-line-height: 18px;
--header-text-color: #312e4d;
--header-padding-x: 16px;
--header-padding-y: 12px;
--header-border: #ecebf0;

/* Row */
--row-padding-x: 16px;
--row-padding-y: 12px;
--row-border: #ecebf0;
--row-gap: 12px;

/* Cell */
--cell-primary-text: #312e4d;
--cell-primary-size: 14px;
--cell-primary-line-height: 18px;
--cell-secondary-text: #575385;
--cell-secondary-size: 12px;

/* States */
--loading-text: #a29fba;
--empty-text: #a29fba;
```

## 🔗 Related Components

- **PaginationLib** - Used for pagination controls
- **Input** - Can be used in table filters
- **Select** - Can be used in table dropdowns
- **Button** - Can be used in action columns

## 📝 Notes

- Data can be any type with TypeScript generics
- Columns automatically render based on data structure
- Pagination shows only when totalPages > 1
- Loading state hides data and pagination
- Empty state shows when data array is empty
- Each row is keyed by index (consider adding unique IDs)

## 🚀 Future Enhancements

Potential future additions:
- Column sorting (ascending/descending)
- Column resizing
- Row selection (checkboxes)
- Sticky header
- Virtual scrolling for large datasets
- Column reordering
- Export to CSV/Excel
- Search/filter functionality
- Expandable rows
- Fixed column widths
- Column visibility toggle

## 💡 Common Patterns

### Server-side Pagination

```tsx
function ServerTable() {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const rowsPerPage = 10;
  
  useEffect(() => {
    setLoading(true);
    fetchDataFromAPI(page, rowsPerPage).then((result) => {
      setData(result.data);
      setLoading(false);
    });
  }, [page]);
  
  return (
    <Table
      columns={columns}
      data={data}
      rowsPerPage={rowsPerPage}
      currentPage={page}
      onPageChange={setPage}
      loading={loading}
    />
  );
}
```

### With Filters

```tsx
function FilteredTable() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <>
      <Input
        placeholder="Search by name..."
        value={searchTerm}
        onChange={setSearchTerm}
      />
      <Table columns={columns} data={filteredData} />
    </>
  );
}
```

---

**Component Status:** ✅ Production Ready

**Files:**
- `src/components/Table/index.tsx` - Main component
- `src/components/Table/Table.test.tsx` - Unit tests
- `src/components/Table/Table.stories.tsx` - Storybook stories

**Figma:** [View Design](https://www.figma.com/design/FlGiUejOxsH4oS8frSjDUv/Portal-Design-System?node-id=11-2643)

**Dependencies:**
- `PaginationLib` - Internal pagination component

