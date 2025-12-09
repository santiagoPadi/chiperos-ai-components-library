import React from 'react';
import { cn } from '../../lib/utils';
import { Input } from '../Input';
import { Select, SelectOption } from '../Select';
import { Button } from '../ButtonRadix';
import { ListFilter, Search, ChevronDown } from 'lucide-react';

export interface TableHeaderFilter {
  /**
   * Unique key for the filter
   */
  key: string;
  
  /**
   * Label for the filter (used as placeholder if placeholder not provided)
   */
  label: string;
  
  /**
   * Placeholder text shown when no option is selected
   */
  placeholder?: string;
  
  /**
   * Options for dropdown filter
   */
  options?: SelectOption[];
  
  /**
   * Selected value
   */
  value?: string;
  
  /**
   * Callback when filter changes
   */
  onChange?: (value: string) => void;
}

export interface TableHeaderButton {
  /**
   * Button label
   */
  label: string;
  
  /**
   * Button variant (primary = green, outline = white with border)
   */
  variant?: 'primary' | 'outline';
  
  /**
   * Is this a dropdown button?
   */
  isDropdown?: boolean;
  
  /**
   * Dropdown options (if isDropdown is true)
   */
  dropdownOptions?: SelectOption[];
  
  /**
   * Selected dropdown value
   */
  dropdownValue?: string;
  
  /**
   * Click handler for regular button
   */
  onClick?: () => void;
  
  /**
   * Change handler for dropdown button
   */
  onDropdownChange?: (value: string) => void;
}

export interface TableHeaderCard {
  /**
   * Card label
   */
  label: string;
  
  /**
   * Card value
   */
  value: string | number;
  
  /**
   * Icon element
   */
  icon?: React.ReactNode;
}

export interface TableHeaderProps {
  /**
   * Title shown at the top (optional)
   */
  title?: string;
  
  /**
   * Show title
   */
  showTitle?: boolean;
  
  /**
   * Search placeholder
   */
  searchPlaceholder?: string;
  
  /**
   * Search value
   */
  searchValue?: string;
  
  /**
   * Search callback
   */
  onSearchChange?: (value: string) => void;
  
  /**
   * Array of filters
   */
  filters?: TableHeaderFilter[];
  
  /**
   * Show filters row
   */
  showFilters?: boolean;
  
  /**
   * Array of buttons
   */
  buttons?: TableHeaderButton[];
  
  /**
   * Show buttons
   */
  showButtons?: boolean;
  
  /**
   * Array of KPI cards to show
   */
  cards?: TableHeaderCard[];
  
  /**
   * Show cards
   */
  showCards?: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  title = 'Table Header',
  showTitle = false,
  searchPlaceholder = 'Search by...',
  searchValue = '',
  onSearchChange,
  filters = [],
  showFilters = true,
  buttons = [],
  showButtons = true,
  cards = [],
  showCards = false,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-white rounded-xl p-8',
        'flex flex-col gap-4',
        className
      )}
      data-testid="table-header"
    >
      {/* Title (opcional) */}
      {showTitle && title && (
        <h2
          className="text-xl font-semibold text-[#312e4d]"
          data-testid="table-header-title"
        >
          {title}
        </h2>
      )}
      
      {/* Cards (opcional) */}
      {showCards && cards.length > 0 && (
        <div
          className="flex gap-4 w-full"
          data-testid="table-header-cards"
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-white border border-[#ecebf0] rounded-xl p-4 flex-1 flex gap-2"
              data-testid={`table-header-card-${index}`}
            >
              {card.icon && (
                <div className="shrink-0" data-testid={`table-header-card-icon-${index}`}>
                  {card.icon}
                </div>
              )}
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-base font-medium text-[#575385] leading-5">
                  {card.label}
                </span>
                <span className="text-xl font-semibold text-[#312e4d] leading-[22px]">
                  {card.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Search Field */}
      <div
        className="relative"
        data-testid="table-header-search"
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <Search size={16} className="text-[#312e4d]" />
        </div>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder={searchPlaceholder}
          className={cn(
            'w-full h-11 pl-10 pr-4 py-3',
            'border border-[#ecebf0] rounded',
            'text-base leading-5',
            'placeholder:text-[#a29fba]',
            'focus:outline-none focus:border-[#a29fba]',
            'transition-colors'
          )}
          data-testid="table-header-search-input"
        />
      </div>
      
      {/* Filters and Buttons Row */}
      <div className="flex gap-4 items-center w-full">
        {/* Filters */}
        {showFilters && filters.length > 0 && (
          <div
            className="flex gap-4 items-center"
            data-testid="table-header-filters"
          >
            {/* "Filter by" label */}
            <div className="flex items-center gap-2 py-3">
              <ListFilter size={16} className="text-[#312e4d]" />
              <span className="text-base leading-5 text-[#312e4d]">
                Filter by
              </span>
            </div>
            
            {/* Filter dropdowns */}
            {filters.map((filter, index) => (
              <div
                key={filter.key}
                className="min-w-[120px]"
                data-testid={`table-header-filter-${index}`}
              >
                {filter.options && filter.options.length > 0 ? (
                  <Select
                    options={filter.options}
                    value={filter.value}
                    onChange={(value) => filter.onChange?.(value)}
                    placeholder={filter.placeholder || filter.label}
                    className="h-11"
                  />
                ) : (
                  <button
                    className={cn(
                      'flex items-center gap-2',
                      'border border-[#ecebf0] rounded',
                      'px-4 py-3 h-11',
                      'text-base leading-5 text-[#312e4d]',
                      'hover:border-[#a29fba] transition-colors'
                    )}
                    onClick={() => filter.onChange?.('')}
                  >
                    <span>{filter.placeholder || filter.label}</span>
                    <ChevronDown size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Buttons */}
        {showButtons && buttons.length > 0 && (
          <div
            className="flex gap-4 items-center ml-auto"
            data-testid="table-header-buttons"
          >
            {buttons.map((button, index) => (
              <div
                key={index}
                data-testid={`table-header-button-${index}`}
              >
                {button.isDropdown && button.dropdownOptions ? (
                  /* Dropdown Button */
                  <div className="relative">
                    <Select
                      options={button.dropdownOptions}
                      value={button.dropdownValue}
                      onChange={(value) => button.onDropdownChange?.(value)}
                      placeholder={button.label}
                      className={cn(
                        'h-11',
                        button.variant === 'outline'
                          ? 'border-[#00b56b]'
                          : ''
                      )}
                    />
                  </div>
                ) : (
                  /* Regular Button */
                  <Button
                    variant={button.variant === 'outline' ? 'outline' : 'primary'}
                    onClick={button.onClick}
                    className="h-11"
                  >
                    {button.label}
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TableHeader;

