import { forwardRef, useState, useRef, useEffect } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as Popover from '@radix-ui/react-popover';
import * as Checkbox from '@radix-ui/react-checkbox';
import { cn } from '../../lib/utils';
import { ChevronDown, Check, X } from 'lucide-react';

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
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const isPrimary = variant === 'primary';

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
              'max-h-[300px] overflow-y-auto',
              isPrimary
                ? 'min-w-[var(--radix-popover-trigger-width)]'
                : 'w-[var(--radix-popover-trigger-width)]'
            )}
            sideOffset={4}
            align={isPrimary ? 'end' : 'start'}
            data-testid="select-content"
          >
            <div className="p-1">
              {options.map((option) => {
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
              })}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';

// Single select component using Radix Select
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
    },
    ref
  ) => {
    const selectedOption = options.find((opt) => opt.id === value);
    const displayText = selectedOption?.text || placeholder;
    const isPrimary = variant === 'primary';

    const handleValueChange = (newValue: string) => {
      if (onChange) {
        onChange(newValue);
      }
    };

    return (
      <SelectPrimitive.Root
        value={value}
        onValueChange={handleValueChange}
        disabled={disabled}
      >
        <SelectPrimitive.Trigger
          ref={ref}
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
              'data-[state=open]:border-[#a29fba]',
              disabled && 'opacity-50 cursor-not-allowed bg-[#f4f4f4]',
            ],

            // Primary variant (like primary button)
            isPrimary && [
              'bg-[#00b56b] text-white',
              'border border-[#00b56b]',
              'hover:bg-[#00995a] hover:border-[#00995a]',
              'active:bg-[#007a48] active:border-[#007a48]',
              'data-[state=open]:bg-[#00995a] data-[state=open]:border-[#00995a]',
              disabled && 'bg-[#e0e0e0] border-[#e0e0e0] text-[#9e9e9e] cursor-not-allowed',
            ],

            className
          )}
          data-testid="select-trigger"
          aria-label={label || placeholder}
        >
          {/* For default variant: show label and value stacked */}
          {!isPrimary && (
            <div className="flex flex-col flex-1 min-w-0">
              {/* Label (shown only when no value is selected) */}
              {label && !selectedOption && (
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
                  'text-sm leading-4 font-normal',
                  selectedOption ? 'text-[#312e4d]' : 'text-[#312e4d]',
                  !selectedOption && !label && 'text-base leading-5'
                )}
                data-testid="select-value"
              >
                <SelectPrimitive.Value placeholder={placeholder}>
                  {displayText}
                </SelectPrimitive.Value>
              </span>
            </div>
          )}

          {/* For primary variant: show label (if provided) and value */}
          {isPrimary && (
            <div className="flex flex-col min-w-0">
              {/* Label (shown only when no value is selected) */}
              {label && !selectedOption && (
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
                <SelectPrimitive.Value placeholder={placeholder}>
                  {displayText}
                </SelectPrimitive.Value>
              </span>
            </div>
          )}

          <SelectPrimitive.Icon asChild>
            <ChevronDown
              size={16}
              className={cn(
                'shrink-0',
                isPrimary ? 'text-white' : 'text-[#312e4d]'
              )}
              data-testid="select-icon"
            />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Content
            className={cn(
              'overflow-hidden',
              'bg-white',
              'rounded',
              'border border-[#ecebf0]',
              'shadow-lg',
              'z-50',
              // Default: match trigger width
              // Primary: auto width with min-width from trigger
              isPrimary
                ? 'min-w-[var(--radix-select-trigger-width)]'
                : 'w-[var(--radix-select-trigger-width)]'
            )}
            position="popper"
            sideOffset={4}
            align={isPrimary ? 'end' : 'start'}
            data-testid="select-content"
          >
            <SelectPrimitive.Viewport className="p-1">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.id}
                  value={option.id}
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
                    'focus:bg-[#f4f4f4]',
                    'data-[state=checked]:bg-[#ecebf0]',
                    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none',
                    // For primary variant, prevent text truncation
                    isPrimary && 'whitespace-nowrap'
                  )}
                  data-testid={`select-option-${option.id}`}
                >
                  <SelectPrimitive.ItemText>{option.text}</SelectPrimitive.ItemText>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Viewport>
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
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

