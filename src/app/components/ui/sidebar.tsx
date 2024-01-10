import * as React from "react";
import { SideBarLink } from "./sidebarlink";
import { cn } from "@/app/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const SidebarVariants = cva("m-5 rounded-xl", {
  variants: {
    variant: {
      default: "bg-secondary",
      day: "bg-white",
    },
    type: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
    type: "default",
  },
});
interface SidebarProps extends VariantProps<typeof SidebarVariants> {
  className?: string;
}

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, type, variant }, ref) => {
    return (
      <>
        <div
          ref={ref}
          className={cn(SidebarVariants({ className, type, variant }))}
        >
          <div className="">
            <SideBarLink
              icon="user"
              variant="default"
              textSize="default"
              text="profile"
            />
            <SideBarLink
              icon="feed"
              variant="default"
              textSize="default"
              text="feed"
            />
            <SideBarLink
              icon="placeholder"
              variant="default"
              textSize="default"
              text="placeholder"
            />
          </div>
          <div className="pt-16">
          <SideBarLink
              icon="logout"
              variant="default"
              textSize="default"
              text="logout"
            />
          </div>
        </div>
      </>
    );
  }
);

Sidebar.displayName = "Sidebar";

export { Sidebar };
