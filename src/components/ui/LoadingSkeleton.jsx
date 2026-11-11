import React from "react";

const LoadingSkeleton = ({ count = 3, type = "card" }) => {
  if (type === "spinner") {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-3">
        <div className="w-10 h-10 rounded-full border-3 border-studify-border border-t-studify-primary animate-spin" />
        <span className="text-xs font-medium text-studify-muted">Loading data...</span>
      </div>
    );
  }

  if (type === "table") {
    return (
      <div className="w-full bg-studify-surface rounded-2xl border border-studify-border p-6 space-y-4 animate-pulse">
        <div className="h-6 bg-studify-bg rounded-lg w-1/4" />
        <div className="space-y-3">
          {[...Array(count)].map((_, i) => (
            <div key={i} className="h-10 bg-studify-bg/70 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 animate-pulse">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="bg-studify-surface border border-studify-border rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-studify-bg" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-studify-bg rounded w-3/4" />
              <div className="h-3 bg-studify-bg rounded w-1/2" />
            </div>
          </div>
          <div className="h-16 bg-studify-bg/60 rounded-xl" />
          <div className="h-9 bg-studify-bg rounded-xl w-full" />
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
