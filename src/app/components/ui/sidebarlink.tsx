import * as React from "react";
import { cn } from "@/app/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import PersonIcon from "@mui/icons-material/Person";
import FeedIcon from "@mui/icons-material/Feed";
import LogoutIcon from "@mui/icons-material/Logout";
import FmdBadIcon from "@mui/icons-material/FmdBad";
import Link from "next/link";
const iconType = {
  user: <PersonIcon />,
  feed: <FeedIcon />,
  logout: <LogoutIcon />,
  placeholder: <FmdBadIcon />,
};

interface IconProps {
  icon: keyof typeof iconType;
}

const SideBarLinkVariants = cva(
  "p-5 w-full flex cursor-pointer rounded-xl hover:bg-primary transition-colors ease-out duration-1000 font-montserrart font-bold",
  {
    variants: {
      variant: {
        default: "text-white hover:text-secondary",
        day: "text-secondary hover:text-white",
      },
      textSize: {
        default: " text-xl",
        mobile: "",
      },
      defaultVariants: {
        variant: "default",
        textSize: "default",
      },
    },
  }
);
interface SideBarLinkProps
  extends VariantProps<typeof SideBarLinkVariants>,
    IconProps {
  text?: string;
  href?: string;
  className?: string;
}

const SideBarLink = React.forwardRef<HTMLDivElement, SideBarLinkProps>(
  ({ className, text, textSize, icon, href, variant, ...props }, ref) => {
    return (
      <>
        {href ? ( 
            <a href={href} className={cn(SideBarLinkVariants({ className, variant }))}{...props}>
              <div className="">{iconType[icon]}</div>
              <h1 className="pl-5">{text}</h1>
            </a>
        ) : (
          <div className={cn(SideBarLinkVariants({ className, variant }))} ref={ref} {...props}>
            <div className="">{iconType[icon]}</div>
            <h1 className="pl-5">{text}</h1>
          </div>
        )}
      </>
    );
  }
);

SideBarLink.displayName = "SideBarLink";

export { SideBarLink };