import React from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed with this action?",
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "danger", // 'danger' | 'primary' | 'warning'
  loading = false,
}) => {
  const variantConfig = {
    danger: {
      icon: AlertTriangle,
      iconColor: "text-studify-danger",
      iconBg: "bg-studify-danger/10",
      buttonBg: "bg-studify-danger hover:bg-studify-danger/90 text-white",
    },
    warning: {
      icon: AlertCircle,
      iconColor: "text-studify-warning",
      iconBg: "bg-studify-warning/10",
      buttonBg: "bg-studify-warning hover:bg-studify-warning/90 text-white",
    },
    primary: {
      icon: Info,
      iconColor: "text-studify-primary",
      iconBg: "bg-studify-primary/10",
      buttonBg: "bg-studify-primary hover:bg-studify-primary-dark text-white",
    },
  };

  const config = variantConfig[variant] || variantConfig.primary;
  const Icon = config.icon;

  return (
    <Dialog open={isOpen} as="div" className="relative z-50" onClose={onClose}>
      <div className="fixed inset-0 bg-studify-heading/40 backdrop-blur-xs transition-opacity" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-studify-surface p-6 text-left align-middle shadow-xl border border-studify-border transition-all">
          <div className="flex items-start gap-4">
            <div
              className={`flex-shrink-0 w-10 h-10 rounded-xl ${config.iconBg} ${config.iconColor} flex items-center justify-center`}
            >
              <Icon size={20} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-base font-bold text-studify-heading">
                {title}
              </DialogTitle>
              <p className="mt-2 text-sm text-studify-muted leading-relaxed">
                {message}
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-studify-border">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-sm font-semibold text-studify-heading hover:bg-studify-bg rounded-xl border border-studify-border transition-colors disabled:opacity-50"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={`px-4 py-2 text-sm font-semibold rounded-xl transition-colors shadow-sm disabled:opacity-50 ${config.buttonBg}`}
            >
              {loading ? "Processing..." : confirmLabel}
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ConfirmationDialog;
