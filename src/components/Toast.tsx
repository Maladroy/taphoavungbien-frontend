import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, AlertCircle, Info } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ToastItem {
  id: string;
  message: string;
  type?: "success" | "info" | "error";
}

interface ToastContextValue {
  showToast: (message: string, type?: "success" | "info" | "error") => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback(
    (message: string, type: "success" | "info" | "error" = "success") => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3200);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast floating container */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 pointer-events-none items-center max-w-[90vw] w-max">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={cn(
              "pointer-events-auto flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-sm font-medium transition-all duration-300 animate-in fade-in slide-in-from-bottom-2",
              t.type === "success" &&
                "bg-[var(--indigo-deep)] text-white border-[var(--indigo)]",
              t.type === "error" &&
                "bg-[var(--seal)] text-white border-red-700",
              t.type === "info" &&
                "bg-[var(--bg-alt)] text-[var(--ink)] border-[var(--line)]"
            )}
          >
            {t.type === "success" && (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            )}
            {t.type === "error" && (
              <AlertCircle className="w-4 h-4 text-amber-200 shrink-0" />
            )}
            {t.type === "info" && (
              <Info className="w-4 h-4 text-[var(--ginger)] shrink-0" />
            )}
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
};
