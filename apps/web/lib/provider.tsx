"use client";
import { HeroUIProvider, ToastProvider } from "@heroui/react";
import React from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  );
};

export default Provider;
