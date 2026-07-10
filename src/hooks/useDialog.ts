import { useState } from "react";

export type AppDialog = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm?: () => void;
};

type ShowMessageOptions = {
  title: string;
  message: string;
  confirmLabel: string;
};

type ShowConfirmationOptions = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel: string;
  danger?: boolean;
  onConfirm: () => void;
};

export function useDialog() {
  const [dialog, setDialog] = useState<AppDialog | null>(null);

  function closeDialog() {
    setDialog(null);
  }

  function showMessage(options: ShowMessageOptions) {
    setDialog({
      ...options,
    });
  }

  function showConfirmation(options: ShowConfirmationOptions) {
    setDialog({
      ...options,
    });
  }

  async function confirmDialog() {
    const onConfirm = dialog?.onConfirm;

    closeDialog();

    await onConfirm?.();
  }

  return {
    dialog,
    showMessage,
    showConfirmation,
    closeDialog,
    confirmDialog,
  };
}
