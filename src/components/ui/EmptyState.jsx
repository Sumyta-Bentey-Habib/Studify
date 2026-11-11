import React from "react";
import { Link } from "react-router-dom";

const EmptyState = ({
  icon: Icon,
  title = "No data found",
  description = "There are no records to display at this time.",
  actionLabel,
  actionLink,
  onAction,
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-studify-surface rounded-2xl border border-studify-border">
      {Icon && (
        <div className="w-14 h-14 rounded-2xl bg-studify-bg flex items-center justify-center text-studify-primary mb-4 border border-studify-border">
          <Icon size={28} strokeWidth={1.75} />
        </div>
      )}
      <h3 className="text-base font-bold text-studify-heading mb-1.5">{title}</h3>
      <p className="text-sm text-studify-muted max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {actionLabel && actionLink && (
        <Link
          to={actionLink}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-studify-primary text-white text-sm font-semibold hover:bg-studify-primary-dark transition-colors shadow-sm"
        >
          {actionLabel}
        </Link>
      )}

      {actionLabel && onAction && !actionLink && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-studify-primary text-white text-sm font-semibold hover:bg-studify-primary-dark transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
