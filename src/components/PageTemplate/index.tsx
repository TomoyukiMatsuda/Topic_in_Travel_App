import React, { memo, ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";

interface Props {
  children: ReactNode;
}

// ページのベースとなるテンプレートコンポーネント
export const PageTemplate: React.VFC<Props> = memo((props) => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex-grow overflow-y-scroll">{props.children}</div>
      <Footer />
    </div>
  );
});
