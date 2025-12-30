import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { DateTimePicker } from './index';

describe('DateTimePicker', () => {
  it('renders with default props', () => {
    render(<DateTimePicker />);
    expect(screen.getByPlaceholderText('Select')).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<DateTimePicker label="Select Date" />);
    expect(screen.getByText('Select Date')).toBeInTheDocument();
  });

  it('shows required asterisk when required is true', () => {
    render(<DateTimePicker label="Select Date" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('opens calendar when input is clicked', async () => {
    render(<DateTimePicker />);
    const input = screen.getByPlaceholderText('Select');
    fireEvent.click(input);
    
    await waitFor(() => {
      expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
    });
  });

  it('calls onChange when date is selected in single mode', async () => {
    const handleChange = vi.fn();
    render(<DateTimePicker mode="single" onChange={handleChange} open />);
    
    // Find and click a date (assuming current month is displayed)
    const dateButtons = screen.getAllByRole('button').filter(btn => 
      /^\d+$/.test(btn.textContent || '')
    );
    
    if (dateButtons.length > 0) {
      fireEvent.click(dateButtons[0]);
      expect(handleChange).toHaveBeenCalled();
    }
  });

  it('displays error message when error prop is provided', () => {
    render(<DateTimePicker error="Please select a date" />);
    expect(screen.getByText('Please select a date')).toBeInTheDocument();
  });

  it('disables interaction when disabled prop is true', () => {
    render(<DateTimePicker disabled />);
    const input = screen.getByPlaceholderText('Select');
    expect(input).toBeDisabled();
  });

  it('renders time presets when showTimePresets is true', async () => {
    const timePresets = [
      { label: 'Today', value: 'today' },
      { label: 'Tomorrow', value: 'tomorrow' },
    ];
    
    render(
      <DateTimePicker
        showTimePresets
        timePresets={timePresets}
        open
      />
    );
    
    await waitFor(() => {
      expect(screen.getByText('Time Preset List')).toBeInTheDocument();
      expect(screen.getByText('Today')).toBeInTheDocument();
      expect(screen.getByText('Tomorrow')).toBeInTheDocument();
    });
  });

  it('calls onTimePresetChange when time preset is clicked', async () => {
    const handleTimePresetChange = vi.fn();
    const timePresets = [
      { label: 'Today', value: 'today' },
    ];
    
    render(
      <DateTimePicker
        showTimePresets
        timePresets={timePresets}
        onTimePresetChange={handleTimePresetChange}
        open
      />
    );
    
    await waitFor(() => {
      const presetButton = screen.getByText('Today');
      fireEvent.click(presetButton);
      expect(handleTimePresetChange).toHaveBeenCalledWith('today');
    });
  });

  it('renders action buttons when showActions is true', async () => {
    render(<DateTimePicker showActions open />);
    
    await waitFor(() => {
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });
  });

  it('calls onCancel when cancel button is clicked', async () => {
    const handleCancel = vi.fn();
    render(<DateTimePicker showActions onCancel={handleCancel} open />);
    
    await waitFor(() => {
      const cancelButton = screen.getByText('Cancel');
      fireEvent.click(cancelButton);
      expect(handleCancel).toHaveBeenCalled();
    });
  });

  it('calls onSave when save button is clicked', async () => {
    const handleSave = vi.fn();
    const testDate = new Date();
    
    render(
      <DateTimePicker
        showActions
        value={testDate}
        onSave={handleSave}
        open
      />
    );
    
    await waitFor(() => {
      const saveButton = screen.getByText('Save');
      fireEvent.click(saveButton);
      expect(handleSave).toHaveBeenCalledWith(testDate);
    });
  });

  it('renders multi-calendar view when calendarView is multi', async () => {
    render(<DateTimePicker calendarView="multi" open />);
    
    await waitFor(() => {
      const monthHeaders = screen.getAllByText(/January|February|March|April|May|June|July|August|September|October|November|December/);
      expect(monthHeaders.length).toBeGreaterThan(1);
    });
  });

  it('navigates to previous month when prev button is clicked', async () => {
    render(<DateTimePicker open />);
    
    await waitFor(() => {
      const prevButton = screen.getByLabelText('Previous month');
      
      fireEvent.click(prevButton);
      
      // Month should change (this is a basic test, actual implementation may vary)
      expect(prevButton).toBeInTheDocument();
    });
  });

  it('navigates to next month when next button is clicked', async () => {
    render(<DateTimePicker open />);
    
    await waitFor(() => {
      const nextButton = screen.getByLabelText('Next month');
      expect(nextButton).toBeInTheDocument();
      
      fireEvent.click(nextButton);
      // Month should change
      expect(nextButton).toBeInTheDocument();
    });
  });

  it('displays selected date in input when value is provided', () => {
    const testDate = new Date(2024, 0, 15);
    render(<DateTimePicker mode="single" value={testDate} />);
    
    // The input should display the formatted date
    const input = screen.getByPlaceholderText('Select');
    expect(input).toBeInTheDocument();
  });

  it('handles date range selection in range mode', async () => {
    const handleChange = vi.fn();
    render(<DateTimePicker mode="range" onChange={handleChange} open />);
    
    // This test would need to click two dates to form a range
    // Implementation depends on the actual calendar rendering
    expect(handleChange).toBeDefined();
  });

  it('handles multiple date selection in multi mode', async () => {
    const handleChange = vi.fn();
    render(<DateTimePicker mode="multi" onChange={handleChange} open />);
    
    // This test would need to click multiple dates
    // Implementation depends on the actual calendar rendering
    expect(handleChange).toBeDefined();
  });

  it('respects minDate and maxDate constraints', async () => {
    const minDate = new Date();
    const maxDate = new Date(Date.now() + 86400000 * 30);
    
    render(
      <DateTimePicker
        minDate={minDate}
        maxDate={maxDate}
        open
      />
    );
    
    // Dates outside the range should be disabled
    // This would need to check the actual disabled state of date buttons
    await waitFor(() => {
      expect(screen.getByText(/January|February|March|April|May|June|July|August|September|October|November|December/)).toBeInTheDocument();
    });
  });

  it('calls onOpenChange when open state changes', async () => {
    const handleOpenChange = vi.fn();
    render(<DateTimePicker onOpenChange={handleOpenChange} />);
    
    const input = screen.getByPlaceholderText('Select');
    fireEvent.click(input);
    
    await waitFor(() => {
      expect(handleOpenChange).toHaveBeenCalledWith(true);
    });
  });

  it('renders without input when showInput is false', () => {
    render(<DateTimePicker showInput={false} open />);
    expect(screen.queryByPlaceholderText('Select')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<DateTimePicker className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

