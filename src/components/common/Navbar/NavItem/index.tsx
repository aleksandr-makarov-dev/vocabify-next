import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

interface NavItemProps {
  icon: any;
  text: string;
  link: string;
}

const NavItem: FC<NavItemProps> = ({ icon, text, link }) => {
  return (
    <Link
      className={cn("p-2.5 rounded-md hover:bg-muted md:hover:bg-inherit", {
        "bg-muted md:bg-inherit": false,
      })}
      href={link}
    >
      <span className="md:hidden">{icon}</span>
      <span className="hidden md:block">{text}</span>
    </Link>
  );
};

export default NavItem;
