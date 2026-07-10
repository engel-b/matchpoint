type Props = {
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel,
  danger = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="dialogBackdrop" onClick={onCancel}>
      <div className="dialog confirmDialog" onClick={(event) => event.stopPropagation()}>
        <header className="dialogHeader">
          <h2>{title}</h2>
        </header>

        <div className="dialogContent">
          <p className="confirmDialogMessage">{message}</p>
        </div>

        <footer className="dialogFooter confirmDialogActions">
          {cancelLabel && (
            <button type="button" className="secondaryButton" onClick={onCancel}>
              {cancelLabel}
            </button>
          )}

          <button
            type="button"
            className={danger ? "dangerButton" : "closeButton"}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </footer>
      </div>
    </div>
  );
}
