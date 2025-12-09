import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TableHeader, TableHeaderFilter, TableHeaderButton, TableHeaderCard } from './index';
import { UserRoundCheck, UserRoundX, UsersRound } from 'lucide-react';

describe('TableHeader', () => {
  describe('Rendering', () => {
    it('renders correctly with minimal props', () => {
      render(<TableHeader />);
      
      expect(screen.getByTestId('table-header')).toBeInTheDocument();
    });

    it('renders search field', () => {
      render(<TableHeader searchPlaceholder="Search users..." />);
      
      const search = screen.getByTestId('table-header-search-input');
      expect(search).toBeInTheDocument();
      expect(search).toHaveAttribute('placeholder', 'Search users...');
    });
  });

  describe('Title', () => {
    it('does not show title by default', () => {
      render(<TableHeader title="My Table" />);
      
      expect(screen.queryByTestId('table-header-title')).not.toBeInTheDocument();
    });

    it('shows title when showTitle is true', () => {
      render(<TableHeader title="My Table" showTitle />);
      
      const title = screen.getByTestId('table-header-title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent('My Table');
    });
  });

  describe('Search', () => {
    it('calls onSearchChange when typing', () => {
      const handleSearch = vi.fn();
      render(<TableHeader onSearchChange={handleSearch} />);
      
      const search = screen.getByTestId('table-header-search-input');
      fireEvent.change(search, { target: { value: 'test' } });
      
      expect(handleSearch).toHaveBeenCalledWith('test');
    });

    it('displays search value', () => {
      render(<TableHeader searchValue="test query" />);
      
      const search = screen.getByTestId('table-header-search-input') as HTMLInputElement;
      expect(search.value).toBe('test query');
    });
  });

  describe('Filters', () => {
    const mockFilters: TableHeaderFilter[] = [
      {
        key: 'status',
        label: 'Status',
        placeholder: 'Status',
        options: [
          { id: 'active', text: 'Active' },
          { id: 'inactive', text: 'Inactive' },
        ],
        onChange: vi.fn(),
      },
      {
        key: 'role',
        label: 'Role',
        placeholder: 'Role',
        options: [
          { id: 'admin', text: 'Admin' },
          { id: 'user', text: 'User' },
        ],
        onChange: vi.fn(),
      },
    ];

    it('shows filters when showFilters is true', () => {
      render(<TableHeader filters={mockFilters} showFilters />);
      
      expect(screen.getByTestId('table-header-filters')).toBeInTheDocument();
    });

    it('hides filters when showFilters is false', () => {
      render(<TableHeader filters={mockFilters} showFilters={false} />);
      
      expect(screen.queryByTestId('table-header-filters')).not.toBeInTheDocument();
    });

    it('renders correct number of filters', () => {
      render(<TableHeader filters={mockFilters} showFilters />);
      
      expect(screen.getByTestId('table-header-filter-0')).toBeInTheDocument();
      expect(screen.getByTestId('table-header-filter-1')).toBeInTheDocument();
    });

    it('shows "Filter by" label', () => {
      render(<TableHeader filters={mockFilters} showFilters />);
      
      expect(screen.getByText('Filter by')).toBeInTheDocument();
    });

    it('uses placeholder as default filter name', () => {
      const filtersWithPlaceholder: TableHeaderFilter[] = [
        {
          key: 'company',
          label: 'Company Filter',
          placeholder: 'Company',
          options: [
            { id: 'company1', text: 'Company A' },
            { id: 'company2', text: 'Company B' },
          ],
          onChange: vi.fn(),
        },
      ];

      render(<TableHeader filters={filtersWithPlaceholder} showFilters />);
      
      // The placeholder should be visible in the Select component
      expect(screen.getByText('Company')).toBeInTheDocument();
    });

    it('falls back to label when no placeholder provided', () => {
      const filtersWithoutPlaceholder: TableHeaderFilter[] = [
        {
          key: 'status',
          label: 'Status Label',
          options: [
            { id: 'active', text: 'Active' },
          ],
          onChange: vi.fn(),
        },
      ];

      render(<TableHeader filters={filtersWithoutPlaceholder} showFilters />);
      
      // Should use label as placeholder
      expect(screen.getByText('Status Label')).toBeInTheDocument();
    });
  });

  describe('Buttons', () => {
    const mockButtons: TableHeaderButton[] = [
      {
        label: 'Bulk',
        variant: 'outline',
        isDropdown: true,
        dropdownOptions: [
          { id: 'delete', text: 'Delete' },
          { id: 'export', text: 'Export' },
        ],
        onDropdownChange: vi.fn(),
      },
      {
        label: 'New SKU',
        variant: 'primary',
        onClick: vi.fn(),
      },
    ];

    it('shows buttons when showButtons is true', () => {
      render(<TableHeader buttons={mockButtons} showButtons />);
      
      expect(screen.getByTestId('table-header-buttons')).toBeInTheDocument();
    });

    it('hides buttons when showButtons is false', () => {
      render(<TableHeader buttons={mockButtons} showButtons={false} />);
      
      expect(screen.queryByTestId('table-header-buttons')).not.toBeInTheDocument();
    });

    it('renders correct number of buttons', () => {
      render(<TableHeader buttons={mockButtons} showButtons />);
      
      expect(screen.getByTestId('table-header-button-0')).toBeInTheDocument();
      expect(screen.getByTestId('table-header-button-1')).toBeInTheDocument();
    });
  });

  describe('Cards', () => {
    const mockCards: TableHeaderCard[] = [
      {
        label: 'Active',
        value: 3,
        icon: <UserRoundCheck size={24} color="#00995a" />,
      },
      {
        label: 'Inactive',
        value: 5,
        icon: <UserRoundX size={24} color="#00995a" />,
      },
      {
        label: 'Total',
        value: 8,
        icon: <UsersRound size={24} color="#00995a" />,
      },
    ];

    it('does not show cards by default', () => {
      render(<TableHeader cards={mockCards} />);
      
      expect(screen.queryByTestId('table-header-cards')).not.toBeInTheDocument();
    });

    it('shows cards when showCards is true', () => {
      render(<TableHeader cards={mockCards} showCards />);
      
      expect(screen.getByTestId('table-header-cards')).toBeInTheDocument();
    });

    it('renders correct number of cards', () => {
      render(<TableHeader cards={mockCards} showCards />);
      
      expect(screen.getByTestId('table-header-card-0')).toBeInTheDocument();
      expect(screen.getByTestId('table-header-card-1')).toBeInTheDocument();
      expect(screen.getByTestId('table-header-card-2')).toBeInTheDocument();
    });

    it('renders card content correctly', () => {
      render(<TableHeader cards={mockCards} showCards />);
      
      expect(screen.getByText('Active')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Inactive')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('renders card icons', () => {
      render(<TableHeader cards={mockCards} showCards />);
      
      expect(screen.getByTestId('table-header-card-icon-0')).toBeInTheDocument();
      expect(screen.getByTestId('table-header-card-icon-1')).toBeInTheDocument();
      expect(screen.getByTestId('table-header-card-icon-2')).toBeInTheDocument();
    });
  });

  describe('Complete Example', () => {
    it('renders all elements together', () => {
      const filters: TableHeaderFilter[] = [
        {
          key: 'status',
          label: 'Status',
          placeholder: 'Status',
          options: [
            { id: 'active', text: 'Active' },
            { id: 'inactive', text: 'Inactive' },
          ],
          onChange: vi.fn(),
        },
      ];

      const buttons: TableHeaderButton[] = [
        {
          label: 'Bulk',
          variant: 'outline',
          isDropdown: true,
          dropdownOptions: [{ id: 'delete', text: 'Delete' }],
          onDropdownChange: vi.fn(),
        },
        {
          label: 'New Item',
          variant: 'primary',
          onClick: vi.fn(),
        },
      ];

      const cards: TableHeaderCard[] = [
        { label: 'Total', value: 10 },
      ];

      render(
        <TableHeader
          title="Users Table"
          showTitle
          searchPlaceholder="Search users..."
          filters={filters}
          showFilters
          buttons={buttons}
          showButtons
          cards={cards}
          showCards
        />
      );

      expect(screen.getByTestId('table-header-title')).toBeInTheDocument();
      expect(screen.getByTestId('table-header-search')).toBeInTheDocument();
      expect(screen.getByTestId('table-header-filters')).toBeInTheDocument();
      expect(screen.getByTestId('table-header-buttons')).toBeInTheDocument();
      expect(screen.getByTestId('table-header-cards')).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<TableHeader className="custom-class" />);
      
      const header = screen.getByTestId('table-header');
      expect(header).toHaveClass('custom-class');
    });
  });

  describe('Edge Cases', () => {
    it('handles empty filters array', () => {
      render(<TableHeader filters={[]} showFilters />);
      
      expect(screen.queryByTestId('table-header-filters')).not.toBeInTheDocument();
    });

    it('handles empty buttons array', () => {
      render(<TableHeader buttons={[]} showButtons />);
      
      expect(screen.queryByTestId('table-header-buttons')).not.toBeInTheDocument();
    });

    it('handles empty cards array', () => {
      render(<TableHeader cards={[]} showCards />);
      
      expect(screen.queryByTestId('table-header-cards')).not.toBeInTheDocument();
    });
  });
});

