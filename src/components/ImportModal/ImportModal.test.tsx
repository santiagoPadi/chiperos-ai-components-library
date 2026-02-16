import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImportModal } from './index';

const defaultProps = {
  title: 'Test Modal Title',
  description: 'Test description text.',
  blackDescription: '[test@email.com].',
  template: 'https://example.com/template.xlsx',
  validExtensions: ['XLSX', 'CSV'],
  handle: vi.fn(),
  handleCtaCopy: vi.fn(),
};

function renderModal(props = {}) {
  return render(
    <ImportModal {...defaultProps} {...props}>
      <button>Open Modal</button>
    </ImportModal>
  );
}

function createFile(name: string, size = 1024, type = 'application/octet-stream'): File {
  const content = new Uint8Array(size);
  return new File([content], name, { type });
}

describe('ImportModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Trigger and Open/Close', () => {
    it('renders the trigger element', () => {
      renderModal();
      expect(screen.getByText('Open Modal')).toBeInTheDocument();
    });

    it('opens modal when trigger is clicked', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
      });
    });

    it('closes modal when overlay is clicked', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
      });

      const overlay = document.querySelector('[data-state="open"].fixed.inset-0');
      if (overlay) {
        await userEvent.click(overlay);
        await waitFor(() => {
          expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();
        });
      }
    });

    it('supports controlled open state', async () => {
      const onOpenChange = vi.fn();
      const { rerender } = render(
        <ImportModal {...defaultProps} open={false} onOpenChange={onOpenChange}>
          <button>Open Modal</button>
        </ImportModal>
      );

      expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();

      rerender(
        <ImportModal {...defaultProps} open={true} onOpenChange={onOpenChange}>
          <button>Open Modal</button>
        </ImportModal>
      );

      await waitFor(() => {
        expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
      });
    });
  });

  describe('Content Display', () => {
    it('displays the title', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByText('Test Modal Title')).toBeInTheDocument();
      });
    });

    it('displays the description', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByText(/Test description text\./)).toBeInTheDocument();
      });
    });

    it('displays the blackDescription in bold', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        const boldText = screen.getByText('[test@email.com].');
        expect(boldText).toBeInTheDocument();
        expect(boldText).toHaveClass('font-semibold');
      });
    });

    it('displays the template download link', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        const link = screen.getByText('Download Template');
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', 'https://example.com/template.xlsx');
      });
    });

    it('displays the "Need a template?" text', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByText('Need a template?')).toBeInTheDocument();
      });
    });

    it('displays valid extensions in the upload zone', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByText('XLSX or CSV')).toBeInTheDocument();
      });
    });

    it('displays upload instruction text', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByText('Click to upload or drag and drop your file')).toBeInTheDocument();
      });
    });

    it('displays the validate toggle text', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByText('Only validate file data, do not upload')).toBeInTheDocument();
      });
    });
  });

  describe('File Upload', () => {
    it('accepts a valid file via input', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));

      const file = createFile('test.xlsx', 240000);
      const input = screen.getByTestId('import-modal-file-input');
      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('test.xlsx')).toBeInTheDocument();
      });
    });

    it('shows file size when file is selected', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));

      const file = createFile('test.xlsx', 2 * 1024 * 1024);
      const input = screen.getByTestId('import-modal-file-input');
      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('2.00 MB')).toBeInTheDocument();
      });
    });

    it('shows remove button when file is selected', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));

      const file = createFile('test.xlsx', 1024);
      const input = screen.getByTestId('import-modal-file-input');
      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByTestId('import-modal-remove-file')).toBeInTheDocument();
      });
    });

    it('removes file when remove button is clicked', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));

      const file = createFile('test.xlsx', 1024);
      const input = screen.getByTestId('import-modal-file-input');
      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('test.xlsx')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByTestId('import-modal-remove-file'));

      await waitFor(() => {
        expect(screen.queryByText('test.xlsx')).not.toBeInTheDocument();
        expect(screen.getByText('Click to upload or drag and drop your file')).toBeInTheDocument();
      });
    });

    it('rejects files with invalid extensions', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));

      const file = createFile('test.pdf', 1024);
      const input = screen.getByTestId('import-modal-file-input');
      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.queryByText('test.pdf')).not.toBeInTheDocument();
        expect(screen.getByText('Click to upload or drag and drop your file')).toBeInTheDocument();
      });
    });
  });

  describe('Only Validate Toggle', () => {
    it('renders the toggle switch', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByRole('switch')).toBeInTheDocument();
      });
    });

    it('shows "Upload" label by default when toggle is off', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByTestId('import-modal-action-button')).toHaveTextContent('Upload');
      });
    });

    it('shows "Validate" label when toggle is on', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));

      await waitFor(() => {
        expect(screen.getByRole('switch')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('switch'));

      await waitFor(() => {
        expect(screen.getByTestId('import-modal-action-button')).toHaveTextContent('Validate');
      });
    });
  });

  describe('CTA Buttons', () => {
    it('disables upload button when no file is selected', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByTestId('import-modal-action-button')).toBeDisabled();
      });
    });

    it('enables upload button when a file is selected', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));

      const file = createFile('test.xlsx', 1024);
      const input = screen.getByTestId('import-modal-file-input');
      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByTestId('import-modal-action-button')).not.toBeDisabled();
      });
    });

    it('calls handle with file and onlyValidate=false when upload is clicked', async () => {
      const handle = vi.fn();
      renderModal({ handle });
      await userEvent.click(screen.getByText('Open Modal'));

      const file = createFile('test.xlsx', 1024);
      const input = screen.getByTestId('import-modal-file-input');
      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByTestId('import-modal-action-button')).not.toBeDisabled();
      });

      await userEvent.click(screen.getByTestId('import-modal-action-button'));

      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle).toHaveBeenCalledWith(expect.any(File), false);
      expect(handle.mock.calls[0][0].name).toBe('test.xlsx');
    });

    it('calls handle with file and onlyValidate=true when validate is clicked', async () => {
      const handle = vi.fn();
      renderModal({ handle });
      await userEvent.click(screen.getByText('Open Modal'));

      const file = createFile('test.csv', 1024);
      const input = screen.getByTestId('import-modal-file-input');
      await userEvent.upload(input, file);

      await userEvent.click(screen.getByRole('switch'));

      await waitFor(() => {
        expect(screen.getByTestId('import-modal-action-button')).toHaveTextContent('Validate');
      });

      await userEvent.click(screen.getByTestId('import-modal-action-button'));

      expect(handle).toHaveBeenCalledTimes(1);
      expect(handle).toHaveBeenCalledWith(expect.any(File), true);
      expect(handle.mock.calls[0][0].name).toBe('test.csv');
    });

    it('calls handleCtaCopy when CTA Copy is clicked', async () => {
      const handleCtaCopy = vi.fn();
      renderModal({ handleCtaCopy });
      await userEvent.click(screen.getByText('Open Modal'));

      await waitFor(() => {
        expect(screen.getByTestId('import-modal-cta-copy')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByTestId('import-modal-cta-copy'));

      expect(handleCtaCopy).toHaveBeenCalledTimes(1);
    });

    it('CTA Copy button is always enabled', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByTestId('import-modal-cta-copy')).not.toBeDisabled();
      });
    });
  });

  describe('Custom Labels', () => {
    it('uses custom upload label', async () => {
      renderModal({ uploadLabel: 'Subir' });
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByTestId('import-modal-action-button')).toHaveTextContent('Subir');
      });
    });

    it('uses custom validate label when toggle is on', async () => {
      renderModal({ validateLabel: 'Solo validar' });
      await userEvent.click(screen.getByText('Open Modal'));

      await userEvent.click(screen.getByRole('switch'));

      await waitFor(() => {
        expect(screen.getByTestId('import-modal-action-button')).toHaveTextContent('Solo validar');
      });
    });

    it('uses custom CTA copy label', async () => {
      renderModal({ ctaCopyLabel: 'Copiar enlace' });
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        expect(screen.getByTestId('import-modal-cta-copy')).toHaveTextContent('Copiar enlace');
      });
    });
  });

  describe('State Reset on Close', () => {
    it('resets file and toggle when modal is closed and reopened', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));

      const file = createFile('test.xlsx', 1024);
      const input = screen.getByTestId('import-modal-file-input');
      await userEvent.upload(input, file);

      await waitFor(() => {
        expect(screen.getByText('test.xlsx')).toBeInTheDocument();
      });

      await userEvent.click(screen.getByRole('switch'));

      await userEvent.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByText('Test Modal Title')).not.toBeInTheDocument();
      });

      await userEvent.click(screen.getByText('Open Modal'));

      await waitFor(() => {
        expect(screen.getByText('Click to upload or drag and drop your file')).toBeInTheDocument();
        expect(screen.getByTestId('import-modal-action-button')).toHaveTextContent('Upload');
      });
    });
  });

  describe('Template Link', () => {
    it('has download attribute on template link', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        const link = screen.getByText('Download Template');
        expect(link).toHaveAttribute('download');
      });
    });

    it('opens template link in new tab', async () => {
      renderModal();
      await userEvent.click(screen.getByText('Open Modal'));
      await waitFor(() => {
        const link = screen.getByText('Download Template');
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });
});
