import React, { forwardRef, InputHTMLAttributes, useState, useEffect } from 'react';
import { cn } from '../../lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { z } from 'zod';
import { parsePhoneNumber, CountryCode } from 'libphonenumber-js';

export interface InputValidation {
  /**
   * Validate as email
   */
  email?: boolean | string; // true or custom error message
  
  /**
   * Validate as number
   */
  number?: boolean | string;
  
  /**
   * Validate as phone number for specific country
   */
  phone?: {
    country?: CountryCode; // e.g., 'US', 'CO', 'MX', 'AR'
    message?: string;
  };
  
  /**
   * Minimum length validation
   */
  minLength?: {
    value: number;
    message?: string;
  };
  
  /**
   * Maximum length validation
   */
  maxLength?: {
    value: number;
    message?: string;
  };
  
  /**
   * Custom regex validation
   */
  regex?: {
    pattern: RegExp;
    message?: string;
  };
  
  /**
   * Required field validation
   */
  required?: boolean | string;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  /**
   * The current value of the input
   */
  value?: string;
  
  /**
   * Callback fired when the value changes
   */
  onChange?: (text: string) => void;
  
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  
  /**
   * Error message or state - shows error styling when truthy
   * External error (overrides validation errors)
   */
  error?: string | boolean;
  
  /**
   * Placeholder text
   */
  placeholder?: string;
  
  /**
   * Input type (text, password, email, etc.)
   */
  type?: string;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Show password toggle for password inputs
   */
  showPasswordToggle?: boolean;
  
  /**
   * Validation rules
   */
  validation?: InputValidation;
  
  /**
   * Validate on change (default: true)
   */
  validateOnChange?: boolean;
  
  /**
   * Validate on blur (default: true)
   */
  validateOnBlur?: boolean;
}

const validateInput = (value: string, validation?: InputValidation): string | null => {
  if (!validation) return null;
  
  // Required validation
  if (validation.required && !value) {
    return typeof validation.required === 'string' 
      ? validation.required 
      : 'This field is required';
  }
  
  // Skip other validations if value is empty and not required
  if (!value) return null;
  
  // Email validation
  if (validation.email) {
    const emailSchema = z.string().email();
    const result = emailSchema.safeParse(value);
    if (!result.success) {
      return typeof validation.email === 'string'
        ? validation.email
        : 'Please enter a valid email address';
    }
  }
  
  // Number validation
  if (validation.number) {
    const numberSchema = z.string().regex(/^-?\d*\.?\d+$/);
    const result = numberSchema.safeParse(value);
    if (!result.success) {
      return typeof validation.number === 'string'
        ? validation.number
        : 'Please enter a valid number';
    }
  }
  
  // Phone validation
  if (validation.phone) {
    try {
      const phoneNumber = parsePhoneNumber(value, validation.phone.country);
      if (!phoneNumber || !phoneNumber.isValid()) {
        return validation.phone.message || 
          `Please enter a valid phone number${validation.phone.country ? ` for ${validation.phone.country}` : ''}`;
      }
    } catch (error) {
      return validation.phone.message || 'Please enter a valid phone number';
    }
  }
  
  // MinLength validation
  if (validation.minLength) {
    const minLengthSchema = z.string().min(validation.minLength.value);
    const result = minLengthSchema.safeParse(value);
    if (!result.success) {
      return validation.minLength.message || 
        `Must be at least ${validation.minLength.value} characters`;
    }
  }
  
  // MaxLength validation
  if (validation.maxLength) {
    const maxLengthSchema = z.string().max(validation.maxLength.value);
    const result = maxLengthSchema.safeParse(value);
    if (!result.success) {
      return validation.maxLength.message || 
        `Must be at most ${validation.maxLength.value} characters`;
    }
  }
  
  // Custom regex validation
  if (validation.regex) {
    if (!validation.regex.pattern.test(value)) {
      return validation.regex.message || 'Invalid format';
    }
  }
  
  return null;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      value = '',
      onChange,
      disabled = false,
      error,
      placeholder,
      type = 'text',
      className,
      showPasswordToggle = false,
      validation,
      validateOnChange = true,
      validateOnBlur = true,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    
    const hasError = !!error || !!validationError;
    const displayError = typeof error === 'string' ? error : validationError;
    const isPassword = type === 'password' && showPasswordToggle;
    const inputType = isPassword && showPassword ? 'text' : type;
    
    // Validate on mount if value exists
    useEffect(() => {
      if (value && validation) {
        const errorMsg = validateInput(value, validation);
        setValidationError(errorMsg);
      }
    }, []);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      
      if (onChange) {
        onChange(newValue);
      }
      
      // Validate on change if enabled
      if (validateOnChange && validation) {
        const errorMsg = validateInput(newValue, validation);
        setValidationError(errorMsg);
      }
    };
    
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      if (props.onFocus) {
        props.onFocus(e);
      }
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      
      // Validate on blur if enabled
      if (validateOnBlur && validation) {
        const errorMsg = validateInput(e.target.value, validation);
        setValidationError(errorMsg);
      }
      
      if (props.onBlur) {
        props.onBlur(e);
      }
    };
    
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    
    // Base styles
    const containerStyles = cn(
      // Layout
      'flex items-center gap-2',
      'w-full h-12', // 48px height
      'px-4 py-2', // 16px horizontal, 8px vertical
      'rounded',
      
      // Typography
      'text-base leading-[18px]',
      
      // Border and background
      'border transition-colors',
      disabled && 'bg-[#f4f4f4] cursor-not-allowed',
      !disabled && 'bg-white',
      
      // Border colors based on state
      hasError && !disabled && 'border-[#ff305f]',
      !hasError && isFocused && !disabled && 'border-[#a29fba]',
      !hasError && !isFocused && 'border-[#ecebf0]',
      
      className
    );
    
    const inputStyles = cn(
      'flex-1 w-full h-full',
      'bg-transparent border-none outline-none',
      'text-[#312e4d] text-base leading-[18px]',
      'placeholder:text-[#7d79a0]',
      disabled && 'text-[#a29fba] cursor-not-allowed',
      disabled && 'placeholder:text-[#a29fba]',
    );
    
    const iconButtonStyles = cn(
      'flex items-center justify-center',
      'w-5 h-5 shrink-0',
      'text-[#312e4d]',
      'cursor-pointer hover:opacity-70 transition-opacity',
      disabled && 'cursor-not-allowed opacity-50',
    );
    
    return (
      <div className="w-full">
        <div className={containerStyles} data-testid="input-container">
          <input
            ref={ref}
            type={inputType}
            value={value}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder}
            className={inputStyles}
            data-testid="input"
            aria-invalid={hasError}
            aria-disabled={disabled}
            {...props}
          />
          
          {isPassword && (
            <button
              type="button"
              onClick={togglePasswordVisibility}
              disabled={disabled}
              className={iconButtonStyles}
              data-testid="password-toggle"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              tabIndex={-1}
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          )}
        </div>
        
        {displayError && (
          <p 
            className="mt-1 text-sm text-[#ff305f]" 
            data-testid="input-error"
            role="alert"
          >
            {displayError}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
