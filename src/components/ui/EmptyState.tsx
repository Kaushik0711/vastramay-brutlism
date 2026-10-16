import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./Card";
import { Inbox } from "lucide-react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <Card
      thick
      className={cn(
        "p-8 sm:p-12 text-center flex flex-col items-center max-w-lg mx-auto bg-brand-white border-3 border-brand-ink shadow-neo-lg",
        className
      )}
      {...props}
    >
      <div className="w-16 h-16 flex items-center justify-center p-3 bg-brand-yellow border-2 border-brand-ink shadow-neo-sm mb-4">
        {icon ?? <Inbox className="w-8 h-8 text-brand-ink stroke-[2.2]" />}
      </div>

      <h3 className="font-display font-extrabold text-xl uppercase tracking-tight text-brand-ink mb-2">
        {title}
      </h3>

      <p className="font-body text-sm text-neutral-600 max-w-sm mb-6 leading-relaxed">
        {description}
      </p>

      {action && <div className="flex justify-center">{action}</div>}
    </Card>
  );
}
