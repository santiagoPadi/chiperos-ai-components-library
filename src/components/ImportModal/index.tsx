import * as React from 'react';
import { Dialog } from 'radix-ui';
import { Download, Upload, FileText, Trash2, FileCheck2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Button } from '../ButtonRadix';
import { Switcher } from '../Switcher';

export interface ImportModalProps {
  /** Modal title */
  title: string;
  /** Modal description text */
  description: string;
  /** Bold description text (rendered in semibold dark color) */
  blackDescription: string;
  /** URL for the template file download */
  template: string;
  /** Array of valid file extensions (e.g., ['JPG', 'PNG', 'XLSX']) */
  validExtensions: string[];
  /** Callback fired when Upload/Validate is clicked. Receives the file and the onlyValidate toggle state. */
  handle: (file: File, onlyValidate: boolean) => void;
  /** Callback fired when the CTA Copy button is clicked */
  handleCtaCopy: () => void;
  /** Label for the upload button when validate toggle is off @default "Upload" */
  uploadLabel?: string;
  /** Label for the validate button when validate toggle is on @default "Validate" */
  validateLabel?: string;
  /** Label for the CTA copy button @default "CTA Copy" */
  ctaCopyLabel?: string;
  /** Trigger element that opens the modal (any button) */
  children: React.ReactNode;
  /** Controlled open state */
  open?: boolean;
  /** Callback for controlled open state changes */
  onOpenChange?: (open: boolean) => void;
  /** Additional CSS classes for the modal content container */
  className?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function isValidExtension(fileName: string, validExtensions: string[]): boolean {
  const ext = fileName.split('.').pop()?.toUpperCase() ?? '';
  return validExtensions.map((e) => e.toUpperCase()).includes(ext);
}

const ImportModal = React.forwardRef<HTMLDivElement, ImportModalProps>(
  (
    {
      title,
      description,
      blackDescription,
      template,
      validExtensions,
      handle,
      handleCtaCopy,
      uploadLabel = 'Upload',
      validateLabel = 'Validate',
      ctaCopyLabel = 'CTA Copy',
      children,
      open: controlledOpen,
      onOpenChange: controlledOnOpenChange,
      className,
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const [file, setFile] = React.useState<File | null>(null);
    const [onlyValidate, setOnlyValidate] = React.useState(false);
    const [isDragging, setIsDragging] = React.useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const isControlled = controlledOpen !== undefined;
    const isOpen = isControlled ? controlledOpen : internalOpen;

    const handleOpenChange = React.useCallback(
      (nextOpen: boolean) => {
        if (isControlled) {
          controlledOnOpenChange?.(nextOpen);
        } else {
          setInternalOpen(nextOpen);
        }
        if (!nextOpen) {
          setFile(null);
          setOnlyValidate(false);
          setIsDragging(false);
        }
      },
      [isControlled, controlledOnOpenChange]
    );

    const acceptString = validExtensions
      .map((ext) => `.${ext.toLowerCase()}`)
      .join(',');

    const handleFileSelect = React.useCallback(
      (selectedFile: File) => {
        if (isValidExtension(selectedFile.name, validExtensions)) {
          setFile(selectedFile);
        }
      },
      [validExtensions]
    );

    const handleDragOver = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
      },
      []
    );

    const handleDragLeave = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      },
      []
    );

    const handleDrop = React.useCallback(
      (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile) {
          handleFileSelect(droppedFile);
        }
      },
      [handleFileSelect]
    );

    const handleInputChange = React.useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
          handleFileSelect(selectedFile);
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      },
      [handleFileSelect]
    );

    const handleRemoveFile = React.useCallback(() => {
      setFile(null);
    }, []);

    const handleUploadClick = React.useCallback(() => {
      if (file) {
        handle(file, onlyValidate);
      }
    }, [file, handle, onlyValidate]);

    const handleCtaCopyClick = React.useCallback(() => {
      handleCtaCopy();
    }, [handleCtaCopy]);

    const handleToggleChange = React.useCallback((status: boolean) => {
      setOnlyValidate(status);
    }, []);

    const handleDropzoneClick = React.useCallback(() => {
      fileInputRef.current?.click();
    }, []);

    return (
      <Dialog.Root open={isOpen} onOpenChange={handleOpenChange}>
        <Dialog.Trigger asChild>{children}</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content
            ref={ref}
            className={cn(
              'fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2',
              'w-[800px] max-w-[90vw]',
              'bg-white rounded-xl p-8',
              'flex flex-col gap-4',
              'shadow-xl',
              'focus:outline-none',
              className
            )}
            aria-describedby={undefined}
          >
            {/* Title Section */}
            <div className="flex flex-col gap-1 w-full">
              <Dialog.Title className="text-xl font-semibold text-[#312e4d] leading-normal">
                {title}
              </Dialog.Title>
              <p className="text-base text-[#575385] leading-5">
                {description}{' '}
                <span className="font-semibold text-[#312e4d]">
                  {blackDescription}
                </span>
              </p>
            </div>

            {/* Template Download Row */}
            <div className="flex items-center justify-between w-full border border-[#ecebf0] rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-[#575385]" />
                <span className="text-sm text-[#312e4d]">
                  Need a template?
                </span>
              </div>
              <a
                href={template}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="text-sm font-semibold text-[#312e4d] hover:underline cursor-pointer"
              >
                Download Template
              </a>
            </div>

            {/* File Upload Zone / File Info */}
            {!file ? (
              <div
                role="button"
                tabIndex={0}
                onClick={handleDropzoneClick}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDropzoneClick();
                  }
                }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  'flex flex-col items-center justify-center gap-2 w-full py-10 rounded-xl border border-[#ecebf0] cursor-pointer transition-colors',
                  isDragging && 'border-[#00b56b] bg-[#e6f8ef]'
                )}
              >
                <Upload className="w-8 h-8 text-[#9e9e9e]" />
                <p className="text-sm text-[#575385]">
                  Click to upload or drag and drop your file
                </p>
                <p className="text-sm font-semibold text-[#00995a]">
                  {validExtensions.join(' or ')}
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={acceptString}
                  onChange={handleInputChange}
                  className="hidden"
                  data-testid="import-modal-file-input"
                />
              </div>
            ) : (
              <div className="flex items-center justify-between w-full border border-[#ecebf0] rounded-xl px-4 py-3">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#575385]" />
                  <span className="text-sm text-[#312e4d]">{file.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#575385]">
                    {formatFileSize(file.size)}
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="flex items-center gap-1 text-sm font-semibold text-[#ff305f] hover:text-[#d4002c] cursor-pointer transition-colors"
                    data-testid="import-modal-remove-file"
                  >
                    Remove
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Only Validate Toggle Row */}
            <div className="flex items-center justify-between w-full border border-[#ecebf0] rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <FileCheck2 className="w-5 h-5 text-[#575385]" />
                <span className="text-sm text-[#312e4d]">
                  Only validate file data, do not upload
                </span>
              </div>
              <Switcher
                status={onlyValidate}
                onChange={handleToggleChange}
              />
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center justify-end gap-4 w-full">
              <Button
                variant={file ? 'primary' : 'secondary'}
                size="medium"
                onClick={handleUploadClick}
                disabled={!file}
                data-testid="import-modal-action-button"
              >
                {onlyValidate ? validateLabel : uploadLabel}
              </Button>
              <Button
                variant="primary"
                size="medium"
                onClick={handleCtaCopyClick}
                data-testid="import-modal-cta-copy"
              >
                {ctaCopyLabel}
              </Button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

ImportModal.displayName = 'ImportModal';

export { ImportModal };
