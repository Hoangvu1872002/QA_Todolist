import { BaseUrlContext } from "@/contexts/BaseUrlContext";
import { useContext } from "react";

export const useBaseUrl = () => {
  const context = useContext(BaseUrlContext);
  if (!context)
    throw new Error("useBaseUrl must be used within BaseUrlProvider");
  return context;
};
