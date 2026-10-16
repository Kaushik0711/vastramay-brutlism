"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import type { ToastData } from "./toast-types";
import { toastStore } from "./toast-store";
import { toastVariants } from "@/lib/motion";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToastItemProps {
  toast: ToastData;
}

export function ToastItem({ toast }: ToastItemProps) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const remainingTimeRef = useRef<number>(toast.duration || 4000);
  const startTimeRef = useRef<number>(0);

  const startTimer = useCallback(() => {
    if (toast.duration === Infinity || toast.duration === 0) return;
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      toastStore.dismiss(toast.id);
    }, remainingTimeRef.current);
  }, [toast.id, toast.duration]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      const elapsed = Date.now() - startTimeRef.current;
      remainingTimeRef.current = Math.max(remainingTimeRef.current - elapsed, 1000);
    }
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [startTimer]);

  const defaultIcons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-600 stroke-[2.5]" />,
    error: <AlertCircle className="w-5 h-5 text-brand-pink stroke-[2.5]" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-600 stroke-[2.5]" />,
    info: <Info className="w-5 h-5 text-brand-blue stroke-[2.5]" />,
    default: <Info className="w-5 h-5 text-brand-ink stroke-[2.5]" />,
  };

  const typeStyles = {
    success: "bg-brand-white border-2 border-brand-ink shadow-[4px_4px_0px_#10B981]",
    error: "bg-brand-white border-2 border-brand-ink shadow-[4px_4px_0px_#FF5C8A]",
    warning: "bg-brand-white border-2 border-brand-ink shadow-[4px_4px_0px_#FFE14A]",
    info: "bg-brand-white border-2 border-brand-ink shadow-[4px_4px_0px_#4867F5]",
    default: "bg-brand-white border-2 border-brand-ink shadow-neo",
  };

  const isAlert = toast.type === "error" || toast.type === "warning";

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      role={isAlert ? "alert" : "status"}
      aria-live={isAlert ? "assertive" : "polite"}
      onMouseEnter={pauseTimer}
      onMouseLeave={startTimer}
      onFocus={pauseTimer}
      onBlur={startTimer}
      className={cn(
        "pointer-events-auto flex items-start gap-3 w-full max-w-sm p-4 rounded-[2px]",
        typeStyles[toast.type]
      )}
    >
      <div className="shrink-0 pt-0.5">
        {toast.icon ?? defaultIcons[toast.type]}
      </div>

      <div className="flex-1 space-y-1">
        <div className="font-display font-extrabold text-sm uppercase text-brand-ink tracking-tight">
          {toast.message}
        </div>
        {toast.description && (
          <div className="font-body text-xs text-neutral-600 leading-relaxed">
            {toast.description}
          </div>
        )}
        {toast.action && (
          <button
            type="button"
            onClick={toast.action.onClick}
            className="mt-1 px-2 py-0.5 font-display font-bold text-xs uppercase bg-brand-yellow border border-brand-ink shadow-neo-sm hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all cursor-pointer"
          >
            {toast.action.label}
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={() => toastStore.dismiss(toast.id)}
        aria-label="Close notification"
        className="shrink-0 p-1 border border-brand-ink bg-brand-white text-brand-ink hover:bg-brand-pink transition-colors cursor-pointer"
      >
        <X className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>
    </motion.div>
  );
}
