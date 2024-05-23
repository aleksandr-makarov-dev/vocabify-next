import Navbar from "@/components/common/Navbar";
import Profile from "@/features/accounts/components/Profile";
import { Home, BookText, Plus } from "lucide-react";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col dark:bg-slate-800">
      <Navbar
        navItems={[
          { icon: <Home className="w-6 h-6" />, text: "Home", link: "/" },
          {
            icon: <BookText className="w-6 h-6" />,
            text: "Your library",
            link: "/library",
          },
          { icon: <Plus className="w-6 h-6" />, text: "New", link: "/create" },
        ]}
      />

      <div className="grow max-w-screen-md mx-auto w-full pt-8 pb-24 md:pb-8 px-3 sm:px-5">
        {children}
      </div>
    </main>
  );
}
