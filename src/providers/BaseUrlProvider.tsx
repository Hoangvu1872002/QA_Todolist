"use client";
import { useState, ReactNode } from "react";
import { BaseUrlContext } from "@/contexts/BaseUrlContext";

export const BaseUrlProvider = ({ children }: { children: ReactNode }) => {
  const [baseUrl, setBaseUrl] = useState<string>("");

  return (
    <BaseUrlContext.Provider value={{ baseUrl, setBaseUrl }}>
      {children}
    </BaseUrlContext.Provider>
  );
};
