import React from "react";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    classes: "bg-studify-warning/10 text-studify-warning border-studify-warning/30",
  },
  approved: {
    label: "Approved",
    classes: "bg-studify-success/10 text-studify-success border-studify-success/30",
  },
  ongoing: {
    label: "Ongoing",
    classes: "bg-studify-success/10 text-studify-success border-studify-success/30",
  },
  open: {
    label: "Open",
    classes: "bg-studify-primary/10 text-studify-primary border-studify-primary/30",
  },
  rejected: {
    label: "Rejected",
    classes: "bg-studify-danger/10 text-studify-danger border-studify-danger/30",
  },
  closed: {
    label: "Closed",
    classes: "bg-studify-danger/10 text-studify-danger border-studify-danger/30",
  },
};

const StatusBadge = ({ status, children, className = "" }) => {
  const normalized = (status || "").toLowerCase().trim();
  const config = STATUS_CONFIG[normalized] || {
    label: status || "Unknown",
    classes: "bg-studify-muted/10 text-studify-muted border-studify-border",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.classes} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {children || config.label}
    </span>
  );
};

export default StatusBadge;
