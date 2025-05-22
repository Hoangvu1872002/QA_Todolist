import { createContext } from "react";

export type BaseUrlContextType = {
  baseUrl: string;
  setBaseUrl: (url: string) => void;
};

export const BaseUrlContext = createContext<BaseUrlContextType | undefined>(
  undefined
);
