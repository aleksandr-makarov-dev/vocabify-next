"use client";
import { queryClient } from "@/lib/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { FC, PropsWithChildren } from "react";
import AudioProvider from "./AudioProvider";
import { SessionProvider } from "next-auth/react";

export const AppProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AudioProvider>{children}</AudioProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
};
