"use client";

import * as React from "react";
import { Toaster as SonnerToaster, toast } from "sonner";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, Undo2 } from "lucide-react";

export interface ToasterProps extends React.ComponentProps<typeof SonnerToaster> {}

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <SonnerToaster
      theme="system"
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[var(--bg-elev-2)] group-[.toaster]:text-[var(--text)] group-[.toaster]:border-[var(--border)] group-[.toaster]:shadow-xl group-[.toaster]:rounded-xl group-[.toaster]:p-4 group-[.toaster]:font-sans",
          description: "group-[.toast]:text-[var(--text-muted)] text-xs mt-1",
          actionButton:
            "group-[.toast]:bg-[var(--accent)] group-[.toast]:text-[#05070D] group-[.toast]:font-semibold group-[.toast]:rounded-lg text-xs px-3 py-1.5",
          cancelButton:
            "group-[.toast]:bg-[var(--bg-elev-1)] group-[.toast]:text-[var(--text-muted)] group-[.toast]:rounded-lg text-xs px-3 py-1.5",
          closeButton:
            "group-[.toast]:bg-[var(--bg-elev-1)] group-[.toast]:text-[var(--text-muted)] group-[.toast]:border-[var(--border)]",
          success: "group-[.toaster]:border-[#34D399]/40",
          warning: "group-[.toaster]:border-[#F59E0B]/40",
          error: "group-[.toaster]:border-[#F43F5E]/40",
          info: "group-[.toaster]:border-[#22D3EE]/40",
        },
      }}
      {...props}
    />
  );
};

export { toast };

/* Semantic toast helpers */
export const notify = {
  success: (message: string, description?: string) =>
    toast.success(message, {
      description,
      icon: <CheckCircle2 className="h-4 w-4 text-[#34D399]" />,
    }),
  error: (message: string, description?: string) =>
    toast.error(message, {
      description,
      icon: <AlertCircle className="h-4 w-4 text-[#F43F5E]" />,
    }),
  warning: (message: string, description?: string) =>
    toast.warning(message, {
      description,
      icon: <AlertTriangle className="h-4 w-4 text-[#F59E0B]" />,
    }),
  info: (message: string, description?: string) =>
    toast.info(message, {
      description,
      icon: <Info className="h-4 w-4 text-[#22D3EE]" />,
    }),
  withUndo: (message: string, onUndo: () => void, description?: string) =>
    toast(message, {
      description,
      action: {
        label: (
          <span className="flex items-center gap-1.5">
            <Undo2 className="h-3 w-3" />
            Undo
          </span>
        ),
        onClick: onUndo,
      },
    }),
};
