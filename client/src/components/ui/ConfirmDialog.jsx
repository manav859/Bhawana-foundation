import { AlertTriangle } from 'lucide-react';
import { Modal } from './Modal.jsx';
import { Button } from './Button.jsx';

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to continue? This action cannot be undone.',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  loading = false,
  variant = 'danger',
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center py-2">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
          variant === 'danger' ? 'bg-red-50' : 'bg-amber-50'
        }`}>
          <AlertTriangle className={`w-7 h-7 ${
            variant === 'danger' ? 'text-red-500' : 'text-amber-500'
          }`} />
        </div>
        <h3 className="font-display text-lg font-bold text-text-dark mb-2">{title}</h3>
        <p className="text-sm text-text-secondary mb-6 max-w-sm">{message}</p>
        <div className="flex items-center gap-3 w-full">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={loading}
            className="flex-1"
          >
            {cancelText}
          </Button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 px-6 py-2.5 rounded-lg font-sans font-semibold text-sm text-white transition-colors disabled:opacity-50 ${
              variant === 'danger'
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-amber-500 hover:bg-amber-600'
            }`}
          >
            {loading ? 'Processing...' : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
}
