import React, { memo, ReactNode } from "react";
import Head from "next/head";
import { Header } from "../Header";
import { Footer } from "../Footer";

interface Props {
  children: ReactNode;
}

// ページのベースとなるテンプレートコンポーネント
export const PageTemplate: React.VFC<Props> = memo((props) => {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        {/*todo title を設定*/}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex-grow overflow-y-scroll">{props.children}</div>
      <Footer />
    </div>
  );
});
