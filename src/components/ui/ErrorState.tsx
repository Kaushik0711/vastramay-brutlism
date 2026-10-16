import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";
import { Button } from "./Button";
import { AlertTriangle, RotateCcw } from "lucide-react";

export interface ErrorStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  error?: Error | string;
  onRetry?: () => void;
  retryLabel?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "An error occurred while loading this section. Please try again.",
  error,
  onRetry,
  retryLabel = "TRY AGAIN",
  className,
  ...props
}: ErrorStateProps) {
  const errorMessage = error instanceof Error ? error.message : error;

  return (
    <Card
      thick
      className={cn(
        "p-6 sm:p-10 text-center flex flex-col items-center max-w-lg mx-auto bg-brand-white border-3 border-brand-ink shadow-neo-lg",
        className
      )}
      {...props}
    >
      <div className="w-14 h-14 flex items-center justify-center p-3 bg-brand-pink border-2 border-brand-ink shadow-neo-sm mb-4">
        <AlertTriangle className="w-7 h-7 text-brand-ink stroke-[2.5]" />
      </div>

      <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-brand-ink mb-2">
        {title}
      </h3>

      <p className="font-body text-sm text-neutral-600 max-w-sm mb-4 leading-relaxed">
        {description}
      </p>

      {errorMessage && (
        <pre className="w-full p-2.5 bg-neutral-100 border border-neutral-300 font-mono text-[11px] text-neutral-700 text-left overflow-x-auto mb-6">
          {errorMessage}
        </pre>
      )}

      {onRetry && (
        <Button
          variant="secondary"
          size="md"
          onClick={onRetry}
          leadingIcon={<RotateCcw className="w-4 h-4" />}
        >
          {retryLabel}
        </Button>
      )}
    </Card>
  );
}
