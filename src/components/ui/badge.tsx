import * as React from "react";
import { cn } from "@/lib/utils";

function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-(--color-surface-2) px-3 py-1 text-xs font-medium text-(--color-muted)",
        className,
      )}
      {...props}
    />
  );
}

export { Badge };
