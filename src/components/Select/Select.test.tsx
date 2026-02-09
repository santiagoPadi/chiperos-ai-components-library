import React from 'react';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select, SelectOption } from './index';

// Mock scrollIntoView for jsdom
beforeAll(() => {
  Element.prototype.scrollIntoView = vi.fn();
});

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

    it('renders with label when no value selected', () => {
      render(<Select options={mockOptions} label="Choose" />);
      
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
    it('shows label when no value is selected and label prop is provided', () => {
      render(<Select options={mockOptions} label="Choose item" placeholder="Select..." />);
      
      const label = screen.getByTestId('select-label');
      expect(label).toHaveTextContent('Choose item');
    });

    it('hides label when value is selected', () => {
      render(<Select options={mockOptions} label="Custom Label" value="1" />);
      
      // Label should NOT be visible when a value is selected
      const label = screen.queryByTestId('select-label');
      expect(label).not.toBeInTheDocument();
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

  describe('Error State', () => {
    it('renders error message when error is a string', () => {
      render(<Select options={mockOptions} error="This field is required" />);

      const errorEl = screen.getByTestId('select-error');
      expect(errorEl).toBeInTheDocument();
      expect(errorEl).toHaveTextContent('This field is required');
    });

    it('renders error border when error is a boolean', () => {
      render(<Select options={mockOptions} error={true} />);

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('border-[#ff305f]');
      expect(screen.queryByTestId('select-error')).not.toBeInTheDocument();
    });

    it('sets aria-invalid on trigger when error is truthy', () => {
      render(<Select options={mockOptions} error="Error" />);

      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveAttribute('aria-invalid', 'true');
    });

    it('does not render error when error is undefined', () => {
      render(<Select options={mockOptions} />);

      expect(screen.queryByTestId('select-error')).not.toBeInTheDocument();
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

describe('Select Multiple', () => {
  const mockOptions: SelectOption[] = [
    { id: '1', text: 'Option 1' },
    { id: '2', text: 'Option 2' },
    { id: '3', text: 'Option 3' },
  ];

  describe('Rendering', () => {
    it('renders correctly with multiple prop', () => {
      render(<Select multiple options={mockOptions} />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeInTheDocument();
    });

    it('renders with placeholder when no options selected', () => {
      render(<Select multiple options={mockOptions} placeholder="Select items" />);
      
      const value = screen.getByTestId('select-value');
      expect(value).toHaveTextContent('Select items');
    });

    it('renders single selected option text', () => {
      render(<Select multiple options={mockOptions} value={['1']} />);
      
      const value = screen.getByTestId('select-value');
      expect(value).toHaveTextContent('Option 1');
    });

    it('renders comma-separated text for two selected options', () => {
      render(<Select multiple options={mockOptions} value={['1', '2']} />);
      
      const value = screen.getByTestId('select-value');
      expect(value).toHaveTextContent('Option 1, Option 2');
    });

    it('renders count for more than two selected options', () => {
      render(<Select multiple options={mockOptions} value={['1', '2', '3']} />);
      
      const value = screen.getByTestId('select-value');
      expect(value).toHaveTextContent('3 selected');
    });
  });

  describe('States', () => {
    it('renders disabled state', () => {
      render(<Select multiple options={mockOptions} disabled />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toBeDisabled();
    });

    it('does not open when disabled', () => {
      render(<Select multiple options={mockOptions} disabled />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      expect(screen.queryByTestId('select-content')).not.toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    it('opens dropdown when clicked', async () => {
      render(<Select multiple options={mockOptions} />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        expect(screen.getByTestId('select-content')).toBeInTheDocument();
      });
    });

    it('displays all options with checkboxes when opened', async () => {
      render(<Select multiple options={mockOptions} />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        mockOptions.forEach((option) => {
          expect(screen.getByTestId(`select-option-${option.id}`)).toBeInTheDocument();
        });
      });
    });

    it('calls onChange with array when option is selected', async () => {
      const handleChange = vi.fn();
      render(<Select multiple options={mockOptions} value={[]} onChange={handleChange} />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const option = screen.getByTestId('select-option-2');
        fireEvent.click(option);
      });
      
      expect(handleChange).toHaveBeenCalledWith(['2']);
    });

    it('adds option to existing selection', async () => {
      const handleChange = vi.fn();
      render(<Select multiple options={mockOptions} value={['1']} onChange={handleChange} />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const option = screen.getByTestId('select-option-2');
        fireEvent.click(option);
      });
      
      expect(handleChange).toHaveBeenCalledWith(['1', '2']);
    });

    it('removes option from selection when clicked again', async () => {
      const handleChange = vi.fn();
      render(<Select multiple options={mockOptions} value={['1', '2']} onChange={handleChange} />);
      
      const trigger = screen.getByTestId('select-trigger');
      fireEvent.click(trigger);
      
      await waitFor(() => {
        const option = screen.getByTestId('select-option-1');
        fireEvent.click(option);
      });
      
      expect(handleChange).toHaveBeenCalledWith(['2']);
    });

    it('clears all selections when clear button is clicked', async () => {
      const handleChange = vi.fn();
      render(<Select multiple options={mockOptions} value={['1', '2']} onChange={handleChange} />);
      
      const clearButton = screen.getByTestId('select-clear');
      fireEvent.click(clearButton);
      
      expect(handleChange).toHaveBeenCalledWith([]);
    });

    it('does not show clear button when no options are selected', () => {
      render(<Select multiple options={mockOptions} value={[]} />);
      
      expect(screen.queryByTestId('select-clear')).not.toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('applies custom className', () => {
      render(<Select multiple options={mockOptions} className="custom-class" />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveClass('custom-class');
    });

    it('shows chevron icon', () => {
      render(<Select multiple options={mockOptions} />);
      
      const icon = screen.getByTestId('select-icon');
      expect(icon).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has correct aria-label', () => {
      render(<Select multiple options={mockOptions} placeholder="Choose options" />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveAttribute('aria-label', 'Choose options');
    });

    it('uses label for aria-label when provided', () => {
      render(<Select multiple options={mockOptions} label="Custom Label" />);
      
      const trigger = screen.getByTestId('select-trigger');
      expect(trigger).toHaveAttribute('aria-label', 'Custom Label');
    });
  });
});

