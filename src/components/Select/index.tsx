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
      className,
    },
    ref
  ) => {
    const selectedOption = options.find((opt) => opt.id === value);
    const displayText = selectedOption?.text || placeholder;
    
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
            'flex items-center gap-2',
            'w-full',
            'px-4 py-3', // 16px horizontal, 12px vertical
            'rounded',
            
            // Border and background
            'border border-[#ecebf0]',
            'bg-white',
            
            // Typography
            'text-left',
            
            // States
            'transition-colors',
            'hover:border-[#a29fba]',
            'focus:outline-none focus:ring-0 focus:border-[#a29fba]',
            'data-[state=open]:border-[#a29fba]',
            
            // Disabled
            disabled && 'opacity-50 cursor-not-allowed bg-[#f4f4f4]',
            
            className
          )}
          data-testid="select-trigger"
          aria-label={label || placeholder}
        >
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
                  !selectedOption && !label && 'text-base leading-5' // Larger when no label
                )}
                data-testid="select-value"
              >
                {displayText}
              </span>
            </SelectPrimitive.Value>
          </div>
          
          <SelectPrimitive.Icon asChild>
            <ChevronDown
              size={16}
              className="text-[#312e4d] shrink-0"
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
              'w-[var(--radix-select-trigger-width)]'
            )}
            position="popper"
            sideOffset={4}
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
                    'data-[disabled]:opacity-50 data-[disabled]:pointer-events-none'
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

