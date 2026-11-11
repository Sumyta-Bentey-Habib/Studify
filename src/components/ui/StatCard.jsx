import React from "react";

const StatCard = ({
  icon: Icon,
  label,
  value,
  helperText,
  trend,
  className = "",
}) => {
  return (
    <div
      className={`bg-studify-surface border border-studify-border rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-studify-muted uppercase tracking-wider">
          {label}
        </span>
        {Icon && (
          <div className="w-9 h-9 rounded-xl bg-studify-bg flex items-center justify-center text-studify-primary border border-studify-border">
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl sm:text-3xl font-extrabold text-studify-heading tracking-tight">
          {value}
        </span>
        {trend && (
          <span className="text-xs font-semibold text-studify-success">
            {trend}
          </span>
        )}
      </div>
      {helperText && (
        <p className="text-xs text-studify-muted mt-1.5">{helperText}</p>
      )}
    </div>
  );
};

export default StatCard;
