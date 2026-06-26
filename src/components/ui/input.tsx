import * as React from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-(--radius-md) border border-(--color-border) bg-(--color-background) px-4 text-base text-(--color-text) placeholder:text-(--color-muted) transition-colors focus-visible:outline-none focus-visible:border-(--color-primary) disabled:opacity-60 aria-[invalid=true]:border-red-500";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = "text", ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(fieldBase, "h-12", className)}
    {...props}
  />
));
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, rows = 5, ...props }, ref) => (
  <textarea
    ref={ref}
    rows={rows}
    className={cn(fieldBase, "py-3 resize-y", className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(fieldBase, "h-12 appearance-none bg-(--color-background) pr-10", className)}
    {...props}
  />
));
Select.displayName = "Select";

export { Input, Textarea, Select };
