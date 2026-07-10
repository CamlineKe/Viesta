"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, Info, X } from "lucide-react";

import { cn } from "@/lib/class-names";

type ToastType = "success" | "info" | "error";

type Toast = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const toastStyles: Record<ToastType, string> = {
  success: "border-green-200 bg-green-50 text-green-900",
  info: "border-blue-200 bg-blue-50 text-blue-900",
  error: "border-red-200 bg-red-50 text-red-900",
};

function ToastIcon({ type }: { type: ToastType }) {
  if (type === "success") {
    return <CheckCircle2 aria-hidden="true" className="h-5 w-5 shrink-0 text-brand-success" />;
  }

  return <Info aria-hidden="true" className="h-5 w-5 shrink-0" />;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;

    setToasts((currentToasts) => [...currentToasts.slice(-2), { id, message, type }]);
  }, []);

  useEffect(() => {
    if (toasts.length === 0) {
      return;
    }

    const timers = toasts.map((toast) => window.setTimeout(() => dismissToast(toast.id), 4000));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [dismissToast, toasts]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[70] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "flex animate-slide-in-right items-start gap-3 rounded-2xl border p-4 text-sm font-semibold leading-6 shadow-brand-lg backdrop-blur-md",
              toastStyles[toast.type],
            )}
            role="status"
          >
            <ToastIcon type={toast.type} />
            <p className="min-w-0 flex-1">{toast.message}</p>
            <button
              aria-label="Dismiss notification"
              className="rounded-md p-1 opacity-70 transition hover:opacity-100"
              type="button"
              onClick={() => dismissToast(toast.id)}
            >
              <X aria-hidden="true" className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within ToastProvider.");
  }

  return context;
}
