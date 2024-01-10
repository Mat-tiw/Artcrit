import * as React from "react";
import { cva, VariantProps } from "class-variance-authority";
import { cn } from "@/app/lib/utils";
import Link from "next/link";

const ButtonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 dark:hover:bg-slate-800 dark:hover:text-slate-100 disabled:opacity-50 dark:focus:ring-slate-400 disabled:pointer-events-none dark:focus:ring-offset-slate-900 data-[state=open]:bg-slate-100 dark:data-[state=open]:bg-slate-800",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white hover:bg-slate-700 dark:bg-slate-50 dark:text-slate-900",
        outline:
          "bg-transparent border border-slate-200 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-100",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-2 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof ButtonVariants> {
  href?: string;
}
const ButtonStyle = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, variant, href, children, ...props }, ref) => {
    if (href) {
      return (
        <Link
          href={href}
          className={cn(ButtonVariants({ variant, size, className }))}
        >
          {children}
        </Link>
      );
    }
    return (
      <button
        className={cn(ButtonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >{children}</button>
    );
  }
);
ButtonStyle.displayName = "ButtonStyle";
export { ButtonStyle, ButtonVariants };
