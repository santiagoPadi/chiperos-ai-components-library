import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, SelectOption } from './index';

const mockOptions: SelectOption[] = [
  { id: '1', text: 'Option 1' },
  { id: '2', text: 'Option 2' },
  { id: '3', text: 'Option 3' },
];

describe('Select', () => {
  describe('Rendering', () => {
    it('renders correctly with options', () => {
      render(<Select options={mockOptions} />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Select options={mockOptions} placeholder="Select an item" />);
      
      const value = screen.getByTestId('select-value');
      expect(value).toHaveTextContent('Select an item');
    });

    it('renders with selected value', () => {
      render(<Select options={mockOptions} value="2" />);
      
      const value = screen.getByTestId('select-value');
      expect(value).toHaveTextContent('Option 2');
    });

    it('renders with label', () => {
      render(<Select options={mockOptions} label="Choose" value="1" />);
      
      const label = screen.getByTestId('select-label');
      expect(label).toHaveTextContent('Choose');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Select options={mockOptions} disabled />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeDisabled();
    });

    it('applies disabled styling', () => {
      render(<Select options={mockOptions} disabled />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('opacity-50', 'cursor-not-allowed');
    });
  });

  describe('Interactions', () => {
    it('opens dropdown when clicked', async () => {
      render(<Select options={mockOptions} />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('select-content')).toBeInTheDocument();
      });
    });

    it('displays all options when opened', async () => {
      render(<Select options={mockOptions} />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        mockOptions.forEach((option) => {
          expect(screen.getByTestId(`select-option-${option.id}`)).toBeInTheDocument();
        });
      });
    });

    it('calls onChange when option is selected', async () => {
      const handleChange = vi.fn();
      render(<Select options={mockOptions} onChange={handleChange} />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const option = screen.getByTestId('select-option-2');
        fireEvent.click(option);
      });
      
      expect(handleChange).toHaveBeenCalledWith('2');
    });

    it('updates displayed value after selection', async () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState<string>('');
        return (
          <Select
            options={mockOptions}
            value={value}
            onChange={setValue}
          />
        );
      };
      
      render(<TestComponent />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const option = screen.getByTestId('select-option-1');
        fireEvent.click(option);
      });
      
      await waitFor(() => {
        expect(screen.getByTestId('select-value')).toHaveTextContent('Option 1');
      });
    });

    it('does not open when disabled', () => {
      render(<Select options={mockOptions} disabled />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      expect(screen.queryByTestId('select-content')).not.toBeInTheDocument();
    });
  });

  describe('Display Logic', () => {
    it('shows label when value is selected', () => {
      render(<Select options={mockOptions} value="1" placeholder="Choose item" />);
      
      const label = screen.getByTestId('select-label');
      expect(label).toHaveTextContent('Choose item');
    });

    it('shows label prop when provided', () => {
      render(<Select options={mockOptions} label="Custom Label" value="1" />);
      
      const label = screen.getByTestId('select-label');
      expect(label).toHaveTextContent('Custom Label');
    });

    it('does not show label when no value selected and no label prop', () => {
      render(<Select options={mockOptions} placeholder="Select..." />);
      
      const label = screen.queryByTestId('select-label');
      expect(label).not.toBeInTheDocument();
    });
  });

  describe('Options', () => {
    it('renders empty select with no options', () => {
      render(<Select options={[]} />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeInTheDocument();
    });

    it('renders all provided options', async () => {
      render(<Select options={mockOptions} />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getAllByRole('option')).toHaveLength(mockOptions.length);
      });
    });

    it('handles options with special characters', async () => {
      const specialOptions: SelectOption[] = [
        { id: '1', text: 'Option with "quotes"' },
        { id: '2', text: "Option with 'apostrophes'" },
        { id: '3', text: 'Option with & ampersand' },
      ];
      
      render(<Select options={specialOptions} />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        specialOptions.forEach((option) => {
          expect(screen.getByText(option.text)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Styling and Layout', () => {
    it('has full width', () => {
      render(<Select options={mockOptions} />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('w-full');
    });

    it('applies custom className', () => {
      render(<Select options={mockOptions} className="custom-class" />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('custom-class');
    });

    it('shows chevron icon', () => {
      render(<Select options={mockOptions} />);
      
      const icon = screen.getByTestId('select-icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-label', () => {
      render(<Select options={mockOptions} placeholder="Choose option" />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveAttribute('aria-label', 'Choose option');
    });

    it('uses label for aria-label when provided', () => {
      render(<Select options={mockOptions} label="Custom Label" />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveAttribute('aria-label', 'Custom Label');
    });

    it('keyboard navigation works', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} />);
      
      const trigger = screen.getByTestId('select-trigger');
      
      // Tab to trigger
      await user.tab();
      expect(trigger).toHaveFocus();
      
      // Open with Enter
      await user.keyboard('{Enter}');
      
      await waitFor(() => {
        expect(screen.getByTestId('select-content')).toBeInTheDocument();
      });
    });
  });

  describe('Forwarding', () => {
    it('forwards ref to trigger button', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<Select ref={ref} options={mockOptions} />);
      
      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });
  });

  describe('Edge Cases', () => {
    it('handles value that does not exist in options', () => {
      render(<Select options={mockOptions} value="999" />);
      
      const value = screen.getByTestId('select-value');
      // Should show placeholder when value doesn't match any option
      expect(value).toHaveTextContent('Select an option');
    });

    it('handles empty string value', () => {
      render(<Select options={mockOptions} value="" />);
      
      const value = screen.getByTestId('select-value');
      expect(value).toHaveTextContent('Select an option');
    });

    it('handles undefined value', () => {
      render(<Select options={mockOptions} value={undefined} />);
      
      const value = screen.getByTestId('select-value');
      expect(value).toHaveTextContent('Select an option');
    });
  });
});

