import { createPortal } from "react-dom";

type ConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  wrapperClassName?: string;
  overlayClassName?: string;
  panelClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
};

export default function ConfirmModal({
  isOpen,
  title = "Confirm",
  message = "Are you sure?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  wrapperClassName,
  overlayClassName,
  panelClassName,
  confirmButtonClassName,
  cancelButtonClassName
}: ConfirmModalProps) {
  if (!isOpen || typeof document === "undefined") return null;

  const wrapperClass = `flex items-center justify-center ${wrapperClassName ?? ""}`.trim();
  const overlayClass = overlayClassName ?? "absolute inset-0 bg-black/50";
  const panelClass = panelClassName ?? "z-10 w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg";
  const cancelClass = cancelButtonClassName ?? "rounded px-4 py-2 text-sm";
  const confirmClass =
    confirmButtonClassName ?? "rounded bg-(--color-primary) px-4 py-2 text-sm text-white";

  return createPortal(
    <div style={{ position: "fixed", inset: 0, zIndex: 2147483647 }} className={wrapperClass}>
      <div className={overlayClass} onClick={onCancel} />
      <div className={panelClass}>
        <h3 className="mb-4 text-lg font-semibold">{title}</h3>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button className={cancelClass} onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={confirmClass} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
