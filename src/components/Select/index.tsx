import { forwardRef, useState, useRef, useEffect, useCallback } from 'react';
import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import { cn } from '../../lib/utils';
import { ChevronDown, Check, X, Search } from 'lucide-react';

// Debounce delay in milliseconds
const SEARCH_DEBOUNCE_DELAY = 2000;

export interface SelectOption {
  id: string;
  text: string;
}

// Base props shared between single and multiple select
interface SelectBaseProps {
  /**
   * Whether the select is disabled
   */
  disabled?: boolean;

  /**
   * Array of options to display
   */
  options: SelectOption[];

  /**
   * Placeholder text when no option is selected
   */
  placeholder?: string;

  /**
   * Label text shown above the selected value
   */
  label?: string;

  /**
   * Visual variant of the select
   * - default: white background with border
   * - primary: green background like primary button
   */
  variant?: 'default' | 'primary';

  /**
   * Additional CSS classes
   */
  className?: string;

  /**
   * Enable search functionality
   * When true, the select includes a search input with debounce
   */
  search?: boolean;

  /**
   * Callback fired when search input changes (with 2 second debounce)
   * Only used when search is true
   */
  onSearch?: (searchTerm: string) => void;

  /**
   * Placeholder text for the search input
   */
  searchPlaceholder?: string;
}

// Single select props
interface SingleSelectProps extends SelectBaseProps {
  /**
   * Enable multiple selection mode
   */
  multiple?: false;

  /**
   * The currently selected value (id) - single string for single select
   */
  value?: string;

  /**
   * Callback fired when selection changes - returns single string for single select
   */
  onChange?: (value: string) => void;
}

// Multiple select props
interface MultipleSelectProps extends SelectBaseProps {
  /**
   * Enable multiple selection mode
   */
  multiple: true;

  /**
   * The currently selected values (ids) - array of strings for multiple select
   */
  value?: string[];

  /**
   * Callback fired when selection changes - returns array of strings for multiple select
   */
  onChange?: (values: string[]) => void;
}

export type SelectProps = SingleSelectProps | MultipleSelectProps;

// Custom hook for debounce
function useDebounce(callback: (value: string) => void, delay: number) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedCallback = useCallback(
    (value: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callback(value);
      }, delay);
    },
    [callback, delay]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}

