import "tailwindcss/tailwind.css";
import React from "react";
import { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ColorConsts, ThemeProvider } from "@another_works/react-landscape";
import { customThemeStyle } from "../styles/customThemeStyle";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      customTheme={customThemeStyle}
      mode={ColorConsts.ModeTypeValue.light}
    >
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;
