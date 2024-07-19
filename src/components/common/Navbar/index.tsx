"use client";
import { FC } from "react";
import NavItem from "./NavItem";
import Profile from "@/features/accounts/components/Profile";
import ThemeSwitch from "../ThemeSwitch";

interface NavbarProps {
  navItems: Array<{
    icon: JSX.Element;
    text: string;
    link: string;
  }>;
}

const Navbar: FC<NavbarProps> = ({ navItems }) => {
  return (
    <nav className="fixed md:static z-10 bottom-0 w-full bg-white shadow-sm h-16 flex justify-center border-t border-b dark:bg-zinc-800">
      <div className="px-5 py-2.5 flex items-center justify-center md:justify-start gap-x-5 w-full max-w-screen-xl">
        <div className="hidden md:flex">
          <p className="text-lg font-medium">Vocabify</p>
        </div>
        <div className="flex gap-x-8 w-auto md:w-full">
          {navItems.map((item) => (
            <NavItem key={item.text} {...item} />
          ))}
        </div>
        <ThemeSwitch />
        <Profile />
      </div>
    </nav>
  );
};

export default Navbar;