// Multi-select component using Popover + Checkboxes
const MultiSelect = forwardRef<HTMLButtonElement, MultipleSelectProps>(
  (
    {
      value = [],
      onChange,
      disabled = false,
      options = [],
      placeholder = 'Select options',
      label,
      variant = 'default',
      className,
      search = false,
      onSearch,
      searchPlaceholder = 'Search...',
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const isPrimary = variant === 'primary';

    // Debounced search callback
    const debouncedSearch = useDebounce(
      useCallback(
        (term: string) => {
          if (onSearch) {
            onSearch(term);
          }
        },
        [onSearch]
      ),
      SEARCH_DEBOUNCE_DELAY
    );

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearchTerm(newValue);
      debouncedSearch(newValue);
    };

    // Focus search input when dropdown opens
    useEffect(() => {
      if (open && search && searchInputRef.current) {
        // Small delay to ensure the popover is rendered
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 50);
      }
      // Clear search when closing
      if (!open) {
        setSearchTerm('');
      }
    }, [open, search]);

    // Filter options based on search term (local filtering)
    const filteredOptions = search && searchTerm
      ? options.filter((opt) =>
          opt.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    // Get selected options
    const selectedOptions = options.filter((opt) => value.includes(opt.id));
    const hasSelection = selectedOptions.length > 0;

    // Display text: show count or comma-separated names
    const getDisplayText = () => {
      if (selectedOptions.length === 0) return placeholder;
      if (selectedOptions.length === 1) return selectedOptions[0].text;
      if (selectedOptions.length <= 2) {
        return selectedOptions.map((o) => o.text).join(', ');
      }
      return `${selectedOptions.length} selected`;
    };

    const handleToggleOption = (optionId: string) => {
      if (!onChange) return;
      
      const newValue = value.includes(optionId)
        ? value.filter((id) => id !== optionId)
        : [...value, optionId];
      
      onChange(newValue);
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (onChange) {
        onChange([]);
      }
    };

    // Merge refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(triggerRef.current);
        } else {
          ref.current = triggerRef.current;
        }
      }
    }, [ref]);

    // Handle click on trigger - first click opens, input only active when open
    const handleTriggerClick = () => {
      if (!disabled && !open) {
        setOpen(true);
      }
    };

    // Render options list (shared between search and non-search modes)
    const renderOptions = () => (
      <div className="p-1 max-h-[250px] overflow-y-auto">
        {filteredOptions.length === 0 ? (
          <div className="px-4 py-3 text-sm text-[#a29fba] text-center">
            No options found
          </div>
        ) : (
          filteredOptions.map((option) => {
            const isChecked = value.includes(option.id);
            return (
              <div
                key={option.id}
                className={cn(
                  'relative flex items-center gap-3',
                  'px-4 py-2',
                  'text-sm leading-4 text-[#312e4d]',
                  'rounded',
                  'cursor-pointer',
                  'select-none',
                  'outline-none',
                  'transition-colors',
                  'hover:bg-[#f4f4f4]',
                  isChecked && 'bg-[#ecebf0]',
                  isPrimary && 'whitespace-nowrap'
                )}
                onClick={() => handleToggleOption(option.id)}
                data-testid={`select-option-${option.id}`}
              >
                <Checkbox.Root
                  checked={isChecked}
                  onCheckedChange={() => handleToggleOption(option.id)}
                  className={cn(
                    'flex h-4 w-4 shrink-0 items-center justify-center',
                    'rounded border',
                    'transition-colors',
                    isChecked
                      ? 'bg-[#00b56b] border-[#00b56b]'
                      : 'border-[#a29fba] bg-white'
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox.Indicator>
                    <Check size={12} className="text-white" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="flex-1">{option.text}</span>
              </div>
            );
          })
        )}
      </div>
    );

    // Search mode: trigger IS the input (but input only active when open)
    if (search) {
      return (
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Anchor asChild>
            <div
              onClick={handleTriggerClick}
              className={cn(
                'relative flex items-center gap-2',
                'rounded',
                'transition-all',
                !open && 'cursor-pointer',
                !isPrimary && [
                  'w-full',
                  'border border-[#ecebf0]',
                  'bg-white',
                  'hover:border-[#a29fba]',
                  open && 'border-[#a29fba]',
                  disabled && 'opacity-50 cursor-not-allowed bg-[#f4f4f4]',
                ],
                isPrimary && [
                  'bg-[#00b56b]',
                  'border border-[#00b56b]',
                  'hover:bg-[#00995a] hover:border-[#00995a]',
                  open && 'bg-[#00995a] border-[#00995a]',
                  disabled && 'bg-[#e0e0e0] border-[#e0e0e0] cursor-not-allowed',
                ],
                className
              )}
              data-testid="select-trigger"
            >
              {/* Search icon - only shown when open */}
              {open && (
                <Search
                  size={16}
                  className={cn(
                    'absolute left-4 shrink-0',
                    isPrimary ? 'text-white/70' : 'text-[#a29fba]'
                  )}
                />
              )}
              
              {/* Input field - only editable when open */}
              <input
                ref={searchInputRef}
                type="text"
                value={open ? searchTerm : (hasSelection ? getDisplayText() : '')}
                onChange={handleSearchChange}
                readOnly={!open}
                placeholder={open ? (searchPlaceholder || placeholder) : (hasSelection ? getDisplayText() : placeholder)}
                disabled={disabled}
                className={cn(
                  'flex-1 w-full py-3',
                  'bg-transparent',
                  'text-sm leading-4',
                  'rounded',
                  'focus:outline-none',
                  // Padding left changes based on whether search icon is shown
                  open ? 'pl-10' : 'pl-4',
                  // Cursor changes based on state
                  !open && 'cursor-pointer',
                  !isPrimary && [
                    'text-[#312e4d]',
                    'placeholder:text-[#a29fba]',
                  ],
                  isPrimary && [
                    'text-white',
                    'placeholder:text-white/70',
                  ],
                  disabled && 'cursor-not-allowed',
                  // Adjust padding based on whether clear button is shown
                  hasSelection && !disabled ? 'pr-16' : 'pr-10'
                )}
                data-testid="select-search-input"
              />

              {/* Clear button for multiple selections */}
              {hasSelection && !disabled && (
                <span
                  role="button"
                  tabIndex={0}
                  onClick={handleClearAll}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleClearAll(e as unknown as React.MouseEvent);
                    }
                  }}
                  className={cn(
                    'absolute right-8 shrink-0 p-0.5 rounded-full transition-colors cursor-pointer',
                    isPrimary
                      ? 'hover:bg-white/20 text-white'
                      : 'hover:bg-[#ecebf0] text-[#575385]'
                  )}
                  data-testid="select-clear"
                  aria-label="Clear selection"
                >
                  <X size={14} />
                </span>
              )}

              {/* Chevron icon */}
              <ChevronDown
                size={16}
                className={cn(
                  'absolute right-4 shrink-0 transition-transform pointer-events-none',
                  open && 'rotate-180',
                  isPrimary ? 'text-white' : 'text-[#312e4d]'
                )}
                data-testid="select-icon"
              />
            </div>
          </Popover.Anchor>

          <Popover.Portal>
            <Popover.Content
              className={cn(
                'overflow-hidden',
                'bg-white',
                'rounded',
                'border border-[#ecebf0]',
                'shadow-lg',
                'z-50',
                isPrimary
                  ? 'min-w-[var(--radix-popover-trigger-width)]'
                  : 'w-[var(--radix-popover-trigger-width)]'
              )}
              sideOffset={4}
              align={isPrimary ? 'end' : 'start'}
              onOpenAutoFocus={(e) => e.preventDefault()}
              data-testid="select-content"
            >
              {renderOptions()}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      );
    }

    // Non-search mode: regular button trigger
    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild disabled={disabled}>
          <button
            ref={triggerRef}
            type="button"
            className={cn(
              // Layout
              'flex items-center justify-center gap-2',
              'px-4 py-3',
              'rounded',
              'font-semibold',

              // Typography
              'text-left',

              // States
              'transition-all',
              'focus:outline-none focus:ring-0',

              // Default variant
              !isPrimary && [
                'w-full',
                'border border-[#ecebf0]',
                'bg-white',
                'hover:border-[#a29fba]',
                'focus:border-[#a29fba]',
                open && 'border-[#a29fba]',
                disabled && 'opacity-50 cursor-not-allowed bg-[#f4f4f4]',
              ],

              // Primary variant (like primary button)
              isPrimary && [
                'bg-[#00b56b] text-white',
                'border border-[#00b56b]',
                'hover:bg-[#00995a] hover:border-[#00995a]',
                'active:bg-[#007a48] active:border-[#007a48]',
                open && 'bg-[#00995a] border-[#00995a]',
                disabled && 'bg-[#e0e0e0] border-[#e0e0e0] text-[#9e9e9e] cursor-not-allowed',
              ],

              className
            )}
            data-testid="select-trigger"
            aria-label={label || placeholder}
            disabled={disabled}
          >
            {/* For default variant: show label and value stacked */}
            {!isPrimary && (
              <div className="flex flex-col flex-1 min-w-0">
                {/* Label (shown only when no value is selected) */}
                {label && !hasSelection && (
                  <span
                    className="text-xs leading-normal font-medium text-[#575385]"
                    data-testid="select-label"
                  >
                    {label}
                  </span>
                )}

                {/* Selected value or placeholder */}
                <span
                  className={cn(
                    'text-sm leading-4 font-normal truncate',
                    hasSelection ? 'text-[#312e4d]' : 'text-[#312e4d]',
                    !hasSelection && !label && 'text-base leading-5'
                  )}
                  data-testid="select-value"
                >
                  {getDisplayText()}
                </span>
              </div>
            )}

            {/* For primary variant: show label (if provided) and value */}
            {isPrimary && (
              <div className="flex flex-col min-w-0">
                {/* Label (shown only when no value is selected) */}
                {label && !hasSelection && (
                  <span
                    className="text-xs leading-normal text-white"
                    data-testid="select-label"
                  >
                    {label}
                  </span>
                )}

                {/* Selected value or placeholder */}
                <span
                  className="text-sm leading-4 whitespace-nowrap"
                  data-testid="select-value"
                >
                  {getDisplayText()}
                </span>
              </div>
            )}

            {/* Clear button for multiple selections */}
            {hasSelection && !disabled && (
              <span
                role="button"
                tabIndex={0}
                onClick={handleClearAll}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleClearAll(e as unknown as React.MouseEvent);
                  }
                }}
                className={cn(
                  'shrink-0 p-0.5 rounded-full transition-colors cursor-pointer',
                  isPrimary
                    ? 'hover:bg-white/20 text-white'
                    : 'hover:bg-[#ecebf0] text-[#575385]'
                )}
                data-testid="select-clear"
                aria-label="Clear selection"
              >
                <X size={14} />
              </span>
            )}

            <ChevronDown
              size={16}
              className={cn(
                'shrink-0 transition-transform',
                open && 'rotate-180',
                isPrimary ? 'text-white' : 'text-[#312e4d]'
              )}
              data-testid="select-icon"
            />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className={cn(
              'overflow-hidden',
              'bg-white',
              'rounded',
              'border border-[#ecebf0]',
              'shadow-lg',
              'z-50',
              isPrimary
                ? 'min-w-[var(--radix-popover-trigger-width)]'
                : 'w-[var(--radix-popover-trigger-width)]'
            )}
            sideOffset={4}
            align={isPrimary ? 'end' : 'start'}
            data-testid="select-content"
          >
            {renderOptions()}
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';

