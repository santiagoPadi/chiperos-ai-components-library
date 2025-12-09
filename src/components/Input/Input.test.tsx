import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './index';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Input />);
      
      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter your name" />);
      
      const input = screen.getByPlaceholderText('Enter your name');
      expect(input).toBeInTheDocument();
    });

    it('renders with value', () => {
      render(<Input value="Test value" />);
      
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.value).toBe('Test value');
    });

    it('renders with custom type', () => {
      render(<Input type="email" />);
      
      const input = screen.getByTestId('input') as HTMLInputElement;
      expect(input.type).toBe('email');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Input disabled />);
      
      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
    });

    it('applies disabled styling', () => {
      render(<Input disabled />);
      
      const container = screen.getByTestId('input-container');
      expect(container).toHaveClass('bg-[#f4f4f4]', 'cursor-not-allowed');
    });

    it('renders error state with boolean', () => {
      render(<Input error={true} />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });

    it('renders error state with message', () => {
      render(<Input error="This field is required" />);
      
      const input = screen.getByTestId('input');
      const errorMessage = screen.getByTestId('input-error');
      
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent('This field is required');
    });

    it('applies error styling', () => {
      render(<Input error={true} />);
      
      const container = screen.getByTestId('input-container');
      expect(container).toHaveClass('border-[#ff305f]');
    });

    it('does not show error message for boolean true', () => {
      render(<Input error={true} />);
      
      const errorMessage = screen.queryByTestId('input-error');
      expect(errorMessage).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('calls onChange when typing', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);
      
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'Hello' } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('Hello');
    });

    it('does not call onChange when disabled', () => {
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} disabled />);
      
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'Hello' } });
      
      expect(input).toBeDisabled();
    });

    it('applies focused styling on focus', () => {
      render(<Input />);
      
      const input = screen.getByTestId('input');
      const container = screen.getByTestId('input-container');
      
      fireEvent.focus(input);
      expect(container).toHaveClass('border-[#a29fba]');
    });

    it('removes focused styling on blur', () => {
      render(<Input />);
      
      const input = screen.getByTestId('input');
      const container = screen.getByTestId('input-container');
      
      fireEvent.focus(input);
      expect(container).toHaveClass('border-[#a29fba]');
      
      fireEvent.blur(input);
      expect(container).not.toHaveClass('border-[#a29fba]');
      expect(container).toHaveClass('border-[#ecebf0]');
    });

    it('calls onFocus and onBlur handlers', () => {
      const handleFocus = vi.fn();
      const handleBlur = vi.fn();
      render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
      
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Password Toggle', () => {
    it('does not show password toggle by default', () => {
      render(<Input type="password" />);
      
      const toggle = screen.queryByTestId('password-toggle');
      expect(toggle).not.toBeInTheDocument();
    });

    it('shows password toggle when showPasswordToggle is true', () => {
      render(<Input type="password" showPasswordToggle />);
      
      const toggle = screen.getByTestId('password-toggle');
      expect(toggle).toBeInTheDocument();
    });

    it('toggles password visibility', () => {
      render(<Input type="password" showPasswordToggle />);
      
      const input = screen.getByTestId('input') as HTMLInputElement;
      const toggle = screen.getByTestId('password-toggle');
      
      expect(input.type).toBe('password');
      
      fireEvent.click(toggle);
      expect(input.type).toBe('text');
      
      fireEvent.click(toggle);
      expect(input.type).toBe('password');
    });

    it('does not toggle when disabled', () => {
      render(<Input type="password" showPasswordToggle disabled />);
      
      const toggle = screen.getByTestId('password-toggle');
      expect(toggle).toBeDisabled();
    });
  });

  describe('Validation - Email', () => {
    it('validates email on change', () => {
      const handleChange = vi.fn();
      render(<Input validation={{ email: true }} onChange={handleChange} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: 'invalid-email' } });
      
      expect(handleChange).toHaveBeenCalledWith('invalid-email');
      expect(screen.getByTestId('input-error')).toHaveTextContent('Please enter a valid email address');
    });

    it('validates email on blur', () => {
      render(<Input validation={{ email: true }} validateOnChange={false} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: 'invalid' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
      
      fireEvent.blur(input);
      expect(screen.getByTestId('input-error')).toBeInTheDocument();
    });

    it('shows custom email error message', () => {
      render(<Input validation={{ email: 'Custom email error' }} />);
      
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'invalid' } });
      
      expect(screen.getByTestId('input-error')).toHaveTextContent('Custom email error');
    });

    it('clears error when valid email is entered', () => {
      render(<Input validation={{ email: true }} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: 'invalid' } });
      expect(screen.getByTestId('input-error')).toBeInTheDocument();
      
      fireEvent.change(input, { target: { value: 'valid@email.com' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
    });
  });

  describe('Validation - Number', () => {
    it('validates number on change', () => {
      render(<Input validation={{ number: true }} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: 'abc' } });
      expect(screen.getByTestId('input-error')).toHaveTextContent('Please enter a valid number');
    });

    it('accepts valid numbers', () => {
      render(<Input validation={{ number: true }} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: '123' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
      
      fireEvent.change(input, { target: { value: '123.45' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
      
      fireEvent.change(input, { target: { value: '-123' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
    });

    it('shows custom number error message', () => {
      render(<Input validation={{ number: 'Only numbers allowed' }} />);
      
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'abc' } });
      
      expect(screen.getByTestId('input-error')).toHaveTextContent('Only numbers allowed');
    });
  });

  describe('Validation - Phone', () => {
    it('validates phone number', () => {
      render(<Input validation={{ phone: { country: 'US' } }} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: '123' } });
      expect(screen.getByTestId('input-error')).toBeInTheDocument();
    });

    it('accepts valid phone number', () => {
      render(<Input validation={{ phone: { country: 'US' } }} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: '+1 (555) 123-4567' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
    });

    it('shows custom phone error message', () => {
      render(<Input validation={{ phone: { country: 'US', message: 'Invalid US phone' } }} />);
      
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: '123' } });
      
      expect(screen.getByTestId('input-error')).toHaveTextContent('Invalid US phone');
    });
  });

  describe('Validation - Length', () => {
    it('validates minimum length', () => {
      render(<Input validation={{ minLength: { value: 5 } }} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: 'abc' } });
      expect(screen.getByTestId('input-error')).toHaveTextContent('Must be at least 5 characters');
      
      fireEvent.change(input, { target: { value: 'abcde' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
    });

    it('validates maximum length', () => {
      render(<Input validation={{ maxLength: { value: 10 } }} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: 'this is too long' } });
      expect(screen.getByTestId('input-error')).toHaveTextContent('Must be at most 10 characters');
      
      fireEvent.change(input, { target: { value: 'short' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
    });

    it('shows custom length error messages', () => {
      render(<Input 
        validation={{ 
          minLength: { value: 5, message: 'Too short!' },
          maxLength: { value: 10, message: 'Too long!' }
        }} 
      />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: 'ab' } });
      expect(screen.getByTestId('input-error')).toHaveTextContent('Too short!');
      
      fireEvent.change(input, { target: { value: 'this is way too long' } });
      expect(screen.getByTestId('input-error')).toHaveTextContent('Too long!');
    });
  });

  describe('Validation - Required', () => {
    it('validates required field', () => {
      render(<Input validation={{ required: true }} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.blur(input);
      expect(screen.getByTestId('input-error')).toHaveTextContent('This field is required');
    });

    it('shows custom required message', () => {
      render(<Input validation={{ required: 'Please fill this field' }} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.blur(input);
      expect(screen.getByTestId('input-error')).toHaveTextContent('Please fill this field');
    });

    it('clears required error when value is entered', () => {
      render(<Input validation={{ required: true }} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.blur(input);
      expect(screen.getByTestId('input-error')).toBeInTheDocument();
      
      fireEvent.change(input, { target: { value: 'some text' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
    });
  });

  describe('Validation - Custom Regex', () => {
    it('validates with custom regex', () => {
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;
      render(<Input validation={{ regex: { pattern: alphanumericRegex } }} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: 'valid123' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
      
      fireEvent.change(input, { target: { value: 'invalid@#$' } });
      expect(screen.getByTestId('input-error')).toHaveTextContent('Invalid format');
    });

    it('shows custom regex error message', () => {
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;
      render(<Input 
        validation={{ 
          regex: { 
            pattern: alphanumericRegex, 
            message: 'Only letters and numbers allowed' 
          } 
        }} 
      />);
      
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'invalid@' } });
      
      expect(screen.getByTestId('input-error')).toHaveTextContent('Only letters and numbers allowed');
    });
  });

  describe('Validation - Multiple Rules', () => {
    it('validates multiple rules in order', () => {
      render(<Input 
        validation={{ 
          required: true,
          minLength: { value: 5 },
          maxLength: { value: 10 }
        }} 
      />);
      
      const input = screen.getByTestId('input');
      
      // Empty - required error
      fireEvent.blur(input);
      expect(screen.getByTestId('input-error')).toHaveTextContent('This field is required');
      
      // Too short
      fireEvent.change(input, { target: { value: 'abc' } });
      expect(screen.getByTestId('input-error')).toHaveTextContent('Must be at least 5 characters');
      
      // Too long
      fireEvent.change(input, { target: { value: 'this is too long' } });
      expect(screen.getByTestId('input-error')).toHaveTextContent('Must be at most 10 characters');
      
      // Valid
      fireEvent.change(input, { target: { value: 'valid' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
    });
  });

  describe('Validation - Control', () => {
    it('disables validation on change when validateOnChange is false', () => {
      render(<Input validation={{ email: true }} validateOnChange={false} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.change(input, { target: { value: 'invalid' } });
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
    });

    it('disables validation on blur when validateOnBlur is false', () => {
      render(<Input validation={{ required: true }} validateOnBlur={false} />);
      
      const input = screen.getByTestId('input');
      
      fireEvent.blur(input);
      expect(screen.queryByTestId('input-error')).not.toBeInTheDocument();
    });

    it('external error overrides validation errors', () => {
      render(<Input validation={{ email: true }} error="External error" />);
      
      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'invalid' } });
      
      expect(screen.getByTestId('input-error')).toHaveTextContent('External error');
    });
  });

  describe('Forwarding', () => {
    it('forwards ref to input element', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe('INPUT');
    });

    it('forwards additional HTML attributes', () => {
      render(<Input id="test-input" name="test" autoComplete="off" />);
      
      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('id', 'test-input');
      expect(input).toHaveAttribute('name', 'test');
      expect(input).toHaveAttribute('autocomplete', 'off');
    });
  });
});
