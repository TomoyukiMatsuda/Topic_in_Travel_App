import React, { ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";

interface Props {
  children: ReactNode;
}

export const PageTemplate: React.VFC<Props> = (props) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow overflow-y-scroll">{props.children}</div>
      <Footer />
    </div>
  );
};
