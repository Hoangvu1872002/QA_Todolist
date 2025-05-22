"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import { Toaster } from "react-hot-toast";
import { RecoilRoot } from "recoil";
import Footer from "@/sections/common/Footer/Footer";
import Header from "@/sections/common/Header/Header";
import { BaseUrlProvider } from "./BaseUrlProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <RecoilRoot>
      <BaseUrlProvider>
        <Toaster />
        <ProgressBar
          color="red"
          height={"3px"}
          options={{ showSpinner: false }}
        />
        <Header />
        {children}
        <Footer />
      </BaseUrlProvider>
    </RecoilRoot>
  );
};

export default AppProvider;
