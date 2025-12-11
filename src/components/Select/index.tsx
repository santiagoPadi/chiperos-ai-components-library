import { forwardRef } from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '../../lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  id: string;
  text: string;
}

export interface SelectProps {
  /**
   * The currently selected value (id)
   */
  value?: string;
  
  /**
   * Callback fired when selection changes
   */
  onChange?: (text: string) => void;
  
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

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
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
              {/* Label (shown when value is selected or in open state) */}
              {(selectedOption || label) && (
                <span
                  className="text-xs leading-normal text-[#575385]"
                  data-testid="select-label"
                >
                  {label || placeholder}
                </span>
              )}
              
              {/* Selected value or placeholder */}
              <SelectPrimitive.Value asChild>
                <span
                  className={cn(
                    'text-sm leading-4',
                    selectedOption ? 'text-[#312e4d]' : 'text-[#312e4d]',
                    !selectedOption && !label && 'text-base leading-5'
                  )}
                  data-testid="select-value"
                >
                  {displayText}
                </span>
              </SelectPrimitive.Value>
            </div>
          )}
          
          {/* For primary variant: show label (if provided) and value */}
          {isPrimary && (
            <div className="flex flex-col min-w-0">
              {/* Label (shown when provided) */}
              {label && (
                <span
                  className="text-xs leading-normal text-white"
                  data-testid="select-label"
                >
                  {label}
                </span>
              )}
              
              {/* Selected value or placeholder */}
              <SelectPrimitive.Value asChild>
                <span
                  className="text-sm leading-4 whitespace-nowrap"
                  data-testid="select-value"
                >
                  {displayText}
                </span>
              </SelectPrimitive.Value>
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

Select.displayName = 'Select';

export default Select;

