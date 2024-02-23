import * as React from "react";
import { SideBarLink } from "./sidebarlink";
import { cn } from "@/app/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { login,userId } from "@/api/api.js"
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
function handleRemove() {
  localStorage.clear();
  location.reload();
}
const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ className, type, variant }, ref) => {
    return (
      <div
          ref={ref}
          className={cn(SidebarVariants({ className, type, variant }))}
        >
          <div className="">
            {login ? (
              <SideBarLink
                icon="user"
                variant="default"
                textSize="default"
                text="profile"
                href={`/user/${userId}`}
                id="toProfile"
              />
            ) : (
              ""
            )}
            <SideBarLink
              icon="feed"
              variant="default"
              textSize="default"
              text="feed"
              href="/"
            />
            <SideBarLink
              icon="placeholder"
              variant="default"
              textSize="default"
              text="placeholder"
            />
          </div>
          {login ? (
            <div className="pt-16">
              <div className="" onClick={handleRemove}>
                <SideBarLink
                  icon="logout"
                  variant="default"
                  textSize="default"
                  text="logout"
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
    );
  }
);

Sidebar.displayName = "Sidebar";

export { Sidebar };
