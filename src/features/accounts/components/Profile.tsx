"use client";
import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useMediaQuery } from "usehooks-ts";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";

const Profile: FC = () => {
  const matches = useMediaQuery("(max-width: 768px)", {
    initializeWithValue: false,
  });
  const session = useSession();

  if (session.status === "authenticated") {
    return (
      <Button className="shrink-0" size={matches ? "icon" : "default"}>
        <Link href="/api/auth/signout?callbackUrl=/api/auth/signin">
          {matches ? <LogOut className="w-5 h-5" /> : "Log out"}
        </Link>
      </Button>
    );
  }

  return (
    <Button className="shrink-0" size={matches ? "icon" : "default"}>
      <Link href="/api/auth/signin">
        {matches ? <LogIn className="w-5 h-5" /> : "Log in"}
      </Link>
    </Button>
  );
};

export default Profile;
