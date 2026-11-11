import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const ActionCard = ({
  icon: Icon,
  title,
  description,
  to,
  onClick,
  actionText = "Open",
  highlight = false,
  className = "",
}) => {
  const content = (
    <div
      className={`group relative flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-studify-surface border transition-all duration-200 h-full ${
        highlight
          ? "border-studify-primary/40 shadow-sm hover:border-studify-primary hover:shadow-md"
          : "border-studify-border shadow-sm hover:border-studify-primary/50 hover:shadow-md"
      } ${className}`}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          {Icon && (
            <div className="w-11 h-11 rounded-xl bg-studify-bg flex items-center justify-center text-studify-primary border border-studify-border group-hover:scale-105 transition-transform duration-200">
              <Icon size={22} strokeWidth={2} />
            </div>
          )}
          <span className="w-7 h-7 rounded-full bg-studify-bg flex items-center justify-center text-studify-muted group-hover:bg-studify-primary group-hover:text-white transition-colors duration-200">
            <ChevronRight size={14} />
          </span>
        </div>
        <h3 className="text-base font-bold text-studify-heading group-hover:text-studify-primary transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-xs text-studify-muted mt-1 leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-studify-border/60 flex items-center justify-between text-xs font-semibold text-studify-primary">
        <span>{actionText}</span>
        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block h-full">
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className="block w-full text-left h-full">
      {content}
    </button>
  );
};

export default ActionCard;