// Single select component - uses Popover when search is enabled, otherwise Radix Select
const SingleSelect = forwardRef<HTMLButtonElement, SingleSelectProps>(
  (
    {
      value,
      onChange,
      disabled = false,
      options = [],
      placeholder = 'Select an option',
      label,
      variant = 'default',
      className,
      search = false,
      onSearch,
      searchPlaceholder = 'Search...',
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const triggerRef = useRef<HTMLButtonElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    
    const selectedOption = options.find((opt) => opt.id === value);
    const displayText = selectedOption?.text || placeholder;
    const isPrimary = variant === 'primary';

    // Debounced search callback
    const debouncedSearch = useDebounce(
      useCallback(
        (term: string) => {
          if (onSearch) {
            onSearch(term);
          }
        },
        [onSearch]
      ),
      SEARCH_DEBOUNCE_DELAY
    );

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearchTerm(newValue);
      debouncedSearch(newValue);
    };

    // Focus search input when dropdown opens
    useEffect(() => {
      if (open && search && searchInputRef.current) {
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 50);
      }
      if (!open) {
        setSearchTerm('');
      }
    }, [open, search]);

    // Filter options based on search term
    const filteredOptions = search && searchTerm
      ? options.filter((opt) =>
          opt.text.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;

    const handleValueChange = (newValue: string) => {
      if (onChange) {
        onChange(newValue);
      }
    };

    const handleSelectOption = (optionId: string) => {
      handleValueChange(optionId);
      setOpen(false);
    };

    // Merge refs
    useEffect(() => {
      if (ref) {
        if (typeof ref === 'function') {
          ref(triggerRef.current);
        } else {
          ref.current = triggerRef.current;
        }
      }
    }, [ref]);

    // Handle click on trigger - first click opens, input only active when open
    const handleTriggerClick = () => {
      if (!disabled && !open) {
        setOpen(true);
      }
    };

    // Use Popover-based select when search is enabled - trigger IS the input
    if (search) {
      return (
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Anchor asChild>
            <div
              onClick={handleTriggerClick}
              className={cn(
                'relative flex items-center gap-2',
                'rounded',
                'transition-all',
                !open && 'cursor-pointer',
                !isPrimary && [
                  'w-full',
                  'border border-[#ecebf0]',
                  'bg-white',
                  'hover:border-[#a29fba]',
                  open && 'border-[#a29fba]',
                  disabled && 'opacity-50 cursor-not-allowed bg-[#f4f4f4]',
                ],
                isPrimary && [
                  'bg-[#00b56b]',
                  'border border-[#00b56b]',
                  'hover:bg-[#00995a] hover:border-[#00995a]',
                  open && 'bg-[#00995a] border-[#00995a]',
                  disabled && 'bg-[#e0e0e0] border-[#e0e0e0] cursor-not-allowed',
                ],
                className
              )}
              data-testid="select-trigger"
            >
              {/* Search icon - only shown when open */}
              {open && (
                <Search
                  size={16}
                  className={cn(
                    'absolute left-4 shrink-0',
                    isPrimary ? 'text-white/70' : 'text-[#a29fba]'
                  )}
                />
              )}
              
              {/* Input field - only editable when open */}
              <input
                ref={searchInputRef}
                type="text"
                value={open ? searchTerm : (selectedOption?.text || '')}
                onChange={handleSearchChange}
                readOnly={!open}
                placeholder={open ? (searchPlaceholder || placeholder) : (selectedOption?.text || placeholder)}
                disabled={disabled}
                className={cn(
                  'flex-1 w-full pr-10 py-3',
                  'bg-transparent',
                  'text-sm leading-4',
                  'rounded',
                  'focus:outline-none',
                  // Padding left changes based on whether search icon is shown
                  open ? 'pl-10' : 'pl-4',
                  // Cursor changes based on state
                  !open && 'cursor-pointer',
                  !isPrimary && [
                    'text-[#312e4d]',
                    'placeholder:text-[#a29fba]',
                  ],
                  isPrimary && [
                    'text-white',
                    'placeholder:text-white/70',
                  ],
                  disabled && 'cursor-not-allowed'
                )}
                data-testid="select-search-input"
              />

              {/* Chevron icon */}
              <ChevronDown
                size={16}
                className={cn(
                  'absolute right-4 shrink-0 transition-transform pointer-events-none',
                  open && 'rotate-180',
                  isPrimary ? 'text-white' : 'text-[#312e4d]'
                )}
                data-testid="select-icon"
              />
            </div>
          </Popover.Anchor>

          <Popover.Portal>
            <Popover.Content
              className={cn(
                'overflow-hidden',
                'bg-white',
                'rounded',
                'border border-[#ecebf0]',
                'shadow-lg',
                'z-50',
                isPrimary
                  ? 'min-w-[var(--radix-popover-trigger-width)]'
                  : 'w-[var(--radix-popover-trigger-width)]'
              )}
              sideOffset={4}
              align={isPrimary ? 'end' : 'start'}
              onOpenAutoFocus={(e) => e.preventDefault()}
              data-testid="select-content"
            >
              <div className="p-1 max-h-[250px] overflow-y-auto">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-[#a29fba] text-center">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option) => (
                    <div
                      key={option.id}
                      className={cn(
                        'relative flex items-center',
                        'px-4 py-2',
                        'text-sm leading-4 text-[#312e4d]',
                        'rounded',
                        'cursor-pointer',
                        'select-none',
                        'outline-none',
                        'transition-colors',
                        'hover:bg-[#f4f4f4]',
                        value === option.id && 'bg-[#ecebf0]',
                        isPrimary && 'whitespace-nowrap'
                      )}
                      onClick={() => handleSelectOption(option.id)}
                      data-testid={`select-option-${option.id}`}
                    >
                      <span className="flex-1">{option.text}</span>
                      {value === option.id && (
                        <Check size={16} className="text-[#00b56b] shrink-0" />
                      )}
                    </div>
                  ))
                )}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      );
    }

    // Standard Radix Select for non-search mode
    return (
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild disabled={disabled}>
          <button
            ref={triggerRef}
            type="button"
            className={cn(
              'flex items-center justify-center gap-2',
              'px-4 py-3',
              'rounded',
              'font-semibold',
              'text-left',
              'transition-all',
              'focus:outline-none focus:ring-0',
              !isPrimary && [
                'w-full',
                'border border-[#ecebf0]',
                'bg-white',
                'hover:border-[#a29fba]',
                'focus:border-[#a29fba]',
                open && 'border-[#a29fba]',
                disabled && 'opacity-50 cursor-not-allowed bg-[#f4f4f4]',
              ],
              isPrimary && [
                'bg-[#00b56b] text-white',
                'border border-[#00b56b]',
                'hover:bg-[#00995a] hover:border-[#00995a]',
                'active:bg-[#007a48] active:border-[#007a48]',
                open && 'bg-[#00995a] border-[#00995a]',
                disabled && 'bg-[#e0e0e0] border-[#e0e0e0] text-[#9e9e9e] cursor-not-allowed',
              ],
              className
            )}
            data-testid="select-trigger"
            aria-label={label || placeholder}
            disabled={disabled}
          >
            {!isPrimary && (
              <div className="flex flex-col flex-1 min-w-0">
                {label && !selectedOption && (
                  <span
                    className="text-xs leading-normal font-medium text-[#575385]"
                    data-testid="select-label"
                  >
                    {label}
                  </span>
                )}
                <span
                  className={cn(
                    'text-sm leading-4 font-normal truncate',
                    selectedOption ? 'text-[#312e4d]' : 'text-[#312e4d]',
                    !selectedOption && !label && 'text-base leading-5'
                  )}
                  data-testid="select-value"
                >
                  {displayText}
                </span>
              </div>
            )}
            {isPrimary && (
              <div className="flex flex-col min-w-0">
                {label && !selectedOption && (
                  <span
                    className="text-xs leading-normal text-white"
                    data-testid="select-label"
                  >
                    {label}
                  </span>
                )}
                <span
                  className="text-sm leading-4 whitespace-nowrap"
                  data-testid="select-value"
                >
                  {displayText}
                </span>
              </div>
            )}
            <ChevronDown
              size={16}
              className={cn(
                'shrink-0 transition-transform',
                open && 'rotate-180',
                isPrimary ? 'text-white' : 'text-[#312e4d]'
              )}
              data-testid="select-icon"
            />
          </button>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Content
            className={cn(
              'overflow-hidden',
              'bg-white',
              'rounded',
              'border border-[#ecebf0]',
              'shadow-lg',
              'z-50',
              isPrimary
                ? 'min-w-[var(--radix-popover-trigger-width)]'
                : 'w-[var(--radix-popover-trigger-width)]'
            )}
            sideOffset={4}
            align={isPrimary ? 'end' : 'start'}
            data-testid="select-content"
          >
            <div className="p-1 max-h-[300px] overflow-y-auto">
              {options.map((option) => (
                <div
                  key={option.id}
                  className={cn(
                    'relative flex items-center',
                    'px-4 py-2',
                    'text-sm leading-4 text-[#312e4d]',
                    'rounded',
                    'cursor-pointer',
                    'select-none',
                    'outline-none',
                    'transition-colors',
                    'hover:bg-[#f4f4f4]',
                    value === option.id && 'bg-[#ecebf0]',
                    isPrimary && 'whitespace-nowrap'
                  )}
                  onClick={() => handleSelectOption(option.id)}
                  data-testid={`select-option-${option.id}`}
                >
                  <span className="flex-1">{option.text}</span>
                  {value === option.id && (
                    <Check size={16} className="text-[#00b56b] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }
);

SingleSelect.displayName = 'SingleSelect';

// Main Select component that switches between single and multiple
export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (props, ref) => {
    if (props.multiple) {
      return <MultiSelect ref={ref} {...props} />;
    }
    return <SingleSelect ref={ref} {...props} />;
  }
);

Select.displayName = 'Select';

export default Select;

